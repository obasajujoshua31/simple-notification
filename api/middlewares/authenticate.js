const { verifyToken } = require("../../pkg/jwt");
const logger = require("../../pkg/logger");
const { NOTAUTHORIZED, FORBIDDEN } = require("../constants");

module.exports.verifyUser = (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    if (typeof token === "undefined") {
      return res.status(NOTAUTHORIZED).send("no token passed!");
    }

    const [, bearerToken] = token.split(" ");
    if (typeof bearerToken === "undefined") {
      return res.status(NOTAUTHORIZED).send("no bearer token passed!");
    }

    const user = verifyToken(bearerToken);
    req.user = user;

    return next();
  } catch (error) {
    logger.error(`error occured ${error.message}`);
    return res
      .status(NOTAUTHORIZED)
      .send("cannot be verified, please login again");
  }
};

module.exports.checkAuth = (accountType) => (req, res, next) => {
  if (req.user.accountType !== accountType) {
    return res.sendStatus(FORBIDDEN);
  }

  return next();
};
