import React from 'react';
import { Button } from '../../components';

import { Container } from './styles';

const Page404 = () => {
  return (
    <Container>
      <h1>Essa pagina não existe</h1>
      <a href="/">
        <Button>Voltar para a Home</Button>
      </a>
    </Container>
  );
};
export default Page404;
