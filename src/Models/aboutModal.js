const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
    },
    Photos: {
      type: [String], // Store multiple image paths
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
module.exports = mongoose.model("About", aboutSchema);
