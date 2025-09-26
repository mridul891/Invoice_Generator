import { mongo, Schema } from "mongoose";
import { bcrypt } from 'bcryptjs';

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
    const bcrypt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, bcrypt);
    next();
})


// password to verify 
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}
module.exports = mongoose.model("User", userSchema);
