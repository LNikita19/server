const mongoose = require("mongoose");

const uploadImages = new mongoose.Schema(
    {
        id: {
            type: Number,
        },
        Photo: {
            type: String,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("UploadImages", uploadImages);
