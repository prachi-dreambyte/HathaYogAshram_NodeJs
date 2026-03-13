const OnlineYoga = require("../../models/courses/OnlineYoga");

/* ---------------- CREATE ---------------- */

exports.createOnlineYoga = async (req, res) => {

  try {

    const {
      heroTitle,
      heroSubtitle,
      heroDescription,
      heroButtonText,
      heroButtonLink,
      classSectionHeading,
      benefitsHeading
    } = req.body;

    const classes = JSON.parse(req.body.classes || "[]");
    const benefits = JSON.parse(req.body.benefits || "[]");

    /* images */

    const heroBackgroundImage = req.files.heroBackgroundImage
      ? req.files.heroBackgroundImage[0].filename
      : "";

    const benefitsImage = req.files.benefitsImage
      ? req.files.benefitsImage[0].filename
      : "";

    const classImages = req.files.classImages || [];

    classes.forEach((cls, index) => {
      if (classImages[index]) {
        cls.image = classImages[index].filename;
      }
    });

    const data = new OnlineYoga({
      heroTitle,
      heroSubtitle,
      heroDescription,
      heroButtonText,
      heroButtonLink,
      heroBackgroundImage,
      classSectionHeading,
      classes,
      benefitsImage,
      benefitsHeading,
      benefits
    });

    await data.save();

    res.json({
      success: true,
      message: "Online Yoga Created",
      data
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message
    });

  }

};


/* ---------------- GET ALL ---------------- */

exports.getOnlineYoga = async (req, res) => {

  try {

    const data = await OnlineYoga.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message
    });

  }

};


/* ---------------- DELETE ---------------- */

exports.deleteOnlineYoga = async (req, res) => {

  try {

    await OnlineYoga.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message
    });

  }

};