import React from 'react';

import { Authenticated, Main, NotAuthenticated } from './styles';
import SideBar from '../../components/organisms/SideBar';
import { Header } from '../../components';

import { useAuth } from '../../hooks/auth';

const Wrapper: React.FC = ({ children }) => {
  const { user, config, openCloseSideBar } = useAuth();

  if (user) {
    return (
      <Authenticated>
        <SideBar isOpen={config.sideBar} />
        <Main>
          <Header isOpen={config.sideBar} setIsOpen={openCloseSideBar} />
          {children}
        </Main>
      </Authenticated>
    );
  }

  return <NotAuthenticated>{children}</NotAuthenticated>;
};
export default Wrapper;
