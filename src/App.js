import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RoutesApp from './routes/routes'; // ajuste o caminho conforme sua estrutura de pastas

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <RoutesApp />
      </div>
    </BrowserRouter>
  )
}

export default App
