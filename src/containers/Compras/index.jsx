import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material'

import { format, isValid, parseISO } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import apiRafaRolamentos from '../../service/api'
import { Container, Filters, StyledButton } from './style'

export function Compras() {
  const navigate = useNavigate()
  const [compras, setCompras] = useState([])
  const [searchFornecedor, setSearchFornecedor] = useState('')
  const [searchData] = useState(null)

  // Buscar compras na API
  useEffect(() => {
    const fetchCompras = async () => {
      try {
        const response = await apiRafaRolamentos.get('/entrada')
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
    let compraDataFormatted = null
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

  return (
    <Container>
      <h2>Compras</h2>

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
            {comprasFiltradas.length > 0 ? (
              comprasFiltradas.map((compra) => (
                <TableRow key={compra.id_compras}>
                  <TableCell>{compra.status_compra}</TableCell>
                  <TableCell>{compra.fornecedor}</TableCell>
                  <TableCell>
                    R$ {parseFloat(compra.valor_total_compra).toFixed(2)}
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
