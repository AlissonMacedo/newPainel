import React, { useCallback, useState } from 'react';

import { FiAlertCircle } from 'react-icons/fi';
import { useFormikContext } from 'formik';
import { Container, Error } from './Input.styles';
import { InputProps } from './Input.types';

export const Input: React.FC<InputProps> = ({
  name,
  label,
  icon: Icon,
  ...rest
}) => {
  const formik: any = useFormikContext();
  const [isFocus, setIsFocus] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocus(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    console.log(
      'formik.getFieldProps(name).value',
      formik.getFieldProps(name).value,
    );
    setIsFocus(false);
    setIsFilled(!!formik.getFieldProps(name).value);
  }, []);

  return (
    <Container
      isErrored={!!formik.errors[name]}
      isFocus={isFocus}
      isFilled={isFilled}
      data-testid="input-container"
    >
      {label && (
        <div className="label">
          <strong>{label}</strong>
        </div>
      )}
      {Icon && <Icon size={20} />}
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChange={e => formik.setFieldValue(name, e.target.value)}
        value={formik.getFieldProps(name).value}
        {...rest}
      />
      {formik.errors[name] && (
        <Error title={formik.errors[name]}>
          <FiAlertCircle color="#eb3f3f" size={20} />
        </Error>
      )}
    </Container>
  );
};
