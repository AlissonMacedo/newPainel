import React from 'react';
import { styled } from '@stitches/react';
import { violet, mauve, blackA, whiteA } from '@radix-ui/colors';
import * as SwitchPrimitive from '@radix-ui/react-switch';

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
  setFieldValue: (type: string, value: any) => void;
  values: any;
}

const SwitchDemo = ({ values, setFieldValue }: switchData) => {
  const verifyCheck = (value: boolean) => {
    if (value === true) {
      return 'Sim';
    }
    return 'Não';
  };
  return (
    <Container>
      <Flex css={{ alignItems: 'center' }}>
        <Label htmlFor="s1" css={{ paddingRight: 15 }}>
          Otimizar: {verifyCheck(values.optimizeWaypoints)}
        </Label>
        <Switch
          value={values.optimizeWaypoints}
          id="s1"
          onCheckedChange={e =>
            setFieldValue('optimizeWaypoints', !values.optimizeWaypoints)
          }
        >
          <SwitchThumb />
        </Switch>
      </Flex>
      <Flex css={{ alignItems: 'center' }}>
        <Label htmlFor="s1" css={{ paddingRight: 15 }}>
          Retornar: {verifyCheck(values.deliveryRetorn)}
        </Label>
        <Switch
          value={values.deliveryRetorn}
          id="s1"
          onCheckedChange={e =>
            setFieldValue('deliveryRetorn', !values.deliveryRetorn)
          }
        >
          <SwitchThumb />
        </Switch>
      </Flex>
    </Container>
  );
};

export default SwitchDemo;
