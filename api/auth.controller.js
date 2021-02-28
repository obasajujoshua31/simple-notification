const uuid = require("uuid");
const User = require("../models/user");
const { generateJwtToken } = require("../pkg/jwt");
const { INTERNALSERVERERROR, BADREQUEST, OK, CREATED } = require("./constants");
const logger = require("../pkg/logger");

module.exports.handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userFound = await User.findOne({ where: { email } });
    if (!userFound) {
      return res.status(BADREQUEST).send("Invalid login details");
    }

    const isMatch = await userFound.isMatchPassword(password);

    if (!isMatch) {
      return res.status(BADREQUEST).send("Invalid login details");
    }

    const token = generateJwtToken(userFound);

    return res.status(OK).json({
      token,
      expiresIn: "24h",
    });
  } catch (error) {
    logger.error(`error occured ${error.message}`);
    return res
      .status(INTERNALSERVERERROR)
      .send("unknown error occured please try again later");
  }
};

module.exports.handleSignup = async (req, res) => {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      accountType,
      phoneNumber,
    } = req.body;

    const foundUser = await User.findOne({ where: { email } });

    if (foundUser) {
      return res.status(BADREQUEST).send("Email is not available");
    }

    const newUser = await User.create({
      email,
      password,
      firstName,
      lastName,
      accountType,
      phoneNumber,
      clientDeviceId: uuid.v4(),
    });

    const token = generateJwtToken(newUser);

    return res.status(CREATED).json({
      token,
      expiresIn: "24h",
    });
  } catch (error) {
    logger.error(`error occured ${error.message}`);
    return res
      .status(INTERNALSERVERERROR)
      .send("unknown error occured please try again later");
  }
};
