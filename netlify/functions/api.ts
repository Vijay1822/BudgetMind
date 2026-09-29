import serverless from 'serverless-http';
import app from '../../server/app';

// Bridges the Express backend (server/app.ts) to a Netlify Function so every
// /api/* route, including Firebase token verification, is served in production.
const handler = serverless(app, {
  // serverless-http hands Express a pre-read request, which Express 5's body
  // parser treats as already consumed, so decode JSON bodies here instead.
  request(req: any) {
    if (!Buffer.isBuffer(req.body)) return;
    const raw: Buffer = req.body;
    const contentType = String(req.headers['content-type'] || '');
    if (!raw.length) {
      req.body = undefined;
    } else if (contentType.includes('application/json')) {
      try {
        req.body = JSON.parse(raw.toString('utf8'));
      } catch {
        req.body = {};
      }
    }
  },
});

export default async (req: Request) => {
  const url = new URL(req.url);
  const hasBody = req.method !== 'GET' && req.method !== 'HEAD';
  const body = hasBody ? Buffer.from(await req.arrayBuffer()).toString('base64') : undefined;

  const result: any = await handler(
    {
      httpMethod: req.method,
      path: url.pathname,
      queryStringParameters: Object.fromEntries(url.searchParams),
      headers: Object.fromEntries(req.headers),
      body,
      isBase64Encoded: Boolean(body),
    },
    {},
  );

  const headers = new Headers();
  for (const [key, value] of Object.entries(result.headers || {})) {
    headers.set(key, String(value));
  }
  for (const [key, values] of Object.entries(result.multiValueHeaders || {})) {
    for (const value of values as unknown[]) headers.append(key, String(value));
  }

  const responseBody = result.isBase64Encoded ? Buffer.from(result.body || '', 'base64') : result.body;
  return new Response(req.method === 'HEAD' ? null : responseBody, {
    status: result.statusCode,
    headers,
  });
};

export const config = {
  path: '/api/*',
};
