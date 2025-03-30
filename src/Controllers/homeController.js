const homeModel = require("../Models/homeModel");
const homeData = async (req, res) => {
  try {
    const { id, Heading, Description, SmallHeading } = req.body;

    // Create a new document
    const newData = await homeModel.create({ id, Heading, Description, SmallHeading });

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


const getData = async (req, res) => {
  try {
    const homeData = await homeModel.findOne().sort({ updatedAt: -1 }); // Get the latest updated record
    if (!homeData) {
      return res.status(404).send({ status: false, msg: "No data found" });
    }
    res.status(200).send({
      status: true,
      msg: "Home data retrieved successfully",
      data: homeData,
    });
  } catch (err) {
    return res.status(500).send({ status: false, msg: "Server error", error: err.message });
  }
};


const getById = async (req, res) => {
  const homeId = req.params.homeId;
  const homeData = await homeModel.findOne({
    homeId: homeId,
    isDeleted: false,
  });
  return res
    .status(200)
    .send({ status: true, msg: "Data fetch succesfully", data: homeData });
};


const updateData = async (req, res) => {
  try {
    const { id, Heading, Description, SmallHeading } = req.body;

    let homeId = req.params.homeId;
    let updateBody = await homeModel.findOneAndUpdate(
      { _id: homeId },
      {
        $set: {
          Heading: Heading,
          Description: Description,
          SmallHeading: SmallHeading,
          homeId: homeId
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

const Deletedata = async (req, res) => {
  try {
    const result = await homeModel.deleteMany({});
    res.send(`Deleted ${result.deletedCount} homedata`);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: false, msg: "server error", error: error.message });
  }
};
const DeleteById = async (req, res) => {
  try {
    let homeId = req.params.homeId;

    // Find the document first
    const existingPage = await homeModel.findById(homeId);
    console.log("existing---------->", existingPage);

    if (!existingPage) {
      return res.status(404).send({ status: false, message: "Page not found" });
    }

    if (existingPage.isDeleted) {
      return res.status(400).send({ status: false, message: "Data has already been deleted." });
    }

    // Now update
    await homeModel.findByIdAndUpdate(
      homeId,
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
  homeData,
  getData,
  getById,
  updateData,
  Deletedata,
  DeleteById,
};
