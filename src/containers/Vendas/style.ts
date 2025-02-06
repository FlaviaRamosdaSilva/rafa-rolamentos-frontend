import { Button, TextField } from '@mui/material'
import styled from 'styled-components'

export const Container = styled.div`
  padding: 20px;
  max-width: 1000px;
  margin: auto;
  margin-bottom: 40px;
`

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-self: space-between;
  margin-bottom: 20px;
  gap: 60px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`
export const StyledButton = styled(Button)`
  background-color: #949caf !important;
  color: #3c3d62 !important;
  font-weight: bold !important;
  &:hover {
    background-color: #7c88a1 !important;
  }

  @media (min-width: 768px) {
    width: auto;
    margin-top: 20px;
  }
`

export const StyledTextField = styled(TextField)`
  width: 100%;

  @media (min-width: 768px) {
    width: auto;
  }
`

export const FieldContainer = styled.div`
  margin-bottom: 10px;
  gap: 60px;
  display: flex;
  flex-direction: row;
  justify-self: space-between;

  @media (min-width: 768px) {
    flex: 1 1 calc(33.33% - 16px);
    margin-bottom: 0;
  }
`
