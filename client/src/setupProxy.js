// proxy 설정 - CORS 이슈를 해결하기 위한

const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: process.env.SERVER_URL,
      chagneOrigin: true,
    })
  );
};
