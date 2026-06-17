import React, { useState } from 'react';
import InputField from '../InputField';
import saveResult from '../../services/api';
import styles from './MRUA.module.css';

const MRUA = () => {
  const [values, setValues] = useState({ vi: '', vf: '', a: '', t: '', d: '' });
  const [result, setResult] = useState(null);

  const handleChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const calculate = async () => {
    const { vi, vf, a, t, d } = values;
    const nVi = parseFloat(vi);
    const nA = parseFloat(a);
    const nT = parseFloat(t);
    let calculatedResult = '';

    if (!isNaN(nVi) && !isNaN(nA) && !isNaN(nT)) {
      calculatedResult = `Velocidad Final (vf) = ${nVi + nA * nT} m/s | Distancia (d) = ${nVi * nT + 0.5 * nA * Math.pow(nT, 2)} m`;
    } else {
      setResult('Ingresa vi, a y t para cálculos básicos.');
      return;
    }

    setResult(calculatedResult);
    await saveResult('MRUA', values, calculatedResult);
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
