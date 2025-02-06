import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'

import { format, isValid, parseISO } from 'date-fns'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import apiRafaRolamentos from '../../service/api'
import { Container, Filters, StyledButton } from './style'

// Definição da interface para Compra
interface Compra {
  id_compras: string
  status_compra: string
  fornecedor: string
  valor_total_compra: number
  data_compra: string
  createdAt: string
}

export function Compras() {
  const navigate = useNavigate()
  const [compras, setCompras] = useState<Compra[]>([])
  const [searchFornecedor, setSearchFornecedor] = useState<string>('')
  const [searchData] = useState<Date | null>(null)

  // Buscar compras na API
  useEffect(() => {
    const fetchCompras = async () => {
      try {
        const response = await apiRafaRolamentos.get<Compra[]>('/entrada')
        setCompras(response.data)
      } catch (error) {
        console.error('Erro ao buscar compras:', error)
      }
    }
    fetchCompras()
  }, [])

  // Filtrar compras por fornecedor e data
  const comprasFiltradas = compras.filter((compra) => {
    const fornecedorMatch = compra.fornecedor
      .toLowerCase()
      .includes(searchFornecedor.toLowerCase())

    // 📌 Converter a data da compra para o formato correto
    let compraDataFormatted: string | null = null
    if (compra.data_compra) {
      try {
        const parsedDate = parseISO(compra.data_compra) // Converte a data do banco
        if (isValid(parsedDate)) {
          compraDataFormatted = format(parsedDate, 'dd/MM/yyyy') // Converte para DD/MM/YYYY
        }
      } catch (error) {
        console.error('Erro ao converter data:', error)
      }
    }

    // 📌 Formatar a data selecionada corretamente
    const searchDataFormatted =
      searchData && isValid(searchData)
        ? format(searchData, 'dd/MM/yyyy')
        : null

    // 📌 Comparação entre as datas formatadas
    const dataMatch =
      searchDataFormatted && compraDataFormatted
        ? searchDataFormatted === compraDataFormatted
        : true

    return fornecedorMatch && dataMatch
  })

  // Ordenar as compras filtradas pela data, com as mais atuais no topo
  const comprasOrdenadas = [...comprasFiltradas].sort(
    (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
  )
  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Compras
      </Typography>

      {/* Filtros de pesquisa */}
      <Filters>
        <TextField
          label="Buscar por fornecedor"
          variant="outlined"
          value={searchFornecedor}
          onChange={(e) => setSearchFornecedor(e.target.value)}
          fullWidth
        />

        <StyledButton
          variant="contained"
          onClick={() => navigate('/compras/novopedido')}
        >
          + Nova Compra
        </StyledButton>
      </Filters>

      {/* Tabela de compras */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell>Fornecedor</TableCell>
              <TableCell>Total da Compra</TableCell>
              <TableCell>Data da Compra</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {comprasOrdenadas.length > 0 ? (
              comprasOrdenadas.map((compra) => (
                <TableRow key={compra.id_compras}>
                  <TableCell>{compra.status_compra}</TableCell>
                  <TableCell>{compra.fornecedor}</TableCell>
                  <TableCell>
                    R${' '}
                    {parseFloat(compra.valor_total_compra.toString()).toFixed(
                      2
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(compra.createdAt).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell>
                    <StyledButton
                      variant="contained"
                      onClick={() => navigate(`/compras/${compra.id_compras}`)}
                    >
                      Ver Detalhes
                    </StyledButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Nenhuma compra encontrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}
