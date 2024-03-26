import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    name: { type: String, required: false },
    image: { type: String, required: false },
    provider: { type: String, required: false },
    password: { type: String, required: false },
  },
  { versionKey: false, timestamps: true }
);

const UserModel = mongoose.models.users || mongoose.model("users", userSchema);
export default UserModel;
