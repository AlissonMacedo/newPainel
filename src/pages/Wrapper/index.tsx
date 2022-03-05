import React from 'react';

import { Authenticated, Main, NotAuthenticated } from './styles';
import SideBar from '../../components/SideBar';
import { Header } from '../../components';

import { useAuth } from '../../hooks/auth';

const Wrapper: React.FC = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    return (
      <Authenticated>
        <SideBar />
        <Main>
          <Header />
          {children}
        </Main>
      </Authenticated>
    );
  }

  return <NotAuthenticated>{children}</NotAuthenticated>;
};
export default Wrapper;
