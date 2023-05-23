const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const morgan = require("morgan");
const config = require("../config");
const routerLoader = require("../routes");
const { accessStrategy, refreshStrategy } = require("../config/passport");
const { NotFoundError } = require("../utils/generalError");
const { secure, errorConvert, globalErrorHandler } = require("../middlewares");

/** express 앱의 미들웨어들을 로드하는 함수
 * @param {object} options 미들웨어를 실행시킬 express app
 * @param {Function} options.app 미들웨어를 실행시킬 express app
 */
module.exports = ({ app }) => {
  //Http 요청, 응답 로깅
  app.use(morgan("dev"));

  //static 디렉터리 설정
  app.use(express.static(path.join(__dirname, "public")));

  //json, urlencoded request body / cookie parse
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  //cors
  if (config.nodeEnv === "production") {
    app.use(cors(config.cors));
  }

  //unknown request deny
  app.use(secure);

  //jwt authentication
  app.use(passport.initialize());
  passport.use("access", accessStrategy);
  passport.use("refresh", refreshStrategy);

  //api routes
  //route -> controller -> service -> model -> db 엑세스 순으로 요청이 처리됨
  app.use("/api", routerLoader());

  //ALB health check
  app.get("/", async (req, res) => {
    console.log("** health checking executed");
    res.sendStatus(200);
  });

  //test routes
  app.get("/reqCheck", (req, res) => {
    console.log(req.headers);
    console.log(req.cookies);
    res.send("clear");
  });
  app.get("/status", (req, res) => {
    res.status(200).end();
  });
  app.head("/status", (req, res) => {
    res.status(200).end();
  });

  //요청 자원(Url)이 없을 때
  app.use((req, res, next) => {
    next(new NotFoundError("Not Found"));
  });
  //error handler
  app.use(errorConvert);
  app.use(globalErrorHandler);
};
