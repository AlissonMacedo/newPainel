import React from 'react';

import { useFormikContext } from 'formik';
import { Oval } from 'react-loader-spinner';
import { Button } from '../../atoms/Button';

import { Container } from './styles';
import OptionsForm from '../OptionsForm';
import { useBusiness } from '../../../pages/Business/Context';

type actionFormData = {
  values: any;
  setShowModalOrder: (value: boolean) => void;
};

const ActionForm: React.FC<actionFormData> = ({
  values,
  setShowModalOrder,
}) => {
  const { loadFreight, deliveriesOriginal, deliveriesOtimized } = useBusiness();

  const formik: any = useFormikContext();

  const addAddress = () => {
    formik.setFieldValue('addAdress', true);
  };

  // enable/disable the button of optimization
  const optimizeOnoff = () => {
    formik.setFieldValue('calculed', false);
    // formik.setFieldValue('route', null);

    if (values.optimizeWaypoints && deliveriesOriginal.length > 0) {
      return formik.setFieldValue('deliveries', deliveriesOriginal);
    }

    if (!values.optimizeWaypoints && deliveriesOtimized.length > 0) {
      return formik.setFieldValue('deliveries', deliveriesOtimized);
    }
    return null;
  };
  // enable/disable the button of return

  const disableButtonCalcRoute = (): boolean => {
    if (values.deliveryReturn) {
      if (values.deliveries.length === 2) return true;
      return false;
    }
    if (values.deliveries.length === 1) return true;
    return false;
  };

  return (
    <Container>
      <OptionsForm values={values} optimizeOnoff={optimizeOnoff} />
      <Button typeStyle="primary" type="button" onClick={() => addAddress()}>
        Adicionar um endereço
      </Button>
      <Button
        disabled={disableButtonCalcRoute()}
        typeStyle="info"
        type="button"
        // onClick={() => calcFreight(map, formik, values)}
        onClick={() => setShowModalOrder(true)}
      >
        {loadFreight && <Oval color="#fff" height={15} width={15} />}
        Calcular nova Rota
      </Button>
    </Container>
  );
};

export default ActionForm;
