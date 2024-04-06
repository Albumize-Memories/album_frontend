const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://backend.tasveer.shop', // Replace with your backend URL
            changeOrigin: true,
        })
    );
};