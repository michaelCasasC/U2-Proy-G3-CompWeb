import React from 'react';
import { Card } from '../../components';
import styles from './Team.module.css';

const Team = () => {
  const members = [
    {
      id: 1,
      name: 'Alex Rivera',
      description: 'Ingeniero de Software especializado en Física Computacional. Apasionado por crear herramientas educativas interactivas.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=687&auto=format&fit=crop'
    },
    {
      id: 2,
      name: 'Elena Martínez',
      description: 'Diseñadora UX/UI enfocada en accesibilidad. Se encarga de que la experiencia del usuario sea fluida y visualmente atractiva.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop'
    }
  ];

  return (
    <div className={styles.team}>
      <div className={styles.header}>
        <h1 className={styles.title}>Nuestro Equipo</h1>
        <p className={styles.subtitle}>Las mentes detrás de Física Pro.</p>
      </div>
      <div className={styles.grid}>
        {members.map(member => (
          <Card 
            key={member.id}
            name={member.name}
            description={member.description}
            image={member.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Team;
