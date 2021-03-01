const getConnection = require("./connection");
const logger = require("../pkg/logger");

module.exports.publishMessage = (request, topic) => {
  if (process.env.NODE_ENV === "test") {
    console.log("message published");
    return;
  }

  return getConnection()
    .then((conn) => {
      conn.createChannel().then((chan) => {
        chan.assertQueue(topic);
        console.log(`Publishing to topic: ${topic}`);
        chan.sendToQueue(topic, Buffer.from(JSON.stringify(request)));
      });
    })
    .catch((error) => {
      logger.error(
        `error occured while publishing to rabbitmq: ${error.message}`
      );
    });
};
