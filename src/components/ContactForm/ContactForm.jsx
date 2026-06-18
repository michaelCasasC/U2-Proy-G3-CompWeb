import { useState } from 'react';
import styles from './ContactForm.module.css';

const initialForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const ContactField = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  multiline = false,
}) => {
  const fieldProps = {
    name,
    value,
    onChange,
    placeholder,
    required: true,
  };

  return (
    <label className={styles.field}>
      <span>{label}</span>
      {multiline ? (
        <textarea {...fieldProps} rows="6" />
      ) : (
        <input {...fieldProps} type={type} />
      )}
    </label>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState(initialForm);
  const [sent, setSent] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSent(true);
    setFormData(initialForm);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <ContactField
          label="Nombre"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Tu nombre completo"
        />

        <ContactField
          label="Correo"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="nombre@correo.com"
        />
      </div>

      <ContactField
        label="Asunto"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        placeholder="Consulta sobre física o la plataforma"
      />

      <ContactField
        label="Mensaje"
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Cuéntanos cómo podemos ayudarte"
        multiline
      />

      {sent && (
        <p className={styles.success}>
          Mensaje registrado. Te responderemos pronto.
        </p>
      )}

      <button className={styles.submitButton} type="submit">
        Enviar mensaje
      </button>
    </form>
  );
};

export default ContactForm;
