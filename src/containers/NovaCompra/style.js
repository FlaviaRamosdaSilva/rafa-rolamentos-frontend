import { Button } from '@mui/material'
import styled from 'styled-components'

export const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: auto;
  margin-bottom: 40px;
`

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`

export const TotalField = styled.div`
  background: #e0e0e0;
  padding: 10px;
  border-radius: 5px;
`

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

export const customModalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo escuro transparente
  },
  content: {
    width: '40%', // Largura do modal
    height: '400px', // Altura automática
    margin: 'auto', // Centraliza na tela
    borderRadius: '10px', // Borda arredondada
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}

export const StyledButton = styled(Button)`
  background-color: #949caf !important;
  color: #3c3d62 !important;
  font-weight: bold !important;
  &:hover {
    background-color: #7c88a1 !important;
  }
`
