const Gallery = require("../../models/AboutUs/GalleryHeading");


// GET ALL
exports.getGallery = async (req, res) => {

  try {

    const data = await Gallery.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// CREATE
exports.createGallery = async (req, res) => {

  try {

    const gallery = new Gallery(req.body);

    await gallery.save();

    res.json({
      success: true,
      message: "Data saved successfully",
      data: gallery
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// UPDATE
exports.updateGallery = async (req, res) => {

  try {

    const data = await Gallery.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      message: "Data updated successfully",
      data
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// DELETE
exports.deleteGallery = async (req, res) => {

  try {

    await Gallery.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};