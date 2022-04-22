import React from 'react';
import { Oval } from 'react-loader-spinner';
import { Button } from '../../atoms/Button';

type ValuesOrderButtonData = {
  values: any;
  loadCreateBusiness: boolean;
  handleCreateBusiness: () => void;
};

const ValuesOrderButton: React.FC<ValuesOrderButtonData> = ({
  values,
  loadCreateBusiness,
  handleCreateBusiness,
}) => {
  return (
    <Button disabled={!values.calculed} onClick={() => handleCreateBusiness()}>
      {loadCreateBusiness && <Oval color="#fff" height={15} width={15} />}
      Concluir Solicitação
    </Button>
  );
};
export default ValuesOrderButton;
