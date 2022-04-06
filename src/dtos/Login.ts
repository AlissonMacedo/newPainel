import api from '../services/api';
import { ReturnPostLoginObj } from '../helpers/types/provider';

interface PostLoginObj {
  email: string;
  password: string;
}

interface banks {
  id: number;
  name: string;
}

interface returnTranslateProvider {
  banks: Array<banks>;
  token: string;
  user: string;
  providerId: number;
  providerAlias: string;
  city: string;
  state: string;
}

export default class Login {
  static async postLogin(obj: PostLoginObj) {
    const { email: login, password } = obj;
    const {
      data: { data },
    }: any = await api.post('/login/auth', {
      login,
      password,
    });

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
}
