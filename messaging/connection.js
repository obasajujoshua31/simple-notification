const amqp = require("amqplib");
require("dotenv").config();

function getAmqpConnection() {
  return new Promise((resolve, reject) => {
    amqp
      .connect(process.env.RABBITMQ_URL)
      .then((conn) => resolve(conn))
      .catch((error) => reject(error));
  });
}

module.exports = getAmqpConnection;
