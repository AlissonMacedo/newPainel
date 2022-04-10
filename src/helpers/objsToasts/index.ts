import { ToastMessage } from '../../components/ToastCotnainer/Toast/types';
import { formatAmount } from '../utils';

// freight
const errorFreight: Omit<ToastMessage, 'id'> = {
  type: 'error',
  description: 'Não foi possível calcular o frete!',
  title: 'Houve um erro',
};

const successFreight = (value: number): Omit<ToastMessage, 'id'> => ({
  type: 'success',
  description: `O valor do frete é ${formatAmount(value)},`,
  title: 'Tudo certo!',
});

// Business
const errorBusiness = (): Omit<ToastMessage, 'id'> => ({
  type: 'error',
  description: 'Não foi possível criar o pedido!',
  title: 'Houve um erro',
});

const successBusiness = (): Omit<ToastMessage, 'id'> => ({
  type: 'success',
  description: 'Pedido criado com sucesso!',
  title: 'Tudo certo',
});

export { errorFreight, successFreight, successBusiness, errorBusiness };
