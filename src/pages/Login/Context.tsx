import React, { createContext, useContext, useState, useRef } from 'react';

import { useHistory } from 'react-router-dom';
import * as Sentry from '@sentry/react';

import { FormHandles } from '@unform/core';
import getValidationErrors from '../../helpers/getValidationErrors';
import { schemaLogin } from '../../helpers/schemas';

import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';

interface SignInFormData {
  email: string;
  password: string;
}

interface LoginData {
  handleSubmit(data: SignInFormData): Promise<void>;
  loading: boolean;
  formRef: any;
}

const LoginContext = createContext<LoginData>({} as LoginData);

const LoginProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { signIn } = useAuth();
  const history = useHistory();

  const handleSubmit = async (data: SignInFormData) => {
    try {
      setLoading(true);
      formRef.current?.setErrors({});

      await schemaLogin.validate(data, { abortEarly: false });
      await signIn(data);

      addToast({
        type: 'success',
        description: 'Tudo certo!',
        title: 'success',
      });

      history.push('/home');
    } catch (err: any) {
      Sentry.captureException(err);
      addToast({
        type: 'error',
        description: 'Não foi possível realizar o login!',
        title: 'Houve um erro',
      });

      const errors = getValidationErrors(err);
      formRef.current?.setErrors(errors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContext.Provider value={{ handleSubmit, loading, formRef }}>
      {children}
    </LoginContext.Provider>
  );
};

function useLogin() {
  const context = useContext(LoginContext);

  if (!context) {
    throw new Error('useLogin must be used with in an LoginProvider');
  }

  return context;
}

export { LoginProvider, useLogin };
