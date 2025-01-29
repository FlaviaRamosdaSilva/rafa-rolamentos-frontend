import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material'
import {
  Box,
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
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import apiRafaRolamentos from '../../service/api'
import {
  ActionContainer,
  Container,
  StyledButton,
  StyledTextField,
} from './style'

export function Estoque() {
  const [produtos, setProdutos] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false)
  const [selectedProduto, setSelectedProduto] = useState(null)

  const navigate = useNavigate()

  const fetchProdutos = async () => {
    try {
      const response = await apiRafaRolamentos.get('/produto')
      setProdutos(response.data)
      setLoading(false)
    } catch (err) {
      toast.error('Erro ao buscar produtos')
      setLoading(false)
    }
  }

  const handleSearch = (e) => setSearch(e.target.value)

  const handleEdit = async (id_produto) => {
    try {
      const response = await apiRafaRolamentos.get(`/produto/${id_produto}`)
      setSelectedProduto(response.data)
      setModalOpen(true)
    } catch (err) {
      toast.error('Erro ao buscar produto')
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      await apiRafaRolamentos.put(`/produto/${selectedProduto.id_produto}`, {
        codigo_produto: selectedProduto.codigo_produto,
        descricao_produto: selectedProduto.descricao_produto,
        fabricante: selectedProduto.fabricante,
        quantidade_total: selectedProduto.quantidade_total,
        quantidade_minima: selectedProduto.quantidade_minima,
      })
      toast.success('Produto atualizado com sucesso')
      fetchProdutos()
      setModalOpen(false)
    } catch (err) {
      toast.error('Erro ao atualizar produto')
    }
  }

  const handleDelete = async () => {
    try {
      await apiRafaRolamentos.delete(`/produto/${selectedProduto.id_produto}`)
      toast.success('Produto excluído com sucesso')
      fetchProdutos()
      setModalDeleteOpen(false)
    } catch (err) {
      toast.error('Erro ao excluir produto')
    }
  }

  useEffect(() => {
    fetchProdutos()
  }, [])

  const filteredProdutos = produtos
    .filter((produto) =>
      produto.descricao_produto.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => a.descricao_produto.localeCompare(b.descricao_produto))

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Estoque de Produtos
      </Typography>
      <ActionContainer>
        <StyledTextField
          label="Pesquisar Produto"
          variant="outlined"
          value={search}
          onChange={handleSearch}
        />
        <StyledButton variant="contained" onClick={() => navigate('/Produtos')}>
          Criar Produto
        </StyledButton>
      </ActionContainer>
      {loading ? (
        <Typography variant="h6" align="center">
          Carregando...
        </Typography>
      ) : (
        <TableContainer
          component={Paper}
          style={{ maxWidth: '1000px', margin: '0 auto' }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Código</TableCell>
                <TableCell>Descrição</TableCell>
                <TableCell>Fabricante</TableCell>
                <TableCell>Qtd Total</TableCell>
                <TableCell>Qtd Mínima</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProdutos.map((produto) => (
                <TableRow key={produto.id_produto}>
                  <TableCell>{produto.codigo_produto}</TableCell>
                  <TableCell>{produto.descricao_produto}</TableCell>
                  <TableCell>{produto.fabricante}</TableCell>
                  <TableCell>{produto.quantidade_total}</TableCell>
                  <TableCell>{produto.quantidade_minima}</TableCell>
                  <TableCell align="center">
                    <Button onClick={() => handleEdit(produto.id_produto)}>
                      <EditIcon />
                    </Button>
                    <Button
                      onClick={() => {
                        setSelectedProduto(produto)
                        setModalDeleteOpen(true)
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Modal para Editar Produto */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'white',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            maxWidth: '400px',
            width: '100%',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Editar Produto
          </Typography>
          {selectedProduto && (
            <form onSubmit={handleUpdate}>
              <TextField
                label="Descrição"
                defaultValue={selectedProduto.descricao_produto}
                fullWidth
                margin="normal"
                onChange={(e) =>
                  setSelectedProduto({
                    ...selectedProduto,
                    descricao_produto: e.target.value,
                  })
                }
              />
              <TextField
                label="Fabricante"
                defaultValue={selectedProduto.fabricante}
                fullWidth
                margin="normal"
                onChange={(e) =>
                  setSelectedProduto({
                    ...selectedProduto,
                    fabricante: e.target.value,
                  })
                }
              />
              <TextField
                label="Quantidade Total"
                defaultValue={selectedProduto.quantidade_total}
                fullWidth
                margin="normal"
                onChange={(e) =>
                  setSelectedProduto({
                    ...selectedProduto,
                    quantidade_total: e.target.value,
                  })
                }
              />
              <TextField
                label="Quantidade Mínima"
                defaultValue={selectedProduto.quantidade_minima}
                fullWidth
                margin="normal"
                onChange={(e) =>
                  setSelectedProduto({
                    ...selectedProduto,
                    quantidade_minima: e.target.value,
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
        </Box>
      </Modal>

      {/* Modal para Confirmar Exclusão */}
      <Modal open={modalDeleteOpen} onClose={() => setModalDeleteOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'white',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            maxWidth: '400px',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Tem certeza que deseja excluir este produto?
          </Typography>
          <Box display="flex" justifyContent="center" gap="10px" mt={2}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setModalDeleteOpen(false)}
            >
              Cancelar
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Excluir
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  )
}
