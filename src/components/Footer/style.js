import styled from 'styled-components'

export const Container = styled.div`
  background-color: #424244;   
  display: flex;
  flex-direction: column; 
  justify-content: center; 
  align-items: center; 
  height: 80px;
  width: 100%;
  color: #fff;
  font-size: 20px; 
  position: fixed; /* Torna o footer fixo */
  bottom: 0; /* Fixa na parte inferior */
  left: 0;
  width: 100%; /* Ocupa toda a largura */
  height: 60px; /* Altura fixa */

  p {
    margin: 5px 0; 
  }
`

