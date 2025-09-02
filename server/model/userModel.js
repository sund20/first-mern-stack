import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,  // ✅ Required field
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email'],  // basic email validation
  },
  address: {
    type: String,
    required: true,  // ✅ Required field
  }
});

export default mongoose.model("User", userSchema);
