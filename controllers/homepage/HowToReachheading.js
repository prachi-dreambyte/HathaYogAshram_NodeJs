const HowToReachHeading = require("../../models/homepage/HowToReachheading");


// Get all headings
exports.getAllHeadings = async (req, res) => {
    try {
        const data = await HowToReachHeading.find();
        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create new heading
exports.createHeading = async (req, res) => {
    try {
        const newHeading = new HowToReachHeading(req.body);
        const savedHeading = await newHeading.save();
        res.status(201).json({ success: true, data: savedHeading });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update heading
exports.updateHeading = async (req, res) => {
    try {
        const updatedHeading = await HowToReachHeading.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json({ success: true, data: updatedHeading });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete heading
exports.deleteHeading = async (req, res) => {
    try {
        await HowToReachHeading.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Deleted successfully" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};