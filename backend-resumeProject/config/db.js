import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://a2985171395:resume123@cluster0.dae5xd3.mongodb.net/RESUME"
    )
    .then(() => console.log("DB Connected"));
};
