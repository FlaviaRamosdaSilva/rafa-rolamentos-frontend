import {
  Button,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import apiRafaRolamentos from '../../service/api'
import { Container, TotalField } from './styles'

export function EditarVenda() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [clients, setClients] = useState([])
  const [products, setProducts] = useState([])
  const [selectedClient, setSelectedClient] = useState('')
  const [clientType, setClientType] = useState('')
  const [selectedProducts, setSelectedProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [discount, setDiscount] = useState('0')
  const [discountReason, setDiscountReason] = useState('Sem desconto')

  useEffect(() => {
    apiRafaRolamentos
      .get(`/saida/${id}`)
      .then((response) => {
        const saleData = response.data
        setSelectedClient(saleData.clienteId)
        setClientType(saleData.tipo_cliente)
        setSelectedProducts(saleData.produtos)
        setDiscount(saleData.desconto)
        setDiscountReason(saleData.motivo_desconto)
      })
      .catch((error) => console.error('Erro ao buscar venda:', error))

    apiRafaRolamentos
      .get('/cliente')
      .then((response) => setClients(response.data))
      .catch((error) => console.error('Erro ao buscar clientes:', error))

    apiRafaRolamentos
      .get('/produto')
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Erro ao buscar produtos:', error))
  }, [id])
  const handleUpdateSale = () => {
    const data = {
      clienteId: selectedClient,
      tipo_cliente: clientType,
      desconto: parseFloat(discount) || 0,
      motivo_desconto: discountReason,
      produtos: selectedProducts.map(({ produtoId, quantidade }) => ({
        produtoId,
        quantidade,
      })),
    }

    apiRafaRolamentos
      .put(`/saida/${id}`, data)
      .then(() => {
        toast.success('Venda alterada com sucesso!')
        navigate('/vendas')
      })
      .catch(() => toast.error('Erro ao alterar venda'))
  }

  if (isLoading) {
    return (
      <Container>
        <h2>Carregando...</h2>
      </Container>
    )
  }
  return (
    <Container>
      <h2>Editar Venda</h2>
      <Select
        fullWidth
        value={selectedClient}
        onChange={(e) => setSelectedClient(e.target.value)}
      >
        {clients.map((client) => (
          <MenuItem key={client.id_cliente} value={client.id_cliente}>
            {client.nome}
          </MenuItem>
        ))}
      </Select>
      <Select
        fullWidth
        value={clientType}
        onChange={(e) => setClientType(e.target.value)}
      >
        <MenuItem value="Distribuidor">Distribuidor</MenuItem>
        <MenuItem value="Lojista">Lojista</MenuItem>
      </Select>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Descrição</TableCell>
              <TableCell>Quantidade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedProducts.map((product, index) => (
              <TableRow key={index}>
                <TableCell>
                  {products.find((p) => p.id_produto === product.produtoId)
                    ?.descricao_produto || 'Produto desconhecido'}
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={product.quantidade}
                    onChange={(e) => {
                      const updatedProducts = [...selectedProducts]
                      updatedProducts[index].quantidade = Number(e.target.value)
                      setSelectedProducts(updatedProducts)
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TotalField>Desconto: R$ {discount}</TotalField>
      <TotalField>Motivo: {discountReason}</TotalField>
      <Button variant="contained" color="success" onClick={handleUpdateSale}>
        Alterar Venda
      </Button>
    </Container>
  )
}
