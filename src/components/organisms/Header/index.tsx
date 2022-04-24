import React from 'react';

import { FiAlignJustify, FiChevronsLeft } from 'react-icons/fi';
import { Container } from './styles';

type HeaderData = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const Header: React.FC<HeaderData> = ({ isOpen, setIsOpen }) => {
  return (
    <Container>
      {isOpen ? (
        <button type="button" onClick={() => setIsOpen(!isOpen)}>
          <FiChevronsLeft size={23} />
        </button>
      ) : (
        <button type="button" onClick={() => setIsOpen(!isOpen)}>
          <FiAlignJustify size={23} />
        </button>
      )}
    </Container>
  );
};
