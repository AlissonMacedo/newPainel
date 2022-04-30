import React from 'react';
import { Oval } from 'react-loader-spinner';
import { Button } from '../../atoms/Button';

import { Container } from './styles';

type ValuesOrderButtonData = {
  values: any;
  loadCreateBusiness: boolean;
  loadFreight: boolean;
  submiting: () => void;
};

const ValuesOrderButton: React.FC<ValuesOrderButtonData> = ({
  values,
  loadCreateBusiness,
  loadFreight,
  submiting,
}) => {
  if (loadFreight) {
    return (
      <Container>
        <Button disabled={!values.calculed} onClick={() => submiting()}>
          <Oval color="#fff" height={15} width={15} />
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <Button disabled={!values.calculed} onClick={() => submiting()}>
        {loadCreateBusiness && <Oval color="#fff" height={15} width={15} />}
        Concluir Solicitação
      </Button>
    </Container>
  );
};
export default ValuesOrderButton;
