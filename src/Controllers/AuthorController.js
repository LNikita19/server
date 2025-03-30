const authorModel = require("../Models/AuthorModel");
const authorData = async (req, res) => {
    try {
        const { id, Photo, Description, mainHeading } = req.body;

        // Create a new document
        const newData = await authorModel.create({ id, Photo, Description, mainHeading });

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

const getauthorData = async (req, res) => {
    try {
        const authorData = await authorModel.find().sort({ _id: -1 }).limit(1); // Get only the latest entry
        res.status(200).send({
            status: true,
            msg: "Latest authorData retrieved successfully",
            data: authorData,
        });
    } catch (err) {
        return res.status(500).send({ status: false, msg: "server error", error: err.message });
    }
};


const getauthorById = async (req, res) => {
    const authorId = req.params.authorId;
    const authorData = await authorModel.findOne({
        authorId: authorId,
        isDeleted: false,
    });
    return res
        .status(200)
        .send({ status: true, msg: "Data fetch succesfully", data: authorData });
};


const updateAuthorData = async (req, res) => {
    try {
        const { id, Photo, Description, mainHeading } = req.body;

        let authorId = req.params.authorId;
        let updateBody = await authorModel.findOneAndUpdate(
            { _id: authorId },
            {
                $set: {
                    Photo: Photo,
                    Description: Description,
                    mainHeading: mainHeading,
                    authorId: authorId
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

const DeleteAuthordata = async (req, res) => {
    try {
        const result = await authorModel.deleteMany({});
        res.send(`Deleted ${result.deletedCount} authordata`);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ status: false, msg: "server error", error: error.message });
    }
};
const DeleteAuthorById = async (req, res) => {
    try {
        let authorId = req.params.authorId;

        // Find the document first
        const existingPage = await authorModel.findById(authorId);
        console.log("existing---------->", existingPage);

        if (!existingPage) {
            return res.status(404).send({ status: false, message: "Page not found" });
        }

        if (existingPage.isDeleted) {
            return res.status(400).send({ status: false, message: "Data has already been deleted." });
        }

        // Now update
        await authorModel.findByIdAndUpdate(
            authorId,
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
    authorData,
    getauthorData,
    getauthorById,
    updateAuthorData,
    DeleteAuthordata,
    DeleteAuthorById,
};
