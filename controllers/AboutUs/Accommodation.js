const Accommodation = require("../../models/AboutUs/Accommodation");

exports.getAccommodation = async (req, res) => {
  try {
    const data = await Accommodation.find();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.createAccommodation = async (req, res) => {

  try {

    const building1Images = req.files["building1Images"]
      ? req.files["building1Images"].map(file => file.filename)
      : [];

    const building2Images = req.files["building2Images"]
      ? req.files["building2Images"].map(file => file.filename)
      : [];

    const foodImages = req.files["foodImages"]
      ? req.files["foodImages"].map(file => file.filename)
      : [];

    const newData = new Accommodation({

      ...req.body,

      building1Images,
      building2Images,
      foodImages

    });

    await newData.save();

    res.json({
      success: true,
      message: "Accommodation Added"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};


exports.updateAccommodation = async (req, res) => {

  try {

    const building1Images = req.files["building1Images"]
      ? req.files["building1Images"].map(file => file.filename)
      : [];

    const building2Images = req.files["building2Images"]
      ? req.files["building2Images"].map(file => file.filename)
      : [];

    const foodImages = req.files["foodImages"]
      ? req.files["foodImages"].map(file => file.filename)
      : [];

    const updatedData = {

      ...req.body

    };

    if (building1Images.length > 0) updatedData.building1Images = building1Images;
    if (building2Images.length > 0) updatedData.building2Images = building2Images;
    if (foodImages.length > 0) updatedData.foodImages = foodImages;

    await Accommodation.findByIdAndUpdate(req.params.id, updatedData);

    res.json({
      success: true,
      message: "Accommodation Updated"
    });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};


exports.deleteAccommodation = async (req, res) => {

  try {

    await Accommodation.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Deleted Successfully"
    });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};