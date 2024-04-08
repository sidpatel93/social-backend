import mongoose from "mongoose";

export default () => {
  const connnect = async () => {
    try {
      await mongoose.connect("mongodb://root:password@localhost:27017/");
      console.log("Database connected !!");
    } catch (error) {
      console.log("Database connection error", error);
    }
  };
  connnect();
  mongoose.connection.on("disconnected", connnect);
};
