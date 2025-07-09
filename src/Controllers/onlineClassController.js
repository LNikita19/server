const onlineclassModel = require("../Models/onlineclassModel");
const onlineclassData = async (req, res) => {
    try {
        const { Photo, selectProgram, googleLink, programFees, startDate, endDate, programTiming, selectLanguage, youTubeLink, Description, faq } = req.body;
        // ✅ FIXED LINE


        let parsedFaq = [];
        if (typeof faq === "string") {
            parsedFaq = JSON.parse(faq);
        } else if (Array.isArray(faq)) {
            parsedFaq = faq;
        }

        const newData = await onlineclassModel.create({
            selectProgram,
            googleLink,
            programFees,
            startDate,
            endDate,
            Photo,
            programTiming,
            selectLanguage,
            youTubeLink,
            Description,
            faq: parsedFaq,
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


const getonlineData = async (req, res) => {
    try {
        const onlineclassData = await onlineclassModel.find();
        res.status(200).send({
            status: true,
            msg: "onlineclassData retrieved succesfully",
            data: onlineclassData,
        });
    } catch (err) {
        return res
            .status(500)
            .send({ status: false, msg: "server error", error: err.message });
    }
};

const getonlineById = async (req, res) => {
    const onlineclassId = req.params.onlineclassId;
    const onlineclassData = await onlineclassModel.findOne({
        onlineclassId: onlineclassId,
        isDeleted: false,
    });
    return res
        .status(200)
        .send({ status: true, msg: "Data fetch succesfully", data: onlineclassData });
};


const updateOnlineData = async (req, res) => {
    try {
        const { id, youTubeLink, googleLink, Description, faq, selectProgram, endDate, programFees, startDate, Photo, programTiming, selectLanguage } = req.body;

        let onlineclassId = req.params.onlineclassId;
        let updateBody = await onlineclassModel.findOneAndUpdate(
            { _id: onlineclassId },
            {
                $set: {
                    selectProgram: selectProgram,
                    endDate: endDate,
                    selectLanguage: selectLanguage,
                    programFees: programFees,
                    Photo: Photo,
                    youTubeLink: youTubeLink,
                    googleLink: googleLink,
                    Description: Description,
                    startDate: startDate,
                    faq: faq,
                    programTiming: programTiming,
                    onlineclassId: onlineclassId
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

const DeleteOnlinedata = async (req, res) => {
    try {
        const result = await onlineclassModel.deleteMany({});
        res.send(`Deleted ${result.deletedCount} onlineclassdata`);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ status: false, msg: "server error", error: error.message });
    }
};
const DeleteonlineById = async (req, res) => {
    try {
        let onlineclassId = req.params.onlineclassId;

        // Find the existing document
        const existingDocument = await onlineclassModel.findById(onlineclassId);
        if (!existingDocument) {
            return res.status(404).send({ status: false, message: "Document not found" });
        }

        if (existingDocument.isDeleted) {
            return res.status(400).send({ status: false, message: "Data has already been deleted." });
        }

        // Soft delete the document by updating isDeleted
        await onlineclassModel.findByIdAndDelete(
            onlineclassId,
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
    onlineclassData,
    getonlineData,
    getonlineById,
    updateOnlineData,
    DeleteOnlinedata,
    DeleteonlineById,
};
