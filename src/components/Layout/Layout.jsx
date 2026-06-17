import React from 'react';
import Header from '../Header';
import styles from './Layout.module.css';

const Layout = ({ children, headerProps }) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Header {...headerProps} />
      </header>
      <main className={styles.main}>
        {children}
      </main>
      <footer className={styles.footer}>
        <p>Calculadora de Física © 2026</p>
      </footer>
    </div>
  );
};

export default Layout;
