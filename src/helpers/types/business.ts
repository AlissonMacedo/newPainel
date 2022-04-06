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
};
