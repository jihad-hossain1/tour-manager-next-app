import mongoose from "mongoose";

const mongooseConnection = async () => {
  try {
    if (process.env.PRODUCTION === 'development') {
      await mongoose.connect("mongodb://127.0.0.1:27017/graphql");
      console.log("<------- Connected to MongoDB ------->");
    } else {
      await mongoose.connect(`${process.env.MONGODB_URI}/graphql?retryWrites=true&w=majority`);
    console.log("<------- Connected to MongoDB ------->");
    }
    
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
};

export default mongooseConnection;
