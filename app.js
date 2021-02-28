const express = require("express");
require("dotenv").config();
const { handleNotFound, initAppMiddlewares } = require("./app.middleware");
const app = express();
const { sequelize } = require("./models/request");

const routes = require("./api/routes");
const getAmqpConnection = require("./messaging/connection");
const startCronTasks = require("./messaging/crons");
//Initialize app middlewares
initAppMiddlewares(app);

const port = process.env.PORT || 4000;

// initialize app routes
app.use("/", routes);

// Application to handle other requests that handler cannot be found
app.all("*", handleNotFound);

// Start cron tasks
startCronTasks();

sequelize
  .authenticate()
  .then(() => {
    sequelize.sync().then(() => {
      app.listen(port, () => {
        console.log(`Server listening on port ... ${port}`);
      });
    });
  })
  .catch((error) => {
    console.error("Unable to connect to SQLite Database", error);
    process.exit(1);
  });
