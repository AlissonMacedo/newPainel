import React from 'react';

import { Container, Main, MapContainer } from './styles';
import Retangle256 from '../../components/Retangle256';
import MapComponent from '../../components/Map';
import Retangle255 from '../../components/Retangle255';

const Business: React.FC = () => {
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
export default Business;
