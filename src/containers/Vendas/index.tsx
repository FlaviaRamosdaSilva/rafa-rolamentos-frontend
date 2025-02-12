import EditIcon from '@mui/icons-material/Edit'
import {
  Button,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import apiRafaRolamentos from '../../service/api'
import {
  Container,
  FieldContainer,
  SearchContainer,
  StyledButton,
  StyledTextField,
} from './style'

// Definição da interface para as vendas
interface Sale {
  id_pedido: string
  clienteId: string
  status_pedido: string
  preco_final: number
  quantidade_total_produtos: number
  tipo_cliente: string
  createdAt: string
}

// Definição da interface para os clientes
interface Client {
  id_cliente: string
  nome: string
}

export function Vendas() {
  const navigate = useNavigate()
  const [sales, setSales] = useState<Sale[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [searchClient, setSearchClient] = useState<string>('')
  const [searchStatus, setSearchStatus] = useState<string>('')
  const [isStatusModalOpen, setIsStatusModalOpen] = useState<boolean>(false)
  const [selectedSaleId, setSelectedSaleId] = useState<number | null>(null)
  const [newStatus, setNewStatus] = useState<string>('')
  const [searchClientType, setSearchClientType] = useState<string>('')

  useEffect(() => {
    fetchSales()

    apiRafaRolamentos
      .get('/cliente')
      .then((response) => setClients(response.data))
      .catch((error) => console.error('Erro ao buscar clientes:', error))
  }, [])

  const fetchSales = () => {
    apiRafaRolamentos
      .get('/saida')
      .then((response) => {
        const sortedSales = response.data.sort(
          (a: Sale, b: Sale) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        setSales(sortedSales)
      })
      .catch((error) => console.error('Erro ao buscar vendas:', error))
  }

  const handleEditSale = (id: string) => {
    navigate(`/vendas/${id}`)
  }

  const handleOpenStatusModal = (id: any) => {
    setSelectedSaleId(id)
    setIsStatusModalOpen(true)
  }

  const handleUpdateStatus = () => {
    if (selectedSaleId === null) return

    apiRafaRolamentos
      .patch(`/saida/${selectedSaleId}`, { status_pedido: newStatus })
      .then(() => {
        toast.success('Status atualizado com sucesso!')
        setIsStatusModalOpen(false)
        fetchSales() // Atualiza a lista de vendas
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.message || 'Erro ao atualizar status'
        toast.error(errorMessage)
        setIsStatusModalOpen(false)
        navigate('/vendas')
      })
  }

  const vendasFiltradas = sales.filter((sale) => {
    const cliente =
      clients.find((client) => client.id_cliente === sale.clienteId)?.nome || ''
    const clienteMatch = cliente
      .toLowerCase()
      .includes(searchClient.toLowerCase())
    const statusMatch = searchStatus
      ? sale.status_pedido === searchStatus
      : true
    const clientTypeMatch = searchClientType
      ? sale.tipo_cliente.toLowerCase() === searchClientType
      : true
    return clienteMatch && statusMatch && clientTypeMatch
  })

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Lista de Vendas
      </Typography>
      <SearchContainer>
        <StyledTextField
          label="Buscar Cliente"
          value={searchClient}
          onChange={(e) => setSearchClient(e.target.value)}
        />
        <FieldContainer>
          <Select
            value={searchStatus}
            onChange={(e) => setSearchStatus(e.target.value)}
            displayEmpty
          >
            <MenuItem value="">Todos os Status</MenuItem>
            <MenuItem value="Pendente">Pendente</MenuItem>
            <MenuItem value="Aprovado">Aprovado</MenuItem>
            <MenuItem value="Pedido em separação">Pedido em separação</MenuItem>
            <MenuItem value="Entregue, Aguardando Pagamento">
              Entregue, Aguardando Pagamento
            </MenuItem>
            <MenuItem value="Pedido Finalizado e Pago">
              Pedido Finalizado e Pago
            </MenuItem>
            <MenuItem value="Cancelado">Cancelado</MenuItem>
          </Select>
          <Select
            value={searchClientType}
            onChange={(e) => setSearchClientType(e.target.value)}
            displayEmpty
          >
            <MenuItem value="">Todos os Tipos</MenuItem>
            <MenuItem value="lojista">Lojista</MenuItem>
            <MenuItem value="distribuidor">Distribuidor</MenuItem>
          </Select>
        </FieldContainer>
        <StyledButton
          variant="contained"
          color="primary"
          onClick={() => navigate('/vendas/nova')}
        >
          Nova Venda
        </StyledButton>
      </SearchContainer>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ações</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Total da Venda</TableCell>
              <TableCell>Quantidade</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Alterar Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vendasFiltradas.length > 0 ? (
              vendasFiltradas.map((sale) => (
                <TableRow key={sale.id_pedido}>
                  <TableCell>
                    <IconButton onClick={() => handleEditSale(sale.id_pedido)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>{sale.status_pedido}</TableCell>
                  <TableCell>
                    {clients.find(
                      (client) => client.id_cliente === sale.clienteId
                    )?.nome || 'Desconhecido'}
                  </TableCell>
                  <TableCell>
                    R${' '}
                    {Number(sale.preco_final)
                      ? Number(sale.preco_final).toFixed(2)
                      : '0.00'}
                  </TableCell>
                  <TableCell>{sale.quantidade_total_produtos}</TableCell>
                  <TableCell>{sale.tipo_cliente}</TableCell>
                  <TableCell>
                    {new Date(sale.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <StyledButton
                      variant="contained"
                      color="secondary"
                      onClick={() => handleOpenStatusModal(sale.id_pedido)}
                    >
                      Alterar Status
                    </StyledButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  Nenhuma venda encontrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {isStatusModalOpen && (
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
              <h3>Alterar Status</h3>
              <Select
                fullWidth
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <MenuItem value="Pendente">Pendente</MenuItem>
                <MenuItem value="Aprovado">Aprovado</MenuItem>
                <MenuItem value="Pedido em separação">
                  Pedido em separação
                </MenuItem>
                <MenuItem value="Entregue, Aguardando Pagamento">
                  Entregue, Aguardando Pagamento
                </MenuItem>
                <MenuItem value="Pedido Finalizado e Pago">
                  Pedido Finalizado e Pago
                </MenuItem>
                <MenuItem value="Cancelado">Cancelado</MenuItem>
              </Select>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdateStatus}
              >
                Alterar Status
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setIsStatusModalOpen(false)}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}
    </Container>
  )
}
