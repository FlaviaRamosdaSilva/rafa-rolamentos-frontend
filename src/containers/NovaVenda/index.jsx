import {
  Button,
  Checkbox,
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
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import apiRafaRolamentos from '../../service/api'
import { Container, TotalField } from './styles'

export function NovaVenda() {
  const navigate = useNavigate()
  const [clients, setClients] = useState([])
  const [products, setProducts] = useState([])
  const [selectedClient, setSelectedClient] = useState('')
  const [clientType, setClientType] = useState('')
  const [searchProduct, setSearchProduct] = useState('')
  const [selectedProducts, setSelectedProducts] = useState([])
  const [discount, setDiscount] = useState('0')
  const [discountReason, setDiscountReason] = useState('Sem desconto')
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false)

  useEffect(() => {
    apiRafaRolamentos
      .get('/cliente')
      .then((response) => setClients(response.data))
      .catch((error) => console.error('Erro ao buscar clientes:', error))

    apiRafaRolamentos
      .get('/produto')
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Erro ao buscar produtos:', error))
  }, [])

  const handleProductSelect = (productId) => {
    if (selectedProducts.some((p) => p.produtoId === productId)) {
      setSelectedProducts(
        selectedProducts.filter((p) => p.produtoId !== productId)
      )
    } else {
      setSelectedProducts([
        ...selectedProducts,
        { produtoId: productId, quantidade: 1 },
      ])
    }
  }

  const handleQuantityChange = (productId, quantidade) => {
    setSelectedProducts(
      selectedProducts.map((p) =>
        p.produtoId === productId ? { ...p, quantidade: Number(quantidade) } : p
      )
    )
  }

  const totalItems = selectedProducts.reduce(
    (acc, item) => acc + item.quantidade,
    0
  )
  const totalPriceWithoutDiscount = selectedProducts.reduce((acc, item) => {
    const product = products.find((p) => p.id_produto === item.produtoId)
    const price =
      clientType === 'Distribuidor'
        ? product?.preco_distribuidor
        : product?.preco_lojista
    return acc + item.quantidade * (Number(price) || 0)
  }, 0)

  const totalPrice =
    totalPriceWithoutDiscount - Number(discount) > 0
      ? totalPriceWithoutDiscount - Number(discount)
      : 0

  const handleFinalizeSale = () => {
    const data = {
      clienteId: selectedClient,
      tipo_cliente: clientType,
      desconto: parseFloat(discount) || 0,
      motivo_desconto: discountReason,
      status_pedido: 'Pendente',
      produtos: selectedProducts.map(({ produtoId, quantidade }) => ({
        produtoId,
        quantidade,
      })),
    }

    apiRafaRolamentos
      .post('/saida', data)
      .then(() => {
        toast.success('Venda finalizada com sucesso!')
        navigate('/vendas')
      })
      .catch(() => toast.error('Erro ao finalizar venda'))
  }

  return (
    <Container>
      <h2>Criar Venda</h2>
      <Select
        label="Cliente"
        displayEmpty
        fullWidth
        value={selectedClient}
        onChange={(e) => setSelectedClient(e.target.value)}
      >
        <MenuItem value="" disabled>
          Selecione um Cliente
        </MenuItem>
        {clients.map((client) => (
          <MenuItem key={client.id_cliente} value={client.id_cliente}>
            {client.nome}
          </MenuItem>
        ))}
      </Select>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/clientes')}
      >
        + Novo Cliente
      </Button>
      <Select
        fullWidth
        value={clientType}
        onChange={(e) => setClientType(e.target.value)}
      >
        <MenuItem value="Distribuidor">Distribuidor</MenuItem>
        <MenuItem value="Lojista">Lojista</MenuItem>
      </Select>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setIsDiscountModalOpen(true)}
      >
        Inserir Desconto
      </Button>
      <TotalField>Valor Total: R$ {totalPrice.toFixed(2)}</TotalField>
      <TextField
        fullWidth
        label="Buscar Produto"
        value={searchProduct}
        onChange={(e) => setSearchProduct(e.target.value)}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Selecionar</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Quantidade</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products
              .filter((p) =>
                p.descricao_produto
                  .toLowerCase()
                  .includes(searchProduct.toLowerCase())
              )
              .map((product) => (
                <TableRow key={product.id_produto}>
                  <TableCell>
                    <Checkbox
                      onChange={() => handleProductSelect(product.id_produto)}
                    />
                  </TableCell>
                  <TableCell>{product.descricao_produto}</TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      disabled={
                        !selectedProducts.some(
                          (p) => p.produtoId === product.id_produto
                        )
                      }
                      onChange={(e) =>
                        handleQuantityChange(product.id_produto, e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    R${' '}
                    {(clientType === 'Distribuidor'
                      ? Number(product.preco_distribuidor)
                      : Number(product.preco_lojista)
                    ).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    R${' '}
                    {selectedProducts.find(
                      (p) => p.produtoId === product.id_produto
                    )?.quantidade *
                      (clientType === 'Distribuidor'
                        ? product.preco_distribuidor
                        : product.preco_lojista) || 0}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TotalField>Total de Itens: {totalItems}</TotalField>
      <Button variant="contained" color="success" onClick={handleFinalizeSale}>
        Finalizar Venda
      </Button>
      {isDiscountModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              background: 'white',
              padding: '20px',
              borderRadius: '10px',
              width: '400px',
              textAlign: 'center',
            }}
          >
            <div>
              <h3>Inserir Desconto</h3>
              <TextField
                label="Valor do Desconto"
                type="number"
                fullWidth
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
              <TextField
                label="Motivo do Desconto"
                fullWidth
                value={discountReason}
                onChange={(e) => setDiscountReason(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => setIsDiscountModalOpen(false)}
              >
                Confirmar Desconto
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setIsDiscountModalOpen(false)}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}
      <TotalField>Desconto: R$ {discount}</TotalField>
      <TotalField>Motivo: {discountReason}</TotalField>
      <Button variant="contained" color="success" onClick={handleFinalizeSale}>
        Finalizar Venda
      </Button>
    </Container>
  )
}
