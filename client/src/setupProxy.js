const { createProxyMiddleware } = require('http-proxy-middleware');

const obj = {
    target: 'http://localhost:5000',
    changeOrigin: true,
  };

module.exports = function(app) {
  app.use(
    '/auth/google',
    createProxyMiddleware(obj)
  );
  app.use(
    '/upload/image',
    createProxyMiddleware(obj)
  );

};

