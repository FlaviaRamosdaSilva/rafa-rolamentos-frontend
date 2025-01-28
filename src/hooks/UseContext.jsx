import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
// criar contexto e usar contexto, conforme documentação do Context

const UserContext = createContext({});
// conforme documentação do react

export const UserProvider = ({ children }) => {
    // colocamos aqui dentro as informações que vamos precisar para usar em todas as páginas
    const [UserData, setUserData] = useState({});
  
    const putUserData = async (UserInfo) => {
      // vamos usar as informações e colocar dentro o Local Storage
      // responsável por pegar meus dados e colocar dentro do Estado
      console.log('Dados recebidos no putUserData:', UserInfo); // Verifica os dados recebidos
      setUserData(UserInfo);
  
      await localStorage.setItem('rafaRolamentos:userData', JSON.stringify(UserInfo));
      // Json.stringify transforma o objeto em string
    };
    const logout = async () => {
      await localStorage.removeItem('rafaRolamentos:userData');
    };

    
  const cleanCart = async () => {
    await localStorage.removeItem('rafaRolamentos:cartInfo');
  };

    useEffect(() => {
        const loadUserData = async () => {
          const clientInfo = await localStorage.getItem('rafaRolamentos:userData');
          if (clientInfo) {
            setUserData(JSON.parse(clientInfo));
          }
        };
        loadUserData();
      }, []);

    return (
        <UserContext.Provider value={{ putUserData, UserData, logout, cleanCart }}>
          {children}
        </UserContext.Provider>
      );
    };
    
    UserProvider.propTypes = {
      children: PropTypes.node,
    };
    
    export { UserContext };

