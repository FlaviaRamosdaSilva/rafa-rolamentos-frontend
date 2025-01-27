import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Header } from '../components/Header'
import { Sidebar } from '../components/SideBar'
import { Clientes } from '../containers/Clientes'
import { Estoque } from '../containers/Estoque'
import { Pedidos } from '../containers/Pedidos'
import { Principal } from '../containers/Principal'
import { Produtos } from '../containers/Produtos'


//import paths from '../Constants/paths'
//import { Admin, Cart, Home, Login, Products, Register } from '../Containers'
//mport PrivateRoute from './private-route'

function RoutesApp() {
  return (
    <>
      <Header />
      <Sidebar />
      <Routes>
        <Route element={<Principal />} path="/inicio" />
        <Route element={<Produtos />} path="/produtos" />
        <Route element={<Clientes />} path="/clientes" />
        <Route element={<Estoque />} path="/estoque" />
        <Route element={<Pedidos />} path="/pedidos" />
        {/* <Switch> */}
        {/* <Route component={Login} path="/login" /> */}
        {/* <Route component={Register} path="/cadastro" /> */}
        {/* <PrivateRoute exact component={Home} path="/" /> */}
        {/* <PrivateRoute component={Products} path="/produtos" /> */}
        {/* <PrivateRoute component={Cart} path="/carrinho" /> */}
        {/*<PrivateRoute component={Admin} path={paths.Order} isAdmin={true} />
          <PrivateRoute component={Admin} path={paths.Products} isAdmin={true} />
          <PrivateRoute
            component={Admin}
            path={paths.NewProduct}
            isAdmin={true}
          />
          <PrivateRoute
            component={Admin}
            path={paths.EditProduct}
            isAdmin={true}
          />
        </Switch>*/}
      </Routes>
    </>
  )
}

export default RoutesApp
