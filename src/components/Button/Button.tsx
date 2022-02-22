import React from 'react';

import { Container } from './Button.styles';
import { ButtonProps } from './Buttton.types';

export const Button: React.FC<ButtonProps> = ({
  children,
  name,
  typeStyle,
  ...rest
}) => {
  return (
    <Container typeStyle={typeStyle}>
      <button name={name} type="button" {...rest}>
        {children}
      </button>
    </Container>
  );
};
