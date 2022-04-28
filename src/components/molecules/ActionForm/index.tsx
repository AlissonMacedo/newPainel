import React from 'react';

import { useFormikContext } from 'formik';
import { Oval } from 'react-loader-spinner';
import { Button } from '../../atoms/Button';

import { Container } from './styles';
import OptionsForm from '../OptionsForm';
import { useBusiness } from '../../../pages/Business/Context';

type actionFormData = {
  values: any;
};

const ActionForm: React.FC<actionFormData> = ({ values }) => {
  const { calcFreight, loadFreight } = useBusiness();

  const formik: any = useFormikContext();

  const addAddres = () => {
    formik.setFieldValue('addAdress', true);
    formik.setFieldValue('calculed', false);
    formik.setFieldValue('route', null);
  };

  // enable/disable the button of optimization
  const optimizeOnoff = () => {
    formik.setFieldValue('calculed', false);
    formik.setFieldValue('route', null);
  };
  // enable/disable the button of return

  return (
    <Container>
      <OptionsForm values={values} optimizeOnoff={optimizeOnoff} />
      <Button typeStyle="primary" type="button" onClick={() => addAddres()}>
        Adicionar um endereço
      </Button>
      <Button
        typeStyle="info"
        type="button"
        onClick={() => calcFreight(formik, values)}
      >
        {loadFreight && <Oval color="#fff" height={15} width={15} />}
        Calcular nova Rota
      </Button>
    </Container>
  );
};

export default ActionForm;
