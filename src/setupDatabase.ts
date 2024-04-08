import mongoose from "mongoose";

export default () => {
  const connnect = async () => {
    try {
      await mongoose.connect("mongodb://localhost:27017/express-typescript", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Database connected");
    } catch (error) {
      console.log("Database connection error", error);
    }
  };
};
