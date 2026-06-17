# Physics Calculator Server

## Table of Contents

1. Overview
2. Technologies Used
3. Installation
4. Database Architecture

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

```mermaid
graph TD
    DB["Database physics_calculator"] --> T["Table results"]

    T --> ID["id"]
    T --> TOPIC["topic"]
    T --> INPUTS["inputs"]
    T --> RESULT["result"]
    T --> CREATED["created_at"]

    ID --> ID_TYPE["INT"]
    ID --> ID_AI["AUTO_INCREMENT"]
    ID --> ID_PK["PRIMARY KEY"]

    TOPIC --> TOPIC_TYPE["VARCHAR(50)"]
    TOPIC --> TOPIC_NN["NOT NULL"]

    INPUTS --> INPUTS_TYPE["JSON"]
    INPUTS --> INPUTS_NN["NOT NULL"]

    RESULT --> RESULT_TYPE["TEXT"]
    RESULT --> RESULT_NN["NOT NULL"]

    CREATED --> CREATED_TYPE["TIMESTAMP"]
    CREATED --> CREATED_DEFAULT["DEFAULT CURRENT_TIMESTAMP"]
```
