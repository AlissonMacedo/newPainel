import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  err.inner?.map(item => {
    if (item.path) {
      validationErrors[item.path] = item.message;
    }
    return null;
  });

  return validationErrors;
}
