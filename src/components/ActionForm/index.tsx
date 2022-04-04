import React from 'react';

import { Button } from '../Button';
import { Container } from './styles';

type actionFormData = {
  setFieldValue: (type: string, value: any) => void;
};

const ActionForm: React.FC<actionFormData> = ({ setFieldValue }) => {
  const addAddres = () => {
    setFieldValue('addAdress', true);
  };

  const routing = async () => {
    setFieldValue('calculed', true);
  };

  return (
    <Container>
      <Button typeStyle="primary" type="button" onClick={() => addAddres()}>
        Adicionar um endereço
      </Button>
      <Button typeStyle="info" type="button" onClick={() => routing()}>
        Calcular nova Rota
      </Button>
    </Container>
  );
};
export default ActionForm;
