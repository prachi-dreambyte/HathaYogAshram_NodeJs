const fs = require("fs");
const path = require("path");
const OnlineYogaTTC = require("../../models/courses/yogaTTC");

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

const normalizeStoredImage = (value) => {
  if (!value) return "";
  return value.startsWith("/uploads/") ? value : `/uploads/${value.replace(/^\/+/, "")}`;
};

const deleteImage = (filename) => {
  if (!filename) return;

  const cleanName = filename.replace(/^\/?uploads\//, "");
  const filePath = path.join(uploadsDir, cleanName);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

const normalizeCourseArray = (items, uploadedFiles, prefix, previousItems = []) => {
  const safeItems = Array.isArray(items) ? items : [];

  return safeItems.map((item, index) => {
    const current = item || {};
    const existing = previousItems[index] || {};
    const imageFile = uploadedFiles[`${prefix}[${index}][image]`];

    return {
      id: Number(current.id || existing.id || Date.now() + index),
      title: current.title || "",
      duration: current.duration || "",
      certification: current.certification || "",
      style: current.style || "",
      date: current.date || "",
      image: imageFile
        ? `/uploads/${imageFile.filename}`
        : normalizeStoredImage(current.image || existing.image || ""),
      oldPrice: current.oldPrice || "",
      newPrice: current.newPrice || "",
      isNew:
        current.isNew === true ||
        current.isNew === "true" ||
        current.isNew === 1 ||
        current.isNew === "1",
    };
  });
};

const normalizeTestimonials = (items) => {
  const safeItems = Array.isArray(items) ? items : [];

  return safeItems.map((item) => ({
    name: item?.name || "",
    time: item?.time || "",
    text: item?.text || "",
    rating: Number(item?.rating || 5),
  }));
};

const normalizeBenefits = (items) => {
  const safeItems = Array.isArray(items) ? items : [];

  return safeItems.map((item) => ({
    title: item?.title || "",
    description: item?.description || "",
  }));
};

const normalizeCertificationLogos = (items, uploadedFiles, previousItems = []) => {
  const safeItems = Array.isArray(items) ? items : [];

  return safeItems.map((item, index) => {
    const current = item || {};
    const existing = previousItems[index] || {};
    const imageFile = uploadedFiles[`certificationLogos[${index}][image]`];

    return {
      id: Number(current.id || existing.id || index + 1),
      alt: current.alt || existing.alt || "",
      image: imageFile
        ? `/uploads/${imageFile.filename}`
        : normalizeStoredImage(current.image || existing.image || ""),
    };
  });
};

const normalizeSteps = (items) => {
  const safeItems = Array.isArray(items) ? items : [];

  return safeItems.map((item) => ({
    step: item?.step || "",
    title: item?.title || "",
    description: item?.description || "",
  }));
};

const cleanupRemovedImages = (previousItems = [], nextItems = [], imageKey = "image") => {
  const nextImages = new Set(nextItems.map((item) => item?.[imageKey]).filter(Boolean));

  previousItems.forEach((item) => {
    if (item?.[imageKey] && !nextImages.has(item[imageKey])) {
      deleteImage(item[imageKey]);
    }
  });
};

const buildPayload = (req, previousDoc = null) => {
  const uploadedFiles = fileMapFromRequest(req.files);
  const courses = normalizeCourseArray(
    parseJson(req.body.courses, []),
    uploadedFiles,
    "courses",
    previousDoc?.courses || []
  );
  const bookingCourses = normalizeCourseArray(
    parseJson(req.body.bookingCourses, []),
    uploadedFiles,
    "bookingCourses",
    previousDoc?.bookingCourses || []
  );
  const certificationLogos = normalizeCertificationLogos(
    parseJson(req.body.certificationLogos, []),
    uploadedFiles,
    previousDoc?.certificationLogos || []
  );

  return {
    heroWelcomeText: req.body.heroWelcomeText || "",
    heroTitleLine1: req.body.heroTitleLine1 || "",
    heroTitleLine2: req.body.heroTitleLine2 || "",
    heroSubtitle: req.body.heroSubtitle || "",
    heroImage: uploadedFiles.heroImage
      ? `/uploads/${uploadedFiles.heroImage.filename}`
      : normalizeStoredImage(req.body.heroImage || previousDoc?.heroImage || ""),
    heroButtonText: req.body.heroButtonText || "",
    heroButtonLink: req.body.heroButtonLink || "",
    aboutSectionLabel: req.body.aboutSectionLabel || "",
    aboutSectionTitle: req.body.aboutSectionTitle || "",
    courses,
    bookingSectionLabel: req.body.bookingSectionLabel || "",
    bookingSectionTitle: req.body.bookingSectionTitle || "",
    bookingSectionDescription: req.body.bookingSectionDescription || "",
    bookingCourses,
    testimonialsSectionLabel: req.body.testimonialsSectionLabel || "",
    testimonialsSectionTitle: req.body.testimonialsSectionTitle || "",
    testimonials: normalizeTestimonials(parseJson(req.body.testimonials, [])),
    whyUsSectionLabel: req.body.whyUsSectionLabel || "",
    whyUsSectionTitle: req.body.whyUsSectionTitle || "",
    whyUsIntro: req.body.whyUsIntro || "",
    whyUsImage: uploadedFiles.whyUsImage
      ? `/uploads/${uploadedFiles.whyUsImage.filename}`
      : normalizeStoredImage(req.body.whyUsImage || previousDoc?.whyUsImage || ""),
    whyUsBenefits: normalizeBenefits(parseJson(req.body.whyUsBenefits, [])),
    certificationLogos,
    certificationParagraph1: req.body.certificationParagraph1 || "",
    certificationParagraph2: req.body.certificationParagraph2 || "",
    certificationHighlight: req.body.certificationHighlight || "",
    howItWorksLabel: req.body.howItWorksLabel || "",
    howItWorksTitle: req.body.howItWorksTitle || "",
    steps: normalizeSteps(parseJson(req.body.steps, [])),
    finalCtaTitle: req.body.finalCtaTitle || "",
    finalCtaText: req.body.finalCtaText || "",
    finalCtaButtonText: req.body.finalCtaButtonText || "",
    finalCtaButtonLink: req.body.finalCtaButtonLink || "",
  };
};

const getAllContents = async (req, res) => {
  try {
    const contents = await OnlineYogaTTC.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: contents.length,
      data: contents,
    });
  } catch (error) {
    console.error("Error fetching contents:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching contents",
      error: error.message,
    });
  }
};

const getContentById = async (req, res) => {
  try {
    const content = await OnlineYogaTTC.findById(req.params.id);

    if (!content) {
      return res.status(404).json({
        success: false,
        message: "Content not found",
      });
    }

    res.status(200).json({
      success: true,
      data: content,
    });
  } catch (error) {
    console.error("Error fetching content:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching content",
      error: error.message,
    });
  }
};

const createContent = async (req, res) => {
  try {
    const payload = buildPayload(req);
    const content = await OnlineYogaTTC.create(payload);

    res.status(201).json({
      success: true,
      message: "Content created successfully",
      data: content,
    });
  } catch (error) {
    console.error("Error creating content:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating content",
      error: error.message,
    });
  }
};

const updateContent = async (req, res) => {
  try {
    const existing = await OnlineYogaTTC.findById(req.params.id);

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Content not found",
      });
    }

    const payload = buildPayload(req, existing);

    if (payload.heroImage !== existing.heroImage) {
      deleteImage(existing.heroImage);
    }

    if (payload.whyUsImage !== existing.whyUsImage) {
      deleteImage(existing.whyUsImage);
    }

    cleanupRemovedImages(existing.courses, payload.courses);
    cleanupRemovedImages(existing.bookingCourses, payload.bookingCourses);
    cleanupRemovedImages(existing.certificationLogos, payload.certificationLogos);

    const content = await OnlineYogaTTC.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Content updated successfully",
      data: content,
    });
  } catch (error) {
    console.error("Error updating content:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating content",
      error: error.message,
    });
  }
};

const deleteContent = async (req, res) => {
  try {
    const content = await OnlineYogaTTC.findById(req.params.id);

    if (!content) {
      return res.status(404).json({
        success: false,
        message: "Content not found",
      });
    }

    deleteImage(content.heroImage);
    deleteImage(content.whyUsImage);
    cleanupRemovedImages(content.courses, []);
    cleanupRemovedImages(content.bookingCourses, []);
    cleanupRemovedImages(content.certificationLogos, []);

    await OnlineYogaTTC.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Content deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting content:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting content",
      error: error.message,
    });
  }
};

module.exports = {
  getAllContents,
  getContentById,
  createContent,
  updateContent,
  deleteContent,
};
