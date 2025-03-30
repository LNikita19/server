const uploadImageModel = require("../Models/uploadImagesModel");
const uploadImageData = async (req, res) => {
    try {
        const { id, Photo } = req.body;

        // Create a new document
        const newData = await uploadImageModel.create({ id, Photo });

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


const getImageDataData = async (req, res) => {
    try {
        const uploadImageData = await uploadImageModel.find();
        res.status(200).send({
            status: true,
            msg: "uploadImageData retrieved succesfully",
            data: uploadImageData,
        });
    } catch (err) {
        return res
            .status(500)
            .send({ status: false, msg: "server error", error: err.message });
    }
};

const getByImageDataId = async (req, res) => {
    const uploadImageId = req.params.uploadImageId;
    const uploadImageData = await uploadImageModel.findOne({
        uploadImageId: uploadImageId,
        isDeleted: false,
    });
    return res
        .status(200)
        .send({ status: true, msg: "Data fetch succesfully", data: uploadImageData });
};


const updateImageDataData = async (req, res) => {
    try {
        const { id, Photo } = req.body;

        let uploadImageId = req.params.uploadImageId;
        let updateBody = await uploadImageModel.findOneAndUpdate(
            { _id: uploadImageId },
            {
                $set: {

                    Photo: Photo,
                    uploadImageId: uploadImageId
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

const DeleteImageDatadata = async (req, res) => {
    try {
        const result = await uploadImageModel.deleteMany({});
        res.send(`Deleted ${result.deletedCount} uploadImagedata`);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ status: false, msg: "server error", error: error.message });
    }
};
const DeleteByImageDataId = async (req, res) => {
    try {
        let uploadImageId = req.params.uploadImageId;


        // Find and update in a single query
        const page = await uploadImageModel.findByIdAndUpdate(
            uploadImageId,
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
    uploadImageData,
    getImageDataData,
    getByImageDataId,
    updateImageDataData,
    DeleteImageDatadata,
    DeleteByImageDataId,
};
