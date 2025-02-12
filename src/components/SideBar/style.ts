import styled from 'styled-components'

interface SidebarProps {
  isOpen: boolean
}

interface TextIconProps {
  isActive: boolean
}

export const SidebarContainer = styled.div<SidebarProps>`
  /* sidebar */
  height: 100%;
  background-color: #1c1c1c;
  width: 280px;
  position: fixed;
  left: ${(props) =>
    props.isOpen ? '0' : '-280px'}; /* Controla a visibilidade */
  top: 0;
  z-index: 1;
  transition: left 0.3s ease; /* Transição suave ao abrir/fechar */

  @media (max-width: 768px) {
    width: 250px;
    left: ${(props) =>
      props.isOpen ? '0' : '-100%'}; /* Sidebar ocupa 100% no mobile */
  }
`

export const SecondContainer = styled.div`
  width: 100%;
  padding: 0 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const WelcomeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 0;
`

export const WelcomeText = styled.span`
  color: #fff;
  font-size: 1.5rem;
  text-align: center;
`

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

export const IconTextWrapper = styled.div<TextIconProps>`
  margin: 1.5rem 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 100%;
  margin-left: 65px;

  &.pt-5 {
    padding-top: 3rem;
  }

  // Estilizando os ícones do Material-UI diretamente
  svg {
    color: ${(props) => (props.isActive ? '#fff' : '#787EBE')};
    font-size: 1.5rem;
    min-width: 1.5rem;
    margin-right: 1rem;
  }

  /* Ajuste no mobile */
  @media (max-width: 768px) {
    margin: 0.5rem 0; /* Menor espaçamento entre os itens no mobile */
    margin-left: 65px;
  }
`

export const TextIcon = styled.span<TextIconProps>`
  padding: 1rem;
  color: ${(props) => (props.isActive ? '#fff' : '#787EBE')};
  font-size: 1.2rem;
  font-weight: 500;
  white-space: nowrap;
  font-weight: 300;

  &:hover {
    color: #3c3d62;
  }
`

/* Botão fixo no desktop, mas só visível no mobile */
export const ButtonMenu = styled.button`
  position: fixed; /* Fixa o botão na tela */
  top: 20px;
  left: 20px;
  z-index: 2;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 24px;
  display: block; /* Exibe o botão apenas no mobile */

  /* No desktop, o botão será escondido */
  @media (min-width: 768px) {
    button {
      display: none; /* Não mostra o botão no desktop */
    }
  }
`
