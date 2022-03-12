/* eslint-disable no-unused-vars */
import React, { createContext, useState, useContext, useCallback } from 'react';
import api from '../services/api';

import Login from '../Dto/Login';
import { SentrySetUser, SentryReset } from '../services/Sentry';

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

const heydrateLogin = () => {
  const token = localStorage.getItem('@PainelAlfred:token');
  const user = localStorage.getItem('@PainelAlfred:user');

  if (token && user) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    SentrySetUser({ user, token });
    return { token, user };
  }
  return {} as AuthState;
};

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(heydrateLogin());

  const signIn = useCallback(async ({ email, password }) => {
    const { token, user } = await Login.postLogin({ email, password });

    setData({ token, user });

    localStorage.setItem('@PainelAlfred:token', token);
    localStorage.setItem('@PainelAlfred:user', user);

    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    SentrySetUser({ user, token });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@PainelAlfred:token');
    localStorage.removeItem('@PainelAlfred:user');
    localStorage.removeItem('@PainelAlfred:theme');
    setData({} as AuthState);
    SentryReset();
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
