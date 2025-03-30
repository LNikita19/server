const mongoose = require("mongoose");

const comboSchema = new mongoose.Schema(
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
        selectProgram1: {
            type: String,
        },
        programFees1: {
            type: String,
        }, Description: {
            type: String,
        },
        Quto1: {
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
        Quto: {
            type: String,
        },
        faq: [{
            question: { type: String },
            answer: { type: String }
        }],
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Combo", comboSchema);
