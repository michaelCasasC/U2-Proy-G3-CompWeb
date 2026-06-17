import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/', label: 'Inicio' },
    { path: '/team', label: 'Equipo de trabajo' },
    { path: '/contact', label: 'Contactos' },
    { path: '/news', label: 'Noticias' },
    { path: '/calculator', label: 'Calculadora de Física' }
  ];

  return (
    <div className={styles.headerContent}>
      <h1 className={styles.title}>Física Pro</h1>
      <nav className={styles.nav}>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`${styles.button} ${location.pathname === item.path ? styles.active : ''}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Header;
