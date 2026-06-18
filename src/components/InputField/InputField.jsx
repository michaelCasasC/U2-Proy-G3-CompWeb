import React from 'react';
import styles from './InputField.module.css';

const InputField = ({ label, value, onChange, placeholder, name }) => {
  const inputId = `input-${name}`;
  return (
    <div className={styles.inputField}>
      <label htmlFor={inputId} className={styles.label}>{label}</label>
      <input
        id={inputId}
        type="number"
        className={styles.input}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
