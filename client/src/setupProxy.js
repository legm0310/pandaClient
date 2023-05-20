// proxy 설정 - CORS 이슈를 해결하기 위한

const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/",
    createProxyMiddleware({
      target: "",
      changeOrigin: true,
    })
  );
};
