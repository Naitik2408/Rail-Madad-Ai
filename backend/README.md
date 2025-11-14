# Rail Madad Backend API

Backend service for Rail Madad - Indian Railway Complaint Management System.

## 🚀 Tech Stack

- **Runtime**: Node.js v18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Helmet, CORS, Rate Limiting
- **Validation**: express-validator
- **Logging**: Custom logger utility

## 📋 Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- MongoDB (local or Atlas)

## 🛠️ Installation

1. **Install dependencies**:
   ```bash
   cd backend
   npm install
   ```

2. **Environment Setup**:
   ```bash
   cp .env.example .env
   ```

3. **Configure `.env` file**:
   - Update `MONGODB_URI` with your database connection string
   - Generate secure secrets for `JWT_SECRET` and `JWT_REFRESH_SECRET`
   - Update `CORS_ORIGIN` with your frontend URL
   - Configure other variables as needed

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```
Runs with nodemon for hot-reloading.

### Production Build
```bash
npm run build
npm start
```

### Database Seeding
```bash
npm run seed
```
Creates initial admin user and sample data.

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/           # Configuration files
│   │   ├── database.ts   # MongoDB connection
│   │   ├── environment.ts # Environment variables
│   │   └── features.ts   # Feature flags
│   ├── models/           # Mongoose models
│   │   ├── User.ts       # User model
│   │   ├── Complaint.ts  # Complaint model
│   │   └── RoutingRule.ts # Routing rules (v2.0+)
│   ├── controllers/      # Route controllers (coming soon)
│   ├── routes/           # API routes (coming soon)
│   ├── middleware/       # Custom middleware
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   ├── validation.middleware.ts
│   │   └── rateLimit.middleware.ts
│   ├── services/         # Business logic (coming soon)
│   ├── utils/            # Utility functions
│   │   ├── response.ts   # Response helpers
│   │   └── logger.ts     # Logging utility
│   ├── types/            # TypeScript types
│   │   └── index.ts
│   └── server.ts         # Main entry point
├── .env.example          # Environment variables template
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## 🔐 Authentication

The API uses JWT-based authentication:

- **Access Token**: Short-lived (24 hours)
- **Refresh Token**: Long-lived (7 days)

Include the access token in requests:
```
Authorization: Bearer <access_token>
```

## 📡 API Endpoints (Coming Soon)

### Public Routes
- `POST /api/v1/complaints` - Submit a complaint
- `GET /api/v1/complaints/track/:complaintId` - Track complaint status

### Authentication Routes
- `POST /api/v1/auth/login` - Admin login
- `POST /api/v1/auth/refresh` - Refresh access token
- `GET /api/v1/auth/me` - Get current user

### Admin Routes (Requires Authentication)
- `GET /api/v1/admin/complaints` - Get all complaints with filters
- `GET /api/v1/admin/complaints/:id` - Get complaint by ID
- `PATCH /api/v1/admin/complaints/:id` - Update complaint
- `GET /api/v1/admin/dashboard/metrics` - Dashboard metrics
- `GET /api/v1/admin/dashboard/charts` - Dashboard charts

## 🗄️ Database Models

### User
- Admin users for complaint management
- Password hashing with bcrypt
- Role-based access control

### Complaint
- Auto-generated complaint ID (CMP-2024-0001)
- Status tracking (pending, in_progress, resolved, rejected)
- Priority levels (low, medium, high, urgent)
- Category-based classification
- Status update history

### RoutingRule (v2.0+)
- Department routing rules
- Keyword-based assignment
- Priority-based matching

## 🔒 Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: 
  - General API: 100 requests per 15 minutes
  - Auth endpoints: 5 requests per 15 minutes
  - Complaint submission: 10 per hour
- **JWT**: Token-based authentication
- **Password Hashing**: bcrypt with salt rounds
- **Input Validation**: express-validator
- **Error Handling**: Custom error handler with operational error detection

## 🎯 Feature Flags

The backend mirrors frontend feature flags for security:

```typescript
{
  complaints: true,        // Core feature (MVP)
  dashboard: true,         // Core feature (MVP)
  settings: true,          // Core feature (MVP)
  aiInsights: false,       // v2.0+
  analytics: false,        // v2.0+
  departmentRouting: false,// v2.0+
  predictiveMaintenance: false // v3.0+
}
```

Update in `.env`:
```
FEATURE_AI_INSIGHTS=false
FEATURE_ANALYTICS=false
FEATURE_DEPARTMENT_ROUTING=false
FEATURE_PREDICTIVE_MAINTENANCE=false
```

## 📝 Default Admin Credentials

After running the seeder:

- **Email**: admin@railmadad.com
- **Password**: Admin@123

⚠️ **Change these credentials in production!**

## 🧪 Testing

```bash
npm test
```

## 📜 Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run seed` - Seed database with initial data
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm test` - Run tests

## 🌐 Environment Variables

See `.env.example` for all available environment variables.

Key variables:
- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for access tokens
- `JWT_REFRESH_SECRET` - Secret for refresh tokens
- `CORS_ORIGIN` - Frontend URL for CORS
- `AI_SERVICE_URL` - Python AI service URL (optional)

## 🚧 Development Timeline

### Phase 1: Project Setup ✅ (Current)
- Dependencies and TypeScript config
- Database connection
- Models (User, Complaint, RoutingRule)
- Middleware (auth, validation, error, rate limiting)
- Basic server setup

### Phase 2: Authentication (Next)
- Login/logout endpoints
- JWT token generation
- Password hashing
- User management

### Phase 3: Complaint Management
- Public complaint submission
- Admin complaint CRUD
- Status updates
- Filters and search

### Phase 4: AI Integration (Optional)
- Python FastAPI service
- Complaint categorization
- Sentiment analysis

### Phase 5: Dashboard APIs
- Metrics aggregation
- Chart data generation
- Analytics queries

### Phase 6: Testing & Deployment
- Database seeder
- API testing
- Deployment configuration

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run linter and tests
4. Submit a pull request

## 📄 License

See LICENSE file for details.

## 📞 Support

For issues and questions, please open an issue on the repository.

---

**Note**: This is an MVP (v1.0) implementation. Advanced features (AI Insights, Analytics, Department Routing, Predictive Maintenance) are planned for future versions and are currently disabled via feature flags.
