const Section1 = require("../../models/homepage/Section1Model");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

/* ==============================
   MULTER CONFIG
================================= */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

exports.upload = multer({ storage }).fields([
  { name: "img1", maxCount: 1 },
  { name: "img2", maxCount: 1 },
  { name: "img3", maxCount: 1 },
  { name: "img4", maxCount: 1 },
]);

/* ==============================
   CREATE
================================= */

exports.createSection1 = async (req, res) => {
  try {
    const images = [];

    if (req.files) {
      ["img1", "img2", "img3", "img4"].forEach((field) => {
        if (req.files[field]) {
          images.push(req.files[field][0].filename);
        }
      });
    }

    const newData = new Section1({
      mainHeading: req.body.mainHeading,
      subHeading: req.body.subHeading,
      heading1: req.body.heading1,
      paragraph: req.body.paragraph,
      images,
    });

    await newData.save();

    res.status(201).json({
      success: true,
      data: newData,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ==============================
   GET ALL
================================= */

exports.getSection1 = async (req, res) => {
  try {
    const data = await Section1.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ==============================
   UPDATE
================================= */

exports.updateSection1 = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await Section1.findById(id);
    if (!existing) {
      return res.status(404).json({ message: "Data not found" });
    }

    let updatedImages = [...existing.images];

    if (req.files) {
      ["img1", "img2", "img3", "img4"].forEach((field, index) => {
        if (req.files[field]) {
          // delete old image
          if (existing.images[index]) {
            const oldPath = path.join("uploads", existing.images[index]);
            if (fs.existsSync(oldPath)) {
              fs.unlinkSync(oldPath);
            }
          }

          updatedImages[index] = req.files[field][0].filename;
        }
      });
    }

    const updated = await Section1.findByIdAndUpdate(
      id,
      {
        mainHeading: req.body.mainHeading,
        subHeading: req.body.subHeading,
        heading1: req.body.heading1,
        paragraph: req.body.paragraph,
        images: updatedImages,
      },
      { new: true }
    );

    res.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ==============================
   DELETE
================================= */

exports.deleteSection1 = async (req, res) => {
  try {
    const existing = await Section1.findById(req.params.id);

    if (!existing) {
      return res.status(404).json({ message: "Data not found" });
    }

    // delete images from folder
    existing.images.forEach((img) => {
      const filePath = path.join("uploads", img);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });

    await Section1.findByIdAndDelete(req.params.id);

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};