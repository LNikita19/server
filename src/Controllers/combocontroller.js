const comboModel = require("../Models/ComboModel"); // Ensure this file exists and is correctly defined

// Create a new Combo Program
const createComboProgram = async (req, res) => {
    try {
        const {
            selectProgram,
            Description,
            selectProgram1,
            programFees1,
            Quto1,
            programFees,
            startDate,
            endDate,
            programTiming,
            selectLanguage,
            youTubeLink,
            Quto,
            faq,
            Photo // Fix: Ensure this is properly assigned
        } = req.body;
        let parsedFaq = [];
        if (typeof faq === "string") {
            parsedFaq = JSON.parse(faq);  // Parse if it's a string
        } else if (Array.isArray(faq)) {
            parsedFaq = faq;  // Directly assign if it's already an array
        }
        const newCombo = await comboModel.create({
            selectProgram,
            Description,
            selectProgram1,
            programFees1,
            Quto1,
            programFees,
            startDate,
            endDate,
            programTiming,
            selectLanguage,
            youTubeLink,
            Quto,
            Photo,
            faq: parsedFaq,
        });
        return res.status(201).send({
            status: true,
            msg: "Combo Program created successfully",
            data: newCombo,
        });
    } catch (err) {
        return res.status(500).send({
            status: false,
            msg: "Server error",
            error: err.message,
        });
    }
};





const getComboPrograms = async (req, res) => {
    try {
        const programData = await comboModel.find();
        res.status(200).send({
            status: true,
            msg: "programData retrieved successfully",
            data: programData,
        });
    } catch (err) {
        return res.status(500).send({ status: false, msg: "server error", error: err.message });
    }
};


// Fetch a single Combo Program by ID
const getComboProgramById = async (req, res) => {
    try {
        const { comboId } = req.params;

        const comboProgram = await comboModel.findById(comboId);
        if (!comboProgram) {
            return res.status(404).send({ status: false, msg: "Combo Program not found" });
        }

        res.status(200).send({
            status: true,
            msg: "Combo Program retrieved successfully",
            data: comboProgram,
        });
    } catch (err) {
        return res.status(500).send({ status: false, msg: "Server error", error: err.message });
    }
};

// Update a Combo Program by ID
const updateComboProgram = async (req, res) => {
    try {
        const { comboId } = req.params;
        const {
            selectProgram,
            Description,
            selectProgram1,
            programFees1,
            Quto1,
            programFees,
            startDate,
            endDate,
            programTiming,
            selectLanguage,
            youTubeLink,
            Quto,
            faq,
            Photo,
        } = req.body;


        const updatedCombo = await comboModel.findOneAndUpdate(
            { _id: comboId, isDeleted: false },
            {
                $set: {
                    selectProgram,
                    Description,
                    selectProgram1,
                    programFees1,
                    Quto1,
                    programFees,
                    startDate,
                    endDate,
                    Photo,
                    programTiming,
                    selectLanguage,
                    youTubeLink,
                    Quto,
                    faq,
                    // Update Photo only if a new one is provided
                },
            },
            { new: true }
        );

        if (!updatedCombo) {
            return res.status(404).send({
                status: false,
                msg: "Combo Program not found or already deleted",
            });
        }

        return res.status(200).send({
            status: true,
            msg: "Combo Program updated successfully",
            data: updatedCombo,
        });
    } catch (err) {
        return res.status(500).send({
            status: false,
            msg: "Server error",
            error: err.message,
        });
    }
};
const deleteComboProgram = async (req, res) => {
    try {
        const result = await comboModel.deleteMany({});
        res.send(`Deleted ${result.deletedCount} programdata`);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ status: false, msg: "server error", error: error.message });
    }
};

// Soft Delete Combo Program by ID
const deleteComboProgramById = async (req, res) => {
    try {
        let comboId = req.params.comboId;



        const existingDocument = await comboModel.findById(comboId);
        if (!existingDocument) {
            return res.status(404).send({ status: false, message: "Document not found" });
        }

        if (existingDocument.isDeleted) {
            return res.status(400).send({ status: false, message: "Data has already been deleted." });
        }

        // Soft delete the document by updating isDeleted
        await comboModel.findByIdAndDelete(
            comboId,
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

// Export all functions
module.exports = {
    createComboProgram,
    getComboPrograms,
    getComboProgramById,
    updateComboProgram,
    deleteComboProgram,
    deleteComboProgramById,
};
