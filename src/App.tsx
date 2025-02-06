import { useEffect } from 'react'
import RoutesApp from './routes/routes'

function App() {
  useEffect(() => {
    document.documentElement.style.setProperty('zoom', '0.8')
  }, [])
  return (
    <div className="App">
      <RoutesApp />
    </div>
  )
}

export default App
