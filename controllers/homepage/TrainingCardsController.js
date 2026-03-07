const TeacherTrainingCards = require("../../models/homepage/TeacherTrainingCardModel");

// CREATE
exports.createCard = async (req, res) => {

  try {

    const newCard = new TeacherTrainingCards({

      number: req.body.number,
      icon: req.body.icon,
      heading: req.body.heading,
      paragraph: req.body.paragraph,
      image: req.file ? req.file.filename : ""

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
exports.getCards = async (req, res) => {

  try {

    const data = await TeacherTrainingCards.find().sort({ createdAt: -1 });

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

      number: req.body.number,
      icon: req.body.icon,
      heading: req.body.heading,
      paragraph: req.body.paragraph

    };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updated = await TeacherTrainingCards.findByIdAndUpdate(

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

    await TeacherTrainingCards.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Card deleted"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};