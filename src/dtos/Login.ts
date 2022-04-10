import {
  returnTranslateProvider,
  ReturnPostLoginObj,
} from '../helpers/types/provider';

export default function dtoLogin({ data: { data } }: ReturnPostLoginObj) {
  const { id, name } = data.user.data.provider[0];
  const {
    name: nameCity,
    stateob: { name: nameState },
  } = data.user.cities[0];

  const newObj: returnTranslateProvider = {
    banks: data.banks,
    token: data.token,
    user: data.user.data.email,
    providerId: id,
    providerAlias: name,
    city: nameCity,
    state: nameState,
  };
  return newObj;
}
