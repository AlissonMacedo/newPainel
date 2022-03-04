import React from 'react';
import { Button } from '..';

import { Container } from './styles';

const Retangle255 = () => {
  return (
    <Container>
      <div>
        <h3>Rota de entrega</h3>
      </div>
      <div className="address">
        <div>
          <h4>Rua Aristóteles Tavares, 67</h4>
          <span>Valença, Bahia - Brasil</span>
          <strong>Editar</strong>
        </div>
        <div className="destiny">
          <h4>Destino 1</h4>
        </div>
      </div>
      <div className="inputs">
        <input name="teste" />
        <div>
          <input name="number" />
          <input name="number" />
        </div>
        <div>
          <input name="complement" />
        </div>
        <div>
          <input name="observations" />
        </div>
      </div>
      <Button typeStyle="secondary">Confirmar endereço</Button>
    </Container>
  );
};
export default Retangle255;
