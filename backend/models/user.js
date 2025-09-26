import { Schema } from "mongoose";
import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6, select: false },
    businessName: { type: String, default: "" },
    address: { type: String, default: "" },
    phone: { type: String, default: "" },
  },
  { timestamps: true }
);

// password hashing middleware can be added here
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const bcryptjs = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, bcryptjs);
    next();
})


// password to verify 
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const User =  await mongoose.model("User", userSchema);
export default User;