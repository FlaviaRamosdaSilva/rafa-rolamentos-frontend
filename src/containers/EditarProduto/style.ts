import styled from 'styled-components'

export const Container = styled.div`
  background-color: #898889;
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 130px);
  width: calc(100vw - 280px); // Subtraindo a largura do sidebar (280px)
  margin-left: 280px; // Adicionando margem igual à largura do sidebar
  margin-bottom: 40px;
`

export const LogoImage = styled.img`
  max-width: 80%; // Garante que a imagem não fique maior que o container
  height: auto; // Mantém a proporção da imagem
`
