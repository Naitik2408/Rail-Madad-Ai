# Rail Madad AI - API Reference (MVP v1.0)

## 🌐 Base URL
```
Development: http://localhost:5000/api/v1
Production: https://api.railmadad.com/api/v1
```

---

## 🔓 Public Endpoints (No Authentication)

### 1. Submit Complaint
**POST** `/complaints`

**Request Body**:
```json
{
  "category": "Coach Cleanliness",
  "description": "Toilet facility is not clean in coach B3",
  "trainNumber": "12301",
  "pnr": "1234567890",
  "passengerName": "Rajesh Kumar",
  "mobile": "+919876543210",
  "email": "rajesh@example.com"
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "data": {
    "complaintId": "RM482156",
    "status": "Pending",
    "priority": "Medium",
    "category": "Coach Cleanliness",
    "aiConfidence": 92,
    "estimatedResolutionTime": "4-6 hours",
    "trackingUrl": "https://railmadad.com/track/RM482156"
  },
  "message": "Complaint submitted successfully"
}
```

**Validation**:
- `category`: Required, must be one of predefined categories
- `description`: Required, min 10 chars, max 500 chars
- `trainNumber`: Optional, must match pattern (5-6 digits)
- `pnr`: Optional, must be 10 digits
- `passengerName`: Required, min 2 chars
- `mobile`: Required, must be valid Indian mobile number
- `email`: Optional, must be valid email

---

### 2. Track Complaint
**GET** `/complaints/:complaintId/track`

**Example**: `GET /complaints/RM482156/track`

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "complaintId": "RM482156",
    "status": "In Progress",
    "priority": "Medium",
    "category": "Coach Cleanliness",
    "description": "Toilet facility is not clean in coach B3",
    "trainNumber": "12301",
    "submittedAt": "2025-11-12T10:30:00Z",
    "lastUpdated": "2025-11-12T12:15:00Z",
    "department": "Housekeeping",
    "timeline": [
      {
        "status": "Pending",
        "timestamp": "2025-11-12T10:30:00Z",
        "note": "Complaint received"
      },
      {
        "status": "In Progress",
        "timestamp": "2025-11-12T12:15:00Z",
        "note": "Assigned to Housekeeping Department"
      }
    ]
  }
}
```

---

## 🔐 Admin Endpoints (JWT Authentication Required)

### Authentication Header
```
Authorization: Bearer <jwt_token>
```

---

## 🔑 Authentication

### 1. Admin Login
**POST** `/auth/login`

**Request Body**:
```json
{
  "email": "admin@railmadad.com",
  "password": "SecurePassword123"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "refresh_token_here",
    "user": {
      "id": "user_id",
      "email": "admin@railmadad.com",
      "name": "Admin User",
      "role": "admin",
      "department": null
    },
    "expiresIn": 86400
  },
  "message": "Login successful"
}
```

---

### 2. Logout
**POST** `/auth/logout`

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

### 3. Refresh Token
**POST** `/auth/refresh`

**Request Body**:
```json
{
  "refreshToken": "refresh_token_here"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "token": "new_jwt_token",
    "expiresIn": 86400
  }
}
```

---

## 📊 Dashboard

### 1. Get Dashboard Metrics
**GET** `/admin/dashboard/metrics`

**Query Params**:
- `timeframe`: `today` | `week` | `month` | `year` (default: `today`)

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "totalComplaints": 8942,
    "resolved": 6742,
    "inProgress": 1890,
    "pending": 310,
    "todayCount": 156,
    "resolutionRate": 75.4,
    "avgResolutionTime": "4.2 hours",
    "trendsComparison": {
      "complaintsChange": "+12.5%",
      "resolutionChange": "+3.2%",
      "responseTimeChange": "-0.8h"
    }
  }
}
```

---

### 2. Get Chart Data
**GET** `/admin/dashboard/charts`

**Query Params**:
- `type`: `status` | `category` | `timeline` | `department`
- `timeframe`: `week` | `month` | `year`

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "type": "status",
    "labels": ["Resolved", "In Progress", "Pending"],
    "values": [6742, 1890, 310],
    "colors": ["#10B981", "#F59E0B", "#EF4444"]
  }
}
```

---

## 📝 Complaints Management

### 1. List All Complaints
**GET** `/admin/complaints`

**Query Params**:
- `page`: number (default: 1)
- `limit`: number (default: 20, max: 100)
- `status`: `Pending` | `In Progress` | `Resolved`
- `priority`: `High` | `Medium` | `Low`
- `category`: string
- `department`: string
- `search`: string (searches in ID, description, train)
- `sortBy`: `createdAt` | `updatedAt` | `priority`
- `sortOrder`: `asc` | `desc`
- `dateFrom`: ISO date
- `dateTo`: ISO date

**Example**: `GET /admin/complaints?page=1&limit=20&status=Pending&sortBy=priority&sortOrder=desc`

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "complaints": [
      {
        "id": "complaint_id",
        "complaintId": "RM482156",
        "title": "Toilet facility not clean",
        "category": "Coach Cleanliness",
        "priority": "High",
        "status": "Pending",
        "submittedBy": "Rajesh Kumar",
        "trainNumber": "12301",
        "coach": "B3",
        "department": "Housekeeping",
        "aiConfidence": 92,
        "createdAt": "2025-11-12T10:30:00Z",
        "updatedAt": "2025-11-12T10:30:00Z"
      }
      // ... more complaints
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 45,
      "totalItems": 8942,
      "itemsPerPage": 20,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

---

### 2. Get Single Complaint
**GET** `/admin/complaints/:id`

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "id": "complaint_id",
    "complaintId": "RM482156",
    "category": "Coach Cleanliness",
    "description": "Toilet facility is not clean in coach B3. Water is not available.",
    "trainNumber": "12301",
    "pnr": "1234567890",
    "coach": "B3",
    "passengerName": "Rajesh Kumar",
    "mobile": "+919876543210",
    "email": "rajesh@example.com",
    "status": "In Progress",
    "priority": "High",
    "department": "Housekeeping",
    "assignedTo": {
      "id": "user_id",
      "name": "Staff Member",
      "email": "staff@railmadad.com"
    },
    "aiConfidence": 92,
    "aiCategory": "Coach Cleanliness",
    "notes": [
      {
        "id": "note_id",
        "addedBy": {
          "name": "Admin User",
          "email": "admin@railmadad.com"
        },
        "content": "Assigned to maintenance team",
        "createdAt": "2025-11-12T12:15:00Z"
      }
    ],
    "timeline": [
      {
        "status": "Pending",
        "timestamp": "2025-11-12T10:30:00Z",
        "note": "Complaint received"
      },
      {
        "status": "In Progress",
        "timestamp": "2025-11-12T12:15:00Z",
        "note": "Assigned to Housekeeping Department"
      }
    ],
    "createdAt": "2025-11-12T10:30:00Z",
    "updatedAt": "2025-11-12T12:15:00Z"
  }
}
```

---

### 3. Update Complaint Status
**PATCH** `/admin/complaints/:id/status`

**Request Body**:
```json
{
  "status": "Resolved",
  "note": "Issue has been resolved. Toilet cleaned and water supply restored."
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "complaintId": "RM482156",
    "status": "Resolved",
    "updatedAt": "2025-11-12T15:30:00Z"
  },
  "message": "Complaint status updated successfully"
}
```

---

### 4. Assign Complaint
**PATCH** `/admin/complaints/:id/assign`

**Request Body**:
```json
{
  "department": "Housekeeping",
  "assignedTo": "user_id",
  "note": "Assigned to senior staff member"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "complaintId": "RM482156",
    "department": "Housekeeping",
    "assignedTo": {
      "id": "user_id",
      "name": "Staff Member"
    },
    "updatedAt": "2025-11-12T12:15:00Z"
  },
  "message": "Complaint assigned successfully"
}
```

---

### 5. Add Note to Complaint
**POST** `/admin/complaints/:id/notes`

**Request Body**:
```json
{
  "content": "Contacted passenger for additional details"
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "data": {
    "noteId": "note_id",
    "content": "Contacted passenger for additional details",
    "addedBy": {
      "id": "user_id",
      "name": "Admin User"
    },
    "createdAt": "2025-11-12T14:00:00Z"
  }
}
```

---

### 6. Delete Complaint (Soft Delete)
**DELETE** `/admin/complaints/:id`

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Complaint deleted successfully"
}
```

---

## 🎯 Routing Management

### 1. Get Pending Routing Complaints
**GET** `/admin/routing/pending`

**Query Params**:
- `page`: number
- `limit`: number

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "complaints": [
      {
        "id": "complaint_id",
        "complaintId": "RM482156",
        "title": "AC not working",
        "category": "HVAC",
        "suggestedDepartment": "Electrical",
        "aiConfidence": 96,
        "alternativeDepartment": "Mechanical",
        "priority": "Medium",
        "submittedAt": "2025-11-12T10:30:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 45
    }
  }
}
```

---

### 2. Auto-Route Complaint
**POST** `/admin/routing/:id/auto`

**Request Body**:
```json
{
  "acceptSuggestion": true
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "complaintId": "RM482156",
    "department": "Electrical",
    "aiConfidence": 96,
    "routedAt": "2025-11-12T12:15:00Z"
  },
  "message": "Complaint auto-routed successfully"
}
```

---

### 3. Manual Route Complaint
**POST** `/admin/routing/:id/manual`

**Request Body**:
```json
{
  "department": "Mechanical",
  "assignedTo": "user_id",
  "reason": "Requires mechanical expertise"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "complaintId": "RM482156",
    "department": "Mechanical",
    "assignedTo": {
      "id": "user_id",
      "name": "Staff Member"
    },
    "routedAt": "2025-11-12T12:15:00Z"
  },
  "message": "Complaint manually routed successfully"
}
```

---

## 🤖 AI Service (Internal APIs)

### 1. Categorize Complaint
**POST** `/ai/categorize`

**Request Body**:
```json
{
  "description": "Toilet is dirty and water is not available"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "category": "Coach Cleanliness",
    "confidence": 92,
    "keywords": ["toilet", "dirty", "water"],
    "alternativeCategories": [
      {
        "category": "Water Availability",
        "confidence": 65
      }
    ]
  }
}
```

---

### 2. Detect Priority
**POST** `/ai/priority`

**Request Body**:
```json
{
  "description": "Urgent! Water tank leaking in coach A1",
  "category": "Coach Maintenance"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "priority": "High",
    "confidence": 88,
    "urgencyKeywords": ["urgent", "leaking"],
    "reasoning": "Contains urgency keywords and safety concern"
  }
}
```

---

### 3. Suggest Department
**POST** `/ai/route`

**Request Body**:
```json
{
  "category": "HVAC",
  "description": "AC not working in coach B3",
  "trainNumber": "12301"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "suggestedDepartment": "Electrical",
    "confidence": 96,
    "alternativeDepartment": "Mechanical",
    "reasoning": "HVAC issues typically handled by Electrical department"
  }
}
```

---

## ❌ Error Responses

### Standard Error Format
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": {
      // Additional error details
    }
  }
}
```

### Common Error Codes

**400 Bad Request**:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": {
      "fields": {
        "mobile": "Invalid mobile number format",
        "description": "Description is required"
      }
    }
  }
}
```

**401 Unauthorized**:
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication required"
  }
}
```

**403 Forbidden**:
```json
{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "You don't have permission to access this resource"
  }
}
```

**404 Not Found**:
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Complaint not found"
  }
}
```

**429 Too Many Requests**:
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Please try again later.",
    "details": {
      "retryAfter": 60
    }
  }
}
```

**500 Internal Server Error**:
```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An unexpected error occurred. Please try again later."
  }
}
```

---

## 📋 Rate Limiting

**Public Endpoints**:
- 10 requests per minute per IP
- 100 requests per hour per IP

**Admin Endpoints**:
- 100 requests per minute per user
- 1000 requests per hour per user

---

## 🔒 Security Headers

All responses include:
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'
```

---

## 📝 Notes

1. All timestamps are in **ISO 8601 format** (UTC)
2. All endpoints return **JSON**
3. Use **HTTPS** in production
4. **JWT tokens** expire after 24 hours
5. **Refresh tokens** expire after 7 days
6. Maximum request body size: **10MB**
7. **Pagination** defaults: page=1, limit=20

---

**API Version**: v1.0
**Last Updated**: November 12, 2025
**Base URL**: `/api/v1`
