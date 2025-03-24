import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './MainNavigation.module.css';

const MainNavigation: React.FC = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink
            to="/products"
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Главная
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/create-product"
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Создать продукт
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default MainNavigation;
