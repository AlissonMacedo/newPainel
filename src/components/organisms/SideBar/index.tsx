import React from 'react';

import { FiHome, FiTruck, FiPackage } from 'react-icons/fi';
import { Container } from './styles';

const SideBar = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <Container>
      <div
        className={`Drawer__Container ${isOpen && 'Drawer__Container--isOpen'}`}
      >
        <div>
          <div className="AvatarContents">
            <div className="imageAvatar" />
            <span className="Name__User">Alisson Macedo</span>
            <span className="Name__Company">Compania de Bebidas LTDA</span>
          </div>
          <div>
            <ul>
              <li className="active">
                <FiHome />
                <a href="/">Home</a>
              </li>
              <li>
                <FiTruck />
                <a href="/business">Business</a>
              </li>
              <li>
                <FiPackage />
                <a href="/business">Orders</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default SideBar;
