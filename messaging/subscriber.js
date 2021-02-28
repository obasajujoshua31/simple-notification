const getConnection = require("./connection");
const logger = require("../pkg/logger");

function consumeMessages(topic, logMessage) {
  getConnection()
    .then((conn) => {
      conn
        .createChannel()
        .then((chan) => {
          chan.assertQueue(topic);

          chan.consume(topic, (msg) => {
            if (msg !== null) {
              console.log(`message received from ${topic}:  ${logMessage}`);
              chan.ack(msg);
            }
          });
        })
        .catch((error) => {
          logger.error(
            `error occured while consuming from rabbitmq: ${error.message}`
          );
        });
    })
    .catch((error) => {
      logger.error(
        `error occured while consuming from rabbitmq: ${error.message}`
      );
    });
}

module.exports = consumeMessages;
