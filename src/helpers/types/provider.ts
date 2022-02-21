interface banks {
  id: number;
  name: string;
}

interface payments {
  id: number;
  type: { id: number; name: string };
  flag: { id: number; name: string; picture: string };
}

interface categories {
  banner: string;
  catPriority: number;
  icon: string;
  id: number;
  name: string;
  priority: number;
}

interface franchise {
  addkm: string;
  addpoint: string;
  addpointmult: string;
  alias: string;
  basekm: string;
  basekmmulti: string;
  blackholiday: boolean;
  city: string;
  currency: string;
  deliverytax: string;
  document: string;
  endereco: number;
  fkcity: number;
  franchiseAdress: {
    address: string;
    city: number;
    complement: string;
    country: number;
    id: number;
    latitude: number;
    longitude: number;
    name: string;
    neighborhood: string;
    number: string;
    postal: string;
    reference: string;
    state: number;
    status: number;
    type: 0;
    user: number;
  };
  franchiseParameters: {
    canProviderSetOwnShopper: boolean;
    iframe: string;
  };
  franchiseUser: {};
}

interface cities {
  code: number;
  franchise: Array<franchise>;
  id: number;
  name: string;
  state: number;
  stateob: { id: number; name: string; state: number };
  status: boolean;
}

interface franchises {
  id: number;
  name: string;
}

interface addresses {
  address: string;
  city: number;
  complement: string;
  country: number;
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  neighborhood: string;
  number: string;
  postal: string;
  reference: string;
  state: number;
  status: number;
  type: number;
  user: number;
}

type data = {
  FranchiseProviderSetOwnShopper: boolean;
  birthday: string;
  canProviderSetOwnShopper: boolean;
  createdAt: string;
  email: string;
  franchise: {
    addkm: string;
    addpoint: string;
    addpointmult: string;
    alias: string;
    basekm: string;
    basekmmulti: string;
    blockholiday: boolean;
    city: string;
    currency: number;
    deliverytax: string;
    document: string;
    endereco: number;
    fkcity: number;
    franchiseAdress: {
      address: string;
      city: number;
      complement: null;
      country: number;
      id: number;
      latitude: number;
      longitude: number;
      name: string;
      neighborhood: string;
      number: string;
      postal: string;
      reference: string;
      state: number;
      status: number;
      type: number;
      user: number;
    };
    franchiseParameters: {
      canProviderSetOwnShopper: boolean;
      iframe: string;
    };
    franchiseUser: {
      account: [];
      addresses: Array<addresses>;
      birthday: string;
      createdAt: string;
      email: string;
      gender: number;
      id: number;
      name: string;
      password: string;
      phone: string;
      picture: string;
      status: number;
      userType: number;
    };
  };
  id: number;
  logisticType: string;
  maxdist: string;
  maxfare: string;
  mktplacekm: string;
  name: string;
  online: boolean;
  operationType: number;
  referee: true;
  returntax: string;
  seller: string;
  shoppertime: string;
  status: number;
  tax: string;
  timeZone: string;
  user: number;
  working: boolean;
  zpk: string;
};

interface states {
  id: number;
  name: string;
  state: number;
}

export type ResponseDataLogin = {
  data: {
    data: {
      token: string;
      banks: Array<banks>;
      payBlock: boolean;
      payments: Array<payments>;
      providercategories: Array<categories>;
      user: {
        cities: Array<cities>;
        data: data;
        franchises: Array<franchises>;
        states: Array<states>;
      };
    };
  };
};

export type returnTranslateProvider = {
  banks: Array<banks>;
  token: string;
  user: string;
};
