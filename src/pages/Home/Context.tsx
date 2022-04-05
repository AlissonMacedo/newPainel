import React, { createContext, useContext } from 'react';
import Business from '../../services/Business';
import { useToast } from '../../hooks/toast';

import { GetFreightObj } from '../../helpers/types/business';
import {
  gaCalcFreight,
  gaCreatedNewOrder,
  gaCreateOrderError,
  gaNotBalanceError,
} from '../../services/firebase/events';

interface HomeContextData {
  data: object;
  loadFreight(): void;
  createOrder(): void;
  load: boolean;
}

const HomeContext = createContext<HomeContextData>({} as HomeContextData);
const freight = {
  city: 'Mâncio Lima',
  providerId: 7253,
  cityId: 1200336,
  qntPoints: 2,
  kmDelivery: 767,
  kmReturn: 0,
  serviceType: 0,
  vehicleType: 0,
};

const HomeProvider: React.FC = ({ children }) => {
  const [load, setLoad] = React.useState(false);
  const { addToast, errorCather } = useToast();

  async function loadFreight(value?: GetFreightObj) {
    setLoad(true);
    try {
      const { deliveryTax } = await Business.getFreight(value || freight);
      gaCalcFreight();
      errorCather({
        data: {},
        msg: `O valor do frete é R$${deliveryTax}, 00`,
        error: {
          type: 'error',
          msg: 'teste',
        },
      });
    } catch (err) {
      addToast({
        type: 'error',
        description: 'Não foi possível calcular o frete!',
        title: 'Houve um erro',
      });
      gaCreateOrderError();
      // if not balance then
      // gaNotBalanceError();
    } finally {
      setLoad(false);
    }
  }

  async function createOrder() {
    gaCreatedNewOrder(freight);
    console.log('Criar pedido');
  }

  const data = {};

  return (
    <HomeContext.Provider value={{ data, loadFreight, createOrder, load }}>
      {children}
    </HomeContext.Provider>
  );
};

function useHome(): HomeContextData {
  const context = useContext(HomeContext);

  if (!context) {
    throw new Error('useHome must be used with in an HomeProvider');
  }
  return context;
}

export { HomeProvider, useHome };
