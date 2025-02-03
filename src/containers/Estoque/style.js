import { Button, TableRow, TextField } from '@mui/material'
import styled from 'styled-components'

export const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f4f4f4; /* Ajustado para diferenciar da página de Clientes */
  min-height: 100vh;
  margin-bottom: 40px;
`

export const ActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1000px; /* Largura aumentada para suportar mais informações */
  margin-bottom: 20px;
`

export const StyledButton = styled(Button)`
  background-color: #949caf !important;
  color: #3c3d62 !important;
  font-weight: bold !important;
  &:hover {
    background-color: #7c88a1 !important;
  }
`

export const StyledTextField = styled(TextField)`
  flex: 1;
  margin-right: 20px !important;
`

export const TableContainerWrapper = styled.div`
  max-width: 1000px; /* Largura máxima da tabela */
  margin: 0 auto; /* Centraliza a tabela */
  background-color: white; /* Fundo branco */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Sombra suave */
  border-radius: 8px; /* Bordas arredondadas */
  overflow: hidden;
`

export const DeleteButton = styled(Button)`
  color: #f44336 !important; /* Cor vermelha para destacar */
  &:hover {
    background-color: rgba(
      244,
      67,
      54,
      0.1
    ) !important; /* Fundo vermelho claro ao passar o mouse */
  }
`

export const EditButton = styled(Button)`
  color: #3f51b5 !important; /* Cor azul para edição */
  &:hover {
    background-color: rgba(
      63,
      81,
      181,
      0.1
    ) !important; /* Fundo azul claro ao passar o mouse */
  }
`

export const ModalBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  box-shadow: 24px;
  padding: 24px;
  border-radius: 8px;
  width: 100%;
  max-width: 400px; /* Tamanho fixo para os modais */
  text-align: center;
`

export const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`

export const StyledTableRow = styled(TableRow)`
  td,
  th {
    color: ${(props) => (props.lowStock ? 'red' : 'inherit')};
  }
`
