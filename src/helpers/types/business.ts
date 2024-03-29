/* eslint-disable no-undef */

export type GetFreightObj = {
  city: string;
  cityId: number;
  vehicleType: number | null;
  qntPoints: number;
  kmDelivery: number;
  kmReturn: number;
};

interface delivery {
  street: string;
  number: string;
  neighborhood: string;
  complement: string;
  observation: string;
  city: string;
  state: string;
  longitude: number;
  latitude: number;
  address: string;
}
export type objectBusiness = {
  providerId: number | undefined;
  providerAlias: string | undefined;
  distance: number;
  duration: number;
  deliveryTax: number;
  city: string | undefined;
  state: string | undefined;
  deliveries: delivery[];
  vehicle: number;
  qntPoints: number;
  schedule: Date | null;
  serviceType: number;
};

export type returnFreightObj = {
  isError?: boolean;
  newReturn: { deliveryTax?: number; returnTax?: number };
};

export type deliveryType = {
  id: number;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  longitude: number;
  latitude: number;
  obs: string;
  address: string;
  payment: number;
};

type dataToDeliveryType = {
  totaToPay: number;
  timeDelivery: number;
  distanceTotal: number;
  deliveriesTotal: number;
};

export type deliveriesType = Array<deliveryType>;

export type initialFormType = {
  editing: boolean;
  calculed: boolean;
  route: any;
  addAdress: boolean;
  deliveryRetorn: boolean;
  travelMode: string;
  optimizeWaypoints: boolean;
  vehicleType: number;
  serviceType: 1 | 2 | 0;
  dataToDelivery: dataToDeliveryType;
  address: string;
  delivery: deliveryType;
  deliveries: deliveriesType;
};
