const {
  INTERNALSERVERERROR,
  REQUEST_STATUS,
  OK,
  NOTFOUND,
  CREATED,
  NOTACCEPTED,
} = require("./constants");
const logger = require("../pkg/logger");
const Request = require("../models/request");

module.exports.handleCreateRequests = async (req, res) => {
  try {
    const { pickUpAddress, destination } = req.body;

    const newRequest = await Request.create({
      pickUpAddress,
      destination,
      dateCreated: new Date(),
      status: REQUEST_STATUS.pending,
      customerId: req.user.id,
    });

    return res.status(CREATED).json({
      request: newRequest.toJSON(),
    });
  } catch (error) {
    logger.error(`error occured ${error.message}`);

    return res
      .status(INTERNALSERVERERROR)
      .send("unknown error occured, please try again later");
  }
};

module.exports.handleAcceptRiderRequests = async (req, res) => {
  try {
    const { request } = req;

    request.status = REQUEST_STATUS.accepted;
    request.riderId = req.user.id;
    await request.save();

    return res.status(OK).json({ message: "request accepted", request });
  } catch (error) {
    logger.error(`error occured ${error.message}`);

    return res
      .status(INTERNALSERVERERROR)
      .send("unknown error occured, please try again later");
  }
};

module.exports.handleCancelRiderRequest = async (req, res) => {
  try {
    const { request } = req;

    request.dateCancelled = new Date();

    request.status = REQUEST_STATUS.cancelled;

    await request.save();

    return res.status(200).json({ message: "request cancelled", request });
  } catch (error) {
    logger.error(`error occured ${error.message}`);
    return res
      .status(INTERNALSERVERERROR)
      .send("unknown error occured, please try again later");
  }
};

module.exports.handleCompleteRiderRequest = async (req, res) => {
  try {
    const { request } = req;

    request.status = REQUEST_STATUS.completed;
    request.dateCompleted = new Date()

    await request.save();

    return res.status(200).json({ message: "request completed", request });
  } catch (error) {
    logger.error(`error occured ${error.message}`);

    return res
      .status(INTERNALSERVERERROR)
      .send("unknown error occured, please try again later");
  }
};

module.exports.handleArriveRiderRequest = async (req, res) => {
  try {
    const { request } = req;

    request.status = REQUEST_STATUS.arrived;

    await request.save();

    return res.status(200).json({ message: "rider arrived", request });
  } catch (error) {
    logger.error(`error occured ${error.message}`);

    return res
      .status(INTERNALSERVERERROR)
      .send("unknown error occured, please try again later");
  }
};

module.exports.handleStartRide = async (req, res) => {
  try {
    const { request } = req;

    request.status = REQUEST_STATUS.started;

    await request.save();
    return res.status(200).json({ message: "ride started", request });
  } catch (error) {
    logger.error(`error occured ${error.message}`);
    return res
      .status(INTERNALSERVERERROR)
      .send("unknown error occured, please try again later");
  }
};

module.exports.handleGetOneRiderRequest = async (req, res) => {
  return res.status(OK).json({ request: req.request.toJSON() });
};
