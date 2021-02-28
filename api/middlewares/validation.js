const { BADREQUEST } = require("../constants");
const { check, body, validationResult } = require("express-validator");

const checkString = (field, length = 1) =>
  check(field)
    .trim()
    .isLength({ min: length })
    .withMessage(`${field} cannot be empty`);

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(BADREQUEST).json({ errors: errors.array() });
  }

  return next();
};

module.exports.validateLogin = () => [
  check("email").isEmail().withMessage("Email is invalid!"),
  checkString("password"),
  validateRequest,
];

module.exports.validateCreateRequest = [
  checkString("pickUpAddress"),
  checkString("destination"),
  validateRequest,
];

module.exports.validateSignup = () => [
  checkString("firstName"),
  checkString("lastName"),
  checkString("phoneNumber"),
  check("email").isEmail().withMessage("Email is not valid"),
  // checkString("password"),
  check("accountType")
    .isIn(["rider", "customer"])
    .withMessage("account type should be either customer or rider"),
  validateRequest,
];
