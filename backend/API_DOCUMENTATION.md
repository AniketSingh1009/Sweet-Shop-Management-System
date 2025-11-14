# API Documentation

## Authentication Endpoints

### Register User
**POST** `/api/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "Password@123"
}
```

**Validation:**
- Email must be valid format
- Password must be at least 6 characters

**Success Response (201):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- `400` - Invalid email format or weak password
- `409` - Email already exists

---

### Login User
**POST** `/api/auth/login`

Authenticate an existing user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "Password@123"
}
```

**Success Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- `400` - Missing or invalid fields
- `401` - Invalid credentials

---

## Protected Endpoints

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

### Get User Profile
**GET** `/api/users/profile`

Get the authenticated user's profile.

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "email": "user@example.com",
  "message": "Profile retrieved successfully"
}
```

**Error Responses:**
- `401` - Access token required
- `403` - Invalid or expired token

---

## JWT Token

The JWT token contains the user's email and is signed with the `JWT_SECRET` environment variable.

**Token Payload:**
```json
{
  "email": "user@example.com",
  "iat": 1234567890
}
```

**Usage Example:**
```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"Password@123"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"Password@123"}'

# Access Protected Route
curl -X GET http://localhost:3000/api/users/profile \
  -H "Authorization: Bearer <your-token-here>"
```
