/* eslint-disable no-unused-vars */
import React, { createContext, useState, useContext, useCallback } from 'react';
import api from '../services/api';

import { translateDataProvider } from '../helpers/translators';
import { ResponseDataLogin } from '../helpers/types/provider';

interface SignInCreadentials {
  email: string;
  password: string;
}
interface AuthState {
  token: string;
  user: string;
}
interface AuthContextData {
  user: string;
  signIn(credentials: SignInCreadentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@PainelAlfred:token');
    const user = localStorage.getItem('@PainelAlfred:user');

    if (token && user) {
      return { token, user };
    }
    return {} as AuthState;
  });

  const signIn = React.useCallback(async ({ email, password }) => {
    const response: ResponseDataLogin = await api.post('/login/auth', {
      login: email,
      password,
    });

    const newObjProvider = translateDataProvider(response);
    const { token, user } = newObjProvider;

    setData({ token, user });

    localStorage.setItem('@PainelAlfred:token', token);
    localStorage.setItem('@PainelAlfred:user', user);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@PainelAlfred:token');
    localStorage.removeItem('@PainelAlfred:user');
    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
