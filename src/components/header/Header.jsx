import React from 'react';
import styles from './Header.module.css';

const Header = ({ currentTopic, setCurrentTopic }) => {
  const topics = [
    { id: 'MRU', label: 'MRU' },
    { id: 'MRUA', label: 'MRUA' },
    { id: 'FREE_FALL', label: 'Caída Libre' }
  ];

  return (
    <div className={styles.headerContent}>
      <h1 className={styles.title}>Calculadora de Física</h1>
      <nav className={styles.nav}>
        {topics.map((topic) => (
          <button
            key={topic.id}
            className={`${styles.button} ${currentTopic === topic.id ? styles.active : ''}`}
            onClick={() => setCurrentTopic(topic.id)}
          >
            {topic.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Header;
