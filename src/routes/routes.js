import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Sidebar } from '../components/SideBar';
import { Clientes } from '../containers/Clientes';

import { Compras } from '../containers/Compras/index.jsx';
import { EditarProduto } from '../containers/EditarProduto/index.jsx';
import { Estoque } from '../containers/Estoque';
import { Principal } from '../containers/Principal';
import { Produtos } from '../containers/Produtos';
import { Login } from '../containers/Register';
import { Vendas } from '../containers/Vendas/index.jsx';
import { UserProvider } from '../hooks/UseContext.jsx';

function RoutesApp() {
  const location = useLocation(); // Obtém a rota atual

  // Define se o header e o sidebar devem ser exibidos
  const shouldShowHeaderAndSidebar = location.pathname !== '/login';

  return (
    <>
    <UserProvider>
      {shouldShowHeaderAndSidebar && <Header />}
      {shouldShowHeaderAndSidebar && <Sidebar />}
      <Routes>
        <Route element={<Login />} path="/login" />
        <Route element={<Principal />} path="/" />
        <Route element={<Produtos />} path="/produtos" />
        <Route element={<Clientes />} path="/clientes" />
        <Route element={<Estoque />} path="/estoque" />
        <Route element={<Vendas />} path="/vendas" />
        <Route element={<Compras />} path="/compras" />
        <Route element={<EditarProduto />} path="/editar-produto/:id" />
      </Routes>
      {shouldShowHeaderAndSidebar && <Footer />}
      </UserProvider>
    </>
  );
}

export default RoutesApp;