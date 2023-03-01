require("dotenv").config();
const jwt = require("jsonwebtoken");
const { SECRET } = process.env;

module.exports = {
  isAuthenticated: (req, res, next) => {
    //save the authorization parameter from the front end, to a variable
    const headerToken = req.get("Authorization");

    //if the headerToken does not exist, it sends back a missing 401 error
    if (!headerToken) {
      console.log("ERROR IN auth middleware");
      res.sendStatus(401);
    }

    let token;

    try {
      // use jwt and the verify method to decrypt the token with our secret code. If the user has a correct token then they are logged in and it returns as true.
      token = jwt.verify(headerToken, SECRET);
    } catch (err) {
      //if there is a problem with the actual jwt function (such as SECRET being missing) this would catch it and throw a 500 error
      err.statusCode = 500;
      throw err;
    }

    //if the user is not logged in, the token will be falsie
    if (!token) {
      const error = new Error("Not authenticated.");
      error.statusCode = 401;
      throw error;
    }

    //runs the next function in the end point
    next();
  },
};
