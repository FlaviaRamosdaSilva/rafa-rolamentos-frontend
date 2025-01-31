import { Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { toast } from 'react-toastify'
import apiRafaRolamentos from '../../service/api'
import { Container, DetailsField } from './style'

export function AlterarStatus() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [purchase, setPurchase] = useState(null)
  const [status, setStatus] = useState('')

  useEffect(() => {
    apiRafaRolamentos
      .get(`/entrada/${id}`)
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
        Total da Compra: R${' '}
        {Number(purchase.valor_total_compra)
          ? Number(purchase.valor_total_compra).toFixed(2)
          : '0.00'}
      </DetailsField>
      <h3>Itens</h3>
      {purchase.itens && purchase.itens.length > 0 ? (
        purchase.itens.map((item, index) => (
          <DetailsField key={index}>
            Produto: {item.descricao_produto} | Quantidade: {item.quantidade} |
            Custo: R$ {item.custo}
          </DetailsField>
        ))
      ) : (
        <p>Nenhum item encontrado.</p>
      )}
      <h3>Status da Compra</h3>
      <TextField
        fullWidth
        label="Status da Compra"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />

      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: 20 }}
        onClick={handleUpdateStatus}
      >
        Alterar Status
      </Button>
      <Button
        variant="contained"
        color="secondary"
        style={{ marginTop: 10 }}
        onClick={() => navigate('/compras')}
      >
        Voltar
      </Button>
    </Container>
  )
}
