/* eslint-disable no-plusplus */
import {
  GetFreightObj,
  returnFreightObj,
} from '../../../../helpers/types/business';

export const calcFreight = async (
  setFieldValue: (field: string, value: any) => void,
  loadFreight: (value: GetFreightObj) => Promise<returnFreightObj>,
  route: any,
  values: any,
) => {
  let leng = 0;
  let dur = 0;
  if (
    typeof route.routes[0] === 'object' &&
    typeof route.routes[0].legs === 'object'
  ) {
    for (let rt = 0; rt < route.routes[0].legs.length; rt++) {
      leng += route.routes[0].legs[rt].distance.value;
      dur += route.routes[0].legs[rt].duration.value;
    }
  }

  setFieldValue('dataToDelivery.distanceTotal', (leng / 1000).toFixed(1));
  setFieldValue('dataToDelivery.timeDelivery', Math.round(dur / 60));
  setFieldValue('dataToDelivery.deliveriesTotal', route.routes[0].legs.length);

  let newObj: {
    qntPoints: number;
    kmDelivery: number;
    kmReturn: number;
  };

  if (values.deliveryRetorn) {
    newObj = {
      qntPoints: route.routes[0].legs.length,
      kmDelivery:
        leng -
        route.routes[0].legs[route.routes[0].legs.length - 1].distance.value,
      kmReturn:
        route.routes[0].legs[route.routes[0].legs.length - 1].distance.value,
    };
  } else {
    newObj = {
      qntPoints: route.routes[0].legs.length + 1,
      kmDelivery: leng,
      kmReturn: 0,
    };
  }

  const newFreight = {
    city: 'Mâncio Lima',
    cityId: 1200336,
    qntPoints: newObj.qntPoints,
    kmDelivery: newObj.kmDelivery,
    kmReturn: newObj.kmReturn,
    vehicleType: values.vehicleType,
  };

  const {
    isError,
    newReturn: { deliveryTax, returnTax },
  } = await loadFreight(newFreight);

  if (!isError) {
    if (!!deliveryTax && !!returnTax) {
      setFieldValue('dataToDelivery.totaToPay', deliveryTax + returnTax);
    } else {
      setFieldValue('dataToDelivery.totaToPay', deliveryTax);
    }
  }
};
