const { isMatchPassword, hashPassword } = require("../pkg/password");
const { sequelize, Sequelize } = require("./index");
const Request = require("./request");

const user = sequelize.define(
  "User",
  {
    firstName: {
      type: Sequelize.STRING,
    },

    lastName: {
      type: Sequelize.STRING,
    },

    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      index: true,
      unique: true,
    },

    phoneNumber: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    clientDeviceId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    accountType: {
      type: Sequelize.ENUM,
      values: ["customer", "rider"],
    },
  },
  {}
);

user.prototype.isMatchPassword = function (password) {
  return isMatchPassword(password, this.password);
};

user.beforeCreate(async (userObject, option) => {
  userObject.password = await hashPassword(userObject.password);
});

module.exports = user;
