import React, { useState } from 'react';
import InputField from '../InputField';
import styles from './MRUA.module.css';

const MRUA = () => {
  const [values, setValues] = useState({ vi: '', vf: '', a: '', t: '', d: '' });
  const [result, setResult] = useState(null);

  const handleChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const calculate = () => {
    const { vi, vf, a, t, d } = values;
    const nVi = parseFloat(vi);
    const nA = parseFloat(a);
    const nT = parseFloat(t);

    if (!isNaN(nVi) && !isNaN(nA) && !isNaN(nT)) {
      setResult(`Velocidad Final (vf) = ${nVi + nA * nT} m/s | Distancia (d) = ${nVi * nT + 0.5 * nA * Math.pow(nT, 2)} m`);
    } else {
      setResult('Ingresa vi, a y t para cálculos básicos.');
    }
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>MRU Variado (MRUA)</h2>
      <InputField label="Vel. Inicial (vi)" name="vi" value={values.vi} onChange={handleChange} />
      <InputField label="Aceleración (a)" name="a" value={values.a} onChange={handleChange} />
      <InputField label="Tiempo (t)" name="t" value={values.t} onChange={handleChange} />
      <button className={styles.button} onClick={calculate}>Calcular</button>
      {result && <div className={styles.result}>{result}</div>}
    </div>
  );
};

export default MRUA;
