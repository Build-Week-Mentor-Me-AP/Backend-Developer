const db = require("../database/dbConfig");
const bcrypt = require("bcryptjs");
const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/", (req, res) => {
  db.findAnswers()
    .then(account => {
      res.status(200).json(account);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The project information could not be retrieved." });
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
