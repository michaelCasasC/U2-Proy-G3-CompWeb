# Physics Calculator Server

## Table of Contents

1. [Overview](#overview)
2. [Technologies Used](#technologies-used)
3. [Installation](#installation)
4. [Database Architecture](#database-architecture)
5. [API Endpoints](#api-endpoints)

## Overview

The Physics Calculator Server is a RESTful API application designed to store and retrieve calculation results for various physics-related topics. It provides endpoints for saving and fetching calculation results with timestamps.

## Technologies Used

| Technology | Description |
|------------|-------------|
| Node.js | JavaScript runtime environment |
| Express.js | Web framework for building APIs |
| MySQL | Relational database management system |
| mysql2 | MySQL driver for Node.js |
| CORS | Middleware for handling Cross-Origin Resource Sharing |
| dotenv | Environment variable management |
| Docker | Containerization platform |

## Installation

```bash
# Clone repository
git clone <repository-url>
cd physics-calculator-server

# Install dependencies
cd server
npm install

# Start server
npm start
```

## Database Architecture

The application uses MySQL as its database with the following structure:

```mermaid
graph TD
    A[Database: physics_calculator] --> B[Table: results]
    
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

**Database Details**:
- Database Name: `physics_calculator`
- Table: `results`

**Columns**:
- id: INT, AUTO_INCREMENT PRIMARY KEY
- topic: VARCHAR(50), NOT NULL
- inputs: JSON, NOT NULL
- result: TEXT, NOT NULL
- created_at: TIMESTAMP, DEFAULT CURRENT_TIMESTAMP

**Connection Pool Configuration**:
- Maximum connections: 10
- Queue limit: Unlimited
- Host: localhost (configurable via environment variables)

## Database Architecture

The application uses MySQL as its database with the following structure:

```mermaid
graph LR
    A[Database: physics_calculator] --> B[Table: results]
    
    C[Column: id] --> B
    D[Column: topic] --> B
    E[Column: inputs] --> B
    F[Column: result] --> B
    G[Column: created_at] --> B
    
    H[Type: INT] --> C
    I[Constraint: AUTO_INCREMENT] --> C
    J[Constraint: PRIMARY KEY] --> C
    
    K[Type: VARCHAR(50)] --> D
    L[Constraint: NOT NULL] --> D
    
    M[Type: JSON] --> E
    N[Constraint: NOT NULL] --> E
    
    O[Type: TEXT] --> F
    P[Constraint: NOT NULL] --> F
    
    Q[Type: TIMESTAMP] --> G
    R[Default: CURRENT_TIMESTAMP] --> G
```

**Database Details**:
| Property | Value |
|----------|-------|
| Database Name | `physics_calculator` |
| Table | `results` |

**Columns**:
| Column | Type | Constraints |
|--------|------|-------------|
| id | INT | AUTO_INCREMENT PRIMARY KEY |
| topic | VARCHAR(50) | NOT NULL |
| inputs | JSON | NOT NULL |
| result | TEXT | NOT NULL |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

**Connection Pool Configuration**:
- Maximum connections: 10
- Queue limit: Unlimited
- Host: localhost (configurable via environment variables)

## API Endpoints

### POST /api/results

Saves a new calculation result to the database.

**Request Body**:
```json
{
  "topic": "string",
  "inputs": "object",
  "result": "string"
}
```

**Response**:
```json
{
  "id": 1,
  "message": "Result saved successfully"
}
```

### GET /api/results

Retrieves all calculation results, ordered by creation date (newest first).

**Response**:
```json
[
  {
    "id": 1,
    "topic": "string",
    "inputs": "object",
    "result": "string",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
]
```