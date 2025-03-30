const aboutModel = require("../Models/aboutModal");
const multer = require('multer');

// In your routes

const aboutData = async (req, res) => {
  try {
    const { Heading, Description } = req.body;
    const Photos = req.files.map((file) => file.path); // Extract file paths

    const about = new aboutModel({
      Heading,
      Description,
      Photos,
    });

    await about.save();
    res.status(201).json({ status: true, data: about });
  } catch (err) {
    console.error("Error saving about data:", err);
    res.status(500).json({ status: false, message: "Server Error" });
  }
}


const updateaboutData = async (req, res) => {
  try {
    const { Heading, Description } = req.body;
    const Photos = req.files.map((file) => file.path); // Extract file paths

    const updatedAbout = await aboutModel.findByIdAndUpdate(
      req.params.id,
      { Heading, Description, Photos },
      { new: true }
    );

    res.json({ status: true, data: updatedAbout });
  } catch (err) {
    console.error("Error updating about data:", err);
    res.status(500).json({ status: false, message: "Server Error" });
  }
}

const getaboutData = async (req, res) => {
  try {
    const aboutData = await aboutModel.find().sort({ updatedAt: -1 }).limit(1); // Fetch latest data
    if (aboutData.length > 0) {
      res.status(200).json({
        status: true,
        data: aboutData[0], // Return the first document
      });
    } else {
      res.status(404).json({
        status: false,
        message: "No data found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};


const getBaboutyId = async (req, res) => {
  const aboutId = req.params.aboutId;
  const aboutData = await aboutModel.findOne({
    aboutId: aboutId,
    isDeleted: false,
  });
  return res
    .status(200)
    .send({ status: true, msg: "Data fetch succesfully", data: aboutData });
};


// const updateaboutData = async (req, res) => {
//   try {
//     const { id, Heading, Description, Photo, Photo1 } = req.body;
//     let aboutId = req.params.aboutId;

//     let updateBody = await footerModel.findOneAndUpdate(
//       { _id: aboutId },
//       {
//         $set: {
//           Heading: Heading,
//           Description: Description,
//           Photo: Photo,
//           Photo1: Photo1,
//           aboutId: aboutId
//         },
//       },
//       { new: true }
//     );

//     return res.status(200).send({
//       status: true,
//       msg: "Data updated successfully",
//       data: updateBody,
//     });
//   } catch (err) {
//     return res
//       .status(500)
//       .send({ status: false, msg: "server error", error: err.message });
//   }
// };

const Deleteaboutdata = async (req, res) => {
  try {
    const result = await aboutModel.deleteMany({});
    res.send(`Deleted ${result.deletedCount} aboutdata`);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: false, msg: "server error", error: error.message });
  }
};
const DeleteaboutById = async (req, res) => {
  try {
    let aboutId = req.params.aboutId;

    // Find the document first
    const existingPage = await aboutModel.findById(aboutId);

    if (!existingPage) {
      return res.status(404).send({ status: false, message: "Page not found" });
    }

    if (existingPage.isDeleted) {
      return res.status(400).send({ status: false, message: "Data has already been deleted." });
    }

    // Now update
    await aboutModel.findByIdAndUpdate(
      aboutId,
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

module.exports = {
  aboutData,
  getaboutData,
  getBaboutyId,
  updateaboutData,
  Deleteaboutdata,
  DeleteaboutById,
};
