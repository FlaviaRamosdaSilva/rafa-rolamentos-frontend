import styled from 'styled-components'

import Background from '../../assets/Background-Rolamentos.png'

interface InputProps {
  error?: string
}

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background: url('${Background}') no-repeat center center fixed;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    background: #898889;
  }
`

export const LoginImage = styled.img`
  height: 80%;
`

export const ContainerItens = styled.div`
  border-radius: 50px;
  background: #898889;
  height: 636px;
  width: 560px;
  padding: 25px 75px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    color: #333c67;

    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-align: center;
  }

  a {
    color: #333c67;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-align: center;
    cursor: pointer;
    text-decoration: underline;
    margin-top: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  .figOlX {
    margin-left: 105px;
  }

  @media (max-width: 768px) {
    height: 100vh; /* Ajusta a altura no mobile */
    width: 90%; /* Ajusta a largura no mobile */
    padding: 20px; /* Menos padding no mobile */
    border-radius: 0px;
  }
`

export const Input = styled.input<InputProps>`
  width: 560px;
  height: 45px;
  border-radius: 30px;
  background: #a4a4ac;
  box-shadow: 3px 3px 10px 0px rgba(74, 144, 226, 0.19);
  border: ${(props) => (props.error ? '3px solid #CC1717' : 'none')};
  padding-left: 18px;
  font-size: 16px;

  @media (max-width: 768px) {
    width: auto;
  }
`

export const Label = styled.p`
  color: #333c67;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 18px;
  width: 61px;
  height: 20px;
`

export const SignInLink = styled.p`
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  text-align: right;

  a {
    cursor: pointer;
    text-decoration: underline;
  }
`
