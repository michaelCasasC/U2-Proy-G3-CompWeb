import React from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { MRU, MRUA, FreeFall } from '../../components';
import styles from './Calculator.module.css';

const Calculator = () => {
  const location = useLocation();

  const topics = [
    { path: 'mru', label: 'MRU' },
    { path: 'mrua', label: 'MRUA' },
    { path: 'free-fall', label: 'Caída Libre' }
  ];

  return (
    <div className={styles.container}>
      <nav className={styles.subnav}>
        {topics.map((topic) => (
          <Link
            key={topic.path}
            to={topic.path}
            className={`${styles.button} ${location.pathname.includes(topic.path) ? styles.active : ''}`}
          >
            {topic.label}
          </Link>
        ))}
      </nav>
      <div className={styles.content}>
        <Routes>
          <Route index element={<Navigate to="mru" replace />} />
          <Route path="mru" element={<MRU />} />
          <Route path="mrua" element={<MRUA />} />
          <Route path="free-fall" element={<FreeFall />} />
        </Routes>
      </div>
    </div>
  );
};

export default Calculator;
