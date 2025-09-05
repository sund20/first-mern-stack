import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,  // ✅ Fix here
    },
    email: {
type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email']
    },
    address: {
        type: String,
        required: true,  // ✅ Fix here
    }
});

export default mongoose.model("Users", userSchema);
