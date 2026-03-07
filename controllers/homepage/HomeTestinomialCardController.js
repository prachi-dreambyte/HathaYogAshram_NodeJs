const Testimonial = require("../../models/homepage/HomeTestinomialCardsModel");


// CREATE
exports.createTestimonial = async (req, res) => {

  try {

    const testimonial = new Testimonial({

      image: req.file.filename,
      name: req.body.name,
      place: req.body.place,
      review: req.body.review,
      stars: req.body.stars

    });

    await testimonial.save();

    res.json({
      success: true,
      data: testimonial
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};


// GET ALL
exports.getTestimonials = async (req, res) => {

  try {

    const testimonials = await Testimonial.find();

    res.json({
      success: true,
      data: testimonials
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};


// DELETE
exports.deleteTestimonial = async (req, res) => {

  try {

    await Testimonial.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Deleted Successfully"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};