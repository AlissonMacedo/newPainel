import React from 'react';

import { Container } from './styles';

import { useBusiness } from '../../../pages/Business/Context';
import ValuesOrderText from '../../molecules/ValuesOrderText';
import ValuesOrderButton from '../../molecules/ValuesOrderButton';

interface ValueOrderD {
  values: any;
  handleCreateBusiness: () => void;
}

const ValuesOrder: React.FC<ValueOrderD> = ({
  values,
  handleCreateBusiness,
}) => {
  const { loadCreateBusiness } = useBusiness();

  return (
    <Container>
      <ValuesOrderText values={values} />
      <ValuesOrderButton
        values={values}
        loadCreateBusiness={loadCreateBusiness}
        handleCreateBusiness={handleCreateBusiness}
      />
    </Container>
  );
};
export default ValuesOrder;
