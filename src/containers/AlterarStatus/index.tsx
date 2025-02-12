import { MenuItem, Select } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import apiRafaRolamentos from '../../service/api'
import {
  ButtonsContainer,
  Container,
  ContainerStatus,
  DetailsField,
  StyledButton,
} from './style'

// Definição dos tipos para os dados da compra
interface Item {
  Produto: {
    descricao_produto: string
  }
  quantidade: number
  custo: number
  total_item: number
}

interface Purchase {
  fornecedor: string
  valor_total_compra: number
  status_compra: string
  itens: Item[]
}

export function AlterarStatus() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [purchase, setPurchase] = useState<Purchase | null>(null)
  const [status, setStatus] = useState<string>('')

  useEffect(() => {
    apiRafaRolamentos
      .get<Purchase>(`/entrada/${id}`)
      .then((response) => {
        setPurchase(response.data)
        setStatus(response.data.status_compra)
      })
      .catch((error) => {
        toast.error('Erro ao carregar os detalhes da compra')
        console.error('Erro ao buscar detalhes da compra:', error)
      })
  }, [id])

  const handleUpdateStatus = () => {
    apiRafaRolamentos
      .patch(`/entrada/${id}`, { status_compra: status })
      .then(() => {
        toast.success('Status atualizado com sucesso!')
      })
      .catch(() => {
        toast.error('Erro ao atualizar status')
      })
  }

  if (!purchase) return <p>Carregando...</p>

  return (
    <Container>
      <h2>Detalhes da Compra</h2>
      <DetailsField>Fornecedor: {purchase.fornecedor}</DetailsField>
      <DetailsField>
        Total da Compra: R$ {Number(purchase.valor_total_compra).toFixed(2)}
      </DetailsField>
      <h3>Itens</h3>
      {purchase.itens && purchase.itens.length > 0 ? (
        purchase.itens.map((item, index) => (
          <DetailsField key={index}>
            Produto: {item.Produto.descricao_produto} | Quantidade:{' '}
            {item.quantidade} | Custo: R$ {item.custo} | Total do Item: R${' '}
            {Number(item.total_item).toFixed(2)}
          </DetailsField>
        ))
      ) : (
        <p>Nenhum item encontrado.</p>
      )}
      <ContainerStatus>
        <h3>Status da Compra</h3>
        <DetailsField>Status Atual: {purchase.status_compra}</DetailsField>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value as string)}
          label="Status da Compra"
          displayEmpty
        >
          <MenuItem value="Iniciado">Iniciado</MenuItem>
          <MenuItem value="Conferido">Conferido</MenuItem>
          <MenuItem value="Finalizado">Finalizado</MenuItem>
        </Select>
        <ButtonsContainer>
          <StyledButton
            variant="contained"
            color="primary"
            style={{ marginTop: 10 }}
            onClick={() => {
              handleUpdateStatus()
              navigate('/compras')
            }}
          >
            Alterar Status
          </StyledButton>
          <StyledButton
            variant="contained"
            color="secondary"
            style={{ marginTop: 10 }}
            onClick={() => navigate('/compras')}
          >
            Voltar
          </StyledButton>
        </ButtonsContainer>
      </ContainerStatus>
    </Container>
  )
}
