import React from 'react';
import styles from './Header.module.css';

const Header = ({ currentPage, setCurrentPage }) => {
  const menuItems = [
    { id: 'HOME', label: 'Inicio' },
    { id: 'TEAM', label: 'Equipo de trabajo' },
    { id: 'CONTACT', label: 'Contactos' },
    { id: 'NEWS', label: 'Noticias' },
    { id: 'CALCULATOR', label: 'Calculadora de Física' }
  ];

  return (
    <div className={styles.headerContent}>
      <h1 className={styles.title}>Física Pro</h1>
      <nav className={styles.nav}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`${styles.button} ${currentPage === item.id ? styles.active : ''}`}
            onClick={() => setCurrentPage(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Header;
