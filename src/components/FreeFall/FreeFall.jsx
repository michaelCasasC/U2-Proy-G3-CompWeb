import React, { useState } from 'react';
import InputField from '../InputField';
import saveResult from '../../services/api';
import styles from './FreeFall.module.css';

const FreeFall = () => {
  const [values, setValues] = useState({ h: '' });
  const [result, setResult] = useState(null);
  const g = 9.81;

  const handleChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const calculate = async () => {
    const nH = parseFloat(values.h);
    
    if (isNaN(nH) || nH < 0) {
      setResult({ error: 'Por favor, ingresa una altura válida (mayor o igual a 0).' });
      return;
    }

    const t = Math.sqrt((2 * nH) / g);
    const vf = g * t;

    const calculatedResult = {
      time: t.toFixed(2),
      velocity: vf.toFixed(2),
      height: nH.toFixed(2)
    };

    setResult(calculatedResult);
    await saveResult('FREE_FALL', values, `h=${nH}m => t=${calculatedResult.time}s, vf=${calculatedResult.velocity}m/s`);
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Caída Libre</h2>
      <p className={styles.description}>
        Calcula el tiempo y la velocidad final basándote en la altura de caída.
      </p>
      
      <div className={styles.inputGroup}>
        <InputField 
          label="Altura de caída (m)" 
          name="h" 
          value={values.h} 
          onChange={handleChange} 
          placeholder="Ej: 10"
        />
      </div>

      <button className={styles.button} onClick={calculate}>Calcular</button>

      {result && !result.error && (
        <div className={styles.resultContainer}>
          <div className={styles.resultItem}>
            <span className={styles.resultLabel}>Tiempo de caída:</span>
            <span className={styles.resultValue}>{result.time} s</span>
          </div>
          <div className={styles.resultItem}>
            <span className={styles.resultLabel}>Velocidad Final:</span>
            <span className={styles.resultValue}>{result.velocity} m/s</span>
          </div>
        </div>
      )}

      {result?.error && <div className={styles.error}>{result.error}</div>}

      <div className={styles.educationalNote}>
        <strong>¿Sabías qué?</strong> En caída libre ideal (sin resistencia del aire), todos los objetos caen con la misma aceleración ($9.81 m/s^2$) sin importar su peso o masa.
      </div>
    </div>
  );
};

export default FreeFall;
