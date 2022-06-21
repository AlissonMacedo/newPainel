import React from 'react';

import { Container } from './styles';

import { useBusiness } from '../../../pages/Business/Context';
import ValuesOrderText from '../../molecules/ValuesOrderText';
import ValuesOrderButton from '../../molecules/ValuesOrderButton';

interface ValueOrderD {
  values: any;
  submitting: () => void;
}

const ValuesOrder: React.FC<ValueOrderD> = ({ values, submitting }) => {
  const { loadCreateBusiness, loadFreight, modalValuesOrder } = useBusiness();

  if (!values.calculed) {
    return (
      <Container show={modalValuesOrder}>
        <div className="spaceTextCalcRoute">
          <span>Clique em calcular nova rota</span>
        </div>
      </Container>
    );
  }

  return (
    <Container show={modalValuesOrder}>
      <ValuesOrderText values={values} loadFreight={loadFreight} />
      <ValuesOrderButton
        values={values}
        loadCreateBusiness={loadCreateBusiness}
        loadFreight={loadFreight}
        submitting={submitting}
      />
    </Container>
  );
};
export default ValuesOrder;
