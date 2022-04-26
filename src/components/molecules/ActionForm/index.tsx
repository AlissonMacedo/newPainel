import React from 'react';

import { useFormikContext } from 'formik';
import { Button } from '../../atoms/Button';

import { Container } from './styles';
import OptionsForm from '../OptionsForm';
import Directions from '../../../services/Directions';
import { useBusiness } from '../../../pages/Business/Context';

import { calcFreight } from '../../templates/Business/helpers';

type actionFormData = {
  values: any;
};

const ActionForm: React.FC<actionFormData> = ({ values }) => {
  const { loadFreight } = useBusiness();

  const formik: any = useFormikContext();

  const addAddres = () => {
    formik.setFieldValue('addAdress', true);
    formik.setFieldValue('calculed', false);
    formik.setFieldValue('route', null);
  };

  const routing = async () => {
    const response = await Directions.getDirectionsWithReturn(values);

    if (response !== null && response.routes) {
      let deliveries = [];
      // verifica se tem mais de um ponto de entrega e
      // verifica se o usuário quer que otimize
      if (values.deliveries.length > 1 && values.optimizeWaypoints) {
        const newArr = response.routes[0].waypoint_order.map(
          (item: any) => values.deliveries[item + 1],
        );
        deliveries = [...newArr];

        // adiciona o endereco do startDelivery como retorno
        if (values.deliveryRetorn === false) {
          deliveries = [
            ...newArr,
            values.deliveries[values.deliveries.length - 1],
          ];
        }
      } else {
        deliveries = values.deliveries;
      }

      deliveries = [values.deliveries[0], ...deliveries];

      if (values.deliveryRetorn) {
        deliveries.push(values.deliveries[0]);
      }

      formik.setFieldValue('calculed', true);
      formik.setFieldValue('route', response);
      formik.setFieldValue('deliveries', deliveries);

      await calcFreight(formik.setFieldValue, loadFreight, response, values);
    } else {
      // TODO: tratar erro
      // send to sentry error
      // show toastfy error
      formik.setFieldValue('calculed', false);
    }
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
      <Button typeStyle="info" type="button" onClick={() => routing()}>
        Calcular nova Rota
      </Button>
    </Container>
  );
};

export default ActionForm;
