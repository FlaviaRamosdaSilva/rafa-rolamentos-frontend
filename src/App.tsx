import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import RoutesApp from './routes/routes'

function App() {
  const location = useLocation()

  useEffect(() => {
    // Verifica se a rota é de login ou esqueceu a senha ou reset da senha
    if (
      location.pathname === '/login' ||
      location.pathname === '/esqueceu-senha' ||
      location.pathname.startsWith('/users/reset-password')
    ) {
      document.documentElement.style.setProperty('zoom', '1') // 100% para login e esqueceu a senha ou reset da senha
    } else {
      document.documentElement.style.setProperty('zoom', '0.8') // 80% para o restante
    }
  }, [location.pathname]) // Atualiza quando a rota mudar
  return (
    <div className="App">
      <RoutesApp />
    </div>
  )
}

export default App
