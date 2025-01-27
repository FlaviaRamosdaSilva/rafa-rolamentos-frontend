import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Header } from '../components/Header'
import { Sidebar } from '../components/SideBar'
import { Principal } from '../containers/Principal'

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
