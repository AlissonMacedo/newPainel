import React from 'react';

import { Container } from './styles';

import { useBusiness } from '../../../pages/Business/Context';
import ValuesOrderText from '../../molecules/ValuesOrderText';
import ValuesOrderButton from '../../molecules/ValuesOrderButton';

interface ValueOrderD {
  values: any;
  submiting: () => void;
}

const ValuesOrder: React.FC<ValueOrderD> = ({ values, submiting }) => {
  const { loadCreateBusiness, loadFreight, modalValuesOrder } = useBusiness();

  return (
    <Container show={modalValuesOrder}>
      <ValuesOrderText values={values} loadFreight={loadFreight} />
      <ValuesOrderButton
        values={values}
        loadCreateBusiness={loadCreateBusiness}
        loadFreight={loadFreight}
        submiting={submiting}
      />
    </Container>
  );
};
export default ValuesOrder;
