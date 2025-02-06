import { ButtonHTMLAttributes, ReactNode } from 'react'
import { ContainerButton } from './styles'

// Interface para as props do botão
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export function Button({ children, ...rest }: ButtonProps) {
  return <ContainerButton {...rest}>{children}</ContainerButton>
}
