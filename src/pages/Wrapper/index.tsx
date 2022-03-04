import React from 'react';

import { Container, Main } from './styles';
import SideBar from '../../components/SideBar';
import Header from '../../components/Header';

const Wrapper: React.FC = ({ children }) => {
  return (
    <Container>
      <SideBar />
      <Main>
        <Header />
        {children}
      </Main>
    </Container>
  );
};
export default Wrapper;
