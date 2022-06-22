import React, { useState, useEffect } from 'react';

import { FiHome, FiTruck, FiPackage } from 'react-icons/fi';
import { IoMdExit } from 'react-icons/io';
import { useLocation } from 'react-router-dom';
import { Container } from './styles';
import { useAuth } from '../../../hooks/auth';
import { useTheme } from '../../../hooks/theme';

const SideBar = ({ isOpen }: { isOpen: boolean }) => {
  const { user, providerAlias, signOut } = useAuth();
  const { theme } = useTheme();
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
                <FiHome
                  size={18}
                  color={
                    menus === 1 ? theme.colors.cyan500 : theme.text.gray600
                  }
                />
                <a href="/">Home</a>
              </li>
              <li className={menus === 2 ? 'active' : ''}>
                <FiTruck
                  size={18}
                  color={
                    menus === 2 ? theme.colors.cyan500 : theme.text.gray600
                  }
                />
                <a href="/business">Business</a>
              </li>
              <li className={menus === 3 ? 'active' : ''}>
                <FiPackage
                  size={18}
                  color={
                    menus === 3 ? theme.colors.cyan500 : theme.text.gray600
                  }
                />
                <a href="/business">Orders</a>
              </li>
              <li className={menus === 4 ? 'active' : ''}>
                <button type="button" onClick={signOut}>
                  <IoMdExit
                    size={18}
                    color={
                      menus === 4 ? theme.colors.cyan500 : theme.text.gray600
                    }
                  />
                  <a href="/business">Sair</a>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default SideBar;
