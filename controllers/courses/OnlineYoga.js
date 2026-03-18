const fs = require("fs");
const path = require("path");
const OnlineYoga = require("../../models/courses/OnlineYoga");

const uploadsDir = path.resolve(__dirname, "../../uploads");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const parseJson = (value, fallback = []) => {
  if (!value) return fallback;

  if (Array.isArray(value)) {
    return value;
  }

  try {
    return JSON.parse(value);
  } catch (error) {
    return fallback;
  }
};

const fileMapFromRequest = (files = []) =>
  files.reduce((acc, file) => {
    acc[file.fieldname] = file;
    return acc;
  }, {});

const deleteImage = (filename) => {
  if (!filename) return;

  const cleanName = filename.replace(/^\/?uploads\//, "");
  const filePath = path.join(uploadsDir, cleanName);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

const normalizeClasses = (classes, uploadedFiles, previousClasses = []) => {
  const safeClasses = Array.isArray(classes) ? classes : [];

  return safeClasses.map((item, index) => {
    const current = item || {};
    const existing = previousClasses[index] || {};
    const imageFile = uploadedFiles[`classes[${index}][image]`];

    return {
      title: current.title || "",
      time: current.time || "",
      price: current.price || "",
      image: imageFile
        ? imageFile.filename
        : current.image || existing.image || "",
    };
  });
};

const normalizeBenefits = (benefits) => {
  const safeBenefits = Array.isArray(benefits) ? benefits : [];

  return safeBenefits
    .map((item) => ({ text: item?.text || "" }))
    .filter((item) => item.text.trim());
};

const buildPayload = (req, previousDoc = null) => {
  const uploadedFiles = fileMapFromRequest(req.files);
  const incomingClasses = parseJson(req.body.classes, []);
  const incomingBenefits = parseJson(req.body.benefits, []);
  const previousClasses = previousDoc?.classes || [];

  return {
    heroEyebrow: req.body.heroEyebrow || "",
    heroTitle: req.body.heroTitle || "",
    heroSubtitle: req.body.heroSubtitle || "",
    heroDescription: req.body.heroDescription || "",
    heroButtonText: req.body.heroButtonText || "",
    heroButtonLink: req.body.heroButtonLink || "",
    heroBackgroundImage: uploadedFiles.heroBackgroundImage
      ? uploadedFiles.heroBackgroundImage.filename
      : req.body.heroBackgroundImage || previousDoc?.heroBackgroundImage || "",
    classSectionHeading: req.body.classSectionHeading || "",
    classes: normalizeClasses(incomingClasses, uploadedFiles, previousClasses),
    benefitsImage: uploadedFiles.benefitsImage
      ? uploadedFiles.benefitsImage.filename
      : req.body.benefitsImage || previousDoc?.benefitsImage || "",
    benefitsHeading: req.body.benefitsHeading || "",
    benefits: normalizeBenefits(incomingBenefits),
    finalCtaTitle: req.body.finalCtaTitle || "",
    finalCtaButtonText: req.body.finalCtaButtonText || "",
    finalCtaButtonLink: req.body.finalCtaButtonLink || "",
  };
};

const cleanupRemovedClassImages = (previousClasses = [], nextClasses = []) => {
  const nextImages = new Set(nextClasses.map((item) => item.image).filter(Boolean));

  previousClasses.forEach((item) => {
    if (item?.image && !nextImages.has(item.image)) {
      deleteImage(item.image);
    }
  });
};

exports.createOnlineYoga = async (req, res) => {
  try {
    const payload = buildPayload(req);
    const data = await OnlineYoga.create(payload);

    res.status(201).json({
      success: true,
      message: "Online yoga content created successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getOnlineYoga = async (req, res) => {
  try {
    const data = await OnlineYoga.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateOnlineYoga = async (req, res) => {
  try {
    const existing = await OnlineYoga.findById(req.params.id);

    if (!existing) {
      return res.status(404).json({
        success: false,
        error: "Online yoga content not found",
      });
    }

    const payload = buildPayload(req, existing);

    if (payload.heroBackgroundImage !== existing.heroBackgroundImage) {
      deleteImage(existing.heroBackgroundImage);
    }

    if (payload.benefitsImage !== existing.benefitsImage) {
      deleteImage(existing.benefitsImage);
    }

    cleanupRemovedClassImages(existing.classes, payload.classes);

    const data = await OnlineYoga.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      message: "Online yoga content updated successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteOnlineYoga = async (req, res) => {
  try {
    const existing = await OnlineYoga.findById(req.params.id);

    if (!existing) {
      return res.status(404).json({
        success: false,
        error: "Online yoga content not found",
      });
    }

    deleteImage(existing.heroBackgroundImage);
    deleteImage(existing.benefitsImage);
    existing.classes.forEach((item) => deleteImage(item?.image));

    await OnlineYoga.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
