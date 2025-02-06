import { Button } from '@mui/material'
import styled from 'styled-components'

export const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: auto;
  margin-bottom: 40px;
`

export const DetailsField = styled.div`
  background: #e0e0e0;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
`

// ContainerStatus organiza os itens em linhas (colunas no layout)
export const ContainerStatus = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px; /* Espaçamento entre as linhas */
`

// Container específico para os botões na mesma linha
export const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px; /* Espaçamento entre os botões */
`

export const StyledButton = styled(Button)`
  background-color: #949caf !important;
  color: #3c3d62 !important;
  font-weight: bold !important;
  &:hover {
    background-color: #7c88a1 !important;
  }
`
