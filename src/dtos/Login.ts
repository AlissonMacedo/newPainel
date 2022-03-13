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
}

export default class Login {
  static async postLogin(obj: PostLoginObj) {
    const { email: login, password } = obj;
    const {
      data: { data },
    }: ReturnPostLoginObj = await api.post('/login/auth', {
      login,
      password,
    });

    const newObj: returnTranslateProvider = {
      banks: data.banks,
      token: data.token,
      user: data.user.data.email,
    };

    return newObj;
  }
}
