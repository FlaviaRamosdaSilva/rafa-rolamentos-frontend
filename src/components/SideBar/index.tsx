import AccountBoxSharpIcon from '@mui/icons-material/AccountBoxSharp'
import AppRegistrationSharpIcon from '@mui/icons-material/AppRegistrationSharp'
import AutoAwesomeMosaicSharpIcon from '@mui/icons-material/AutoAwesomeMosaicSharp'
import InventorySharpIcon from '@mui/icons-material/InventorySharp'
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { UserContext } from '../../hooks/UseContext'
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
  const userContext = useContext(UserContext)
  const navigate = useNavigate()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState<boolean>(false) // Estado para o menu mobile

  if (!userContext) {
    throw new Error('UserContext deve ser usado dentro de um UserProvider')
  }

  const { logout } = userContext

  const isMobile = window.innerWidth < 768 // Verifica se está no mobile

  const handleRedirect = (route: string) => {
    navigate(route)
    if (isMobile) setIsOpen(false)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const isActive = (path: string) => location.pathname.startsWith(path)

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
            <IconTextWrapper className="pt-5" isActive={isActive('/Compras')}>
              <ShoppingCartIcon />
              <TextIcon
                onClick={() => handleRedirect('/Compras')}
                isActive={isActive('/Compras')}
              >
                Compras
              </TextIcon>
            </IconTextWrapper>

            <IconTextWrapper isActive={isActive('/Produtos')}>
              <AutoAwesomeMosaicSharpIcon />
              <TextIcon
                onClick={() => handleRedirect('/Produtos')}
                isActive={isActive('/Produtos')}
              >
                Criar Produto
              </TextIcon>
            </IconTextWrapper>

            <IconTextWrapper isActive={isActive('/Estoque')}>
              <InventorySharpIcon />
              <TextIcon
                onClick={() => handleRedirect('/Estoque')}
                isActive={isActive('/Estoque') || isActive('/editar-produto')}
              >
                Estoque
              </TextIcon>
            </IconTextWrapper>

            <IconTextWrapper isActive={isActive('/Clientes')}>
              <AccountBoxSharpIcon />
              <TextIcon
                onClick={() => handleRedirect('/Clientes')}
                isActive={isActive('/Clientes')}
              >
                Clientes
              </TextIcon>
            </IconTextWrapper>

            <IconTextWrapper isActive={isActive('/Vendas')}>
              <AppRegistrationSharpIcon />
              <TextIcon
                onClick={() => handleRedirect('/Vendas')}
                isActive={isActive('/Vendas')}
              >
                Vendas
              </TextIcon>
            </IconTextWrapper>

            <IconTextWrapper
              onClick={handleLogout}
              isActive={isActive('/Logout')}
            >
              <LogoutSharpIcon />
              <TextIcon isActive={isActive('/Logout')}>Logout</TextIcon>
            </IconTextWrapper>
          </SecondContainer>
        </MenuContainer>
      </SidebarContainer>
    </>
  )
}
