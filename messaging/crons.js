const cron = require("node-cron");
const consumeMessages = require("./subscriber");
const { newRequestCreatedTopic, statusToTopic } = require("./topics");
require("dotenv").config();

function startCronTasks() {
  console.log("Cron task is starting in the background");

  if (process.env.NODE_ENV === "test") {
    return;
  }

  scheduleJob(function () {
    consumeMessages(
      newRequestCreatedTopic,
      "A new ride request was created, click to view details"
    );
  });

  scheduleJob(function () {
    consumeMessages(statusToTopic.accepted, "Your request was accepted");
  });

  scheduleJob(function () {
    consumeMessages(statusToTopic.arrived, "Your driver has arrived");
  });

  scheduleJob(function () {
    consumeMessages(statusToTopic.started, "You are now on your way!");
  });

  scheduleJob(function () {
    consumeMessages(
      statusToTopic.cancelled,
      "Oops! your request was cancelled"
    );
  });

  scheduleJob(function () {
    consumeMessages(
      statusToTopic.completed,
      "Please rate your driver, ride completed"
    );
  });
}

function scheduleJob(cb) {
  cron.schedule(process.env.CRONSCHEDULE, () => cb());
}

module.exports = startCronTasks;
