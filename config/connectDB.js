import mongoose from "mongoose";

const mongooseConnection = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/graphql?retryWrites=true&w=majority`);
    console.log("<------- Connected to MongoDB ------->");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
};

export default mongooseConnection;
