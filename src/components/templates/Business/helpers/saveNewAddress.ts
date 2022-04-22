import { AppProps } from '../../../../helpers/types/business';

export function saveNewAddress(
  setFieldValue: (field: string, value: any) => void,
  deliveries: AppProps,
  values: any,
  map: any,
) {
  setFieldValue('addAdress', false);
  setFieldValue('calculed', false);
  setFieldValue('route', null);

  setFieldValue('deliveries', [...values.deliveries, deliveries]);
  map?.panTo({ lat: deliveries.latitude, lng: deliveries.longitude });

  setFieldValue('delivery', {
    id: Math.random(),
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    longitude: '',
    latitude: '',
    obs: '',
    address: '',
    payment: 0,
  });
}
