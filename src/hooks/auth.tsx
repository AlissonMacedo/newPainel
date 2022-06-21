/* eslint-disable no-unused-vars */
import React, { createContext, useState, useContext, useCallback } from 'react';
import api from '../services/api';

import Login from '../services/Authentication';
import { SentrySetUser, SentryReset } from '../services/Sentry';
import { setUserAnalytics } from '../services/firebase/events';

interface SignInCreadentials {
  email: string;
  password: string;
}

interface dataData {
  id: number;
  name: string;
}

interface AuthState {
  banks: Array<dataData>;
  token: string;
  user: string;
  providerId: number;
  providerAlias: string;
  city: string;
  state: string;
  config: {
    sideBar: boolean;
  };
}
interface AuthContextData {
  user?: string;
  token?: string;
  providerId?: number;
  providerAlias?: string;
  city?: string;
  state?: string;
  signIn(credentials: SignInCreadentials): Promise<void>;
  signOut(): void;
  updateUser(newData: AuthState): void;
  config: {
    sideBar: boolean;
  };
  openCloseSideBar(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@PainelAlfred:token');
    const newUser = JSON.parse(
      localStorage.getItem('@PainelAlfred:user') || '{}',
    );

    if (newUser) {
      const { user, providerId, banks, providerAlias, city, state } = newUser;

      if (token && user) {
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
        SentrySetUser({ user, token });
        setUserAnalytics(user);
        return {
          token,
          user,
          providerId,
          banks,
          providerAlias,
          city,
          state,
          config: { sideBar: false },
        };
      }
    }
    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const { token, user, providerId, banks, providerAlias, city, state } =
      await Login.postLogin({
        email,
        password,
      });

    localStorage.setItem('@PainelAlfred:token', token);
    localStorage.setItem(
      '@PainelAlfred:user',
      JSON.stringify({
        token,
        user,
        providerId,
        banks,
        providerAlias,
        city,
        state,
      }),
    );

    api.defaults.headers.common.Authorization = `Bearer ${token}`;

    setData({
      token,
      user,
      banks,
      providerId,
      providerAlias,
      city,
      state,
      config: { sideBar: false },
    });
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
    console.log('teste');
    // localStorage.setItem('@PainelAlfred:user', newData.user);

    // setData({ , user: newData.user, token: newData.token });
  }, []);

  const openCloseSideBar = () => {
    if (data.config.sideBar === false) {
      setData({
        ...data,
        config: { sideBar: true },
      });
    } else {
      setData({
        ...data,
        config: { sideBar: false },
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: data?.user,
        token: data?.token,
        providerId: data?.providerId,
        providerAlias: data?.providerAlias,
        city: data?.city,
        state: data?.state,
        signIn,
        signOut,
        updateUser,
        config: data?.config,
        openCloseSideBar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
