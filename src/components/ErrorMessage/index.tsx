import { ReactNode } from 'react'
import { ErrorMessageStyles } from './styles'

// Interface para as props do componente
interface ErrorMessageProps {
  children: ReactNode
}

export function ErrorMessage({ children }: ErrorMessageProps) {
  return <ErrorMessageStyles>{children}</ErrorMessageStyles>
}
