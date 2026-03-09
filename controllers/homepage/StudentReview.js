const StudentReview = require("../../models/homepage/StudentReview");


// GET ALL REVIEWS
exports.getReviews = async (req, res) => {
  try {
    const data = await StudentReview.find();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// CREATE REVIEW
exports.createReview = async (req, res) => {
  try {

    const newReview = new StudentReview({
      studentName: req.body.studentName,
      reviewText: req.body.reviewText,
      videoLink: req.body.videoLink,
      img: req.file ? req.file.filename : null
    });

    await newReview.save();

    res.json({
      success: true,
      message: "Review added successfully",
      data: newReview
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// UPDATE REVIEW
exports.updateReview = async (req, res) => {
  try {

    const updateData = {
      studentName: req.body.studentName,
      reviewText: req.body.reviewText,
      videoLink: req.body.videoLink
    };

    if (req.file) {
      updateData.img = req.file.filename;
    }

    const updated = await StudentReview.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({
      success: true,
      message: "Review updated",
      data: updated
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// DELETE REVIEW
exports.deleteReview = async (req, res) => {
  try {

    await StudentReview.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Review deleted"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};