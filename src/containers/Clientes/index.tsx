import { Edit as EditIcon } from '@mui/icons-material'
import {
  Button,
  Modal,
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
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import apiRafaRolamentos from '../../service/api'
import {
  ActionContainer,
  Container,
  ModalContainer,
  StyledButton,
  StyledTextField,
} from './style'

// Definição da interface para Cliente
interface Cliente {
  id_cliente: string
  nome: string
  email: string
  telefone: string
}

export function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [, setError] = useState<string | null>(null)
  const [search, setSearch] = useState<string>('')
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [modalCreateOpen, setModalCreateOpen] = useState<boolean>(false)
  const [newCliente, setNewCliente] = useState<Cliente>({
    id_cliente: '',
    nome: '',
    email: '',
    telefone: '',
  })
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null)

  const fetchClientes = async () => {
    try {
      const response = await apiRafaRolamentos.get<Cliente[]>('/cliente')
      setClientes(response.data)
      setLoading(false)
    } catch (err) {
      setError('Erro ao buscar clientes')
      toast.error('Erro ao buscar clientes')
      setLoading(false)
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value)

  const handleEdit = async (id: string) => {
    try {
      const response = await apiRafaRolamentos.get<Cliente>(`/cliente/${id}`)
      setSelectedCliente(response.data)
      setModalOpen(true)
    } catch (err) {
      console.error('Erro ao buscar cliente:', err)
      toast.error('Erro ao buscar cliente')
    }
  }

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedCliente) return

    try {
      await apiRafaRolamentos.put(`/cliente/${selectedCliente.id_cliente}`, {
        nome: selectedCliente.nome,
        email: selectedCliente.email,
        telefone: selectedCliente.telefone,
      })
      toast.success('Cliente atualizado com sucesso')
      fetchClientes()
      setModalOpen(false)
    } catch (err) {
      console.error('Erro ao atualizar cliente:', err)
      toast.error('Erro ao atualizar cliente')
    }
  }

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const userData = localStorage.getItem('rafaRolamentos:userData')
      const userId = userData ? JSON.parse(userData).id : null

      if (!userId) {
        console.error('Erro: userId não encontrado no localStorage')
        toast.error('Erro: userId não encontrado no localStorage')
        return
      }

      await apiRafaRolamentos.post('/cliente', { ...newCliente, userId })
      toast.success('Cliente criado com sucesso')
      fetchClientes()
      setModalCreateOpen(false)
      setNewCliente({ id_cliente: '', nome: '', email: '', telefone: '' })
    } catch (err) {
      console.error('Erro ao criar cliente:', err)
      toast.error('Erro ao criar cliente')
    }
  }

  useEffect(() => {
    fetchClientes()
  }, [])

  const filteredClientes = clientes
    .filter((cliente) =>
      cliente.nome.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => a.nome.localeCompare(b.nome))

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Lista de Clientes
      </Typography>
      <ActionContainer>
        <StyledTextField
          label="Pesquisar Cliente"
          variant="outlined"
          value={search}
          onChange={handleSearch}
        />
        <StyledButton
          variant="contained"
          onClick={() => setModalCreateOpen(true)}
        >
          Criar Cliente
        </StyledButton>
      </ActionContainer>
      {loading ? (
        <Typography variant="h6" align="center">
          Carregando...
        </Typography>
      ) : (
        <TableContainer
          component={Paper}
          style={{ maxWidth: '800px', margin: '0 auto' }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Telefone</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredClientes.map((cliente) => (
                <TableRow key={cliente.id_cliente}>
                  <TableCell>{cliente.nome}</TableCell>
                  <TableCell>{cliente.email}</TableCell>
                  <TableCell>{cliente.telefone}</TableCell>
                  <TableCell align="center">
                    <Button onClick={() => handleEdit(cliente.id_cliente)}>
                      <EditIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Modal para Editar Cliente */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <ModalContainer>
          <Typography variant="h6" gutterBottom>
            Editar Cliente
          </Typography>
          {selectedCliente && (
            <form onSubmit={handleUpdate}>
              <TextField
                label="Nome"
                defaultValue={selectedCliente.nome}
                fullWidth
                margin="normal"
                onChange={(e) =>
                  setSelectedCliente({
                    ...selectedCliente,
                    nome: e.target.value,
                  })
                }
              />
              <TextField
                label="Email"
                defaultValue={selectedCliente.email}
                fullWidth
                margin="normal"
                onChange={(e) =>
                  setSelectedCliente({
                    ...selectedCliente,
                    email: e.target.value,
                  })
                }
              />
              <TextField
                label="Telefone"
                defaultValue={selectedCliente.telefone}
                fullWidth
                margin="normal"
                onChange={(e) =>
                  setSelectedCliente({
                    ...selectedCliente,
                    telefone: e.target.value,
                  })
                }
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: '10px' }}
              >
                Salvar Alterações
              </Button>
            </form>
          )}
        </ModalContainer>
      </Modal>

      {/* Modal para Criar Cliente */}
      <Modal open={modalCreateOpen} onClose={() => setModalCreateOpen(false)}>
        <ModalContainer>
          <Typography variant="h6" gutterBottom>
            Criar Cliente
          </Typography>
          <form onSubmit={handleCreate}>
            <TextField
              label="Nome"
              value={newCliente.nome}
              fullWidth
              margin="normal"
              onChange={(e) =>
                setNewCliente({ ...newCliente, nome: e.target.value })
              }
            />
            <TextField
              label="Email"
              value={newCliente.email}
              fullWidth
              margin="normal"
              onChange={(e) =>
                setNewCliente({ ...newCliente, email: e.target.value })
              }
            />
            <TextField
              label="Telefone"
              value={newCliente.telefone}
              fullWidth
              margin="normal"
              onChange={(e) =>
                setNewCliente({ ...newCliente, telefone: e.target.value })
              }
            />
            <StyledButton
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: '10px' }}
            >
              Salvar
            </StyledButton>
          </form>
        </ModalContainer>
      </Modal>
    </Container>
  )
}
