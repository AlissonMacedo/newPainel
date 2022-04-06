import React from 'react';

import { Container } from './styles';
import { Button } from '../Button';
import { formatAmount } from '../../helpers/utils';
import { useBusiness } from '../../pages/Business/Context';

interface RetangleDate {
  values: any;
}

const Retangle256: React.FC<RetangleDate> = ({ values }) => {
  const { createBusiness } = useBusiness();

  return (
    <Container>
      <div className="prices">
        <div>
          <h4>Total a pagar</h4>
          <span>{formatAmount(values.dataToDelivery.totaToPay)}</span>
        </div>
        <div>
          <h4>Tempo de entrega</h4>
          <span>{`${values.dataToDelivery.timeDelivery} min`}</span>
        </div>
        <div>
          <h4>Distância total</h4>
          <span>{`${values.dataToDelivery.distanceTotal} Km`}</span>
        </div>
        <div>
          <h4>Destinos</h4>
          <span>{`${values.dataToDelivery.deliveriesTotal} destinos`}</span>
        </div>
      </div>
      <Button
        disabled={!values.calculed}
        onClick={() => createBusiness(values)}
      >
        Concluir Solicitação
      </Button>
    </Container>
  );
};
export default Retangle256;
