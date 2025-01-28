import { Button, TextField } from '@mui/material';
import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #898889;
  min-height: 100vh;
`;

export const ActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin-bottom: 20px;
`;

export const StyledButton = styled(Button)`
  background-color: #949caf !important;
  color: #3c3d62 !important;
  font-weight: bold !important;
  &:hover {
    background-color: #7c88a1 !important;
  }
`;

export const StyledTextField = styled(TextField)`
  flex: 1;
  margin-right: 20px !important;
`;