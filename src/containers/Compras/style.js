import { Button } from '@mui/material'
import styled from 'styled-components'

export const Container = styled.div`
  max-width: 1000px;
  margin: 20px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`

export const Filters = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 20px;
`

export const StyledButton = styled(Button)`
  && {
    background-color: #1976d2;
    color: white;
    font-weight: bold;
    &:hover {
      background-color: #125ca2;
    }
  }
`
