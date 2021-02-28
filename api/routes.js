const { Router } = require("express");
const { handleLogin, handleSignup } = require("./auth.controller");
const {
  handleCreateRequests,
  handleGetOneRiderRequest,
  handleCancelRiderRequest,
  handleCompleteRiderRequest,
  handleAcceptRiderRequests,
  handleArriveRiderRequest,
  handleStartRide,
} = require("./requests.controller");
const {
  validateCreateRequest,
  validateSignup,
  validateLogin,
} = require("./middlewares/validation");
const { checkAuth, verifyUser } = require("./middlewares/authenticate");
const {
  findRequestByParamID,
  checkRequestStatus,
} = require("./middlewares/request");
const { REQUEST_STATUS } = require("./constants");

const router = Router();

router.post("/auth/login", validateLogin(), handleLogin);

router.post("/auth/signup", validateSignup(), handleSignup);

router.post(
  "/requests",
  validateCreateRequest,
  verifyUser,
  checkAuth("customer"),
  handleCreateRequests
);

router
  .route("/request/:id")
  .get(verifyUser, findRequestByParamID, handleGetOneRiderRequest)
  .delete(
    verifyUser,
    findRequestByParamID,
    checkRequestStatus(
      [REQUEST_STATUS.pending, REQUEST_STATUS.accepted],
      "can only cancel pending or accepted request"
    ),
    handleCancelRiderRequest
  );

router.put(
  "/request/:id/complete",
  verifyUser,
  checkAuth("rider"),
  findRequestByParamID,
  checkRequestStatus(
    [REQUEST_STATUS.started],
    "only started rides can be completed"
  ),
  handleCompleteRiderRequest
);

router.put(
  "/request/:id/accept",
  verifyUser,
  checkAuth("rider"),
  findRequestByParamID,
  checkRequestStatus(
    [REQUEST_STATUS.pending],
    "can only accept pending request"
  ),
  handleAcceptRiderRequests
);

router.put(
  "/request/:id/arrived",
  verifyUser,
  checkAuth("rider"),
  findRequestByParamID,
  checkRequestStatus(
    [REQUEST_STATUS.accepted],
    "can only arrived for accepted request"
  ),
  handleArriveRiderRequest
);

router.put(
  "/request/:id/start",
  verifyUser,
  checkAuth("rider"),
  findRequestByParamID,
  checkRequestStatus(
    [REQUEST_STATUS.arrived],
    "can only start arrived request"
  ),
  handleStartRide
);

module.exports = router;
