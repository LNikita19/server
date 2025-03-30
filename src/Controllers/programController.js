const programModel = require("../Models/programModel");
const programData = async (req, res) => {
    try {

        const { id, Photo, faq, selectProgram, Description, programFees, startDate, endDate, programTiming, selectLanguage, youTubeLink, Quto } = req.body;
        let parsedFaq = [];
        if (typeof faq === "string") {
            parsedFaq = JSON.parse(faq);  // Parse if it's a string
        } else if (Array.isArray(faq)) {
            parsedFaq = faq;  // Directly assign if it's already an array
        }


        const newData = await programModel.create({
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




const getprogramData = async (req, res) => {
    try {
        const programData = await programModel.find();
        res.status(200).send({
            status: true,
            msg: "programData retrieved successfully",
            data: programData,
        });
    } catch (err) {
        return res.status(500).send({ status: false, msg: "server error", error: err.message });
    }
};


const getBprogramyId = async (req, res) => {
    try {
        const programId = req.params.programId;

        // Check if programId is a valid ObjectId
        // if (!mongoose.Types.ObjectId.isValid(programId)) {
        //     return res.status(400).send({ status: false, msg: "Invalid program ID" });
        // }

        const programData = await programModel.findOne({
            _id: programId, // Use `_id` instead of `programId`
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


const updateprogramData = async (req, res) => {
    try {
        console.log("Update Request Body:", req.body); // Debugging

        const { id, youTubeLink, faq, Quto, Description, selectProgram, endDate, programFees, startDate, Photo, programTiming, selectLanguage } = req.body;

        if (!Photo) {
            return res.status(400).send({ status: false, msg: "Photo is required" });
        }

        let programId = req.params.programId;
        let updateBody = await programModel.findOneAndUpdate(
            { _id: programId },
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

const Deleteprogramdata = async (req, res) => {
    try {
        const result = await programModel.deleteMany({});
        res.send(`Deleted ${result.deletedCount} programdata`);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ status: false, msg: "server error", error: error.message });
    }
};
const DeleteprogramById = async (req, res) => {
    try {
        let programId = req.params.programId;




        const existingDocument = await programModel.findById(programId);
        if (!existingDocument) {
            return res.status(404).send({ status: false, message: "Document not found" });
        }

        if (existingDocument.isDeleted) {
            return res.status(400).send({ status: false, message: "Data has already been deleted." });
        }

        // Soft delete the document by updating isDeleted
        await programModel.findByIdAndDelete(
            programId,
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
    programData,
    getprogramData,
    getBprogramyId,
    updateprogramData,
    Deleteprogramdata,
    DeleteprogramById,
};
