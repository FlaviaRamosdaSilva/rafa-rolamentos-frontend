import React from 'react'
import logo from '../../assets/Rafa_Rolamentos_principal.png'
import { Container, LogoImage } from './style'

export function Principal() {
    return (
      <Container>
        <LogoImage src={logo} alt="LogoRafaRolamentos" />
      </Container>
    )
}
