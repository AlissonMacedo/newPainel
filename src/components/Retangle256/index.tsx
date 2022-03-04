import React from 'react';

import { Container } from './styles';
import { Button } from '../Button';

const Retangle256: React.FC = () => {
  return (
    <Container>
      <div className="prices">
        <div>
          <h4>Total a pagar</h4>
          <span>R$ 0,00</span>
        </div>
        <div>
          <h4>Tempo de entrega</h4>
          <span>0 min</span>
        </div>
        <div>
          <h4>Distância total</h4>
          <span>0 Km</span>
        </div>
        <div>
          <h4>Destinos</h4>
          <span>0 destinos</span>
        </div>
      </div>
      <Button>Concluir Solicitação</Button>
    </Container>
  );
};
export default Retangle256;
