const db = require("../database/dbConfig");
const bcrypt = require("bcryptjs");
const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/", (req, res) => {
  db.findOwners()
    .then(account => {
      let newArr = [];

      // Takes off the password from the response for security purposes
      // In Twitter, for example, you can search for public user info. Same here.
      account.forEach(acc =>
        newArr.push({
          username: acc.username,
          name: acc.name,
          bio: acc.bio,
          avatar: acc.avatar
        })
      );
      res.status(200).json(newArr);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The owner information could not be retrieved." });
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
