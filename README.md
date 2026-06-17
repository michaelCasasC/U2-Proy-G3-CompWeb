# Physics Calculator Server

## Table of Contents

| # | Section |
|---|---------|
| 1 | [Overview](#overview) |
| 2 | [Technologies Used](#technologies-used) |
| 3 | [Installation](#installation) |
| 4 | [Database Architecture](#database-architecture) |
| 5 | [API Endpoints](#api-endpoints) |

## Overview

The Physics Calculator Server is a RESTful API application designed to store and retrieve calculation results for various physics-related topics. It provides endpoints for saving and fetching calculation results with timestamps.

## Technologies Used

- **Node.js**: JavaScript runtime environment
- **Express.js**: Web framework for building APIs
- **MySQL**: Relational database management system
- **mysql2**: MySQL driver for Node.js
- **CORS**: Middleware for handling Cross-Origin Resource Sharing
- **dotenv**: Environment variable management
- **Docker**: Containerization platform

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MySQL database server

### Steps

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd physics-calculator-server
   ```

2. Navigate to the server directory:
   ```bash
   cd server
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file (if not already present):
   ```bash
   DB_HOST=127.0.0.1
   DB_USER=physics_user
   DB_PASSWORD=physics_password
   DB_DATABASE=physics_calculator
   ```

5. Start the server:
   ```bash
   npm start
   ```

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