import { Button, Paper, TextField } from '@mui/material'
import styled from 'styled-components'

interface StyledContainerProps {
  maxWidth?: string
  sx?: { mt?: number }
}

export const ContainerMe = styled.div<StyledContainerProps>`
  display: flex;
  justify-content: center;
  //align-items: center;
  min-height: calc(100vh - 130px);
  width: 100vw; /* Subtraindo a largura do sidebar (280px) */
  background-color: #f4f4f4;
  padding: 0px;

  @media (max-width: 768px) {
    margin-left: 0px;
    height: calc(100vh - 130px);
    width: 100%;
    margin-bottom: 80px;
    padding: 0px;
  }
`

export const FormPaper = styled(Paper)`
  padding: 32px;
  width: 100%;
  max-width: 800px; /* Aumentamos a largura para acomodar duas colunas */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #fff;
  height: 100%;
  height: 550px;
  margin-top: 80px;

  @media (max-width: 768px) {
    margin-left: 0px;
    height: 910px;
    width: 100%;
    margin-top: 5px;
    margin-bottom: 80px;
  }
`

export const FormTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  color: #3c3d62;
  margin-bottom: 20px;
`

export const FormContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* Permite que os campos se organizem automaticamente */
  gap: 16px; /* Espaçamento entre os campos */
`

export const FieldContainer = styled.div`
  flex: 1 1 calc(50% - 16px); /* Ocupa 50% da largura, considerando o gap */
  min-width: 300px; /* Largura mínima para responsividade */
`

export const StyledTextField = styled(TextField)`
  width: 100%; /* Faz os campos ocuparem toda a largura do container */
  & .MuiInputLabel-root {
    color: #949caf !important;
  }
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: #949caf !important;
    }
    &:hover fieldset {
      border-color: #7c88a1 !important;
    }
    &.Mui-focused fieldset {
      border-color: #3c3d62 !important;
    }
  }
`

export const StyledButton = styled(Button)`
  background-color: #949caf !important;
  color: #fff !important;
  font-weight: bold !important;
  margin-top: 20px !important;

  &:hover {
    background-color: #7c88a1 !important;
  }

  @media (max-width: 768px) {
    margin-bottom: 80px !important; /* Adicionando margem inferior para o botão */
  }
`

export const ErrorMessage = styled.p`
  color: #f44336;
  font-size: 14px;
  margin: -10px 0 10px 0;
  text-align: left;
`

export const SuccessMessage = styled.p`
  color: #4caf50;
  font-size: 14px;
  margin: -10px 0 10px 0;
  text-align: left;
`
