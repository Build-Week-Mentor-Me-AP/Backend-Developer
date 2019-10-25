const db = require("../database/dbConfig");
const bcrypt = require("bcryptjs");
const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/", (req, res) => {
  db.findQuestions()
    .then(question => {
      res.status(200).json(question);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The project information could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  db.findQuestionsById(req.params.id)
    .then(answers => {
      if (!answers) {
        res.status(404).json({
          message: "The question with the specified ID does not exist."
        });
      } else {
        res.status(200).json(answers);
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The answers information could not be retrieved." });
    });
});

router.get("/:id/answers", (req, res) => {
  db.findAnswersOnQuestions(req.params.id)
    .then(answers => {
      if (!answers) {
        res.status(404).json({
          message: "The question with the specified ID does not exist."
        });
      } else {
        res.status(200).json(answers);
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The answers information could not be retrieved." });
    });
});

router.put("/:id", (req, res) => {
  db.updateQuestion(req.params.id, req.body)
    .then(question => {
      if (!question) {
        res.status(404).json({
          message: "The questions with the specified ID does not exist."
        });
      } else res.status(200).json(question);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The questions information could not be modified." });
    });
});

router.delete("/:id", (req, res) => {
  db.removeQuestion(req.params.id)
    .then(question => {
      if (!question) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        res.status(204).send({});
      }
    })
    .catch(error => {
      res.status(500).json({ error: "The post could not be removed" });
    });
});

function generateToken(user) {
  const payload = {
    username: user.username,
    name: user.name,
    bio: user.bio,
    avatar: user.avatar
  };
  const secret = "idsfwgier37yehiwfe7rgfsdf73wupp999(^%$";
  const options = {
    expiresIn: "8h"
  };
  return jwt.sign(payload, secret, options);
}

module.exports = router;
