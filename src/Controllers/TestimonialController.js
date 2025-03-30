const TestimonialModel = require("../Models/TestimonialModel");
const createTestimonial = async (req, res) => {
  try {
    const { id, Name, Photo, Profession, comment } = req.body;

    // Create a new document
    const newData = await TestimonialModel.create({ id, Name, Photo, Profession, comment });

    return res.status(201).send({
      status: true,
      msg: "Data created successfully",
      data: newData,
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      msg: "Server error",
      error: err.message,
    });
  }
};


const getTestimonialData = async (req, res) => {
  try {
    const TestimonialData = await TestimonialModel.find();
    res.status(200).send({
      status: true,
      msg: "TestimonialData retrieved succesfully",
      data: TestimonialData,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const getTestimonialDataById = async (req, res) => {
  try {
    const testimonialId = req.params.testimonialId;
    const testimonial = await TestimonialModel.findOne({
      _id: testimonialId,
      isDeleted: false,
    });

    if (!testimonial) {
      return res.status(404).send({ status: false, msg: "Testimonial not found" });
    }

    return res.status(200).send({
      status: true,
      msg: "Data fetched successfully",
      data: testimonial,
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      msg: "Server error",
      error: err.message,
    });
  }
};


const updateTestimonialData = async (req, res) => {
  try {
    const { Name, Profession, comment, Photo } = req.body;
    const testimonialId = req.params.testimonialId;

    const updatedData = await TestimonialModel.findByIdAndUpdate(
      testimonialId,
      { $set: { Name, Photo, Profession, comment } },
      { new: true }
    );

    if (!updatedData) {
      return res.status(404).send({ status: false, msg: "Testimonial not found" });
    }

    return res.status(200).send({
      status: true,
      msg: "Data updated successfully",
      data: updatedData,
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      msg: "Server error",
      error: err.message,
    });
  }
};

const deleteTestimonialDataById = async (req, res) => {
  try {
    const testimonialId = req.params.testimonialId;

    // Check if already deleted
    const existingTestimonial = await TestimonialModel.findById(testimonialId);
    if (!existingTestimonial) {
      return res.status(404).send({ status: false, message: "Testimonial not found" });
    }
    if (existingTestimonial.isDeleted) {
      return res.status(400).send({ status: false, message: "Data has already been deleted." });
    }

    // Soft delete the testimonial
    await TestimonialModel.findByIdAndDelete(
      testimonialId,
      { $set: { isDeleted: true, deletedAt: new Date() } },
      { new: true }
    );

    return res.status(200).send({ status: true, message: "Data deleted successfully." });
  } catch (err) {
    return res.status(500).send({
      status: false,
      msg: "Server error",
      error: err.message,
    });
  }
};



const deleteTestimonialData = async (req, res) => {
  try {
    const result = await TestimonialModel.deleteMany({});
    res.send(`Deleted ${result.deletedCount} Testimonialdata`);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: false, msg: "server error", error: error.message });
  }
};

module.exports = {
  createTestimonial,
  getTestimonialData,
  getTestimonialDataById,
  updateTestimonialData,
  deleteTestimonialData,
  deleteTestimonialDataById
};
