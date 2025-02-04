import { Outlet, Route, Routes } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Sidebar } from '../components/SideBar'
import { AlterarStatus } from '../containers/AlterarStatus/index.jsx'
import { Clientes } from '../containers/Clientes'
import { Compras } from '../containers/Compras/index.jsx'
import { EditarProduto } from '../containers/EditarProduto/index.jsx'
import { EditarVenda } from '../containers/EditarVenda/index.jsx'
import { EsqueceuSenha } from '../containers/EsqueceuSenha'
import { Estoque } from '../containers/Estoque'
import { NovaCompra } from '../containers/NovaCompra'
import { NovaVenda } from '../containers/NovaVenda/index.jsx'
import { Principal } from '../containers/Principal'
import { Produtos } from '../containers/Produtos'
import { Login } from '../containers/Register'
import { ResetPassword } from '../containers/ResetPassword'
import { Vendas } from '../containers/Vendas/index.jsx'
import { UserProvider } from '../hooks/UseContext.jsx'
import PrivateRoute from './private-route.js'

function DefaultLayout() {
  return (
    <>
      <Header />
      <Sidebar />
      <div>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

/**
 * Layout que não exibe Header, Sidebar ou Footer
 */
function MinimalLayout() {
  return <Outlet />
}
function RoutesApp() {
  return (
    <UserProvider>
      <Routes>
        <Route element={<MinimalLayout />}>
          <Route element={<Login />} path="/login" />
          <Route element={<EsqueceuSenha />} path="/esqueceu-senha" />
          <Route
            element={<ResetPassword />}
            path="/reset-password/:recoverToken"
          />{' '}
        </Route>
        <Route element={<DefaultLayout />}>
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
        </Route>
      </Routes>
    </UserProvider>
  )
}

export default RoutesApp
