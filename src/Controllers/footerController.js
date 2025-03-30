const footerModel = require("../Models/FooterModel");
const footerData = async (req, res) => {
  try {
    const { id, Location, YouTubeLink, XLink, ContactNumber, Photo, instagramLink, FacebookLink } = req.body;

    // Create a new document
    const newData = await footerModel.create({ id, Location, YouTubeLink, XLink, ContactNumber, Photo, instagramLink, FacebookLink });

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


const getfooterData = async (req, res) => {
  try {
    const footerData = await footerModel.findOne();
    if (!footerData) {
      return res.status(404).send({ status: false, msg: "No footer data found" });
    }
    res.status(200).send({
      status: true,
      msg: "Footer data retrieved successfully",
      data: footerData,
    });
  } catch (err) {
    return res.status(500).send({ status: false, msg: "server error", error: err.message });
  }
};


const getfooterById = async (req, res) => {
  const footerId = req.params.footerId;
  const footerData = await footerModel.findOne({
    footerId: footerId,
    isDeleted: false,
  });
  return res
    .status(200)
    .send({ status: true, msg: "Data fetch succesfully", data: footerData });
};


const updatefooterData = async (req, res) => {
  try {
    const { id, Location, ContactNumber, YouTubeLink, XLink, Photo, instagramLink, FacebookLink } = req.body;

    let footerId = req.params.footerId;
    let updateBody = await footerModel.findOneAndUpdate(
      { _id: footerId },
      {
        $set: {
          Location: Location,
          ContactNumber: ContactNumber,
          FacebookLink: FacebookLink,
          YouTubeLink: YouTubeLink,
          Photo: Photo,
          XLink: XLink,
          instagramLink: instagramLink,
          footerId: footerId
        },
      },
      { new: true }
    );

    return res.status(200).send({
      status: true,
      msg: "Data updated successfully",
      data: updateBody,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const Deletefooterdata = async (req, res) => {
  try {
    const result = await footerModel.deleteMany({});
    res.send(`Deleted ${result.deletedCount} footerdata`);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: false, msg: "server error", error: error.message });
  }
};
const DeleteBfooteryId = async (req, res) => {
  try {
    let footerId = req.params.footerId;


    // Find and update in a single query
    const page = await footerModel.findByIdAndUpdate(
      footerId,
      { $set: { isDeleted: true, deletedAt: new Date() } },
      { new: true }
    );

    if (!page) {
      return res.status(404).send({ status: false, message: "Page not found" });
    }

    if (page.isDeleted) {
      return res.status(400).send({ status: false, message: "Data has already been deleted." });
    }

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
  footerData,
  getfooterData,
  getfooterById,
  updatefooterData,
  Deletefooterdata,
  DeleteBfooteryId,
};
