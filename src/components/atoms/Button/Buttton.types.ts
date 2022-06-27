import { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name?: string;
  typeStyle?: 'primary' | 'secondary' | 'info' | 'error';
  text?: string;
  disabled?: boolean;
}
