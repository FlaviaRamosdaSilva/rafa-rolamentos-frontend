import { createContext, ReactNode, useEffect, useState } from 'react'
// criar contexto e usar contexto, conforme documentação do Context

export const UserContext = createContext<UserContextType | null>(null)

interface UserData {
  name?: string
  email?: string
}

interface UserContextType {
  UserData: UserData | null
  putUserData: (UserInfo: UserData) => Promise<void>
  logout: () => Promise<void>
  cleanCart: () => Promise<void>
}

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [UserData, setUserData] = useState<UserData | null>(null)

  const putUserData = async (UserInfo: UserData) => {
    console.log('Dados recebidos no putUserData:', UserInfo)
    setUserData(UserInfo)
    await localStorage.setItem(
      'rafaRolamentos:userData',
      JSON.stringify(UserInfo)
    )
  }

  const logout = async () => {
    await localStorage.removeItem('rafaRolamentos:userData')
    setUserData(null)
  }

  const cleanCart = async () => {
    await localStorage.removeItem('rafaRolamentos:cartInfo')
  }

  useEffect(() => {
    const loadUserData = async () => {
      const clientInfo = await localStorage.getItem('rafaRolamentos:userData')
      if (clientInfo) {
        setUserData(JSON.parse(clientInfo))
      }
    }
    loadUserData()
  }, [])

  return (
    <UserContext.Provider value={{ putUserData, UserData, logout, cleanCart }}>
      {children}
    </UserContext.Provider>
  )
}
