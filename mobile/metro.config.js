const { getDefaultConfig } = require('expo/metro-config');
const http = require('http');

const config = getDefaultConfig(__dirname);
const SHIP_PORT = Number(process.env.SHIP_API_PORT || 4173);

/**
 * Proxy /api/* through Metro so Expo Go tunnel users can hit the local ship
 * without a second public tunnel or LAN access to :4173.
 */
config.server = {
  ...config.server,
  enhanceMiddleware: (metroMiddleware) => {
    return (req, res, next) => {
      const url = req.url || '';
      if (!url.startsWith('/api')) {
        return metroMiddleware(req, res, next);
      }

      const headers = { ...req.headers, host: `127.0.0.1:${SHIP_PORT}` };
      delete headers['accept-encoding'];
      delete headers['content-length'];

      const proxyReq = http.request(
        {
          hostname: '127.0.0.1',
          port: SHIP_PORT,
          path: url,
          method: req.method,
          headers,
        },
        (proxyRes) => {
          const outHeaders = { ...proxyRes.headers };
          delete outHeaders['content-encoding'];
          res.writeHead(proxyRes.statusCode || 502, outHeaders);
          proxyRes.pipe(res);
        },
      );

      proxyReq.on('error', (err) => {
        res.statusCode = 502;
        res.setHeader('Content-Type', 'application/json');
        res.end(
          JSON.stringify({
            error: `Ship API proxy failed (${err.message}). Is npm start running on :${SHIP_PORT}?`,
          }),
        );
      });

      req.pipe(proxyReq);
    };
  },
};

module.exports = config;
