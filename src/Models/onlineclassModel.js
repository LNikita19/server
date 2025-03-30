// onlineclassModel.js

const mongoose = require("mongoose");

const OnlineClassSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
        },
        Photo: {
            type: String,
        },
        selectProgram: {
            type: String,
        },
        programFees: {
            type: String,
        },
        startDate: {
            type: Date,
        },
        endDate: {
            type: Date,
        },
        programTiming: {
            type: String,
        },
        selectLanguage: {
            type: String,
        },
        youTubeLink: {
            type: String,
        },
        Description: {
            type: String,
        },
        faq: [{
            question: { type: String },
            answer: { type: String}
        }],
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("OnlineClass", OnlineClassSchema);