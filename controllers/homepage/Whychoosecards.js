const HomeWhyChooseCard = require("../../models/homepage/WhychoosecardsModels");


// CREATE
exports.createCard = async (req, res) => {

  try {

    const newCard = new HomeWhyChooseCard({
      icon: req.body.icon,
      heading: req.body.heading,
      subheading: req.body.subheading,
      paragraph: req.body.paragraph,
      image: req.file ? req.file.path : ""
    });

    const saved = await newCard.save();

    res.status(201).json({
      success: true,
      data: saved
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};


// GET ALL
exports.getAllCards = async (req, res) => {

  try {

    const data = await HomeWhyChooseCard.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};


// GET SINGLE
exports.getSingleCard = async (req, res) => {

  try {

    const data = await HomeWhyChooseCard.findById(req.params.id);

    res.json({
      success: true,
      data
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};


// UPDATE
exports.updateCard = async (req, res) => {

  try {

    const updateData = {
      icon: req.body.icon,
      heading: req.body.heading,
      subheading: req.body.subheading,
      paragraph: req.body.paragraph
    };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const updated = await HomeWhyChooseCard.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({
      success: true,
      data: updated
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};


// DELETE
exports.deleteCard = async (req, res) => {

  try {

    await HomeWhyChooseCard.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Deleted Successfully"
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};