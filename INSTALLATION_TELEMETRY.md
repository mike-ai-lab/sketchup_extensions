# Installation & Usage Telemetry System

## Overview

Track actual installations and usage of ConstructLM app (not just downloads).

## 🎯 Implementation Strategy

### Phase 1: Installation Tracking

When the app is first launched, send installation data to your server.

#### In the Electron App (main.js or App.tsx):

```typescript
import { v4 as uuidv4 } from 'uuid';
import Store from 'electron-store';

const store = new Store();

async function trackInstallation() {
  // Check if already tracked
  let installId = store.get('installId');
  
  if (!installId) {
    // First launch - generate unique install ID
    installId = uuidv4();
    store.set('installId', installId);
    store.set('installedAt', new Date().toISOString());
    
    // Send installation event
    try {
      await fetch('https://yourwebsite.com/api/telemetry/install', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          installId: installId,
          appName: 'constructlm',
          version: app.getVersion(),
          platform: process.platform,
          arch: process.arch,
          installedAt: new Date().toISOString()
        })
      });
    } catch (error) {
      console.error('Telemetry error:', error);
      // Fail silently - don't block app
    }
  }
  
  return installId;
}

// Call on app ready
app.whenReady().then(async () => {
  const installId = await trackInstallation();
  
  // Track app launch
  trackEvent(installId, 'app_start');
});
```

### Phase 2: Usage Tracking

Track key events and features:

```typescript
async function trackEvent(installId: string, eventType: string, eventData?: any) {
  try {
    await fetch('https://yourwebsite.com/api/telemetry/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        installId: installId,
        appName: 'constructlm',
        version: app.getVersion(),
        eventType: eventType,
        eventData: eventData ? JSON.stringify(eventData) : null,
        timestamp: new Date().toISOString()
      })
    });
  } catch (error) {
    // Fail silently
  }
}

// Track specific features
trackEvent(installId, 'document_uploaded', { fileType: 'pdf', fileSize: 1024 });
trackEvent(installId, 'ai_query', { model: 'gemini', tokens: 500 });
trackEvent(installId, 'rag_search', { resultsCount: 5 });
```

### Phase 3: Heartbeat (Active Users)

Send periodic heartbeat to track active users:

```typescript
// Send heartbeat every 24 hours
setInterval(async () => {
  const installId = store.get('installId');
  
  try {
    await fetch('https://yourwebsite.com/api/telemetry/heartbeat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        installId: installId,
        appName: 'constructlm',
        version: app.getVersion(),
        timestamp: new Date().toISOString()
      })
    });
  } catch (error) {
    // Fail silently
  }
}, 24 * 60 * 60 * 1000); // 24 hours
```

## 📊 Server Endpoints

### 1. Installation Tracking

```typescript
// POST /api/telemetry/install
router.post('/install', async (req, res) => {
  const { installId, appName, version, platform, arch, installedAt } = req.body;
  
  try {
    await db.installations.create({
      install_id: installId,
      app_name: appName,
      version: version,
      platform: platform,
      installed_at: new Date(installedAt),
      last_seen_at: new Date(),
      is_active: 1
    });
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to track installation' });
  }
});
```

### 2. Event Tracking

```typescript
// POST /api/telemetry/event
router.post('/event', async (req, res) => {
  const { installId, appName, version, eventType, eventData, timestamp } = req.body;
  
  try {
    await db.usageEvents.create({
      install_id: installId,
      app_name: appName,
      version: version,
      event_type: eventType,
      event_data: eventData,
      timestamp: new Date(timestamp)
    });
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to track event' });
  }
});
```

### 3. Heartbeat

```typescript
// POST /api/telemetry/heartbeat
router.post('/heartbeat', async (req, res) => {
  const { installId, timestamp } = req.body;
  
  try {
    await db.installations.update({
      where: { install_id: installId },
      data: { last_seen_at: new Date(timestamp) }
    });
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update heartbeat' });
  }
});
```

## 📈 Analytics Dashboard

Create an admin dashboard to view metrics:

```typescript
// GET /api/telemetry/dashboard
router.get('/dashboard', async (req, res) => {
  try {
    // Total installations
    const totalInstalls = await db.installations.count();
    
    // Active users (seen in last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const activeUsers = await db.installations.count({
      where: {
        last_seen_at: { gte: thirtyDaysAgo },
        is_active: 1
      }
    });
    
    // Daily Active Users (last 24 hours)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const dailyActiveUsers = await db.installations.count({
      where: {
        last_seen_at: { gte: oneDayAgo },
        is_active: 1
      }
    });
    
    // Version distribution
    const versionDistribution = await db.installations.groupBy({
      by: ['version'],
      where: { is_active: 1 },
      _count: true
    });
    
    // Platform distribution
    const platformDistribution = await db.installations.groupBy({
      by: ['platform'],
      where: { is_active: 1 },
      _count: true
    });
    
    // Most used features
    const topFeatures = await db.usageEvents.groupBy({
      by: ['event_type'],
      _count: true,
      orderBy: { _count: 'desc' },
      take: 10
    });
    
    res.json({
      total_installations: totalInstalls,
      monthly_active_users: activeUsers,
      daily_active_users: dailyActiveUsers,
      version_distribution: versionDistribution,
      platform_distribution: platformDistribution,
      top_features: topFeatures
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});
```

## 🔒 Privacy Considerations

### 1. User Consent
Add opt-in/opt-out in app settings:

```typescript
// In app settings
const telemetryEnabled = store.get('telemetryEnabled', true); // Default: enabled

if (telemetryEnabled) {
  trackEvent(installId, eventType, eventData);
}
```

### 2. Data Minimization
- Don't collect personal information
- Use anonymous install IDs
- Don't track file contents or user data
- Only track feature usage, not content

### 3. Transparency
Add privacy policy explaining:
- What data is collected
- Why it's collected
- How it's used
- How to opt-out

## 📦 Required Packages

```bash
npm install uuid electron-store
npm install @types/uuid --save-dev
```

## 🎯 Key Metrics to Track

### Installation Metrics:
- ✅ Total installations
- ✅ Installations per day/week/month
- ✅ Platform distribution (Windows/Mac/Linux)
- ✅ Version distribution
- ✅ Geographic distribution

### Usage Metrics:
- ✅ Daily Active Users (DAU)
- ✅ Monthly Active Users (MAU)
- ✅ Session duration
- ✅ Feature usage frequency
- ✅ Retention rate (7-day, 30-day)

### Performance Metrics:
- ✅ App crashes
- ✅ Error rates
- ✅ Load times
- ✅ API response times

## 🚀 Quick Start Checklist

1. [ ] Add database schema (installations, usage_events)
2. [ ] Create telemetry API endpoints
3. [ ] Add telemetry code to Electron app
4. [ ] Implement opt-in/opt-out setting
5. [ ] Create analytics dashboard
6. [ ] Add privacy policy
7. [ ] Test telemetry in development
8. [ ] Deploy and monitor

## 📊 Example Dashboard Queries

### Retention Rate
```sql
-- 7-day retention
SELECT 
  COUNT(DISTINCT CASE WHEN last_seen_at >= NOW() - INTERVAL '7 days' THEN install_id END) * 100.0 / 
  COUNT(DISTINCT install_id) as retention_rate_7d
FROM installations
WHERE installed_at >= NOW() - INTERVAL '14 days';
```

### Growth Rate
```sql
-- Monthly growth
SELECT 
  DATE_TRUNC('month', installed_at) as month,
  COUNT(*) as new_installs
FROM installations
GROUP BY month
ORDER BY month DESC;
```

### Feature Adoption
```sql
-- Feature usage by install cohort
SELECT 
  event_type,
  COUNT(DISTINCT install_id) as unique_users,
  COUNT(*) as total_events
FROM usage_events
WHERE timestamp >= NOW() - INTERVAL '30 days'
GROUP BY event_type
ORDER BY unique_users DESC;
```

---

**Privacy-First Approach**: Always respect user privacy and provide clear opt-out options.
