import styled from 'styled-components';

export const SidebarContainer = styled.div`
  /* sidebar */
  height: 100vh;
  background-color: #1C1C1C;
  width: 280px;
  position: fixed;
  left: 0;
  top: 0;
`;

export const SecondContainer = styled.div`
  width: 100%;
  padding: 0 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const WelcomeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 0;
`;

export const WelcomeText = styled.span`
  color: #fff;
  font-size: 1.5rem;
  text-align: center;
`;

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const IconTextWrapper = styled.div`
  margin: 1.5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 100%;
  
  &.pt-5 {
    padding-top: 3rem;
  }

  // Estilizando os ícones do Material-UI diretamente
  svg {
    color: ${props => props.isActive ? '#fff' : '#787EBE'};
    font-size: 2.5rem;
    min-width: 2.5rem;
    margin-right: 1rem;
  }
`;

export const TextIcon = styled.span`
  padding: 1rem;
  color: ${props => props.isActive ? '#fff' : '#787EBE'};
  font-size: 1.3rem;
  font-weight: 500;
  white-space: nowrap;
  font-weight: 300;
  
  &:hover {
    color: #3C3D62;
  }
`;
