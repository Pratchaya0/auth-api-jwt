require("dotenv").config();
import express from "express";
import config from "config";
// import connectToDb from "./utils/connect-to-db";
import log from "./utils/logger";
import router from "./routes";
import deserializeUser from "./middleware/deserialize-user";

const app = express();

app.use(express.json());

app.use(deserializeUser);

app.use(router);

const port = config.get("port");

app.listen(port, () => {
  log.info(`App started at http://localhost:${port}`);

  // if not use sqlite connectToDb();
});
