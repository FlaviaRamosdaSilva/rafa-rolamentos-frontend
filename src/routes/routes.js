import { Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Sidebar } from '../components/SideBar'
import { AlterarStatus } from '../containers/AlterarStatus/index.jsx'
import { Clientes } from '../containers/Clientes'
import { Compras } from '../containers/Compras/index.jsx'
import { EditarProduto } from '../containers/EditarProduto/index.jsx'
import { EditarVenda } from '../containers/EditarVenda/index.jsx'
import { Estoque } from '../containers/Estoque'
import { NovaCompra } from '../containers/NovaCompra'
import { NovaVenda } from '../containers/NovaVenda/index.jsx'
import { Principal } from '../containers/Principal'
import { Produtos } from '../containers/Produtos'
import { Login } from '../containers/Register'
import { Vendas } from '../containers/Vendas/index.jsx'
import { UserProvider } from '../hooks/UseContext.jsx'
import PrivateRoute from './private-route.js'

function RoutesApp() {
  const location = useLocation() // Obtém a rota atual
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Define se o header e o sidebar devem ser exibidos
  const shouldShowHeaderAndSidebar = location.pathname !== '/login'

  // const toggleSidebar = () => {
  //    setIsSidebarOpen(!isSidebarOpen)
  // }

  /// <ToggleButton isOpen={isSidebarOpen} toggle={toggleSidebar} />

  return (
    <>
      <UserProvider>
        {shouldShowHeaderAndSidebar && <Header />}

        {shouldShowHeaderAndSidebar && <Sidebar />}
        <Routes>
          <Route element={<Login />} path="/login" />
          <Route element={<PrivateRoute />}>
            <Route element={<Principal />} path="/" />
            <Route element={<Produtos />} path="/produtos" />
            <Route element={<Clientes />} path="/clientes" />
            <Route element={<Estoque />} path="/estoque" />
            <Route element={<Vendas />} path="/vendas" />
            <Route element={<Compras />} path="/compras" />
            <Route element={<EditarProduto />} path="/editar-produto/:id" />
            <Route element={<NovaCompra />} path="/compras/novopedido" />
            <Route element={<AlterarStatus />} path="/compras/:id" />
            <Route element={<NovaVenda />} path="/vendas/nova" />
            <Route element={<EditarVenda />} path="/vendas/:id" />
          </Route>
        </Routes>
        {shouldShowHeaderAndSidebar && <Footer />}
      </UserProvider>
    </>
  )
}

export default RoutesApp
