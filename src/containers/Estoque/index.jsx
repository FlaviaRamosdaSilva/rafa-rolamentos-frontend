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
  StyledTableRow,
  StyledTextField,
} from './style'

export function Estoque() {
  const [produtos, setProdutos] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
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

  // Redirecionar para a página de edição do produto
  const handleEdit = (id_produto) => {
    navigate(`/editar-produto/${id_produto}`)
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
                <StyledTableRow
                  key={produto.id_produto}
                  // Se a quantidade mínima for menor que a quantidade total, marca lowStock como true
                  lowStock={
                    produto.quantidade_minima > produto.quantidade_total
                  }
                >
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
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

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
