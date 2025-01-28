import React from 'react'
import logo from '../../assets/Rafa_Rolamentos_principal.png'
import { Container, LogoImage } from './style'

export function Vendas() {
    return (
      <Container>
        <LogoImage src={logo} alt="LogoRafaRolamentos" />
      </Container>
    )
}
