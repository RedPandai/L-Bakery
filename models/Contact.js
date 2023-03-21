import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 60,
    },
    email: {
      type: String,
      required: true,
      maxlength: 100,
    },
    message: {
      type: String,
      required: true,
      maxlength: 10000,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Contact ||
  mongoose.model("Contact", ContactSchema);
