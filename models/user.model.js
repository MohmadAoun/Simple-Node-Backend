const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: { type: "string", required: true },
    lastName: { type: "string", required: true },
    businessName: { type: "string" },
    email: { type: "string", required: true },
    password: { type: "string", required: true },
    userType: { type: "string", required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
