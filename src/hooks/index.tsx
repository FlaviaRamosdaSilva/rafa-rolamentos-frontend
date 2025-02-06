import { ReactNode } from 'react'
import { UserProvider } from './UseContext'

interface AppProviderProps {
  children: ReactNode
}

const AppProvider = ({ children }: AppProviderProps) => (
  <UserProvider>{children}</UserProvider>
)

export default AppProvider
