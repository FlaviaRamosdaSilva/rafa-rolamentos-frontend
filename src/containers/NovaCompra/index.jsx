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
  TextField,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import * as Modal from 'react-modal'
import { toast } from 'react-toastify'
import apiRafaRolamentos from '../../service/api'
import {
  Container,
  customModalStyles,
  InputContainer,
  StyledButton,
  TotalField,
} from './style'

Modal.setAppElement('#root')
export function NovaCompra() {
  const [fornecedor, setFornecedor] = useState('')
  const [itens, setItens] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [produtos, setProdutos] = useState([])
  const [currentItem, setCurrentItem] = useState({
    produtoId: '',
    quantidade: '',
    custo: '',
  })
  const [editIndex, setEditIndex] = useState(null)

  const handleAddItem = () => {
    // Verifica se o produto já existe na lista de itens
    const itemExistente = itens.find(
      (item) => item.produtoId === currentItem.produtoId
    )

    if (itemExistente) {
      toast.warning('Item já consta na lista, edite a quantidade')
      // Zera os dados do modal
      setCurrentItem({ produtoId: '', quantidade: '', custo: '' })
      return
    }

    // Se não existir, adiciona o item normalmente
    setItens([
      ...itens,
      {
        ...currentItem,
        descricao_produto: getProdutoDescricao(currentItem.produtoId),
      },
    ])
    setCurrentItem({ produtoId: '', quantidade: '', custo: '' })
    setIsModalOpen(false)
  }

  const handleEditItem = () => {
    const updatedItens = [...itens]
    updatedItens[editIndex] = {
      ...currentItem,
      descricao_produto: getProdutoDescricao(currentItem.produtoId),
    }
    setItens(updatedItens)
    setIsEditModalOpen(false)
  }
  const handleFinalizarCompra = () => {
    const data = {
      fornecedor,
      itens: itens.map(({ produtoId, quantidade, custo }) => ({
        produtoId,
        quantidade: parseInt(quantidade, 10),
        custo: parseFloat(custo.replace(',', '.')),
      })),
    }

    apiRafaRolamentos
      .post('/entrada', data)
      .then((res) => {
        toast.success('Compra finalizada com sucesso!')
        setFornecedor('')
        setItens([])
        setTimeout(() => {
          window.location.href = '/compras'
        }, 1000)
      })
      .catch((error) => toast.error('Erro ao finalizar compra!'))
  }

  const totalCompra = itens.reduce(
    (acc, item) =>
      acc + item.quantidade * parseFloat(item.custo.replace(',', '.')),
    0
  )

  console.log(produtos)

  useEffect(() => {
    apiRafaRolamentos
      .get('/produto')
      .then((response) => {
        console.log('Produtos carregados:', response.data)
        setProdutos(response.data)
      })
      .catch((error) => console.error('Erro ao buscar produtos:', error))
  }, [])

  const getProdutoDescricao = (produtoId) => {
    const produto = produtos.find((p) => p.id_produto === produtoId)
    return produto ? produto.descricao_produto : ''
  }

  return (
    <Container>
      <h2>Criar Compra</h2>
      <InputContainer>
        <TextField
          label="Fornecedor"
          value={fornecedor}
          onChange={(e) => setFornecedor(e.target.value)}
          fullWidth
        />
        <TotalField>Total da Compra: R$ {totalCompra.toFixed(2)}</TotalField>
        <TotalField>Status do Pedido: Iniciado</TotalField>
      </InputContainer>
      <StyledButton
        variant="contained"
        color="primary"
        onClick={() => setIsModalOpen(true)}
      >
        + Item
      </StyledButton>
      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ações</TableCell>
              <TableCell>Produto</TableCell>
              <TableCell>Quantidade</TableCell>
              <TableCell>Custo (R$)</TableCell>
              <TableCell>Total do Item</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {itens.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      setEditIndex(index)
                      setCurrentItem(item)
                      setIsEditModalOpen(true)
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell value={item.produtoId}>
                  {item.descricao_produto}
                </TableCell>
                <TableCell>{item.quantidade}</TableCell>
                <TableCell>{parseFloat(item.custo).toFixed(2)}</TableCell>
                <TableCell>
                  {(
                    item.quantidade * parseFloat(item.custo.replace(',', '.'))
                  ).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <StyledButton
        variant="contained"
        color="success"
        style={{ marginTop: 20 }}
        onClick={handleFinalizarCompra}
      >
        Finalizar Compra
      </StyledButton>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={customModalStyles}
      >
        <h3>Adicionar Item</h3>
        <Select
          fullWidth
          value={currentItem.produtoId}
          onChange={(e) =>
            setCurrentItem({ ...currentItem, produtoId: e.target.value })
          }
        >
          {produtos.map((produto) => (
            <MenuItem key={produto.id_produto} value={produto.id_produto}>
              {produto.descricao_produto}
            </MenuItem>
          ))}
        </Select>
        <TextField
          label="Quantidade"
          type="number"
          fullWidth
          value={currentItem.quantidade}
          onChange={(e) =>
            setCurrentItem({ ...currentItem, quantidade: e.target.value })
          }
        />
        <TextField
          label="Custo (R$)"
          fullWidth
          value={currentItem.custo}
          onChange={(e) =>
            setCurrentItem({
              ...currentItem,
              custo: e.target.value.replace(',', '.'),
            })
          }
        />
        <TotalField>
          Total do Item: R${' '}
          {(
            currentItem.quantidade * parseFloat(currentItem.custo || 0)
          ).toFixed(2)}
        </TotalField>
        <Button onClick={handleAddItem} variant="contained" color="primary">
          Adicionar
        </Button>
      </Modal>
      {/* Modal de editar item */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        style={customModalStyles}
      >
        <h3>Editar Item</h3>
        <TextField
          label="Quantidade"
          type="number"
          fullWidth
          value={currentItem.quantidade}
          onChange={(e) =>
            setCurrentItem({ ...currentItem, quantidade: e.target.value })
          }
        />
        <TextField
          label="Custo (R$)"
          fullWidth
          value={currentItem.custo}
          onChange={(e) =>
            setCurrentItem({
              ...currentItem,
              custo: e.target.value.replace(',', '.'),
            })
          }
        />
        <TotalField>
          Total do Item: R${' '}
          {(
            currentItem.quantidade * parseFloat(currentItem.custo || 0)
          ).toFixed(2)}
        </TotalField>
        <Button onClick={handleEditItem} variant="contained" color="primary">
          Salvar
        </Button>
      </Modal>
    </Container>
  )
}
