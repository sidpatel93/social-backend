import mongoose from "mongoose";
import { config } from "./config";
import logger from "./shared/global/helpers/logger";

const log = logger.createLogger("info");

export default () => {
  const connnect = async () => {
    try {
      await mongoose.connect(config.DATABASE_URL);
      log.info("Connected to database");
    } catch (error) {
      log.error(`Error connecting to database: ${error}`);
    }
  };
  connnect();
  mongoose.connection.on("disconnected", connnect);
};
