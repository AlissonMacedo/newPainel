import React from 'react';

import { FiAlignJustify, FiChevronsLeft } from 'react-icons/fi';
import { Container } from './styles';

type HeaderData = {
  isOpen: boolean;
  setIsOpen: () => void;
};

export const Header: React.FC<HeaderData> = ({ isOpen, setIsOpen }) => {
  return (
    <Container>
      {isOpen ? (
        <button type="button" onClick={() => setIsOpen()}>
          <FiChevronsLeft size={23} />
        </button>
      ) : (
        <button type="button" onClick={() => setIsOpen()}>
          <FiAlignJustify size={23} />
        </button>
      )}
    </Container>
  );
};
