import React from 'react';

import { Container } from './Button.styles';
import { ButtonProps } from './Buttton.types';

export const Button: React.FC<ButtonProps> = ({
  children,
  name,
  text,
  typeStyle,
  disabled = false,
  ...rest
}) => {
  return (
    <Container typeStyle={typeStyle} disabled={disabled}>
      <button name={name} type="button" disabled={disabled} {...rest}>
        <div>
          {children}
          {text && <strong>{text}</strong>}
        </div>
      </button>
    </Container>
  );
};
