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

server.use("/", (req, res) => res.send("Welcome to the Mentor Me backend!"));
server.use("/api", authRouter);
server.use("/api/entrepreneurs", authenticate, EntrepreneurRouter);
server.use("/api/owners", authenticate, OwnersRouter);

// Questions are public for everyone but only registered users can see the answers from professional owners
server.use("/api/questions", QuestionsRouter);
server.use("/api/answers", authenticate, AnswersRouter);

module.exports = server;
