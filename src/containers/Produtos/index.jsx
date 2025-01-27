import React from 'react'
import logo from '../../assets/Rafa_Rolamentos_principal.png'
import { Container, LogoImage } from './style'

export function Produtos() {
    return (
      <Container>
        <LogoImage src={logo} alt="LogoRafaRolamentos" />
      </Container>
    )
}
