const Gallery = require("../../models/AboutUs/Gallery");


// GET
exports.getGallery = async (req, res) => {

  try {

    const data = await Gallery.find();

    res.json({
      success: true,
      data
    });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};


// CREATE
exports.createGallery = async (req, res) => {

  try {

    const images = req.files.map(file => file.filename);

    const gallery = new Gallery({
      category: req.body.category,
      img: images
    });

    await gallery.save();

    res.json({
      success: true,
      message: "Gallery added",
      data: gallery
    });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};


// UPDATE
exports.updateGallery = async (req, res) => {

  try {

    let updateData = {
      category: req.body.category
    };

    if (req.files.length > 0) {
      updateData.img = req.files.map(file => file.filename);
    }

    const data = await Gallery.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({
      success: true,
      message: "Updated",
      data
    });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};


// DELETE
exports.deleteGallery = async (req, res) => {

  try {

    await Gallery.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Deleted"
    });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};