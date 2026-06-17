import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { path: '/', label: 'Inicio' },
    { path: '/team', label: 'Equipo' },
    { path: '/contact', label: 'Contacto' },
    { path: '/news', label: 'Noticias' },
    { path: '/calculator', label: 'Calculadora' }
  ];

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>⚛</span>
          <span className={styles.logoText}>Física<span className={styles.pro}>Pro</span></span>
        </Link>
        
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`${styles.navLink} ${
                    location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path)) 
                    ? styles.active 
                    : ''
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <button className={styles.cta}>Empezar</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
