import React from 'react';
import { styled } from '@stitches/react';
import { violet, mauve, blackA, whiteA } from '@radix-ui/colors';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { useFormikContext } from 'formik';

import { Container } from './styles';

const StyledSwitch = styled(SwitchPrimitive.Root, {
  all: 'unset',
  width: 32,
  height: 15,
  backgroundColor: blackA.blackA9,
  borderRadius: '9999px',
  position: 'relative',
  boxShadow: `0 2px 10px ${blackA.blackA7}`,
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
  '&:focus': { boxShadow: `0 0 0 2px black` },
  '&[data-state="checked"]': { backgroundColor: 'black' },
});

const StyledThumb = styled(SwitchPrimitive.Thumb, {
  display: 'block',
  width: 11,
  height: 11,
  backgroundColor: 'white',
  borderRadius: '9999px',
  boxShadow: `0 2px 2px ${blackA.blackA7}`,
  transition: 'transform 100ms',
  transform: 'translateX(2px)',
  willChange: 'transform',
  '&[data-state="checked"]': { transform: 'translateX(19px)' },
});

// Exports
export const Switch = StyledSwitch;
export const SwitchThumb = StyledThumb;

// Your app...
const Flex = styled('div', { display: 'flex' });
const Label = styled('label', {
  color: '#444',
  fontSize: 15,
  lineHeight: 1,
  userSelect: 'none',
});

interface switchData {
  optimizeOnoff: () => void;
  values: any;
}

const SwitchDemo = ({ values, optimizeOnoff }: switchData) => {
  const formik: any = useFormikContext();

  const verifyCheck = (value: boolean) => {
    if (value === true) {
      return 'Sim';
    }
    return 'Não';
  };

  const actionReturn = () => {
    const newDeliveries = values.deliveries;
    if (values.deliveryRetorn) {
      formik.setFieldValue('deliveries', newDeliveries.slice(0, -1));
    } else {
      const newArr = [...newDeliveries, values.deliveries[0]];
      formik.setFieldValue('deliveries', newArr);
    }
    formik.setFieldValue('calculed', false);
    formik.setFieldValue('route', null);
    formik.setFieldValue('deliveryRetorn', !values.deliveryRetorn);
  };
  return (
    <Container>
      <Flex css={{ alignItems: 'center' }}>
        <Label htmlFor="s1" css={{ paddingRight: 15 }}>
          Otimizar: {verifyCheck(values.optimizeWaypoints)}
        </Label>
        <Switch
          defaultChecked={values.optimizeWaypoints}
          value={values.optimizeWaypoints}
          id="s1"
          onCheckedChange={e => {
            optimizeOnoff();
            formik.setFieldValue(
              'optimizeWaypoints',
              !values.optimizeWaypoints,
            );
          }}
        >
          <SwitchThumb />
        </Switch>
      </Flex>
      <Flex css={{ alignItems: 'center' }}>
        <Label htmlFor="s1" css={{ paddingRight: 15 }}>
          Retornar: {verifyCheck(values.deliveryRetorn)}
        </Label>
        <Switch
          defaultChecked={values.deliveryRetorn}
          value={values.deliveryRetorn}
          id="s1"
          onCheckedChange={actionReturn}
        >
          <SwitchThumb />
        </Switch>
      </Flex>
    </Container>
  );
};

export default SwitchDemo;
