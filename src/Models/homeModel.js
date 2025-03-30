const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
    },
   SmallHeading: {
      type: String,
    },
    Heading: {
      type: String,
    },
    Description: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Home", homeSchema);
