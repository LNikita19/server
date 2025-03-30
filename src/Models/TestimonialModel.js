const mongoose = require("mongoose");

const TestimonialSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
        },
        Photo: {
            type: String,
        },
        Name: {
            type: String,
        },
        Profession: {
            type: String,
        },
        comment: {
            type: String,
        },

        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Testimonial", TestimonialSchema);
