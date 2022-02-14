import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost/ArrowInv", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log(`Database Connected on ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    //process.exit(1);
    console.log("Couldn't connect to the database");
  }
};
export default connectDB;
