# Physics Calculator Server

# Servidor Calculadora Física

## Tabla de Contenido

1. [Resumen](#resumen)
2. [Tecnologías Utilizadas](#tecnologías-utilizadas)
3. [Instalación](#instalación)
4. [Arquitectura de Base de Datos](#arquitectura-de-base-de-datos)

## Resumen

El Servidor Calculadora Física es una aplicación API REST diseñada para almacenar y recuperar resultados de cálculos relacionados con la física. Proporciona endpoints para guardar y obtener resultados de cálculos con marcas de tiempo.

## Tecnologías Utilizadas

1. Node.js: Entorno de ejecución de JavaScript
2. Express.js: Framework web para construir APIs
3. MySQL: Sistema de gestión de bases de datos relacionales
4. mysql2: Controlador MySQL para Node.js
5. CORS: Middleware para manejar Cross-Origin Resource Sharing
6. dotenv: Gestión de variables de entorno
7. Docker: Plataforma de contenedorización

## Instalación

```bash
# Clonar repositorio
git clone <repository-url>
cd physics-calculator-server

# Instalar dependencias
cd server
npm install

# Iniciar servidor
npm start
```

## Arquitectura de Base de Datos

```mermaid
graph LR
    A[Base de Datos: physics_calculator] --> B[Tabla: results]
    
    C[id] --> B
    D[topic] --> B
    E[inputs] --> B
    F[result] --> B
    G[created_at] --> B
    
    H[INT] --> C
    I[AUTO_INCREMENT] --> C
    J[PRIMARY KEY] --> C
    
    K[VARCHAR(50)] --> D
    L[NOT NULL] --> D
    
    M[JSON] --> E
    N[NOT NULL] --> E
    
    O[TEXT] --> F
    P[NOT NULL] --> F
    
    Q[TIMESTAMP] --> G
    R[CURRENT_TIMESTAMP] --> G
```