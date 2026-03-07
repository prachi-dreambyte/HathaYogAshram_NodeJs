const HomeFacilityCard = require("../../models/homepage/FacilityCards");

// CREATE
exports.createCard = async (req, res) => {

  try {

    const card = new HomeFacilityCard({
      image: req.file ? "uploads/" + req.file.filename : "",
      heading: req.body.heading,
      subParagraph: req.body.subParagraph,
      mainParagraph: req.body.mainParagraph
    });

    await card.save();

    res.json({
      success: true,
      data: card
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};


// GET ALL
exports.getCards = async (req, res) => {

  try {

    const cards = await HomeFacilityCard.find();

    res.json({
      success: true,
      data: cards
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};


// UPDATE
exports.updateCard = async (req, res) => {

  try {

    const updateData = {
      heading: req.body.heading,
      subParagraph: req.body.subParagraph,
      mainParagraph: req.body.mainParagraph
    };

    if (req.file) {
      updateData.image = "uploads/" + req.file.filename;
    }

    const updatedCard = await HomeFacilityCard.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({
      success: true,
      data: updatedCard
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};


// DELETE
exports.deleteCard = async (req, res) => {

  try {

    await HomeFacilityCard.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};