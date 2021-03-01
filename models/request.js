const { publishMessage } = require("../messaging/publisher");
const {
  newRequestCreatedTopic,
  statusToTopic,
} = require("../messaging/topics");
const { sequelize, Sequelize } = require("./index");
const User = require("./user");
const request = sequelize.define(
  "Request",
  {
    riderId: {
      type: Sequelize.INTEGER,
    },

    dateCreated: {
      type: Sequelize.DATE,
      allowNull: false,
    },

    dateCancelled: {
      type: Sequelize.DATE,
    },

    dateCompleted: {
      type: Sequelize.DATE,
    },

    customerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    status: {
      type: Sequelize.ENUM,
      values: [
        "cancelled",
        "completed",
        "pending",
        "accepted",
        "started",
        "arrived",
      ],
    },

    pickUpAddress: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    destination: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },

  { timestamps: false }
);

request.belongsTo(User, {
  foreignKey: "customerId",
  as: "customer",
});

request.afterCreate((req, opts) => {
  publishMessage(req.toJSON(), newRequestCreatedTopic);
});

request.afterUpdate((req, opts) => {
  publishMessage(req.toJSON(), statusToTopic[req.status]);
});

module.exports.sequelize = sequelize;
module.exports = request;
