import React from 'react';

import { Container, Main, MapContainer } from './styles';
import Retangle256 from '../../components/Retangle256';
import MapComponent from '../../components/Map';
import Retangle255 from '../../components/Retangle255';

import { BusinessProvider, useBusiness } from './Context';

const PageComponent: React.FC = () => {
  return (
    <Container>
      <Retangle255 />
      <Main>
        <MapContainer>
          <MapComponent />
        </MapContainer>
        <Retangle256 />
      </Main>
    </Container>
  );
};

const Business: React.FC = () => {
  return (
    <PageComponent>
      <PageComponent />
    </PageComponent>
  );
};

export default Business;
