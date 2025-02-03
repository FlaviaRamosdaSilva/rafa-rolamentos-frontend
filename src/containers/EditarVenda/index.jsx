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
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import apiRafaRolamentos from '../../service/api'
import { Container, StyledButton, TotalField } from './styles'

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
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false)
  const [searchProduct, setSearchProduct] = useState('')
  const [modalDiscount, setModalDiscount] = useState(discount)
  const [modalDiscountReason, setModalDiscountReason] = useState(discountReason)

  // Carrega dados da venda, clientes e produtos juntos
  useEffect(() => {
    Promise.all([
      apiRafaRolamentos.get(`/saida/${id}`),
      apiRafaRolamentos.get('/cliente'),
      apiRafaRolamentos.get('/produto'),
    ])
      .then(([saleResponse, clientsResponse, productsResponse]) => {
        const saleData = saleResponse.data
        setSelectedClient(saleData.clienteId)
        setClientType(saleData.tipo_cliente)
        setSelectedProducts(saleData.produtos)
        setDiscount(saleData.desconto)
        setDiscountReason(saleData.motivo_desconto)
        setClients(clientsResponse.data)
        setProducts(productsResponse.data)
      })
      .catch((error) => {
        console.error('Erro ao buscar dados:', error)
        toast.error('Erro ao carregar os dados')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [id])

  // Atualiza a quantidade de um produto selecionado
  const handleQuantityChange = (productId, quantidade) => {
    const updatedProducts = selectedProducts.map((p) =>
      p.produtoId === productId ? { ...p, quantidade: Number(quantidade) } : p
    )
    setSelectedProducts(updatedProducts)
  }

  // Cálculo do total de itens (somente a quantidade)
  const totalItems = selectedProducts.reduce(
    (acc, item) => acc + item.quantidade,
    0
  )

  // Cálculo do preço total sem desconto
  const totalPriceWithoutDiscount = selectedProducts.reduce((acc, item) => {
    const product = products.find((p) => p.id_produto === item.produtoId)
    // Define o preço de acordo com o tipo de cliente
    const price =
      clientType.toLowerCase() === 'distribuidor'
        ? Number(product?.preco_distribuidor)
        : Number(product?.preco_lojista)
    return acc + item.quantidade * (price || 0)
  }, 0)

  // Cálculo do total da venda (valor final, apenas para exibição no frontend)
  const totalSale =
    totalPriceWithoutDiscount - Number(discount) > 0
      ? totalPriceWithoutDiscount - Number(discount)
      : 0

  // Função para atualizar a venda
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

  const openDiscountModal = () => {
    setModalDiscount(discount)
    setModalDiscountReason(discountReason)
    setIsDiscountModalOpen(true)
  }

  // Função para selecionar/deselecionar um produto (caso queira permitir alteração de produtos)
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
      <h3>Cliente</h3>
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
      <h3>Tipo de Cliente</h3>
      <Select
        fullWidth
        value={clientType}
        onChange={(e) => setClientType(e.target.value)}
      >
        <MenuItem value="distribuidor">Distribuidor</MenuItem>
        <MenuItem value="lojista">Lojista</MenuItem>
      </Select>
      <StyledButton
        variant="contained"
        color="secondary"
        onClick={openDiscountModal}
      >
        Inserir Desconto
      </StyledButton>
      <TotalField>Desconto: R$ {Number(discount).toFixed(2)}</TotalField>
      <TotalField>Motivo: {discountReason}</TotalField>
      <TextField
        fullWidth
        label="Buscar Produto"
        value={searchProduct}
        onChange={(e) => setSearchProduct(e.target.value)}
        style={{ marginTop: 20 }}
      />
      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Selecionar</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Quantidade</TableCell>
              <TableCell>Preço do Item</TableCell>
              <TableCell>Total do Item</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products
              .filter((p) =>
                p.descricao_produto
                  .toLowerCase()
                  .includes(searchProduct.toLowerCase())
              )
              .map((product) => {
                const selected = selectedProducts.find(
                  (p) => p.produtoId === product.id_produto
                )
                // Define o preço de acordo com o tipo de cliente
                const price =
                  clientType.toLowerCase() === 'distribuidor'
                    ? Number(product.preco_distribuidor)
                    : Number(product.preco_lojista)
                return (
                  <TableRow key={product.id_produto}>
                    <TableCell>
                      <Checkbox
                        checked={!!selected}
                        onChange={() => handleProductSelect(product.id_produto)}
                      />
                    </TableCell>
                    <TableCell>{product.descricao_produto}</TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        disabled={!selected}
                        value={selected ? selected.quantidade : ''}
                        onChange={(e) =>
                          handleQuantityChange(
                            product.id_produto,
                            e.target.value
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>R$ {price.toFixed(2)}</TableCell>
                    <TableCell>
                      R${' '}
                      {selected
                        ? (selected.quantidade * price).toFixed(2)
                        : '0.00'}
                    </TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TotalField>Total de Itens: {totalItems}</TotalField>
      <TotalField>Valor Total da Venda: R$ {totalSale.toFixed(2)}</TotalField>
      <StyledButton
        variant="contained"
        color="success"
        onClick={handleUpdateSale}
        style={{ marginTop: 20 }}
      >
        Alterar Venda
      </StyledButton>

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
            <h3>Inserir Desconto</h3>
            <TextField
              label="Valor do Desconto"
              type="number"
              fullWidth
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              style={{ marginBottom: 10 }}
            />
            <TextField
              label="Motivo do Desconto"
              fullWidth
              value={discountReason}
              onChange={(e) => setDiscountReason(e.target.value)}
              style={{ marginBottom: 10 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                // Atualiza os estados principais com os valores do modal
                setDiscount(modalDiscount)
                setDiscountReason(modalDiscountReason)
                setIsDiscountModalOpen(false)
              }}
              style={{ marginRight: 10 }}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                // Fecha o modal sem alterar os estados principais
                setIsDiscountModalOpen(false)
              }}
            >
              Confirmar Desconto
            </Button>
          </div>
        </div>
      )}
    </Container>
  )
}
