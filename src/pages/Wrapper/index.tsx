import React from 'react';

import { Container, Main, Header } from './styles';
import SideBar from '../../components/SideBar';

const Wrapper: React.FC = ({ children }) => {
  return (
    <Container>
      <SideBar />
      <Main>
        <Header>Header</Header>
        {children}
      </Main>
    </Container>
  );
};
export default Wrapper;
