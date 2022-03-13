import React, { createContext, useContext } from 'react';
import Business from '../../dtos/Business';
import { useToast } from '../../hooks/toast';

interface HomeContextData {
  data: object;
  loadFreight(): void;
  load: boolean;
}

const HomeContext = createContext<HomeContextData>({} as HomeContextData);

const HomeProvider: React.FC = ({ children }) => {
  const [load, setLoad] = React.useState(false);
  const { addToast, errorCather } = useToast();

  async function loadFreight() {
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

    setLoad(true);
    try {
      const { deliveryTax } = await Business.getFreight(freight);

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
        description: 'Não foi possível realizar o login!',
        title: 'Houve um erro',
      });
    } finally {
      setLoad(false);
    }
  }
  const data = {};
  return (
    <HomeContext.Provider value={{ data, loadFreight, load }}>
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
