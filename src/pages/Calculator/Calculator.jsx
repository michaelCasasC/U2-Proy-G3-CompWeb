import React, { useState } from 'react';
import { MRU, MRUA, FreeFall } from '../../components';
import styles from './Calculator.module.css';

const Calculator = () => {
  const [currentTopic, setCurrentTopic] = useState("MRU");

  const renderTopic = () => {
    switch (currentTopic) {
      case "MRU":
        return <MRU />;
      case "MRUA":
        return <MRUA />;
      case "FREE_FALL":
        return <FreeFall />;
      default:
        return <MRU />;
    }
  };

  const topics = [
    { id: 'MRU', label: 'MRU' },
    { id: 'MRUA', label: 'MRUA' },
    { id: 'FREE_FALL', label: 'Caída Libre' }
  ];

  return (
    <div className={styles.container}>
      <nav className={styles.subnav}>
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
      <div className={styles.content}>
        {renderTopic()}
      </div>
    </div>
  );
};

export default Calculator;
