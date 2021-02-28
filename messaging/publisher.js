const getConnection = require("./connection");
const logger = require("../pkg/logger");

module.exports.publishMessage = (request, topic) => {
  return getConnection()
    .then((conn) => {
      conn.createChannel().then((chan) => {
        chan.assertQueue(topic);
        chan.sendToQueue(topic, Buffer.from(JSON.stringify(request)));
      });
    })
    .catch((error) => {
      logger.error(`error occured while publishing to rabbitmq: ${error.message}`);
    });
};
