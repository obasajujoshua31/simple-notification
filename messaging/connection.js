const amqp = require("amqplib");
require("dotenv").config();

function getAmqpConnection() {
  if (process.env.NODE_ENV === "test") {
    return Promise.resolve(true);
  }

  return new Promise((resolve, reject) => {
    amqp
      .connect(process.env.RABBITMQ_URL)
      .then((conn) => resolve(conn))
      .catch((error) => reject(error));
  });
}

module.exports = getAmqpConnection;
