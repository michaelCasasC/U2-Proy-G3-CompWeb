import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <div className={styles.glassCard}>
            <h1 className={styles.title}>
              Explora el Mundo de la <span className={styles.accent}>Física</span>
            </h1>
            <p className={styles.subtitle}>
              Una herramienta moderna y dinámica para resolver problemas de cinemática de forma
              sencilla y precisa.
            </p>
            <div className={styles.heroButtons}>
              <Link to="/calculator" className={styles.primaryBtn}>Empezar ahora</Link>
              <Link to="/news" className={styles.secondaryBtn}>Saber más</Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.intro}>
        <div className={styles.introGrid}>
          <div className={styles.introItem}>
            <h3>Rápido</h3>
            <p>Resultados instantáneos para tus cálculos de cinemática.</p>
          </div>
          <div className={styles.introItem}>
            <h3>Preciso</h3>
            <p>Algoritmos basados en las leyes fundamentales de la física.</p>
          </div>
          <div className={styles.introItem}>
            <h3>Moderno</h3>
            <p>Interfaz intuitiva diseñada con los últimos estándares web.</p>
          </div>
        </div>
      </section>

      <section className={styles.aboutProject}>
        <h2>Sobre el Proyecto</h2>
        <p>
          Este proyecto nace con la misión de facilitar el aprendizaje y la resolución de ejercicios
          de física para estudiantes y entusiastas. Nos enfocamos en los temas clave de la
          cinemática: MRU, MRUA y Caída Libre, ofreciendo una experiencia interactiva y educativa.
        </p>
      </section>
    </div>
  );
};

export default Home;
