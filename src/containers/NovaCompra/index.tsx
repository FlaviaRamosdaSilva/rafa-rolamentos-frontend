import DeleteIcon from '@mui/icons-material/Delete'
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
import { useEffect, useState } from 'react'
import ReactModal, { setAppElement } from 'react-modal'
import { toast } from 'react-toastify'
import apiRafaRolamentos from '../../service/api'
import {
  Container,
  customModalStyles,
  InputContainer,
  StyledButton,
  TotalField,
} from './style'

setAppElement('#root')

interface Produto {
  id_produto: string
  descricao_produto: string
}

interface Item {
  produtoId: string
  quantidade: number
  custo: string
  descricao_produto?: string
}

export function NovaCompra() {
  const [fornecedor, setFornecedor] = useState<string>('')
  const [itens, setItens] = useState<Item[]>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [currentItem, setCurrentItem] = useState<Item>({
    produtoId: '',
    quantidade: 0,
    custo: '',
  })
  const [editIndex, setEditIndex] = useState<number | null>(null)

  const handleAddItem = () => {
    const itemExistente = itens.find(
      (item) => item.produtoId === currentItem.produtoId
    )

    if (itemExistente) {
      toast.warning('Item já consta na lista, edite a quantidade')
      setCurrentItem({ produtoId: '', quantidade: 0, custo: '' })
      return
    }

    setItens([
      ...itens,
      {
        ...currentItem,
        descricao_produto: getProdutoDescricao(currentItem.produtoId),
      },
    ])
    setCurrentItem({ produtoId: '', quantidade: 0, custo: '' })
    setIsModalOpen(false)
  }

  const handleEditItem = () => {
    if (editIndex === null) return
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
        quantidade,
        custo: parseFloat(custo.replace(',', '.')),
      })),
    }

    apiRafaRolamentos
      .post('/entrada', data)
      .then(() => {
        toast.success('Compra finalizada com sucesso!')
        setFornecedor('')
        setItens([])
        setTimeout(() => {
          window.location.href = '/compras'
        }, 1000)
      })
      .catch(() => toast.error('Erro ao finalizar compra!'))
  }

  const totalCompra = itens.reduce(
    (acc, item) =>
      acc + Number(item.quantidade) * parseFloat(item.custo.replace(',', '.')),
    0
  )

  useEffect(() => {
    apiRafaRolamentos
      .get('/produto')
      .then((response) => setProdutos(response.data))
      .catch((error) => console.error('Erro ao buscar produtos:', error))
  }, [])

  const getProdutoDescricao = (produtoId: string) => {
    const produto = produtos.find((p) => p.id_produto === produtoId)
    return produto ? produto.descricao_produto : ''
  }

  const isAddButtonDisabled =
    !currentItem.produtoId || currentItem.quantidade <= 0 || !currentItem.custo

  const handleDeleteItem = (index: number) => {
    const updatedItens = itens.filter((_, i) => i !== index)
    setItens(updatedItens)
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
        onClick={() => {
          setCurrentItem({ produtoId: '', quantidade: 0, custo: '' })
          setIsModalOpen(true)
        }}
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
                <TableCell data-value={item.produtoId}>
                  {item.descricao_produto}
                </TableCell>
                <TableCell>{item.quantidade}</TableCell>
                <TableCell>{parseFloat(item.custo).toFixed(2)}</TableCell>
                <TableCell>
                  {(
                    item.quantidade * parseFloat(item.custo.replace(',', '.'))
                  ).toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => handleDeleteItem(index)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
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
      <ReactModal
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
            setCurrentItem({
              ...currentItem,
              quantidade: Number(e.target.value),
            })
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
            currentItem.quantidade * parseFloat(currentItem.custo || '0')
          ).toFixed(2)}
        </TotalField>
        <Button
          onClick={handleAddItem}
          variant="contained"
          color="primary"
          disabled={isAddButtonDisabled}
        >
          Adicionar
        </Button>
      </ReactModal>
      {/* Modal de editar item */}
      <ReactModal
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
            setCurrentItem({
              ...currentItem,
              quantidade: Number(e.target.value),
            })
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
            currentItem.quantidade * parseFloat(currentItem.custo || '0')
          ).toFixed(2)}
        </TotalField>
        <Button
          onClick={handleEditItem}
          variant="contained"
          color="primary"
          disabled={isAddButtonDisabled}
        >
          Salvar
        </Button>
      </ReactModal>
    </Container>
  )
}
