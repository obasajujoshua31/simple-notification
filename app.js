const express = require("express");
require("dotenv").config();
const { handleNotFound, initAppMiddlewares } = require("./app.middleware");
const app = express();
const { sequelize } = require("./models/request");

const routes = require("./api/routes");
const startCronTasks = require("./messaging/crons");
const getAmqpConnection = require("./messaging/connection");
//Initialize app middlewares
initAppMiddlewares(app);

const port = process.env.PORT || 5190;

// initialize app routes
app.use("/", routes);

// Application to handle other requests that handler cannot be found
app.all("*", handleNotFound);

// Assert that rabbitmq connection is up

 startCronTasks();

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(port, () => {
      console.log(`Server listening on port ... ${port}`);
    });

    // Start cron tasks
  } catch (error) {
    console.error("Unable to setup dependencies", error);
    process.exit(1);
  }
})();

module.exports = app;
