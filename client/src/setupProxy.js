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
};