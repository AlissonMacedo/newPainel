import CurrencyFormatter from 'currency-formatter';

const cpfMask = (value: string) => {
  const valueString = value.toString();
  return valueString
    .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1'); // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
};

const cnpjMask = (value: string) => {
  if (value) {
    const valueString = value.toString();
    return valueString
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d{3})?(\d{3})?(\d{4})?(\d{2})?/, '$1 $2 $3/$4-$5');
  }
  return '';
};

const auxFormatPhone = (value: string) => {
  if (value) {
    const regex = /^([0-9]{3})([0-9]{5})([0-9]{4})$/;
    const str = value
      .replace('+55', '')
      .replace(/[^0-9]/g, '')
      .slice(0, 12);

    const result = str.replace(regex, '($1) $2-$3');

    return result;
  }
  return ' ';
};

const formatPhone = (value: string) => {
  if (!value) return '';
  const newVal = auxFormatPhone(value);
  let aux = newVal.replace(/[^0-9]+/g, '');
  if (!aux.includes('+55')) aux = `+55${aux}`;
  return aux;
};

const formatAmount = (val: number) => {
  return CurrencyFormatter.format(val, {
    decimal: ',',
    thousand: '.',
    precision: 2,
    locale: 'pt-BR',
  });
};

export default function incrementAlfabet(number: number): string {
  const alfabet = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  return alfabet[number];
}

export {
  cpfMask,
  cnpjMask,
  auxFormatPhone,
  formatPhone,
  formatAmount,
  incrementAlfabet,
};
