const ExistingModel = require("../Models/ExistingModel");
const existingData = async (req, res) => {
    try {

        const { id, Photo, faq, selectProgram, Description, programFees, startDate, endDate, programTiming, selectLanguage, youTubeLink, Quto } = req.body;
        let parsedFaq = [];
        if (typeof faq === "string") {
            parsedFaq = JSON.parse(faq);  // Parse if it's a string
        } else if (Array.isArray(faq)) {
            parsedFaq = faq;  // Directly assign if it's already an array
        }


        const newData = await ExistingModel.create({
            id, Photo, selectProgram, Description, programFees, faq: parsedFaq, startDate, endDate, programTiming, selectLanguage, youTubeLink, Quto
        });

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




const getexistingData = async (req, res) => {
    try {
        const programData = await ExistingModel.find();
        res.status(200).send({
            status: true,
            msg: "programData retrieved successfully",
            data: programData,
        });
    } catch (err) {
        return res.status(500).send({ status: false, msg: "server error", error: err.message });
    }
};


const getexistingId = async (req, res) => {
    try {
        const ExistingId = req.params.ExistingId;

        // Check if ExistingId is a valid ObjectId
        // if (!mongoose.Types.ObjectId.isValid(ExistingId)) {
        //     return res.status(400).send({ status: false, msg: "Invalid program ID" });
        // }

        const programData = await ExistingModel.findOne({
            _id: ExistingId, // Use `_id` instead of `ExistingId`
            isDeleted: false,
        });

        if (!programData) {
            return res.status(404).send({ status: false, msg: "Program not found" });
        }

        return res.status(200).send({ status: true, msg: "Data fetched successfully", data: programData });
    } catch (error) {
        console.error("Error fetching program by ID:", error);
        return res.status(500).send({ status: false, msg: "Internal Server Error" });
    }
};


const updateexistData = async (req, res) => {
    try {
        console.log("Update Request Body:", req.body); // Debugging

        const { id, youTubeLink, faq, Quto, Description, selectProgram, endDate, programFees, startDate, Photo, programTiming, selectLanguage } = req.body;

        if (!Photo) {
            return res.status(400).send({ status: false, msg: "Photo is required" });
        }

        let ExistingId = req.params.ExistingId;
        let updateBody = await ExistingModel.findOneAndUpdate(
            { _id: ExistingId },
            {
                $set: {
                    selectProgram, Description,
                    endDate,
                    selectLanguage,
                    programFees,
                    Photo,
                    youTubeLink,
                    Quto,
                    startDate,
                    programTiming,
                    faq
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
        return res.status(500).send({ status: false, msg: "Server error", error: err.message });
    }
};

const Deleteexistdata = async (req, res) => {
    try {
        const result = await ExistingModel.deleteMany({});
        res.send(`Deleted ${result.deletedCount} programdata`);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ status: false, msg: "server error", error: error.message });
    }
};
const DeleteexistById = async (req, res) => {
    try {
        let ExistingId = req.params.ExistingId;




        const existingDocument = await ExistingModel.findById(ExistingId);
        if (!existingDocument) {
            return res.status(404).send({ status: false, message: "Document not found" });
        }

        if (existingDocument.isDeleted) {
            return res.status(400).send({ status: false, message: "Data has already been deleted." });
        }

        // Soft delete the document by updating isDeleted
        await ExistingModel.findByIdAndDelete(
            ExistingId,
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
    existingData,
    getexistingData,
    getexistingId,
    updateexistData,
    Deleteexistdata,
    DeleteexistById,
};
