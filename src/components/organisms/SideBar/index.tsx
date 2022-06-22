import React, { useState, useEffect } from 'react';

import { FiHome, FiTruck, FiPackage } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';
import { Container } from './styles';
import { useAuth } from '../../../hooks/auth';

const SideBar = ({ isOpen }: { isOpen: boolean }) => {
  const { user, providerAlias } = useAuth();
  const { pathname } = useLocation();

  const [menus, setMenus] = useState(1);

  useEffect(() => {
    if (pathname === '/') return setMenus(1);
    if (pathname === '/business') return setMenus(2);
    if (pathname === '/orders') return setMenus(3);

    return setMenus(1);
  }, []);

  return (
    <Container>
      <div
        className={`Drawer__Container ${isOpen && 'Drawer__Container--isOpen'}`}
      >
        <div>
          <div className="AvatarContents">
            <div className="imageAvatar" />
            <span className="Name__User">{user}</span>
            <span className="Name__Company">{providerAlias}</span>
          </div>
          <div>
            <ul>
              <li className={menus === 1 ? 'active' : ''}>
                <FiHome />
                <a href="/">Home</a>
              </li>
              <li className={menus === 2 ? 'active' : ''}>
                <FiTruck />
                <a href="/business">Business</a>
              </li>
              <li className={menus === 3 ? 'active' : ''}>
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
