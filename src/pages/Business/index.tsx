import React from 'react';

import { Container, Main } from './styles';
import Retangle256 from '../../components/Retangle256';
import Map from '../../components/Map';
import Retangle255 from '../../components/Retangle255';

const Business = () => {
  return (
    <Container>
      <Retangle255 />
      <Main>
        <Map />
        <Retangle256 />
      </Main>
    </Container>
  );
};
export default Business;
