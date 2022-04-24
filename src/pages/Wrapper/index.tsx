import React from 'react';

import { Authenticated, Main, NotAuthenticated } from './styles';
import SideBar from '../../components/organisms/SideBar';
import { Button, Header } from '../../components';

import { useAuth } from '../../hooks/auth';

const Wrapper: React.FC = ({ children }) => {
  const { user } = useAuth();

  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => setIsOpen(!isOpen);

  if (user) {
    return (
      <Authenticated>
        <SideBar isOpen={isOpen} />
        <Main>
          <Header isOpen={isOpen} setIsOpen={setIsOpen} />
          {/* <Button onClick={toggleDrawer}>Abre/Fecha</Button> */}
          {children}
        </Main>
      </Authenticated>
    );
  }

  return <NotAuthenticated>{children}</NotAuthenticated>;
};
export default Wrapper;
