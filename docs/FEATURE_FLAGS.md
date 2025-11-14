# 🚀 Feature Flags System

## Quick Start

### For MVP v1.0 (Current)
No configuration needed! The application runs with only core features enabled by default.

### For Development (Enable All Features)
```bash
cd frontend
cp .env.example .env.local
echo "VITE_ENABLE_ALL_FEATURES=true" >> .env.local
npm run dev
```

### For v2.0 Testing (Selective Features)
```bash
# Enable specific features
echo "VITE_FEATURE_AI_INSIGHTS=true" >> .env.local
echo "VITE_FEATURE_ANALYTICS=true" >> .env.local
npm run dev
```

---

## 📋 What's Enabled by Default (MVP v1.0)

### ✅ Visible Features
- **Landing Page** - Marketing and user entry point
- **Complaint Chatbot** - Public complaint submission interface
- **Dashboard** - Admin overview with basic metrics
- **All Complaints** - Complaint management interface
- **Settings** - Basic profile and notification settings

### 🔒 Hidden Features (Code Preserved)
- **AI Insights** - Sentiment analysis, pattern detection (v2.0)
- **Analytics** - Advanced reporting and visualizations (v2.0)
- **Department Routing** - Complex routing management (v2.0)
- **Predictive Maintenance** - IoT-based maintenance (v3.0)

---

## 🎮 How It Works

### 1. Central Configuration
All features are controlled from `src/config/features.ts`:

```typescript
export const featureFlags = {
  // Core (always visible)
  dashboard: true,
  allComplaints: true,
  
  // Advanced (hidden by default)
  aiInsights: false,     // 🔒 Hidden
  analytics: false,      // 🔒 Hidden
  departmentRouting: false, // 🔒 Hidden
};
```

### 2. Routes Protected
Routes only exist if features are enabled:

```typescript
// In App.tsx
{featureFlags.aiInsights && (
  <Route path="ai-insights" element={<AIInsights />} />
)}
// Result: 404 if disabled
```

### 3. Navigation Hidden
Sidebar only shows enabled features:

```typescript
// In AppSidebar.tsx
navItems.filter(nav => nav.featureFlag !== false)
// Result: Disabled items don't appear
```

### 4. Coming Soon Pages
Accessing disabled features shows a beautiful placeholder:

```
┌──────────────────────────────┐
│ [v2.0] [Coming Soon]         │
│                              │
│ 🚀 AI Insights               │
│                              │
│ Advanced analytics powered   │
│ by machine learning          │
│                              │
│ 📅 Estimated: Q1 2026        │
│                              │
│ [Back to Dashboard]          │
└──────────────────────────────┘
```

---

## 🔧 Enabling Features

### Method 1: Environment Variables (Recommended for Development)

**Enable all features:**
```bash
# .env.local
VITE_ENABLE_ALL_FEATURES=true
```

**Enable specific features:**
```bash
# .env.local
VITE_FEATURE_AI_INSIGHTS=true
VITE_FEATURE_ANALYTICS=true
```

Then restart dev server:
```bash
npm run dev
```

### Method 2: Configuration File (Recommended for Production)

Edit `src/config/features.ts`:
```typescript
export const featureFlags = {
  aiInsights: true,  // Change to true
  analytics: true,   // Change to true
  // ...
};
```

Then rebuild:
```bash
npm run build
```

### Method 3: Browser Console (Temporary, Development Only)

This won't work as flags are loaded at build time. Use Method 1 or 2.

---

## 📊 Feature Comparison

| Feature | MVP v1.0 | v2.0 | v3.0 | Status |
|---------|----------|------|------|--------|
| Landing Page | ✅ | ✅ | ✅ | Complete |
| Complaint Chatbot | ✅ | ✅ | ✅ | Complete |
| Dashboard | ✅ | ✅ | ✅ | Needs simplification |
| All Complaints | ✅ | ✅ | ✅ | Complete |
| Settings | 🟡 | ✅ | ✅ | Needs simplification |
| AI Insights | ❌ | ✅ | ✅ | **Code ready** |
| Analytics | ❌ | ✅ | ✅ | **Code ready** |
| Dept. Routing | ❌ | ✅ | ✅ | **Code ready** |
| Predictive Maint. | ❌ | ❌ | ✅ | **Code ready** |

Legend:
- ✅ Enabled and visible
- 🟡 Partially enabled
- ❌ Hidden (but code exists and works)

---

## 🎯 Use Cases

### Use Case 1: Developer Testing v2.0 Features

**Scenario:** You want to test the AI Insights page locally.

**Steps:**
1. Create `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Add to `.env.local`:
   ```bash
   VITE_FEATURE_AI_INSIGHTS=true
   ```

3. Restart dev server:
   ```bash
   npm run dev
   ```

4. Navigate to `http://localhost:5173/admin/ai-insights`

5. ✅ Page is visible and functional!

### Use Case 2: Deploying MVP v1.0

**Scenario:** Deploy only core features to production.

**Steps:**
1. Ensure `src/config/features.ts` has all advanced features = false

2. Build:
   ```bash
   npm run build
   ```

3. Deploy `dist` folder

4. ✅ Only core features visible to users!

### Use Case 3: Enabling v2.0 Features in Production

**Scenario:** Backend is ready for AI Insights and Analytics.

**Steps:**
1. Update `src/config/features.ts`:
   ```typescript
   aiInsights: true,
   analytics: true,
   ```

2. Build and deploy:
   ```bash
   npm run build
   # Deploy dist folder
   ```

3. ✅ Features now live in production!

### Use Case 4: Gradual Rollout

**Scenario:** Enable AI Insights for beta users only.

**Steps:**
1. Keep feature flag = false in main config

2. Use feature flag service (LaunchDarkly, etc.) or check user role:
   ```typescript
   const isAIInsightsEnabled = () => {
     if (user.role === 'beta' || user.email.includes('@admin')) {
       return true;
     }
     return featureFlags.aiInsights;
   };
   ```

3. ✅ Feature visible only to beta users!

---

## 🧪 Testing Feature Flags

### Unit Tests

```typescript
// features.test.ts
import { isFeatureEnabled } from './features';

describe('Feature Flags', () => {
  it('core features are always enabled', () => {
    expect(isFeatureEnabled('dashboard')).toBe(true);
    expect(isFeatureEnabled('allComplaints')).toBe(true);
  });

  it('advanced features are disabled in MVP', () => {
    expect(isFeatureEnabled('aiInsights')).toBe(false);
    expect(isFeatureEnabled('analytics')).toBe(false);
  });
});
```

### Component Tests

```typescript
// AIInsights.test.tsx
import { render, screen } from '@testing-library/react';
import AIInsights from './AIInsights';

describe('AI Insights Page', () => {
  it('shows Coming Soon when feature is disabled', () => {
    // Feature disabled by default
    render(<AIInsights />);
    expect(screen.getByText(/coming soon/i)).toBeInTheDocument();
  });

  it('shows actual page when feature is enabled', () => {
    // Mock feature flag
    jest.mock('../config/features', () => ({
      featureFlags: { aiInsights: true }
    }));
    
    render(<AIInsights />);
    expect(screen.getByText(/sentiment analysis/i)).toBeInTheDocument();
  });
});
```

### E2E Tests

```typescript
// e2e/feature-flags.spec.ts
import { test, expect } from '@playwright/test';

test('MVP v1.0 hides advanced features', async ({ page }) => {
  await page.goto('/admin/dashboard');
  
  // Core features visible
  await expect(page.locator('text=Dashboard')).toBeVisible();
  await expect(page.locator('text=All Complaints')).toBeVisible();
  
  // Advanced features hidden
  await expect(page.locator('text=AI Insights')).not.toBeVisible();
  await expect(page.locator('text=Analytics')).not.toBeVisible();
});

test('v2.0 shows advanced features', async ({ page }) => {
  // Set environment or config to enable features
  await page.goto('/admin/dashboard');
  
  // Advanced features now visible
  await expect(page.locator('text=AI Insights')).toBeVisible();
  await expect(page.locator('text=Analytics')).toBeVisible();
});
```

---

## 🔐 Security Considerations

### ⚠️ Important: Frontend Flags Are Not Secure!

**Frontend feature flags can be bypassed:**
- Users can modify JavaScript in browser
- API calls can be made directly (bypassing UI)
- Environment variables are exposed in bundle

**Solution: Backend Enforcement**

```typescript
// ❌ BAD: Only frontend check
if (featureFlags.aiInsights) {
  // Show UI
  fetch('/api/ai-insights');
}

// ✅ GOOD: Backend also checks
// Frontend
if (featureFlags.aiInsights) {
  fetch('/api/ai-insights'); // Backend validates
}

// Backend
app.get('/api/ai-insights', (req, res) => {
  if (!BACKEND_FEATURES.AI_INSIGHTS) {
    return res.status(403).json({ error: 'Feature not available' });
  }
  // ... handle request
});
```

### Best Practices

1. **Frontend flags = UI visibility only**
2. **Backend must validate feature access**
3. **Don't rely on frontend for security**
4. **Use proper authentication/authorization**

---

## 📦 Files Involved

```
frontend/
├── src/
│   ├── config/
│   │   └── features.ts           # ⭐ Central configuration
│   ├── components/
│   │   └── common/
│   │       └── ComingSoonOverlay.tsx  # Coming Soon UI
│   ├── layout/
│   │   └── AppSidebar.tsx        # Navigation filtering
│   ├── pages/
│   │   ├── AIInsights.tsx        # Protected with flag
│   │   ├── Analytics.tsx         # Protected with flag
│   │   ├── DepartmentRouting.tsx # Protected with flag
│   │   └── PredictiveMaintenance.tsx  # Protected with flag
│   └── App.tsx                   # Route protection
├── .env.example                  # Environment variables template
└── .env.local                    # Your local config (gitignored)
```

---

## 🚀 Deployment Checklist

### Pre-Deployment (MVP v1.0)

- [ ] Verify `src/config/features.ts` has advanced features = false
- [ ] Test locally with `npm run build && npm run preview`
- [ ] Verify AI Insights NOT visible in sidebar
- [ ] Verify Analytics NOT visible in sidebar
- [ ] Verify Department Routing NOT visible in sidebar
- [ ] Verify Predictive Maintenance NOT visible in sidebar
- [ ] Test direct URL access returns 404 or Coming Soon
- [ ] Run test suite: `npm run test`
- [ ] Build passes: `npm run build`

### Post-Deployment (MVP v1.0)

- [ ] Verify production shows only core features
- [ ] Test complaint submission flow
- [ ] Test admin dashboard
- [ ] Monitor error logs for 404s on advanced routes

### Pre-Deployment (v2.0)

- [ ] Backend APIs ready for advanced features
- [ ] Update `src/config/features.ts`:
  - [ ] `aiInsights: true`
  - [ ] `analytics: true`
  - [ ] `departmentRouting: true`
- [ ] Test advanced features locally
- [ ] Run full test suite
- [ ] Test backend API integration
- [ ] Update documentation

### Post-Deployment (v2.0)

- [ ] Verify advanced features visible
- [ ] Test AI Insights functionality
- [ ] Test Analytics charts loading
- [ ] Test Department Routing workflow
- [ ] Monitor error logs

---

## 🐛 Troubleshooting

### Issue: Feature enabled but not showing

**Cause:** Development server didn't restart after `.env.local` change.

**Solution:**
```bash
# Stop server (Ctrl+C)
npm run dev  # Restart
```

---

### Issue: "Cannot find module '../config/features'"

**Cause:** TypeScript path resolution issue.

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules
npm install

# Clear TypeScript cache
rm -rf .tsbuildinfo
npm run dev
```

---

### Issue: Feature shows in dev but not production

**Cause:** Environment variables not applied in production.

**Solution:**
For production, edit `src/config/features.ts` directly instead of using environment variables. Then rebuild:
```bash
npm run build
```

---

### Issue: Coming Soon page not loading properly

**Cause:** Missing styles or router setup.

**Solution:**
Ensure `ComingSoonOverlay` is imported correctly:
```typescript
import { AIInsightsComingSoon } from '../components/common/ComingSoonOverlay';

// In component
if (!featureFlags.aiInsights) {
  return <AIInsightsComingSoon />;
}
```

---

## 💡 Tips & Tricks

### Tip 1: Quick Toggle in Dev

Create npm scripts in `package.json`:
```json
{
  "scripts": {
    "dev": "vite",
    "dev:full": "VITE_ENABLE_ALL_FEATURES=true vite",
    "dev:v2": "VITE_FEATURE_AI_INSIGHTS=true VITE_FEATURE_ANALYTICS=true vite"
  }
}
```

Usage:
```bash
npm run dev        # MVP mode
npm run dev:full   # All features
npm run dev:v2     # v2.0 features only
```

### Tip 2: Feature Flag Hook

Create a custom hook:
```typescript
// hooks/useFeatureFlag.ts
import { featureFlags } from '../config/features';

export const useFeatureFlag = (feature: keyof typeof featureFlags) => {
  return featureFlags[feature];
};

// Usage in components
const AIInsights = () => {
  const isEnabled = useFeatureFlag('aiInsights');
  
  if (!isEnabled) {
    return <ComingSoon />;
  }
  // ...
};
```

### Tip 3: Debug Mode

Add debug logging:
```typescript
// config/features.ts
if (import.meta.env.DEV) {
  console.log('🚀 Active Features:', 
    Object.entries(featureFlags)
      .filter(([_, enabled]) => enabled)
      .map(([name]) => name)
  );
}
```

---

## 📚 Additional Resources

- **Full Documentation:** `/docs/feature_flags_implementation.md`
- **Backend Strategy:** `/docs/backend_strategy.md`
- **API Reference:** `/docs/api_reference.md`
- **Environment Variables:** `frontend/.env.example`

---

## 🤝 Contributing

When adding new features:

1. Add feature flag to `src/config/features.ts`
2. Protect route in `App.tsx`
3. Add to sidebar in `AppSidebar.tsx`
4. Create Coming Soon wrapper if needed
5. Update documentation
6. Add tests

---

## ❓ FAQ

**Q: Can users bypass feature flags?**  
A: Yes, frontend flags can be bypassed. Always enforce on backend.

**Q: How do I enable features for certain users only?**  
A: Check user role/permissions and conditionally return different feature flag values.

**Q: Do I need to rebuild for every flag change?**  
A: Yes, Vite bundles environment variables at build time.

**Q: Can I use this in production for A/B testing?**  
A: Yes, but use a proper feature flag service (LaunchDarkly, etc.) for dynamic control.

**Q: What happens to disabled features' code?**  
A: It's still in the bundle but won't be rendered. For true tree-shaking, use build-time flags.

---

**Last Updated:** November 12, 2025  
**Version:** 1.0.0-MVP  
**Status:** ✅ Production Ready
