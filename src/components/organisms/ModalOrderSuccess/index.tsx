import React from 'react';

import { Container } from './styles';
import { Button } from '../../atoms/Button';

type ModalOrderSuccessData = {
  close: (value: boolean) => void;
  show: boolean;
};

const ModalOrderSuccess = ({ close, show }: ModalOrderSuccessData) => {
  return (
    <Container show={show}>
      <div>
        <div className="order">
          <div>
            <span>Pedido:</span>
            <span className="spotlight">#102030</span>
          </div>
          <button type="button" onClick={() => close(!show)}>
            Fechar
          </button>
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
