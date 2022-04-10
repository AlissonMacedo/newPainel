import api from './api';
import { ReturnPostLoginObj } from '../helpers/types/provider';
import dtoLogin from '../dtos/Login';

interface PostLoginObj {
  email: string;
  password: string;
}

export default class Authentication {
  static async postLogin(obj: PostLoginObj) {
    const { email: login, password } = obj;
    const response: ReturnPostLoginObj = await api.post('/login/auth', {
      login,
      password,
    });
    // dto login
    const newObj = dtoLogin(response);

    return newObj;
  }
}
