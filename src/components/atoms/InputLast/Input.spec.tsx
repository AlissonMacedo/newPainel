import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Input } from '.';
import theme from '../../../styles/light';

jest.mock('@unform/core', () => {
  return {
    useField() {
      return {
        fieldName: 'email',
        defaultValue: '',
        error: '',
        registerField: jest.fn(),
      };
    },
  };
});

describe('Input component', () => {
  it('should be able to render an input', () => {
    const { getByPlaceholderText } = render(
      <ThemeProvider theme={theme}>
        <Input name="email" placeholder="E-mail" />,
      </ThemeProvider>,
    );

    expect(getByPlaceholderText('E-mail')).toBeTruthy();
  });

  it('should render highlight on input focus', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Input name="email" placeholder="E-mail" />,
      </ThemeProvider>,
    );

    const inputElement = getByPlaceholderText('E-mail');
    const containerElement = getByTestId('input-container');

    fireEvent.focus(inputElement);

    await waitFor(() => {
      expect(containerElement).toHaveStyle('color: #00dedb');
      expect(containerElement).toHaveStyle('border-color: #00dedb');
    });
  });

  it('should render highlight on input focus and blur', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Input name="email" placeholder="E-mail" />,
      </ThemeProvider>,
    );

    const inputElement = getByPlaceholderText('E-mail');
    const containerElement = getByTestId('input-container');

    fireEvent.focus(inputElement);

    await waitFor(() => {
      expect(containerElement).toHaveStyle('color: #00dedb');
      expect(containerElement).toHaveStyle('border-color: #00dedb');
    });

    fireEvent.blur(inputElement);

    await waitFor(() => {
      expect(containerElement).not.toHaveStyle('color: #00dedb');
      expect(containerElement).not.toHaveStyle('border-color: #00dedb');
    });
  });

  it('should keep input border highlight when input filled', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Input name="email" placeholder="E-mail" />,
      </ThemeProvider>,
    );

    const inputElement = getByPlaceholderText('E-mail');
    const containerElement = getByTestId('input-container');

    fireEvent.focus(inputElement);

    fireEvent.change(inputElement, {
      target: { value: 'alissontecnico@gmail.com' },
    });

    fireEvent.focus(inputElement);

    await waitFor(() => {
      expect(containerElement).toHaveStyle('color: #00dedb');
    });
  });
});
