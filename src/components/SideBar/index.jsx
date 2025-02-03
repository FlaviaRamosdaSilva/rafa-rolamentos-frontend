import AccountBoxSharpIcon from '@mui/icons-material/AccountBoxSharp'
import AppRegistrationSharpIcon from '@mui/icons-material/AppRegistrationSharp'
import AutoAwesomeMosaicSharpIcon from '@mui/icons-material/AutoAwesomeMosaicSharp'
import InventorySharpIcon from '@mui/icons-material/InventorySharp'
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { UserContext } from '../../hooks/UseContext.jsx'
import {
  ButtonMenu,
  IconTextWrapper,
  MenuContainer,
  SecondContainer,
  SidebarContainer,
  TextIcon,
  WelcomeText,
  WelcomeWrapper,
} from './style'

export const Sidebar = () => {
  const { logout } = useContext(UserContext)

  const navigate = useNavigate()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false) // estado para o menu mobile

  const isMobile = window.innerWidth < 768 // Verifica se está no mobile

  const handleRedirect = (route) => {
    navigate(route) // Redireciona para a rota específica
    // Opcional: se estiver no mobile, fecha o menu após a navegação
    if (isMobile) setIsOpen(false)
  }

  const handleLogout = () => {
    logout() // Chama a função de logout
    navigate('/login') // Redireciona para a tela de registro
  }

  const isActive = (path) => location.pathname.startsWith(path)

  // const handleToggleSidebar = () => {
  //    setIsOpen((prev) => !prev)
  //  }

  return (
    <>
      <ButtonMenu
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          zIndex: '2',
          display: window.innerWidth < 768 ? 'block' : 'none',
        }}
      >
        ☰
      </ButtonMenu>
      <SidebarContainer isOpen={isOpen || !isMobile}>
        <WelcomeWrapper>
          <WelcomeText></WelcomeText>
        </WelcomeWrapper>

        <MenuContainer>
          <SecondContainer>
            <IconTextWrapper className="pt-5">
              <ShoppingCartIcon />
              <TextIcon
                onClick={() => handleRedirect('/Compras')}
                isActive={isActive('/Compras')}
              >
                Compras
              </TextIcon>
            </IconTextWrapper>

            <IconTextWrapper>
              <AutoAwesomeMosaicSharpIcon />
              <TextIcon
                onClick={() => handleRedirect('/Produtos')}
                isActive={isActive('/Produtos')}
              >
                Criar Produto
              </TextIcon>
            </IconTextWrapper>

            <IconTextWrapper>
              <InventorySharpIcon />
              <TextIcon
                onClick={() => handleRedirect('/Estoque')}
                isActive={isActive('/Estoque') || isActive('/editar-produto')}
              >
                Estoque
              </TextIcon>
            </IconTextWrapper>

            <IconTextWrapper>
              <AccountBoxSharpIcon />
              <TextIcon
                onClick={() => handleRedirect('/Clientes')}
                isActive={isActive('/Clientes')}
              >
                Clientes
              </TextIcon>
            </IconTextWrapper>

            <IconTextWrapper>
              <AppRegistrationSharpIcon />
              <TextIcon
                onClick={() => handleRedirect('/Vendas')}
                isActive={isActive('/Vendas')}
              >
                Vendas
              </TextIcon>
            </IconTextWrapper>

            <IconTextWrapper onClick={handleLogout}>
              <LogoutSharpIcon />
              <TextIcon>Logout</TextIcon>
            </IconTextWrapper>
          </SecondContainer>
        </MenuContainer>
      </SidebarContainer>
    </>
  )
}
