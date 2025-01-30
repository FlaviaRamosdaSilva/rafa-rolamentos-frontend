import { Box, Button, TextField } from '@mui/material'
import styled from 'styled-components'

export const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #898889;
  min-height: 100vh;
`

export const ActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 800px;
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

export const ModalContainer = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  box-shadow: 24px;
  padding: 32px;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
`
