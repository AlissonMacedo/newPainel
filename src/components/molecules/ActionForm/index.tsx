import React from 'react';

import { useFormikContext } from 'formik';
import { Button } from '../../atoms/Button';
import { Container } from './styles';
import OptionsForm from '../OptionsForm';

type actionFormData = {
  values: any;
};

const ActionForm: React.FC<actionFormData> = ({ values }) => {
  const formik: any = useFormikContext();

  const addAddres = () => {
    formik.setFieldValue('addAdress', true);
    formik.setFieldValue('calculed', false);
    formik.setFieldValue('route', null);
  };

  const routing = async () => {
    formik.setFieldValue('calculed', true);
  };

  const optimizeOnoff = () => {
    formik.setFieldValue('calculed', false);
    formik.setFieldValue('route', null);
  };

  const returnDelivery = () => {
    formik.setFieldValue('calculed', false);
    formik.setFieldValue('route', null);
  };

  return (
    <Container>
      <OptionsForm
        values={values}
        optimizeOnoff={optimizeOnoff}
        returnDelivery={returnDelivery}
      />
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
