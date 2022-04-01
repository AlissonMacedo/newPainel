import { ToastMessage } from '../../components/ToastCotnainer/Toast/types';
import { formatAmount } from '../utils';

const errorFreight: Omit<ToastMessage, 'id'> = {
  type: 'error',
  description: 'Não foi possível calcular o frete!',
  title: 'Houve um erro',
};

const successFreight = (value: number): Omit<ToastMessage, 'id'> => ({
  type: 'success',
  description: `O valor do frete é ${formatAmount(value)},`,
  title: 'Houve um erro',
});

export { errorFreight, successFreight };
