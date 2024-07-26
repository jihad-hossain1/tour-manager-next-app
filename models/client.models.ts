import mongoose, { models } from "mongoose";
import bcrypt from "bcryptjs";
// import { MAX_CALENDAR_HEIGHT } from "@mui/x-date-pickers/internals/constants/dimensions";

const AddressType = new mongoose.Schema({
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City",
  },
  division: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Division",
  },
  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Country",
  },
});

const ClientSchema = new mongoose.Schema(
  {
    address: AddressType,
    name: {
      type: String,
      required: true,
      max: 100,
    },
    slug: {
      type: String,
      max: 100,
      min: 2,
    },
    mobile: {
      type: String,
      required: true,
      max: 11,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      max: 20,
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      enum: ["client", "admin"],
      default: "client",
    },
    clientType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

ClientSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password") || user.isNew) {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
    } catch (err) {
      return next(err);
    }
  }
  next();
});

const Client = models.Client || mongoose.model("Client", ClientSchema);

export default Client;
