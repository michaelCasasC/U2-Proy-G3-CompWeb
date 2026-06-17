import React from 'react';
import Header from '../Header';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Header />
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
