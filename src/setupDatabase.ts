import mongoose from "mongoose";
import { config } from "./config";

export default () => {
  const connnect = async () => {
    try {
      await mongoose.connect(config.DATABASE_URL);
      console.log("Database connected !!");
    } catch (error) {
      console.log("Database connection error", error);
    }
  };
  connnect();
  mongoose.connection.on("disconnected", connnect);
};
