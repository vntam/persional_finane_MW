# Authentication API Documentation

## Overview

The Authentication module provides user registration, login, and token management functionality using JWT (JSON Web Tokens).

**Base URL:** `http://localhost:4000/api/auth`

## Features

- User registration with email and password
- User login with JWT access and refresh tokens
- Token refresh mechanism (token rotation)
- Password hashing with bcrypt
- Protected route middleware (authGuard)

## API Endpoints

### 1. Register New User

**POST** `/api/auth/register`

Creates a new user account and returns JWT tokens.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"  // optional
}
```

**Validation:**
- `email`: Must be valid email format
- `password`: Minimum 8 characters
- `name`: Optional string

**Success Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**
- `400 Bad Request`: Validation error or email already exists
```json
{
  "success": false,
  "error": "User with this email already exists"
}
```

---

### 2. Login User

**POST** `/api/auth/login`

Authenticates user and returns JWT tokens.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**
- `401 Unauthorized`: Invalid credentials
```json
{
  "success": false,
  "error": "Invalid email or password"
}
```

---

### 3. Refresh Tokens

**POST** `/api/auth/refresh`

Refreshes both access and refresh tokens (token rotation).

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**
- `401 Unauthorized`: Invalid or expired refresh token
```json
{
  "success": false,
  "error": "Invalid or expired token"
}
```

---

## Protected Routes

### Using AuthGuard Middleware

To protect routes, use the `authGuard` middleware:

```typescript
import authModule from './modules/auth';

router.get('/protected', authModule.authGuard, (req, res) => {
  // req.user is available here
  res.json({ user: req.user });
});
```

**Authorization Header:**
```
Authorization: Bearer <access_token>
```

**Example Protected Endpoint:**

**GET** `/api/users/me`

Returns current user information (requires authentication).

**Request Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe"
    }
  }
}
```

**Error Responses:**
- `401 Unauthorized`: Missing or invalid token
```json
{
  "success": false,
  "error": "Authorization token required"
}
```

---

## Token Information

### Access Token
- **Type:** JWT
- **Expiration:** 15 minutes (configurable via `JWT_ACCESS_EXPIRES_IN`)
- **Purpose:** API authentication
- **Payload:**
```json
{
  "userId": "uuid",
  "type": "access",
  "iat": 1234567890,
  "exp": 1234567890
}
```

### Refresh Token
- **Type:** JWT
- **Expiration:** 7 days (configurable via `JWT_REFRESH_EXPIRES_IN`)
- **Purpose:** Obtain new access tokens
- **Payload:**
```json
{
  "userId": "uuid",
  "type": "refresh",
  "iat": 1234567890,
  "exp": 1234567890
}
```

---

## Environment Variables

Required environment variables:

```env
JWT_SECRET=your-super-secret-jwt-key
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
```

---

## Security Features

1. **Password Hashing:** Passwords are hashed using bcrypt with 10 salt rounds
2. **Token Rotation:** Refresh endpoint generates new refresh tokens to prevent token reuse
3. **Token Type Validation:** Access and refresh tokens are explicitly typed
4. **Secure Defaults:** Strong default JWT secret warning in development

---

## Testing

Run auth module tests:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage
```

**Test Coverage:**
- ✅ Password hashing and verification
- ✅ JWT token generation and verification
- ✅ User registration (success and error cases)
- ✅ User login (success and error cases)
- ✅ Token refresh (success and error cases)
- ✅ Protected routes with authGuard middleware

---

## Common Use Cases

### 1. User Registration Flow
```javascript
// Register new user
const response = await fetch('http://localhost:4000/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123',
    name: 'John Doe'
  })
});

const { accessToken, refreshToken } = await response.json().data;
// Store tokens securely (e.g., httpOnly cookies or secure storage)
```

### 2. Authenticated API Request
```javascript
const response = await fetch('http://localhost:4000/api/users/me', {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
});
```

### 3. Token Refresh Flow
```javascript
// When access token expires (401 response)
const response = await fetch('http://localhost:4000/api/auth/refresh', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ refreshToken })
});

const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
  await response.json().data;
// Update stored tokens
```

---

## Error Handling

All endpoints return consistent error format:

```json
{
  "success": false,
  "error": "Error message here"
}
```

**Common HTTP Status Codes:**
- `200 OK`: Successful request
- `201 Created`: User successfully registered
- `400 Bad Request`: Validation error or bad input
- `401 Unauthorized`: Authentication failed
- `500 Internal Server Error`: Server error

---

## Notes

- Passwords are never returned in API responses
- All timestamps are in ISO 8601 format
- User IDs are UUIDs
- Email addresses must be unique
