const CONFIG = require('./config.json');

const { createProxyMiddleware } = require('http-proxy-middleware');
const obj = {
    target: CONFIG.API_DOMAIN,
    changeOrigin: true,
};

module.exports = function(app) {
    app.use(
        '/auth/google',
        createProxyMiddleware(obj)
    );
    app.use(
        '/auth/facebook',
        createProxyMiddleware(obj)
    );
    app.use(
        '/Question/postQuestion',
        createProxyMiddleware(obj)
    );
    app.use(
        '/Question/getQuestions',
        createProxyMiddleware(obj)
    );
    app.use(
        '/Question/postAnswer',
        createProxyMiddleware(obj)
    );
    app.use(
        '/admin',
        createProxyMiddleware(obj)
    );
    app.use(
        '/upload/image-upload',
        createProxyMiddleware(obj)
    )
};