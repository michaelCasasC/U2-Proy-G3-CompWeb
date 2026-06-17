import React, { useState } from 'react';
import InputField from '../InputField';
import saveResult from '../../services/api';
import styles from './MRU.module.css';

const MRU = () => {
  const [values, setValues] = useState({ v: '', t: '', d: '' });
  const [result, setResult] = useState(null);

  const handleChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const calculate = async () => {
    const { v, t, d } = values;
    const numV = parseFloat(v);
    const numT = parseFloat(t);
    const numD = parseFloat(d);
    let calculatedResult = '';

    if (!isNaN(numV) && !isNaN(numT)) {
      calculatedResult = `Distancia (d) = ${numV * numT} m`;
    } else if (!isNaN(numD) && !isNaN(numT) && numT !== 0) {
      calculatedResult = `Velocidad (v) = ${numD / numT} m/s`;
    } else if (!isNaN(numD) && !isNaN(numV) && numV !== 0) {
      calculatedResult = `Tiempo (t) = ${numD / numV} s`;
    } else {
      setResult('Por favor, ingresa al menos dos valores.');
      return;
    }

    setResult(calculatedResult);
    await saveResult('MRU', values, calculatedResult);
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Movimiento Rectilíneo Uniforme (MRU)</h2>
      <p className={styles.description}>Ingresa dos valores para calcular el tercero ($d = v \cdot t$)</p>
      <InputField label="Velocidad (m/s)" name="v" value={values.v} onChange={handleChange} placeholder="v" />
      <InputField label="Tiempo (s)" name="t" value={values.t} onChange={handleChange} placeholder="t" />
      <InputField label="Distancia (m)" name="d" value={values.d} onChange={handleChange} placeholder="d" />
      <button className={styles.button} onClick={calculate}>Calcular</button>
      {result && <div className={styles.result}>{result}</div>}
    </div>
  );
};

export default MRU;
