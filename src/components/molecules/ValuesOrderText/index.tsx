import React from 'react';
import { Shimmer } from 'react-shimmer';
import { formatAmount } from '../../../helpers/utils';
import { Container } from './styles';

type ValuesOrderTextData = {
  values: any;
  loadFreight: boolean;
};

const ValuesOrderText: React.FC<ValuesOrderTextData> = ({
  values,
  loadFreight,
}) => {
  return (
    <Container>
      <div>
        <h4>Total a pagar</h4>
        {loadFreight ? (
          <Shimmer width={100} height={30} />
        ) : (
          <span>{formatAmount(values.dataToDelivery.totaToPay)}</span>
        )}
      </div>
      <div>
        <h4>Tempo de entrega</h4>
        {loadFreight ? (
          <Shimmer width={100} height={30} />
        ) : (
          <span>{`${values.dataToDelivery.timeDelivery} min`}</span>
        )}
      </div>
      <div>
        <h4>Distância total</h4>
        {loadFreight ? (
          <Shimmer width={100} height={30} />
        ) : (
          <span>{`${values.dataToDelivery.distanceTotal} Km`}</span>
        )}
      </div>
      <div>
        <h4>Destinos</h4>
        {loadFreight ? (
          <Shimmer width={100} height={30} />
        ) : (
          <span>{`${values.dataToDelivery.deliveriesTotal} destinos`}</span>
        )}
      </div>
    </Container>
  );
};
export default ValuesOrderText;
