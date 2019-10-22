const router = require("express").Router();
const db = require("../database/dbConfig");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/register/owner", (req, res) => {
  if (!req.body.name || !req.body.password) {
    res.status(400).json({
      errorMessage: "Please provide username, name and password for the user."
    });
  } else {
    req.body.password = bcrypt.hashSync(req.body.password, 12);

    db.registerOwner(req.body)
      .then(account => {
        res.status(201).json(account);
      })
      .catch(error => {
        res.status(500).json({
          error: "There was an error while saving the owner to the database"
        });
      });
  }
});

router.post("/register/entrepreneur", (req, res) => {
  if (!req.body.username || !req.body.name || !req.body.password) {
    res.status(400).json({
      errorMessage:
        "Please provide username, name and password for the entrepreneur."
    });
  } else {
    req.body.password = bcrypt.hashSync(req.body.password, 12);

    db.registerEntrepreneur(req.body)
      .then(account => {
        res.status(201).json(account);
      })
      .catch(error => {
        res.status(500).json({
          error:
            "There was an error while saving the entrepreneur to the database"
        });
      });
  }
});

router.post("/login", (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({
      errorMessage:
        "Please provide username and password for the user when logging in."
    });
  } else {
    db.matchEnt(req.body.username)
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
          const token = generateToken(user);
          req.headers.authorization = token;
          res.status(200).json({ message: "Successfully logged in", token });
        } else {
          db.matchOwn(req.body.username)
            .first()
            .then(owner => {
              if (
                owner &&
                bcrypt.compareSync(req.body.password, owner.password)
              ) {
                const token = generateToken(owner);
                req.headers.authorization = token;
                res
                  .status(200)
                  .json({ message: "Successfully logged in", token });
              } else
                res.status(401).json({ message: "Invalid user credentials" });
            })
            .catch(e => console.log(e));
        }
      })
      .catch(e => console.log(e));
  }
});

function generateToken(user) {
  const payload = {
    username: user.username,
    name: user.name,
    avatar: user.avatar,
    bio: user.bio
  };
  const secret = "idsfwgTARDISr37yehiwfe7rgfsdf73wupp999(^%$";
  const options = {
    expiresIn: "8h"
  };
  return jwt.sign(payload, secret, options);
}

module.exports = router;
