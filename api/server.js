const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authenticate = require("../auth/authenticate-middleware.js");
const authRouter = require("../auth/auth-router.js");
const EntrepreneurRouter = require("../entrepreneurs/ent-router.js");
const OwnersRouter = require("../owners/owner-router");
const QuestionsRouter = require("../questions/questions-router");
const AnswersRouter = require("../answers/answers-router");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api", authRouter);
server.use("/api/entrepreneurs", EntrepreneurRouter);
server.use("/api/owners", OwnersRouter);
server.use("/api/questions", QuestionsRouter);
server.use("/api/answers", AnswersRouter);
// server.use("/api/jokes", authenticate, EntrepreneurRouter);

module.exports = server;
