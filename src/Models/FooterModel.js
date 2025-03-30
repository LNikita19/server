const mongoose = require("mongoose");

const footerSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
        },
        Photo: {
            type: String,
        },
        Location: {
            type: String,
        },
        ContactNumber: {
            type: String,
        },
        instagramLink: {
            type: String,
        },
        FacebookLink: {
            type: String,
        },
        YouTubeLink: {
            type: String,
        },
        XLink: {
            type: String,
        },

        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Footer", footerSchema);
