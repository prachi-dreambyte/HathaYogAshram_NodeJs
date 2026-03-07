const Banner = require("../../models/homepage/homebanner");
const fs = require("fs");

/* ================= CREATE BANNER ================= */

exports.createBanner = async (req, res, next) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "Image is required"
      });
    }

    const banner = await Banner.create({
      image: `/uploads/${req.file.filename}`
    });

    res.status(201).json({
      success: true,
      data: banner
    });

  } catch (error) {
    next(error);
  }
};

/* ================= GET BANNERS ================= */

exports.getBanners = async (req, res, next) => {
  try {

    const banners = await Banner.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: banners
    });

  } catch (error) {
    next(error);
  }
};

/* ================= DELETE BANNER ================= */

exports.deleteBanner = async (req, res, next) => {
  try {

    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        error: "Banner not found"
      });
    }

    const filePath = `.${banner.image}`;

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await banner.deleteOne();

    res.json({
      success: true,
      message: "Banner deleted"
    });

  } catch (error) {
    next(error);
  }
};