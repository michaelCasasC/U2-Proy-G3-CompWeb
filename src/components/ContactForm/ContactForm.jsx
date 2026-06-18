import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.css';

const initialForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const initialErrors = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const fieldMessages = {
  name: 'Escribe tu nombre para saber a quién responder.',
  email: 'Ingresa un correo válido para poder contactarte.',
  subject: 'Indica el tema de tu consulta.',
  message: 'Cuéntanos un poco más para poder ayudarte mejor.',
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ContactField = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  multiline = false,
}) => {
  const inputId = `contact-${name}`;
  const errorId = `${inputId}-error`;
  const fieldProps = {
    id: inputId,
    name,
    value,
    onChange,
    onBlur,
    placeholder,
    'aria-invalid': Boolean(error),
    'aria-describedby': error ? errorId : undefined,
  };

  return (
    <label className={styles.field}>
      <span>{label}</span>
      {multiline ? (
        <textarea {...fieldProps} rows="6" />
      ) : (
        <input {...fieldProps} type={type} />
      )}
      {error && (
        <span className={styles.error} id={errorId} role="alert">
          {error}
        </span>
      )}
    </label>
  );
};

ContactField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.string,
  multiline: PropTypes.bool,
};

const ContactForm = () => {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [sent, setSent] = useState(false);

  const validateField = (name, value) => {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return fieldMessages[name];
    }

    if (name === 'email' && !emailPattern.test(trimmedValue)) {
      return 'Usa un correo con formato válido, por ejemplo nombre@correo.com.';
    }

    if (name === 'message' && trimmedValue.length < 12) {
      return 'El mensaje debe tener al menos 12 caracteres.';
    }

    return '';
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
    setSent(false);

    if (errors[name]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [name]: validateField(name, value),
      }));
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: validateField(name, value),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = Object.keys(formData).reduce((currentErrors, fieldName) => ({
      ...currentErrors,
      [fieldName]: validateField(fieldName, formData[fieldName]),
    }), {});

    setErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      setSent(false);
      return;
    }

    setSent(true);
    setFormData(initialForm);
    setErrors(initialErrors);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.row}>
        <ContactField
          label="Nombre"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Tu nombre completo"
          error={errors.name}
        />

        <ContactField
          label="Correo"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="nombre@correo.com"
          error={errors.email}
        />
      </div>

      <ContactField
        label="Asunto"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Consulta sobre física o la plataforma"
        error={errors.subject}
      />

      <ContactField
        label="Mensaje"
        name="message"
        value={formData.message}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Cuéntanos cómo podemos ayudarte"
        error={errors.message}
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
