// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/v1',
    createProxyMiddleware({
      target: 'https://gcp-mock.apiwiz.io',
      changeOrigin: true,
    })
  );
};
