# Mathematics Notifications API

A comprehensive notifications API for mathematics education and learning.

## Overview

The Mathematics Notifications API provides real-time notifications for mathematical activities, including problem-solving, calculations, study sessions, and achievements. It supports multiple notification types and delivery methods.

## Features

- **Math Problem Notifications**: Alerts for new problems, solutions, and calculations
- **Study Session Reminders**: Scheduled notifications for study sessions and practice
- **Progress Tracking**: Notifications about learning progress and achievements
- **Deadline Alerts**: Reminders for assignment deadlines and exam dates
- **Real-time Updates**: Live notifications for collaborative problem-solving
- **Custom Notifications**: User-defined notification rules and preferences

## Installation

```bash
# Clone repository
cd /path/to/project

# Install dependencies
cd server
npm install

# Start the server
npm start
```

## Configuration

Create a `.env` file in the server directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_USER=notifications_user
DB_PASSWORD=notifications_password
DB_DATABASE=math_notifications

# JWT Authentication
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# Email Configuration (for email notifications)
EMAIL_SERVICE=your_email_service
EMAIL_USER=your_email_user
EMAIL_PASS=your_email_password
EMAIL_FROM=noreply@mathnotifications.com

# Redis Configuration (for real-time notifications)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password

# Notification Settings
DEFAULT_NOTIFICATION_TIMEOUT=30000
MAX_NOTIFICATIONS_PER_USER=100
NOTIFICATION_RETENTION_DAYS=90

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## API Endpoints

### Authentication

#### POST /api/auth/register
Register a new user

**Request Body**:
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "name": "string"
}
```

#### POST /api/auth/login
Login user

**Request Body**:
```json
{
  "email": "string",
  "password": "string"
}
```

#### POST /api/auth/logout
Logout user

**Headers**:
```
Authorization: Bearer <token>
```

### Notifications

#### POST /api/notifications
Create a new notification

**Request Body**:
```json
{
  "userId": "string",
  "type": "problem|reminder|achievement|deadline|progress",
  "title": "string",
  "message": "string",
  "data": "object",
  "priority": "low|medium|high",
  "channels": ["in-app|email|push|sms"],
  "scheduledFor": "string (ISO 8601 date)",
  "expiresAt": "string (ISO 8601 date)"
}
```

#### GET /api/notifications
Get user notifications

**Query Parameters**:
```
userId: string
page: number (default: 1)
limit: number (default: 10)
type: string (optional)
priority: string (optional)
unread: boolean (optional)
```

#### PUT /api/notifications/:id
Update notification

**Request Body**:
```json
{
  "read": "boolean",
  "archived": "boolean",
  "channels": ["in-app|email|push|sms"]
}
```

#### DELETE /api/notifications/:id
Delete notification

### Math Problems

#### POST /api/math/problems
Create a new math problem

**Request Body**:
```json
{
  "title": "string",
  "description": "string",
  "difficulty": "easy|medium|hard",
  "category": "algebra|geometry|calculus|statistics|trigonometry",
  "problem": "string",
  "solution": "string",
  "tags": ["string"],
  "createdBy": "string"
}
```

#### GET /api/math/problems
Get math problems

**Query Parameters**:
```
category: string (optional)
difficulty: string (optional)
tags: string (optional)
page: number (default: 1)
limit: number (default: 10)
```

#### GET /api/math/problems/:id
Get specific math problem

### Study Sessions

#### POST /api/study/sessions
Create a study session

**Request Body**:
```json
{
  "userId": "string",
  "title": "string",
  "description": "string",
  "scheduledAt": "string (ISO 8601 date)",
  "duration": "number (minutes)",
  "category": "algebra|geometry|calculus|statistics|trigonometry",
  "goals": ["string"],
  "reminders": "number (minutes before session)"
}
```

#### GET /api/study/sessions
Get user study sessions

**Query Parameters**:
```
userId: string
date: string (optional)
category: string (optional)
```

### Analytics

#### GET /api/analytics/user/:userId
Get user analytics

**Query Parameters**:
```
startDate: string (optional)
endDate: string (optional)
```

#### GET /api/analytics/problems
Get problem analytics

**Query Parameters**:
```
category: string (optional)
difficulty: string (optional)
startDate: string (optional)
endDate: string (optional)
```

### Webhooks

#### POST /api/webhooks
Register a webhook

**Request Body**:
```json
{
  "url": "string",
  "events": ["problem.created|notification.sent|user.achievement"],
  "secret": "string"
}
```

## Models

### User
- id: string
- username: string
- email: string
- name: string
- preferences: object
- createdAt: Date
- updatedAt: Date

### Notification
- id: string
- userId: string
- type: string
- title: string
- message: string
- data: object
- priority: string
- channels: [string]
- read: boolean
- archived: boolean
- scheduledFor: Date
- expiresAt: Date
- sentAt: Date
- createdAt: Date

### MathProblem
- id: string
- title: string
- description: string
- difficulty: string
- category: string
- problem: string
- solution: string
- tags: [string]
- createdBy: string
- createdAt: Date
- updatedAt: Date

### StudySession
- id: string
- userId: string
- title: string
- description: string
- scheduledAt: Date
- duration: number
- category: string
- goals: [string]
- reminders: number
- createdAt: Date

## Error Handling

The API returns standardized error responses:

```json
{
  "error": {
    "code": "string",
    "message": "string",
    "details": "object"
  }
}
```

## Rate Limiting

The API implements rate limiting to prevent abuse:

- Default: 100 requests per 15 minutes per IP
- Authentication required for higher limits
- Rate limit headers included in responses

## Testing

Run tests with:
```bash
npm test
```

## Deployment

Deploy using Docker:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
```

## License

MIT
