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
graph TD
    A[physics_calculator] --> B[results]
    
    B --> C[id]
    B --> D[topic]
    B --> E[inputs]
    B --> F[result]
    B --> G[created_at]
    
    C --> H[INT]
    C --> I[AUTO_INCREMENT]
    C --> J[PRIMARY KEY]
    
    D --> K[VARCHAR(50)]
    D --> L[NOT NULL]
    
    E --> M[JSON]
    E --> N[NOT NULL]
    
    F --> O[TEXT]
    F --> P[NOT NULL]
    
    G --> Q[TIMESTAMP]
    G --> R[DEFAULT CURRENT_TIMESTAMP]
```

**Database Details**:
- **Database Name**: `physics_calculator`
- **Table**: `results`
- **Columns**:
  - `id`: INT, auto-increment primary key
  - `topic`: VARCHAR(50), physics topic name
  - `inputs`: JSON, calculation inputs
  - `result`: TEXT, calculation result
  - `created_at`: TIMESTAMP, creation timestamp

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