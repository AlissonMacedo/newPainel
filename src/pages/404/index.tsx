import React from 'react';
import { Button } from '../../components';

import { Container, Background } from './styles';

const Page404 = () => {
  return (
    <Container>
      <Background />
      <h1>Essa pagina não existe</h1>
      <a href="/">
        <Button>Voltar para a Home</Button>
      </a>
    </Container>
  );
};
export default Page404;
