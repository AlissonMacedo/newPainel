import React from 'react';

import { Button } from '../Button';
import { Container } from './styles';
import OptionsForm from '../OptionsForm';

type actionFormData = {
  values: any;
  setFieldValue: (type: string, value: any) => void;
};

const ActionForm: React.FC<actionFormData> = ({ values, setFieldValue }) => {
  const addAddres = () => {
    setFieldValue('addAdress', true);
    setFieldValue('calculed', false);
    setFieldValue('route', null);
  };

  const routing = async () => {
    setFieldValue('calculed', true);
  };

  return (
    <Container>
      <OptionsForm values={values} setFieldValue={setFieldValue} />
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
