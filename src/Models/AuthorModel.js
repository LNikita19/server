const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
        },
        Photo: {
            type: String,
        },

        mainHeading: {
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
module.exports = mongoose.model("Author", authorSchema);
