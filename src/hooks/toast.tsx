/* eslint-disable no-unused-vars */
import React, { createContext, useCallback, useState, useContext } from 'react';
import uuid from 'uuidv4';
import { ToastContainer } from '../components/ToastCotnainer';
import { ToastMessage } from '../helpers/types/toast';

interface ToastContextData {
  addToast(message: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
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

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
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
