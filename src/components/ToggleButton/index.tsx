import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'
import { Button } from '@mui/material'
import React from 'react'
import styled from 'styled-components'

const FixedToggleButton = styled(Button)`
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 9999; /* valor alto para garantir que fique acima */
  margin: 0;
  padding: 0;
  background-color: #1c1c1c !important;
  color: #fff !important;

  @media (min-width: 768px) {
    display: none;
  }
  @media (max-width: 767px) {
    display: block;
  }
`

interface ToggleButtonProps {
  isOpen: boolean
  toggle: () => void
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ isOpen, toggle }) => {
  return (
    <FixedToggleButton onClick={toggle}>
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </FixedToggleButton>
  )
}

export default ToggleButton
