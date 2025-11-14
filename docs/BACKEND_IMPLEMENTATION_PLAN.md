# 🚀 Backend Implementation Plan - Rail Madad AI

## 📋 Overview

This document provides a **step-by-step implementation plan** for the Rail Madad AI backend, ready to execute immediately after approval.

---

## 🎯 Implementation Phases

### **Phase 1: Project Setup (Day 1-2)**
### **Phase 2: Authentication & User Management (Day 3-5)**
### **Phase 3: Complaint Management APIs (Day 6-10)**
### **Phase 4: AI Service Integration (Day 11-14)**
### **Phase 5: Dashboard & Analytics APIs (Day 15-18)**
### **Phase 6: Testing & Deployment (Day 19-21)**

---

## 📦 Phase 1: Project Setup (Day 1-2)

### **Task 1.1: Initialize Backend Project**

```bash
# Create backend directory
mkdir -p backend
cd backend

# Initialize Node.js project
npm init -y

# Install core dependencies
npm install express cors dotenv mongoose
npm install jsonwebtoken bcryptjs
npm install express-validator
npm install express-rate-limit
npm install helmet morgan

# Install TypeScript & types
npm install -D typescript @types/node @types/express
npm install -D @types/cors @types/jsonwebtoken @types/bcryptjs
npm install -D ts-node nodemon

# Development tools
npm install -D eslint prettier
```

**Deliverable**: `package.json` with all dependencies

---

### **Task 1.2: Setup TypeScript Configuration**

Create `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

**Deliverable**: TypeScript configuration

---

### **Task 1.3: Create Project Structure**

```bash
backend/
├── src/
│   ├── config/
│   │   ├── database.ts      # MongoDB connection
│   │   ├── environment.ts   # Environment variables
│   │   └── features.ts      # Feature flags (mirror frontend)
│   ├── models/
│   │   ├── Complaint.ts     # Complaint schema
│   │   ├── User.ts          # User schema
│   │   └── RoutingRule.ts   # Routing rules schema
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── complaint.controller.ts
│   │   ├── admin.controller.ts
│   │   └── dashboard.controller.ts
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── complaint.routes.ts
│   │   ├── admin.routes.ts
│   │   └── dashboard.routes.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── validation.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── rateLimit.middleware.ts
│   ├── services/
│   │   ├── ai.service.ts         # AI service client
│   │   ├── complaint.service.ts
│   │   ├── auth.service.ts
│   │   └── notification.service.ts (future)
│   ├── utils/
│   │   ├── logger.ts
│   │   ├── response.ts
│   │   └── validators.ts
│   ├── types/
│   │   └── index.ts
│   └── server.ts            # Entry point
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

**Deliverable**: Complete folder structure

---

### **Task 1.4: Setup Environment Variables**

Create `.env.example`:
```bash
# Server
NODE_ENV=development
PORT=5000
API_VERSION=v1

# Database
MONGODB_URI=mongodb://localhost:27017/rail-madad-ai
# Production: mongodb+srv://username:password@cluster.mongodb.net/rail-madad-ai

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=24h
JWT_REFRESH_SECRET=your-refresh-token-secret
JWT_REFRESH_EXPIRE=7d

# CORS
CORS_ORIGIN=http://localhost:5173
# Production: https://railmadad.com

# AI Service
AI_SERVICE_URL=http://localhost:8000
AI_SERVICE_API_KEY=optional-api-key-for-ai-service

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100

# Email (Future - for notifications)
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=your-email@gmail.com
# SMTP_PASS=your-app-password

# SMS (Future)
# SMS_API_KEY=
# SMS_API_URL=

# Feature Flags (Mirror Frontend)
FEATURE_AI_INSIGHTS=false
FEATURE_ANALYTICS=false
FEATURE_DEPARTMENT_ROUTING=false
FEATURE_PREDICTIVE_MAINTENANCE=false

# Logging
LOG_LEVEL=debug  # debug, info, warn, error
```

**Deliverable**: Environment configuration template

---

### **Task 1.5: Setup Scripts**

Update `package.json` scripts:
```json
{
  "scripts": {
    "dev": "nodemon --exec ts-node src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "lint": "eslint src/**/*.ts",
    "format": "prettier --write \"src/**/*.ts\"",
    "test": "jest --coverage"
  }
}
```

**Deliverable**: Development workflow configured

---

## 🔐 Phase 2: Authentication & User Management (Day 3-5)

### **Task 2.1: Create User Model**

File: `src/models/User.ts`
```typescript
import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'department_head' | 'staff';
  department?: string;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false, // Don't return password by default
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['admin', 'department_head', 'staff'],
      default: 'staff',
    },
    department: {
      type: String,
      enum: [
        'Mechanical',
        'Electrical',
        'Housekeeping',
        'Catering',
        'Administration',
        'Operations',
      ],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: Date,
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', userSchema);
```

**Deliverable**: User model with authentication methods

---

### **Task 2.2: Create Auth Controller**

File: `src/controllers/auth.controller.ts`
```typescript
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { ApiError } from '../utils/response';

export class AuthController {
  // Login
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      // Find user with password field
      const user = await User.findOne({ email, isActive: true }).select(
        '+password'
      );

      if (!user || !(await user.comparePassword(password))) {
        throw new ApiError(401, 'Invalid email or password');
      }

      // Update last login
      user.lastLogin = new Date();
      await user.save();

      // Generate tokens
      const accessToken = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: process.env.JWT_EXPIRE || '24h' }
      );

      const refreshToken = jwt.sign(
        { id: user._id },
        process.env.JWT_REFRESH_SECRET!,
        { expiresIn: process.env.JWT_REFRESH_EXPIRE || '7d' }
      );

      res.json({
        success: true,
        data: {
          user: {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
            department: user.department,
          },
          accessToken,
          refreshToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  // Logout (client-side token removal mainly)
  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      // Could add token blacklisting here if needed
      res.json({
        success: true,
        message: 'Logged out successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  // Get current user
  async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        throw new ApiError(404, 'User not found');
      }

      res.json({
        success: true,
        data: {
          user: {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
            department: user.department,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }

  // Refresh token
  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        throw new ApiError(400, 'Refresh token required');
      }

      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET!
      ) as { id: string };

      const user = await User.findById(decoded.id);

      if (!user || !user.isActive) {
        throw new ApiError(401, 'Invalid refresh token');
      }

      // Generate new access token
      const accessToken = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: process.env.JWT_EXPIRE || '24h' }
      );

      res.json({
        success: true,
        data: { accessToken },
      });
    } catch (error) {
      next(error);
    }
  }
}
```

**Deliverable**: Authentication endpoints

---

### **Task 2.3: Create Auth Middleware**

File: `src/middleware/auth.middleware.ts`
```typescript
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/response';

export interface AuthRequest extends Request {
  user: {
    id: string;
    role: string;
  };
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token: string | undefined;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new ApiError(401, 'Not authorized to access this route');
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: string;
        role: string;
      };

      (req as AuthRequest).user = decoded;
      next();
    } catch (err) {
      throw new ApiError(401, 'Invalid token');
    }
  } catch (error) {
    next(error);
  }
};

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as AuthRequest).user;

    if (!roles.includes(user.role)) {
      throw new ApiError(
        403,
        `Role '${user.role}' is not authorized to access this route`
      );
    }
    next();
  };
};
```

**Deliverable**: JWT authentication middleware

---

## 📝 Phase 3: Complaint Management (Day 6-10)

### **Task 3.1: Create Complaint Model**

File: `src/models/Complaint.ts`
```typescript
import mongoose, { Document, Schema } from 'mongoose';

export interface IComplaint extends Document {
  complaintId: string; // RM123456
  category: string;
  description: string;
  trainNumber?: string;
  pnr?: string;
  passengerName: string;
  mobile: string;
  email?: string;
  status: 'Pending' | 'In Progress' | 'Resolved' | 'Closed';
  priority: 'High' | 'Medium' | 'Low';
  department?: string;
  assignedTo?: mongoose.Types.ObjectId;
  aiConfidence?: number;
  aiSuggestions?: {
    category: string;
    confidence: number;
    department: string;
  };
  notes: Array<{
    text: string;
    addedBy: mongoose.Types.ObjectId;
    addedAt: Date;
  }>;
  resolvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const complaintSchema = new Schema<IComplaint>(
  {
    complaintId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Coach Cleanliness',
        'Punctuality',
        'Water Availability',
        'Staff Behavior',
        'Electrical Equipment',
        'Security',
        'Catering & Vending',
        'HVAC',
        'Other',
      ],
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    trainNumber: String,
    pnr: String,
    passengerName: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/,
    },
    email: {
      type: String,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Resolved', 'Closed'],
      default: 'Pending',
      index: true,
    },
    priority: {
      type: String,
      enum: ['High', 'Medium', 'Low'],
      default: 'Medium',
      index: true,
    },
    department: {
      type: String,
      enum: [
        'Mechanical',
        'Electrical',
        'Housekeeping',
        'Catering',
        'Administration',
        'Operations',
      ],
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    aiConfidence: {
      type: Number,
      min: 0,
      max: 100,
    },
    aiSuggestions: {
      category: String,
      confidence: Number,
      department: String,
    },
    notes: [
      {
        text: String,
        addedBy: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    resolvedAt: Date,
  },
  {
    timestamps: true,
  }
);

// Generate complaint ID
complaintSchema.pre('save', async function (next) {
  if (!this.complaintId) {
    const count = await mongoose.model('Complaint').countDocuments();
    this.complaintId = `RM${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

// Indexes for performance
complaintSchema.index({ createdAt: -1 });
complaintSchema.index({ category: 1, status: 1 });
complaintSchema.index({ trainNumber: 1 });

export default mongoose.model<IComplaint>('Complaint', complaintSchema);
```

**Deliverable**: Complaint model with validations

---

### **Task 3.2: Create Complaint Controller (Public)**

File: `src/controllers/complaint.controller.ts`
```typescript
import { Request, Response, NextFunction } from 'express';
import Complaint from '../models/Complaint';
import { AIService } from '../services/ai.service';
import { ApiError } from '../utils/response';

export class ComplaintController {
  private aiService: AIService;

  constructor() {
    this.aiService = new AIService();
  }

  // Submit new complaint (Public API - No auth)
  async submit(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        category,
        description,
        trainNumber,
        pnr,
        passengerName,
        mobile,
        email,
      } = req.body;

      // Get AI suggestions
      const aiResult = await this.aiService.categorizeComplaint(
        description,
        category
      );

      // Create complaint
      const complaint = await Complaint.create({
        category: aiResult.category || category,
        description,
        trainNumber,
        pnr,
        passengerName,
        mobile,
        email,
        priority: aiResult.priority,
        department: aiResult.department,
        aiConfidence: aiResult.confidence,
        aiSuggestions: aiResult,
      });

      res.status(201).json({
        success: true,
        message: 'Complaint submitted successfully',
        data: {
          complaintId: complaint.complaintId,
          status: complaint.status,
          category: complaint.category,
          priority: complaint.priority,
        },
      });

      // TODO: Send confirmation email/SMS (future)
    } catch (error) {
      next(error);
    }
  }

  // Track complaint status (Public API - No auth)
  async track(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const complaint = await Complaint.findOne({
        complaintId: id.toUpperCase(),
      }).select(
        'complaintId category status priority department createdAt updatedAt resolvedAt'
      );

      if (!complaint) {
        throw new ApiError(404, 'Complaint not found');
      }

      res.json({
        success: true,
        data: {
          complaint: {
            id: complaint.complaintId,
            category: complaint.category,
            status: complaint.status,
            priority: complaint.priority,
            department: complaint.department,
            submittedOn: complaint.createdAt,
            lastUpdated: complaint.updatedAt,
            resolvedOn: complaint.resolvedAt,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
```

**Deliverable**: Public complaint APIs

---

### **Task 3.3: Create Admin Complaint Controller**

File: `src/controllers/admin.controller.ts`
```typescript
import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import Complaint from '../models/Complaint';
import { ApiError } from '../utils/response';

export class AdminComplaintController {
  // Get all complaints with filters
  async getAllComplaints(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const {
        page = 1,
        limit = 20,
        status,
        priority,
        category,
        department,
        search,
        sortBy = 'createdAt',
        order = 'desc',
      } = req.query;

      // Build filter
      const filter: any = {};
      if (status) filter.status = status;
      if (priority) filter.priority = priority;
      if (category) filter.category = category;
      if (department) filter.department = department;
      if (search) {
        filter.$or = [
          { complaintId: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { trainNumber: { $regex: search, $options: 'i' } },
        ];
      }

      // Pagination
      const skip = (Number(page) - 1) * Number(limit);
      const sort: any = { [sortBy as string]: order === 'desc' ? -1 : 1 };

      // Execute query
      const [complaints, total] = await Promise.all([
        Complaint.find(filter)
          .sort(sort)
          .skip(skip)
          .limit(Number(limit))
          .populate('assignedTo', 'name email')
          .lean(),
        Complaint.countDocuments(filter),
      ]);

      res.json({
        success: true,
        data: {
          complaints,
          pagination: {
            page: Number(page),
            limit: Number(limit),
            total,
            pages: Math.ceil(total / Number(limit)),
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }

  // Get single complaint
  async getComplaint(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const complaint = await Complaint.findById(id)
        .populate('assignedTo', 'name email department')
        .populate('notes.addedBy', 'name');

      if (!complaint) {
        throw new ApiError(404, 'Complaint not found');
      }

      res.json({
        success: true,
        data: { complaint },
      });
    } catch (error) {
      next(error);
    }
  }

  // Update complaint
  async updateComplaint(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status, priority, department, assignedTo, note } = req.body;

      const complaint = await Complaint.findById(id);

      if (!complaint) {
        throw new ApiError(404, 'Complaint not found');
      }

      // Update fields
      if (status) complaint.status = status;
      if (priority) complaint.priority = priority;
      if (department) complaint.department = department;
      if (assignedTo) complaint.assignedTo = assignedTo;

      // Add note if provided
      if (note) {
        complaint.notes.push({
          text: note,
          addedBy: req.user.id,
          addedAt: new Date(),
        });
      }

      // Set resolved date
      if (status === 'Resolved' && !complaint.resolvedAt) {
        complaint.resolvedAt = new Date();
      }

      await complaint.save();

      res.json({
        success: true,
        message: 'Complaint updated successfully',
        data: { complaint },
      });
    } catch (error) {
      next(error);
    }
  }

  // Delete complaint (soft delete)
  async deleteComplaint(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const complaint = await Complaint.findByIdAndUpdate(
        id,
        { status: 'Closed' },
        { new: true }
      );

      if (!complaint) {
        throw new ApiError(404, 'Complaint not found');
      }

      res.json({
        success: true,
        message: 'Complaint closed successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}
```

**Deliverable**: Admin complaint management APIs

---

## 🤖 Phase 4: AI Service Integration (Day 11-14)

### **Task 4.1: Create AI Service Client**

File: `src/services/ai.service.ts`
```typescript
import axios from 'axios';

export interface AICategorizationResult {
  category: string;
  confidence: number;
  priority: 'High' | 'Medium' | 'Low';
  department: string;
}

export class AIService {
  private aiServiceUrl: string;
  private apiKey?: string;

  constructor() {
    this.aiServiceUrl = process.env.AI_SERVICE_URL || 'http://localhost:8000';
    this.apiKey = process.env.AI_SERVICE_API_KEY;
  }

  async categorizeComplaint(
    description: string,
    userCategory?: string
  ): Promise<AICategorizationResult> {
    try {
      const response = await axios.post(
        `${this.aiServiceUrl}/ai/categorize`,
        {
          description,
          userCategory,
        },
        {
          headers: this.apiKey
            ? { 'X-API-Key': this.apiKey }
            : {},
          timeout: 5000,
        }
      );

      return response.data;
    } catch (error) {
      console.error('AI Service Error:', error);
      
      // Fallback to simple logic if AI service is down
      return this.fallbackCategorization(description, userCategory);
    }
  }

  private fallbackCategorization(
    description: string,
    userCategory?: string
  ): AICategorizationResult {
    const desc = description.toLowerCase();

    // Simple keyword-based categorization
    const categoryMap: { [key: string]: string[] } = {
      'Coach Cleanliness': ['dirty', 'toilet', 'washroom', 'clean', 'hygiene'],
      'HVAC': ['ac', 'air', 'cooling', 'temperature', 'heating', 'hot', 'cold'],
      'Electrical Equipment': ['charging', 'power', 'socket', 'light', 'electricity'],
      'Water Availability': ['water', 'drinking', 'tap', 'bottle'],
      'Staff Behavior': ['staff', 'rude', 'behavior', 'conductor', 'tc'],
      'Catering & Vending': ['food', 'pantry', 'catering', 'meal', 'vending'],
      'Security': ['theft', 'security', 'safety', 'police'],
      'Punctuality': ['late', 'delay', 'time', 'schedule'],
    };

    const departmentMap: { [key: string]: string } = {
      'Coach Cleanliness': 'Housekeeping',
      'HVAC': 'Electrical',
      'Electrical Equipment': 'Electrical',
      'Water Availability': 'Housekeeping',
      'Staff Behavior': 'Administration',
      'Catering & Vending': 'Catering',
      'Security': 'Administration',
      'Punctuality': 'Operations',
    };

    let bestCategory = userCategory || 'Other';
    let maxScore = 0;

    for (const [category, keywords] of Object.entries(categoryMap)) {
      const score = keywords.filter((kw) => desc.includes(kw)).length;
      if (score > maxScore) {
        maxScore = score;
        bestCategory = category;
      }
    }

    // Detect priority
    const urgentKeywords = ['urgent', 'emergency', 'immediate', 'critical'];
    const priority = urgentKeywords.some((kw) => desc.includes(kw))
      ? 'High'
      : 'Medium';

    return {
      category: bestCategory,
      confidence: Math.min((maxScore / 3) * 100, 95),
      priority,
      department: departmentMap[bestCategory] || 'Administration',
    };
  }
}
```

**Deliverable**: AI service integration with fallback

---

### **Task 4.2: Create Python AI Service**

Create new directory: `ai-service/`

File: `ai-service/requirements.txt`
```
fastapi==0.104.1
uvicorn==0.24.0
pydantic==2.5.0
python-dotenv==1.0.0
```

File: `ai-service/app/main.py`
```python
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import re

app = FastAPI(title="Rail Madad AI Service", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CategorizationRequest(BaseModel):
    description: str
    userCategory: str = None

class CategorizationResponse(BaseModel):
    category: str
    confidence: float
    priority: str
    department: str

# Category keywords
CATEGORIES = {
    "Coach Cleanliness": ["dirty", "toilet", "washroom", "clean", "hygiene", "bathroom"],
    "HVAC": ["ac", "air conditioning", "cooling", "temperature", "heating", "hot", "cold"],
    "Electrical Equipment": ["charging", "power", "socket", "light", "electricity", "plug"],
    "Water Availability": ["water", "drinking", "tap", "bottle", "thirsty"],
    "Staff Behavior": ["staff", "rude", "behavior", "conductor", "tc", "attitude"],
    "Catering & Vending": ["food", "pantry", "catering", "meal", "vending", "snack"],
    "Security": ["theft", "security", "safety", "police", "stolen", "lost"],
    "Punctuality": ["late", "delay", "time", "schedule", "wait"],
}

DEPARTMENT_MAP = {
    "Coach Cleanliness": "Housekeeping",
    "HVAC": "Electrical",
    "Electrical Equipment": "Electrical",
    "Water Availability": "Housekeeping",
    "Staff Behavior": "Administration",
    "Catering & Vending": "Catering",
    "Security": "Administration",
    "Punctuality": "Operations",
}

@app.post("/ai/categorize", response_model=CategorizationResponse)
async def categorize_complaint(request: CategorizationRequest):
    description = request.description.lower()
    
    # Score each category
    scores = {}
    for category, keywords in CATEGORIES.items():
        score = sum(1 for keyword in keywords if keyword in description)
        scores[category] = score
    
    # Find best match
    best_category = max(scores, key=scores.get)
    best_score = scores[best_category]
    
    # Calculate confidence
    confidence = min((best_score / len(CATEGORIES[best_category])) * 100, 95)
    
    # If user provided category and our confidence is low, use theirs
    if request.userCategory and confidence < 60:
        best_category = request.userCategory
        confidence = 50
    
    # Detect priority
    urgent_keywords = ["urgent", "emergency", "immediate", "critical", "asap"]
    priority = "High" if any(kw in description for kw in urgent_keywords) else "Medium"
    
    # Get department
    department = DEPARTMENT_MAP.get(best_category, "Administration")
    
    return CategorizationResponse(
        category=best_category,
        confidence=round(confidence, 2),
        priority=priority,
        department=department
    )

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "ai-service"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

File: `ai-service/Dockerfile`
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app/ ./app/

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

**Deliverable**: Basic AI service running

---

## 📊 Phase 5: Dashboard APIs (Day 15-18)

### **Task 5.1: Create Dashboard Controller**

File: `src/controllers/dashboard.controller.ts`
```typescript
import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import Complaint from '../models/Complaint';

export class DashboardController {
  // Get dashboard metrics
  async getMetrics(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const [
        total,
        resolved,
        inProgress,
        pending,
        todayCount,
        avgResolutionTime,
      ] = await Promise.all([
        Complaint.countDocuments(),
        Complaint.countDocuments({ status: 'Resolved' }),
        Complaint.countDocuments({ status: 'In Progress' }),
        Complaint.countDocuments({ status: 'Pending' }),
        Complaint.countDocuments({ createdAt: { $gte: today } }),
        this.calculateAvgResolutionTime(),
      ]);

      const resolutionRate = total > 0 ? (resolved / total) * 100 : 0;

      res.json({
        success: true,
        data: {
          metrics: {
            totalComplaints: total,
            resolved,
            inProgress,
            pending,
            todayCount,
            resolutionRate: Math.round(resolutionRate * 10) / 10,
            avgResolutionTime,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }

  // Get chart data
  async getChartData(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { period = '7days' } = req.query;
      const days = period === '30days' ? 30 : 7;

      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      // Complaints over time
      const complaintsOverTime = await Complaint.aggregate([
        { $match: { createdAt: { $gte: startDate } } },
        {
          $group: {
            _id: {
              $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]);

      // Status distribution
      const statusDistribution = await Complaint.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
          },
        },
      ]);

      // Category breakdown
      const categoryBreakdown = await Complaint.aggregate([
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ]);

      res.json({
        success: true,
        data: {
          charts: {
            complaintsOverTime,
            statusDistribution,
            categoryBreakdown,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }

  private async calculateAvgResolutionTime(): Promise<string> {
    const resolved = await Complaint.find({
      status: 'Resolved',
      resolvedAt: { $exists: true },
    }).select('createdAt resolvedAt');

    if (resolved.length === 0) return '0 hours';

    const totalTime = resolved.reduce((acc, complaint) => {
      const diff =
        complaint.resolvedAt!.getTime() - complaint.createdAt.getTime();
      return acc + diff;
    }, 0);

    const avgMs = totalTime / resolved.length;
    const avgHours = avgMs / (1000 * 60 * 60);

    return `${Math.round(avgHours * 10) / 10} hours`;
  }
}
```

**Deliverable**: Dashboard metrics and charts APIs

---

## 🧪 Phase 6: Testing & Deployment (Day 19-21)

### **Task 6.1: Create Database Seeder**

File: `src/utils/seeder.ts`
```typescript
import mongoose from 'mongoose';
import User from '../models/User';
import Complaint from '../models/Complaint';
import { connectDatabase } from '../config/database';

export async function seedDatabase() {
  try {
    await connectDatabase();

    // Clear existing data
    await User.deleteMany({});
    await Complaint.deleteMany({});

    // Create admin user
    const admin = await User.create({
      email: 'admin@railmadad.com',
      password: 'Admin@123', // Will be hashed automatically
      name: 'System Administrator',
      role: 'admin',
    });

    console.log('✅ Admin user created:', admin.email);

    // Create sample complaints
    const categories = [
      'Coach Cleanliness',
      'HVAC',
      'Electrical Equipment',
      'Water Availability',
      'Staff Behavior',
    ];

    for (let i = 0; i < 20; i++) {
      await Complaint.create({
        category: categories[Math.floor(Math.random() * categories.length)],
        description: `Sample complaint ${i + 1} for testing purposes`,
        passengerName: `Passenger ${i + 1}`,
        mobile: `98765${String(i).padStart(5, '0')}`,
        email: `passenger${i + 1}@example.com`,
        trainNumber: `${12000 + i}`,
        status: ['Pending', 'In Progress', 'Resolved'][Math.floor(Math.random() * 3)],
        priority: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
      });
    }

    console.log('✅ Sample complaints created');
    console.log('\n📝 Login credentials:');
    console.log('Email: admin@railmadad.com');
    console.log('Password: Admin@123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  seedDatabase();
}
```

Add script to `package.json`:
```json
{
  "scripts": {
    "seed": "ts-node src/utils/seeder.ts"
  }
}
```

**Deliverable**: Database seeding script

---

### **Task 6.2: Create Main Server File**

File: `src/server.ts`
```typescript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database';
import { errorHandler } from './middleware/error.middleware';
import authRoutes from './routes/auth.routes';
import complaintRoutes from './routes/complaint.routes';
import adminRoutes from './routes/admin.routes';
import dashboardRoutes from './routes/dashboard.routes';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));

// Health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Rail Madad AI Backend is running',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
const API_VERSION = process.env.API_VERSION || 'v1';
app.use(`/api/${API_VERSION}/auth`, authRoutes);
app.use(`/api/${API_VERSION}/complaints`, complaintRoutes);
app.use(`/api/${API_VERSION}/admin`, adminRoutes);
app.use(`/api/${API_VERSION}/dashboard`, dashboardRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handler (must be last)
app.use(errorHandler);

// Start server
async function startServer() {
  try {
    await connectDatabase();
    console.log('✅ Database connected');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🌐 API Version: ${API_VERSION}`);
    });
  } catch (error) {
    console.error('❌ Server startup error:', error);
    process.exit(1);
  }
}

startServer();

export default app;
```

**Deliverable**: Complete working server

---

## 📝 Implementation Summary

### **Completed Deliverables**

✅ **Week 1-2 (Day 1-10):**
- Project structure setup
- TypeScript configuration
- Database models (User, Complaint, RoutingRule)
- Authentication system (JWT)
- Public complaint APIs (submit, track)
- Admin complaint APIs (CRUD, filters)

✅ **Week 3 (Day 11-14):**
- AI service integration
- Python FastAPI AI service
- Fallback categorization logic
- Department routing logic

✅ **Week 4 (Day 15-21):**
- Dashboard metrics API
- Chart data APIs
- Testing utilities
- Database seeder
- Complete server setup

---

## 🚀 Quick Start Commands

```bash
# Backend setup
cd backend
npm install
cp .env.example .env
# Edit .env with your values
npm run seed  # Create admin + sample data
npm run dev   # Start development server

# AI Service setup (separate terminal)
cd ai-service
pip install -r requirements.txt
python app/main.py  # or: uvicorn app.main:app --reload

# Frontend (existing)
cd frontend
npm run dev
```

---

## 📊 API Testing Checklist

### Test Public APIs:
```bash
# Submit complaint
curl -X POST http://localhost:5000/api/v1/complaints \
  -H "Content-Type: application/json" \
  -d '{
    "category": "Coach Cleanliness",
    "description": "The toilet is dirty and needs immediate cleaning",
    "passengerName": "John Doe",
    "mobile": "9876543210",
    "trainNumber": "12345"
  }'

# Track complaint
curl http://localhost:5000/api/v1/complaints/RM000001/track
```

### Test Admin APIs:
```bash
# Login
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@railmadad.com",
    "password": "Admin@123"
  }'

# Get dashboard metrics (use token from login)
curl http://localhost:5000/api/v1/dashboard/metrics \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# Get all complaints
curl http://localhost:5000/api/v1/admin/complaints \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🎯 Next Steps After Implementation

1. **Frontend Integration**
   - Replace mock data with real API calls
   - Add authentication flow
   - Connect all pages to backend

2. **Testing**
   - Unit tests for controllers
   - Integration tests for APIs
   - E2E tests for critical flows

3. **Deployment**
   - Backend: Railway/Render
   - AI Service: Same platform or separate
   - Database: MongoDB Atlas
   - Frontend: Vercel (already planned)

4. **Monitoring**
   - Setup error tracking (Sentry)
   - Add logging (Winston)
   - Setup health checks

---

**Ready to implement?** Let me know if you want me to start creating these files!

**Estimated Implementation Time:** 21 days (3 weeks)

**Current Status:** ✅ Planning Complete - Ready for Implementation
