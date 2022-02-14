/* eslint-disable no-unused-vars */
import React, { createContext, useState } from 'react';
import api from '../services/api';

import { translateDataProvider } from '../helpers/translators';
import { ResponseDataLogin } from '../helpers/types/provider';

interface SignInCreadentials {
  email: string;
  password: string;
}

interface AuthState {
  token: string;
  user: object;
}

interface AuthContextData {
  user: object;
  signIn(credentials: SignInCreadentials): Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  console.log('data', data);

  const signIn = React.useCallback(async ({ email, password }) => {
    const response: ResponseDataLogin = await api.post('/login/auth', {
      login: email,
      password,
    });

    const teste = translateDataProvider(response);
    console.log('teste', teste);

    const token = '123';
    const user = { name: 'Alisson' };

    setData({ token, user });

    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));

    console.log('teste', email);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
