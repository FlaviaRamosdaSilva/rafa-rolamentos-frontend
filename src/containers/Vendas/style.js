import { Button } from '@mui/material'
import styled from 'styled-components'

export const Container = styled.div`
  padding: 20px;
  max-width: 1000px;
  margin: auto;
  margin-bottom: 40px;
`

export const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
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
