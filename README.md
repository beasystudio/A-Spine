# A-Spine - Vercel Analytics Enabled

This project is a Vercel deployment that proxies to a Framer website while injecting Vercel Web Analytics.

## Architecture

The project uses Vercel Edge Middleware to:
1. Proxy all requests to `https://a-spine.framer.website/`
2. Inject the Vercel Analytics script into HTML responses
3. Pass through all other content types unchanged

## Setup

### Prerequisites
- Vercel account with Web Analytics enabled for this project
- Enable Web Analytics in your Vercel dashboard: Project Settings → Analytics → Enable

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

This will start a local development server using Vercel CLI.

### Deployment

Deploy to Vercel:

```bash
vercel deploy
```

The middleware will automatically run on the Edge and inject analytics scripts into the proxied content.

## How It Works

1. **Edge Middleware** (`middleware.ts`): Intercepts all requests
2. **Proxy**: Fetches content from Framer website
3. **Analytics Injection**: For HTML responses, injects `<script defer src="/_vercel/insights/script.js"></script>` before `</head>` or `</body>`
4. **Pass-through**: Non-HTML content (images, CSS, JS, etc.) is passed through unchanged

## Vercel Analytics Features

Once deployed and enabled in the Vercel dashboard, you'll get:
- **Visitor tracking** (privacy-friendly, no cookies)
- **Page views** by URL
- **Traffic sources** and demographics
- **Real-time analytics**

## Verification

After deployment, check your browser's Network tab for:
- A request to `/_vercel/insights/script.js`
- Fetch/XHR requests to `/_vercel/insights/view`

These requests confirm that analytics is working correctly.

## Configuration

The middleware is configured in `middleware.ts` to:
- Match all paths (`/:path*`)
- Run on the Edge runtime (default)
- Preserve all original headers and response characteristics

## Notes

- Analytics script injection respects Framer's constraint about not modifying `<div id="main">` or breaking Framer-managed `<head>` tags
- The analytics script is loaded asynchronously to avoid impacting page performance
- All analytics data is processed by Vercel and available in your project dashboard
