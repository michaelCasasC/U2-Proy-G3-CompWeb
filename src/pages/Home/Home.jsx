import React from 'react';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Explora el Mundo de la <span className={styles.accent}>Física</span></h1>
          <p className={styles.subtitle}>
            Una herramienta moderna y dinámica para resolver problemas de cinemática de forma sencilla y precisa.
          </p>
          <div className={styles.heroButtons}>
            <button className={styles.primaryBtn}>Empezar ahora</button>
            <button className={styles.secondaryBtn}>Saber más</button>
          </div>
        </div>
        <div className={styles.heroImage}>
          <img src="https://images.unsplash.com/photo-1636466484362-c133a046053e?q=80&w=1073&auto=format&fit=crop" alt="Physics Concept" />
        </div>
      </section>

      <section className={styles.intro}>
        <div className={styles.introGrid}>
          <div className={styles.introItem}>
            <div className={styles.icon}>🚀</div>
            <h3>Rápido</h3>
            <p>Resultados instantáneos para tus cálculos de cinemática.</p>
          </div>
          <div className={styles.introItem}>
            <div className={styles.icon}>🎯</div>
            <h3>Preciso</h3>
            <p>Algoritmos basados en las leyes fundamentales de la física.</p>
          </div>
          <div className={styles.introItem}>
            <div className={styles.icon}>📱</div>
            <h3>Moderno</h3>
            <p>Interfaz intuitiva diseñada con los últimos estándares web.</p>
          </div>
        </div>
      </section>

      <section className={styles.aboutProject}>
        <h2>Sobre el Proyecto</h2>
        <p>
          Este proyecto nace con la misión de facilitar el aprendizaje y la resolución de ejercicios de física 
          para estudiantes y entusiastas. Nos enfocamos en los temas clave de la cinemática: MRU, MRUA y Caída Libre, 
          ofreciendo una experiencia interactiva y educativa.
        </p>
      </section>
    </div>
  );
};

export default Home;
