import React from 'react';

import { Container } from './styles';
import { Button } from '../../atoms/Button';

const ModalOrderSuccess = () => {
  return (
    <Container show>
      <div>
        <div className="order">
          <span>Pedido:</span>
          <span className="spotlight">#102030</span>
        </div>
        <div className="image" />
        <div className="div-text-success">
          <span>Solicitação realizada com</span>
          <span className="text-success">Sucesso!</span>
          <div>
            <span>Para acompanhar seu pedido</span>
            <a href="/">clique aqui</a>
          </div>
        </div>
      </div>
      <Button>Novo pedido</Button>
    </Container>
  );
};
export default ModalOrderSuccess;
