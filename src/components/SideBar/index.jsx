import AccountBoxSharpIcon from '@mui/icons-material/AccountBoxSharp';
import AppRegistrationSharpIcon from '@mui/icons-material/AppRegistrationSharp';
import AutoAwesomeMosaicSharpIcon from '@mui/icons-material/AutoAwesomeMosaicSharp';
import InventorySharpIcon from '@mui/icons-material/InventorySharp';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../hooks/UseContext.jsx';
import {
  IconTextWrapper,
  MenuContainer,
  SecondContainer,
  SidebarContainer,
  TextIcon,
  WelcomeText,
  WelcomeWrapper
} from './style';


export const Sidebar = () => {
  const { logout } = useContext(UserContext);

  const navigate = useNavigate();
  const location = useLocation();

  const handleRedirect = (route) => {
    navigate(route); // Redireciona para a rota específica
  };

  const handleLogout = () => {
    logout(); // Chama a função de logout
    navigate('/login'); // Redireciona para a tela de registro
  };

  const isActive = (path) => location.pathname === path;

  return (
    <SidebarContainer>
      <WelcomeWrapper>
        <WelcomeText>Bem Vindo de volta</WelcomeText>
      </WelcomeWrapper>

      <MenuContainer>
        <SecondContainer>
          <IconTextWrapper className="pt-5">
            <AutoAwesomeMosaicSharpIcon />
            <TextIcon
              onClick={() => handleRedirect('/Produtos')}
              isActive={isActive('/Produtos')}
            >
              Produtos
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
            <InventorySharpIcon />
            <TextIcon
              onClick={() => handleRedirect('/Estoque')}
              isActive={isActive('/Estoque')}
            >
              Estoque
            </TextIcon>
          </IconTextWrapper>

          <IconTextWrapper>
            <AppRegistrationSharpIcon />
            <TextIcon
              onClick={() => handleRedirect('/Pedidos')}
              isActive={isActive('/Pedidos')}
            >
              Pedidos
            </TextIcon>
          </IconTextWrapper>
          
          <IconTextWrapper onClick={handleLogout}>
            <LogoutSharpIcon />
            <TextIcon>Logout</TextIcon>
          </IconTextWrapper>
        </SecondContainer>
      </MenuContainer>
    </SidebarContainer>
  );
};