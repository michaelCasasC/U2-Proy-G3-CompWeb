import { ContactForm } from '../../components';
import styles from './Contact.module.css';

const Contact = () => {
  return (
    <div className={styles.container}>
      <section className={styles.header}>
        <h1 className={styles.title}>Contactos</h1>
        <p className={styles.subtitle}>
          Ponte en contacto con nosotros para resolver dudas, compartir sugerencias o pedir apoyo con tus ejercicios.
        </p>
      </section>

      <section className={styles.content}>
        <div className={styles.info}>
          <span className={styles.badge}>Física Pro</span>
          <h2>Estamos listos para ayudarte</h2>
          <p>
            Escríbenos con el tema que necesitas revisar y nuestro equipo responderá con una guía clara para continuar aprendiendo.
          </p>

          <div className={styles.contactList}>
            <div className={styles.contactItem}>
              <strong>Correo</strong>
              <span>soporte@fisicapro.edu</span>
            </div>
            <div className={styles.contactItem}>
              <strong>Horario</strong>
              <span>Lunes a viernes, 08:00 - 18:00</span>
            </div>
            <div className={styles.contactItem}>
              <strong>Respuesta</strong>
              <span>Dentro de 24 horas laborables</span>
            </div>
          </div>
        </div>

        <ContactForm />
      </section>
    </div>
  );
};

export default Contact;
