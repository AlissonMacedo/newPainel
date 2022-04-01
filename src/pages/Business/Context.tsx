/* eslint-disable no-undef */
import React, { createContext, useContext } from 'react';
import { GetFreightObj } from '../../helpers/types/business';
import Business from '../../dtos/Business';

import {
  gaCalcFreight,
  gaCreateOrderError,
} from '../../services/firebase/events';
import { useToast } from '../../hooks/toast';
import { errorFreight, successFreight } from '../../helpers/objsToasts';

interface returnFreightObj {
  isError?: boolean;
  newReturn: { deliveryTax?: number; returnTax?: number };
}

interface BusinessContextData {
  loadFreight(value: GetFreightObj): Promise<returnFreightObj>;
  load: boolean;
}

const BusinessContext = createContext<BusinessContextData>(
  {} as BusinessContextData,
);

const BusinessProvider: React.FC = ({ children }) => {
  const [load, setLoad] = React.useState(false);
  const { addToast } = useToast();

  async function loadFreight(value: GetFreightObj) {
    setLoad(true);
    let newReturn = {};
    const isError = false;

    try {
      const { deliveryTax, returnTax } = await Business.getFreight(value);
      newReturn = { deliveryTax, returnTax };
      gaCalcFreight();
      addToast(successFreight(deliveryTax + returnTax));
    } catch (err) {
      addToast(errorFreight);
      gaCreateOrderError();
    } finally {
      setLoad(false);
    }
    return { isError, newReturn };
  }

  return (
    <BusinessContext.Provider
      value={{
        loadFreight,
        load,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};

function useBusiness(): BusinessContextData {
  const context = useContext(BusinessContext);

  return context;
}

export { BusinessProvider, useBusiness };
