export const config = {
  matcher: '/:path*',
};

export default async function middleware(request: Request) {
  // Fetch the content from Framer
  const url = new URL(request.url);
  const frameUrl = `https://a-spine.framer.website${url.pathname}${url.search}`;
  
  const response = await fetch(frameUrl, {
    headers: {
      ...Object.fromEntries(request.headers),
      host: 'a-spine.framer.website',
    },
  });

  // Get the content type
  const contentType = response.headers.get('content-type') || '';
  
  // Only inject analytics script for HTML responses
  if (contentType.includes('text/html')) {
    const html = await response.text();
    
    // Inject Vercel Analytics script before </head> or </body>
    const analyticsScript = `<script defer src="/_vercel/insights/script.js"></script>`;
    
    let modifiedHtml = html;
    
    // Try to inject before </head> first
    if (html.includes('</head>')) {
      modifiedHtml = html.replace('</head>', `${analyticsScript}\n</head>`);
    } 
    // Otherwise inject before </body>
    else if (html.includes('</body>')) {
      modifiedHtml = html.replace('</body>', `${analyticsScript}\n</body>`);
    }
    // As a fallback, append to the end
    else {
      modifiedHtml = html + analyticsScript;
    }
    
    return new Response(modifiedHtml, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  }
  
  // For non-HTML responses, pass through as-is
  const body = await response.arrayBuffer();
  return new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}
