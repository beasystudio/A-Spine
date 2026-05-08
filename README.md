# A-Spine

This project is a Vercel-hosted proxy to a Framer website.

## Vercel Speed Insights Setup

This project has been configured to support Vercel Speed Insights.

### Current Configuration

Since this project uses Vercel rewrites to proxy to a Framer website, Speed Insights must be enabled through the Vercel Dashboard rather than code integration.

**Setup Steps:**

1. **Install the Speed Insights package** (already added to package.json):
   ```bash
   npm install
   ```

2. **Enable Speed Insights in Vercel Dashboard:**
   - Go to your project in the Vercel Dashboard
   - Navigate to the "Speed Insights" tab
   - Click "Enable Speed Insights"

3. **Deploy your changes:**
   ```bash
   vercel deploy
   ```

### How It Works

- The `@vercel/speed-insights` package is installed as a dependency
- `vercel.json` includes `"analytics": { "enable": true }` to enable platform-level analytics
- When Speed Insights is enabled in the dashboard, Vercel automatically injects the tracking script into your pages
- This works even with rewrites because the injection happens at the edge before the rewrite

### For Future Framework Integration

If you decide to migrate from Framer to a JavaScript framework (Next.js, React, Vue, etc.), you can integrate Speed Insights directly in your code:

**Next.js (App Router):**
```typescript
// app/layout.tsx
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
```

**React:**
```typescript
// App.tsx
import { SpeedInsights } from '@vercel/speed-insights/react';

export default function App() {
  return (
    <div>
      {/* Your app content */}
      <SpeedInsights />
    </div>
  );
}
```

## Resources

- [Vercel Speed Insights Documentation](https://vercel.com/docs/speed-insights)
- [Speed Insights Quickstart](https://vercel.com/docs/speed-insights/quickstart)
