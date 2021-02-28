require("dotenv").config();
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

module.exports.generateJwtToken = ({
  email,
  id,
  firstName,
  lastName,
  accountType,
}) => {
  return jwt.sign({ email, id, firstName, lastName, accountType }, jwtSecret, {
    expiresIn: "24h",
  });
};

module.exports.verifyToken = (token) => {
  return jwt.verify(token, jwtSecret);
};
