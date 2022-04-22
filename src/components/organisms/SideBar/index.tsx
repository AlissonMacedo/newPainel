import React from 'react';

import { Container } from './styles';

const DrawerContents = () => (
  <div className="DrawerContents__Container">Hi Im the drawer contents</div>
);

const SideBar = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <Container>
      <div
        className={`Drawer__Container ${isOpen && 'Drawer__Container--isOpen'}`}
      >
        <DrawerContents />
      </div>
    </Container>
  );
};
export default SideBar;
