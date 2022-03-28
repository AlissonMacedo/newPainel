/* eslint-disable no-unused-vars */
import React, { createContext, useState, useContext, useCallback } from 'react';
import api from '../services/api';

import Login from '../dtos/Login';
import { SentrySetUser, SentryReset } from '../services/Sentry';
import { setUserAnalytics } from '../services/firebase/events';

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
  updateUser(newData: AuthState): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const heydrateLogin = () => {
  const token = localStorage.getItem('@PainelAlfred:token');
  const user = localStorage.getItem('@PainelAlfred:user');

  if (token && user) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    SentrySetUser({ user, token });
    setUserAnalytics(user);
    return { token, user };
  }
  return {} as AuthState;
};

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(heydrateLogin());

  const signIn = useCallback(async ({ email, password }) => {
    const { token, user } = await Login.postLogin({ email, password });

    localStorage.setItem('@PainelAlfred:token', token);
    localStorage.setItem('@PainelAlfred:user', user);

    api.defaults.headers.common.Authorization = `Bearer ${token}`;

    setData({ token, user });
    SentrySetUser({ user, token });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@PainelAlfred:token');
    localStorage.removeItem('@PainelAlfred:user');
    localStorage.removeItem('@PainelAlfred:theme');

    setData({} as AuthState);
    SentryReset();
  }, []);

  const updateUser = useCallback(newData => {
    localStorage.setItem('@PainelAlfred:user', newData.user);

    setData({ user: newData.user, token: newData.token });
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
