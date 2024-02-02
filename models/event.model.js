const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("../models/user.model");

const eventSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: User.modelName,
    },
    title: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    category: { type: String, required: true },
    ticketsNum: { type: Number, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Event = mongoose.model("Events", eventSchema);
module.exports = Event;
