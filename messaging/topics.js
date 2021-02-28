const { REQUEST_STATUS } = require("../api/constants");
module.exports.newRequestCreatedTopic = "new-request-created";
module.exports.statusToTopic = {
  accepted: "request-accepted",
  arrived: "rider-arrived",
  started: "ride-started",
  cancelled: "request-cancelled",
  completed: "ride-completed",
};
