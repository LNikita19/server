const mongoose = require("mongoose");

const userContactSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
    },
    Phone: {
      type: String,
    },
    Email: {
      type: String,
    },
    Message: {
      type: String,
    },

    LastName: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("UserContact", userContactSchema);
