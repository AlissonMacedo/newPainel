import * as Yup from 'yup';

export const schemaLogin = Yup.object().shape({
  email: Yup.string()
    .required('Digite um e-mail')
    .email('Digite um e-mail válido'),
  password: Yup.string().min(6, 'No mínimo seis digitos'),
});
