require("dotenv").config();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const { SECRET } = process.env;

const createToken = (username, id) => {
  return jwt.sign({ username, id }, SECRET, { expiresIn: "2 days" });
};

const logout = (req, res) => {
  console.log("logout");
};

const login = async (req, res) => {
  console.log("login - server/controllers/auth");

  try {
    const { username, password } = req.body;

    const foundUser = await User.findOne({ where: { username: username } });

    if (foundUser) {
      const isAuthenticated = bcrypt.compareSync(
        password,
        foundUser.hashedPass
      );

      if (isAuthenticated) {
        const token = createToken(
          foundUser.dataValues.username,
          foundUser.dataValues.id
        );

        const exp = Date.now() + 1000 * 60 * 60 * 48;

        res.status(200).send({
          username: foundUser.dataValues.username,
          userId: foundUser.dataValues.id,
          token: token,
          exp: exp,
        });
      } else {
        res.status(400).send("Password was incorrect");
      }
    } else {
      res.status(404).send("User doesn't exist");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

const register = async (req, res, next) => {
  console.log("register - server/controllers/auth");
  try {
    const { username, password } = req.body;
    const foundUser = await User.findOne({ where: { username: username } });
    if (foundUser) {
      res.status(400).send("user already exists");
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const newUser = await User.create({
        username: username,
        hashedPass: hash,
      });

      const token = createToken(
        newUser.dataValues.username,
        newUser.dataValues.id
      );

      const exp = Date.now() + 1000 * 60 * 60 * 48;
      res.status(200).send({
        username: newUser.dataValues.username,
        userId: newUser.dataValues.id,
        token: token,
        exp: exp,
      });
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

module.exports = { register, login, logout };
