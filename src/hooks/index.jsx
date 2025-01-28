import PropTypes from 'prop-types';

import { UserProvider } from './UseContext';

const AppProvider = ({ children }) => <UserProvider>{children}</UserProvider>;

AppProvider.propTypes = {
  children: PropTypes.node,
};

export default AppProvider;