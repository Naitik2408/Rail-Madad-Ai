# Rail Madad API Testing Guide

Server is running at: **http://localhost:5000**

## 🔑 Admin Credentials

- **Email**: admin@railmadad.com
- **Password**: Admin@123

---

## 📋 API Endpoints

### 1. Health Check

```bash
curl http://localhost:5000/health
```

---

## 🔐 Authentication Endpoints

### Login (Admin)

```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@railmadad.com",
    "password": "Admin@123"
  }'
```

**Response**: You'll get `accessToken` and `refreshToken`. Save the `accessToken` for subsequent requests.

### Get Current User Profile

```bash
curl http://localhost:5000/api/v1/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Refresh Token

```bash
curl -X POST http://localhost:5000/api/v1/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "YOUR_REFRESH_TOKEN"
  }'
```

### Logout

```bash
curl -X POST http://localhost:5000/api/v1/auth/logout \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## 📝 Public Complaint Endpoints

### Submit a Complaint

```bash
curl -X POST http://localhost:5000/api/v1/complaints \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phoneNumber": "9876543210",
    "pnr": "1234567890",
    "trainNumber": "12345",
    "trainName": "Express Train",
    "category": "cleanliness",
    "description": "The coach was not clean and washroom was dirty.",
    "journeyDate": "2024-11-15",
    "station": "Mumbai Central",
    "coach": "A1",
    "seatNumber": "42"
  }'
```

**Categories**: `cleanliness`, `staff_behavior`, `facilities`, `security`, `ticketing`, `food_quality`, `maintenance`, `other`

### Track Complaint by ID

```bash
curl http://localhost:5000/api/v1/complaints/track/CMP-2024-0001
```

### Track Complaint by Email

```bash
curl http://localhost:5000/api/v1/complaints/track-by-email/john.doe@example.com
```

---

## 🛡️ Admin Complaint Management (Requires Authentication)

**Note**: Add `-H "Authorization: Bearer YOUR_ACCESS_TOKEN"` to all admin requests.

### Get All Complaints (with filters)

```bash
# All complaints
curl http://localhost:5000/api/v1/admin/complaints \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

# With filters
curl "http://localhost:5000/api/v1/admin/complaints?status=pending&page=1&limit=10" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

# Search
curl "http://localhost:5000/api/v1/admin/complaints?search=clean" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Available Filters**:
- `status`: pending, in_progress, resolved, rejected
- `category`: cleanliness, staff_behavior, facilities, security, ticketing, food_quality, maintenance, other
- `priority`: low, medium, high, urgent
- `search`: search in name, email, description
- `startDate`: YYYY-MM-DD
- `endDate`: YYYY-MM-DD
- `page`: page number (default: 1)
- `limit`: items per page (default: 10)
- `sortBy`: field to sort by
- `sortOrder`: asc or desc

### Get Complaint by ID

```bash
curl http://localhost:5000/api/v1/admin/complaints/COMPLAINT_MONGO_ID \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Update Complaint Status

```bash
curl -X PATCH http://localhost:5000/api/v1/admin/complaints/COMPLAINT_MONGO_ID \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "in_progress",
    "priority": "high",
    "comment": "Assigned to cleaning department"
  }'
```

### Resolve Complaint

```bash
curl -X PATCH http://localhost:5000/api/v1/admin/complaints/COMPLAINT_MONGO_ID \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "resolved",
    "resolutionDetails": "Issue has been resolved. Coach was thoroughly cleaned."
  }'
```

### Delete Complaint

```bash
curl -X DELETE http://localhost:5000/api/v1/admin/complaints/COMPLAINT_MONGO_ID \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## 📊 Dashboard Endpoints (Admin Only)

### Get Dashboard Metrics

```bash
curl http://localhost:5000/api/v1/admin/dashboard/metrics \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Response includes**:
- Total complaints
- Pending, in-progress, resolved, rejected counts
- Average resolution time (hours)
- Complaints this week/month
- Resolution rate (percentage)

### Get Dashboard Charts Data

```bash
curl http://localhost:5000/api/v1/admin/dashboard/charts \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Response includes**:
- Complaints by category
- Complaints by status
- Complaints by priority
- Complaints over time (last 30 days)
- Resolution time by category

---

## 🧪 Testing Workflow

### Step 1: Login as Admin

```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@railmadad.com", "password": "Admin@123"}'
```

Copy the `accessToken` from the response.

### Step 2: View Dashboard

```bash
# Replace YOUR_TOKEN with the access token from step 1
export TOKEN="YOUR_ACCESS_TOKEN"

curl http://localhost:5000/api/v1/admin/dashboard/metrics \
  -H "Authorization: Bearer $TOKEN"
```

### Step 3: Get All Complaints

```bash
curl http://localhost:5000/api/v1/admin/complaints \
  -H "Authorization: Bearer $TOKEN"
```

### Step 4: Submit a Public Complaint

```bash
curl -X POST http://localhost:5000/api/v1/complaints \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "category": "cleanliness",
    "description": "Test complaint for API testing purposes"
  }'
```

### Step 5: Track the Complaint

```bash
# Note the complaintId from step 4 response (e.g., CMP-2024-0009)
curl http://localhost:5000/api/v1/complaints/track/CMP-2024-0009
```

---

## 🔍 Sample Data

The seeder created:
- **1 Admin User**: admin@railmadad.com
- **8 Sample Complaints** with various statuses, categories, and priorities

Complaint IDs generated: CMP-2024-0001 through CMP-2024-0008

---

## ⚠️ Error Responses

All errors follow this format:

```json
{
  "success": false,
  "message": "Error message here",
  "statusCode": 400
}
```

Common status codes:
- `400`: Bad Request (validation errors)
- `401`: Unauthorized (missing or invalid token)
- `403`: Forbidden (insufficient permissions)
- `404`: Not Found
- `429`: Too Many Requests (rate limit exceeded)
- `500`: Internal Server Error

---

## 🚀 Rate Limits

- **General API**: 100 requests per 15 minutes
- **Auth endpoints**: 5 requests per 15 minutes
- **Complaint submission**: 10 requests per hour

---

## 💡 Tips

1. Use [Postman](https://www.postman.com/) or [Thunder Client](https://www.thunderclient.com/) (VS Code extension) for easier testing
2. Save the access token as an environment variable for quick testing
3. Check the terminal logs for detailed request information
4. MongoDB is running locally - you can use MongoDB Compass to view the data

---

## 📱 Connect Frontend

Update frontend `.env` file:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

The frontend should now be able to communicate with the backend!

---

## 🎯 Next Steps

1. ✅ Backend API is complete and running
2. ✅ Database is seeded with sample data
3. 🔄 Connect frontend to backend APIs
4. 🔄 Test complete user flow (submit complaint → admin reviews → resolves)
5. 📦 Deploy to production (Railway/Render for backend, Vercel for frontend)

---

**Happy Testing! 🚀**
