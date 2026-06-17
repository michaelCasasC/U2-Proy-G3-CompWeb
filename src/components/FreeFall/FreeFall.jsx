import React, { useState } from 'react';
import InputField from '../InputField';
import saveResult from '../../services/api';
import styles from './FreeFall.module.css';

const FreeFall = () => {
  const [values, setValues] = useState({ t: '', h: '' });
  const [result, setResult] = useState(null);
  const g = 9.81;

  const handleChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const calculate = async () => {
    const nT = parseFloat(values.t);
    const nH = parseFloat(values.h);
    let calculatedResult = '';

    if (!isNaN(nT)) {
      const h = 0.5 * g * Math.pow(nT, 2);
      const vf = g * nT;
      calculatedResult = `Altura (h) = ${h.toFixed(2)} m | Vel. Final = ${vf.toFixed(2)} m/s`;
    } else if (!isNaN(nH)) {
      const t = Math.sqrt((2 * nH) / g);
      calculatedResult = `Tiempo (t) = ${t.toFixed(2)} s`;
    } else {
      setResult('Ingresa tiempo o altura.');
      return;
    }

    setResult(calculatedResult);
    await saveResult('FREE_FALL', values, calculatedResult);
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Caída Libre</h2>
      <p className={styles.description}>Considerando $g = 9.81 m/s^2$ y $v_i = 0$</p>
      <InputField label="Tiempo (s)" name="t" value={values.t} onChange={handleChange} />
      <InputField label="Altura (m)" name="h" value={values.h} onChange={handleChange} />
      <button className={styles.button} onClick={calculate}>Calcular</button>
      {result && <div className={styles.result}>{result}</div>}
    </div>
  );
};

export default FreeFall;
