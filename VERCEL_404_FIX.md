# Vercel 404 Fix - Client-Side Routing

## Problem
Navigating to `/tools`, `/pricing`, or any route shows 404 NOT_FOUND error on Vercel deployment.

## Root Cause
Your `vercel.json` was missing the `rewrites` configuration. Without it, Vercel tries to find physical files for each route instead of serving `index.html` for all routes (which is required for Single Page Applications with client-side routing).

## Solution
Added rewrites rule to `vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This tells Vercel: "For ANY route, serve index.html and let the client-side router (wouter) handle it."

## How It Works
1. User visits `/tools`
2. Vercel receives request
3. Instead of looking for `/tools` file (404), it serves `/index.html`
4. React app loads
5. Wouter router sees `/tools` in URL and renders Tools page

## Files Modified
- `vercel.json` - Added rewrites configuration

## Next Steps
Deploy to Vercel and the 404 errors will be gone. All routes will work correctly.
