const request = require("../../models/request");
const Request = require("../../models/request");
const User = require("../../models/user");
const logger = require("../../pkg/logger");
const {
  INTERNALSERVERERROR,
  NOTFOUND,
  NOTACCEPTED,
  FORBIDDEN,
} = require("../constants");

module.exports.findRequestByParamID = async (req, res, next) => {
  try {
    const request = await Request.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: [
            "firstName",
            "lastName",
            "email",
            "phoneNumber",
            "clientDeviceId",
          ],
          as: "customer",
        },
      ],
    });
    if (!request) {
      return res.sendStatus(NOTFOUND);
    }

    req.request = request;

    return next();
  } catch (error) {
    logger.error(`error occured ${error.message}`);
    return res
      .status(INTERNALSERVERERROR)
      .send("unknown error occured, please try again later");
  }
};

module.exports.checkRequestStatus = (statusAllowed, errorMessage) => (
  req,
  res,
  next
) => {
  if (!statusAllowed.includes(req.request.status)) {
    return res.status(NOTACCEPTED).send(errorMessage);
  }

  return next();
};

module.exports.checkCustomerRequestPrividge = (req, res, next) => {
  if (req.request.customerId !== req.user.id) {
    return res.sendStatus(FORBIDDEN);
  }

  return next();
};

module.exports.checkRiderRequestPrividge = (req, res, next) => {
  if (req.request.riderId !== req.user.id) {
    return res.sendStatus(FORBIDDEN);
  }

  return next();
};
