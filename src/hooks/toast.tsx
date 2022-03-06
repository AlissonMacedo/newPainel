/* eslint-disable no-unused-vars */
import React, { createContext, useCallback, useState, useContext } from 'react';
import uuid from 'uuidv4';
import { ToastContainer } from '../components/ToastCotnainer';
import { ToastMessage } from '../components/ToastCotnainer/Toast/types';

interface Teste {
  data: object | boolean | null;
  msg: string;
  error: {
    type: 'success' | 'error' | 'info' | 'warning';
    msg: string;
  };
}
interface ToastContextData {
  addToast(message: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
  errorCather(data: Teste): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback((message: Omit<ToastMessage, 'id'>) => {
    const id = uuid();
    const toast = {
      id,
      type: message.type,
      title: message.title,
      description: message.description,
    };

    setMessages(prevState => [...prevState, toast]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setMessages(prevState => prevState.filter(message => message.id !== id));
  }, []);

  const errorCather = ({ data, msg, error }: Teste) => {
    if (data) {
      return addToast({
        title: 'Tudo certo!',
        type: 'success',
        description: `${msg}`,
      });
    }

    if (error.type === 'warning') {
      return addToast({
        title: 'Atenção!',
        type: 'info',
        description: `${error.msg}`,
      });
    }

    if (error.type === 'error') {
      return addToast({
        title: 'Houve um erro!',
        type: 'error',
        description: `${error.msg}`,
      });
    }

    if (error.type === 'info') {
      return addToast({
        title: 'Houve um erro!',
        type: 'info',
        description: `${error.msg}`,
      });
    }

    return addToast({
      title: 'Atenção',
      type: 'info',
      description: 'Não houve retorno',
    });
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast, errorCather }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within an ToastContext');
  }
  return context;
}

export { ToastProvider, useToast };
