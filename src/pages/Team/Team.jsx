import React from "react";
import { Card } from "../../components";
import styles from "./Team.module.css";

const Team = () => {
  const members = [
    {
      id: 1,
      name: "Jefferson Mejía",
      description:
        "Ingeniero en proceso especializado en programación. Apasionado por crear herramientas educativas interactivas.",
      image:
        "https://media.licdn.com/dms/image/v2/D4E03AQH3-qOBt-EJEQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1711238029112?e=2147483647&v=beta&t=Vaync_DpSw0xSFjgCVvT670IJg7Fm1-MSxi4XTmcKsA",
    },
    {
      id: 2,
      name: "Michael Casas",
      description:
        "Diseñador UX/UI enfocado en accesibilidad. Se encarga de que la experiencia del usuario sea fluida y visualmente atractiva.",
      image: "https://contents.bebee.com/users/id/gz2oL6413c92fd1aa5/_avatar-6cpzP-400.png",
    },
  ];

  return (
    <div className={styles.team}>
      <div className={styles.header}>
        <h1 className={styles.title}>Nuestro Equipo</h1>
        <p className={styles.subtitle}>Las mentes detrás de Física Pro.</p>
      </div>
      <div className={styles.grid}>
        {members.map((member) => (
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
