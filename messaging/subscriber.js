const getConnection = require("./connection");
const logger = require("../pkg/logger");

async function consumeMessages(topic, logMessage) {
  try {
    const conn = await getConnection();
    const chan = await conn.createChannel();
    chan.assertQueue(topic);

    chan.consume(topic, (msg) => {
      if (msg !== null) {
        console.log(`message received from ${topic}:  ${logMessage}`);
        chan.ack(msg);
      }
    });
  } catch (error) {
    logger.error(
      `error occured while consuming from rabbitmq: ${
        error.message
      } ${new Date()}`
    );
  }
}

module.exports = consumeMessages;
