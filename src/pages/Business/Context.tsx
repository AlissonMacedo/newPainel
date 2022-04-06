/* eslint-disable no-undef */
import React, { createContext, useContext } from 'react';
import { GetFreightObj, objectBusiness } from '../../helpers/types/business';
import Business from '../../services/Business';

import {
  gaCalcFreight,
  gaCreateOrderError,
} from '../../services/firebase/events';
import { useToast } from '../../hooks/toast';
import { errorFreight, successFreight } from '../../helpers/objsToasts';
import { useAuth } from '../../hooks/auth';

interface returnFreightObj {
  isError?: boolean;
  newReturn: { deliveryTax?: number; returnTax?: number };
}

interface returnCreateBusiness {
  isError: boolean;
}
interface BusinessContextData {
  loadFreight(value: GetFreightObj): Promise<returnFreightObj>;
  createBusiness(values: any): Promise<returnCreateBusiness>;
  load: boolean;
}
// value: objectBusiness
const BusinessContext = createContext<BusinessContextData>(
  {} as BusinessContextData,
);

const BusinessProvider: React.FC = ({ children }) => {
  const { token, providerId, providerAlias, city, state } = useAuth();
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

  async function createBusiness(values: any) {
    const obj = {
      providerId,
      providerAlias,
      distance: values.dataToDelivery.distanceTotal,
      duration: values.dataToDelivery.timeDelivery,
      deliveryTax: values.dataToDelivery.totaToPay,
      city,
      state,
      deliveries: values.deliveries,
      vehicle: 0,
    };

    // state esta numero precisa ser o nome escrito

    console.log('obj', obj);
    // TODO falta adicionar o retorno no deliveries e fazer a otimização da
    // rota no objecto de criacao do pedido.

    let isError = false;
    // const teste = {
    //   providerId: 7253,
    //   providerAlias: 'Lanchonete do Gabriel',
    //   distance: 0.908,
    //   duration: 174,
    //   deliveryTax: 7.9,
    //   city: 'Mâncio Lima',
    //   state: 'Acre',
    //   deliveries: [
    //     {
    //       street: 'Rua Alberto Gadelha,80, Mâncio Lima - Acre',
    //       number: '80',
    //       neighborhood: 'Centro',
    //       complement: '',
    //       observation: '',
    //       city: 'Mâncio Lima',
    //       state: 'Acre',
    //       longitude: -72.9047222,
    //       latitude: -7.613805800000001,
    //       address: 'Rua Alberto Gadelha,80, Mâncio Lima - Acre',
    //     },
    //     {
    //       street: 'Rua Mimosa Sá',
    //       number: '',
    //       neighborhood: 'Centro',
    //       complement: '',
    //       observation: '',
    //       city: 'Mâncio Lima',
    //       state: 'Brasil',
    //       latitude: -7.6109263,
    //       longitude: -72.9091075,
    //       address: 'R. Mimosa Sá, Mâncio Lima - AC, 69990-000, Brasil',
    //       payment: 0,
    //     },
    //   ],
    //   vehicle: 0,
    // };
    try {
      const data = { token, obj };
      await Business.postBusiness(data);
    } catch (err) {
      isError = true;
      console.log(err);
    }

    return { isError };
  }

  return (
    <BusinessContext.Provider
      value={{
        createBusiness,
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
