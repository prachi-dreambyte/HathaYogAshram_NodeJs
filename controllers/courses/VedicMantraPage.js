const VedicMantra = require("../../models/courses/VedicMantraPage");

const parseJson = (value, fallback) => {
  if (value === undefined || value === null || value === "") return fallback;
  if (Array.isArray(value)) return value;
  try {
    return JSON.parse(value);
  } catch (e) {
    return fallback;
  }
};

const fileMapFromRequest = (files = []) =>
  (files || []).reduce((acc, file) => {
    acc[file.fieldname] = file;
    return acc;
  }, {});

const normalizeStoredImage = (value) => {
  if (!value) return "";
  if (typeof value !== "string") return "";
  if (value.startsWith("/uploads/")) return value;
  return `/uploads/${value.replace(/^\/+/, "").replace(/^uploads\//, "")}`;
};

const buildPayload = (req, previousDoc = null) => {
  const uploadedFiles = fileMapFromRequest(req.files);

  return {
    heroTitleLine1: req.body.heroTitleLine1 || "",
    heroTitleLine2: req.body.heroTitleLine2 || "",
    heroImage: uploadedFiles.heroImage
      ? `/uploads/${uploadedFiles.heroImage.filename}`
      : normalizeStoredImage(req.body.heroImage || previousDoc?.heroImage || ""),

    mantraTitle: req.body.mantraTitle || "",
    mantraDescription: req.body.mantraDescription || "",
    mantraDescription2: req.body.mantraDescription2 || "",
    mantraHighlight: req.body.mantraHighlight || "",
    mantraImage: uploadedFiles.mantraImage
      ? `/uploads/${uploadedFiles.mantraImage.filename}`
      : normalizeStoredImage(req.body.mantraImage || previousDoc?.mantraImage || ""),

    whyTitle: req.body.whyTitle || "",
    whyDescription: req.body.whyDescription || "",
    whyBenefitItems: parseJson(req.body.whyBenefitItems, []),
    omSanskritText: req.body.omSanskritText || "",
    whyImage: uploadedFiles.whyImage
      ? `/uploads/${uploadedFiles.whyImage.filename}`
      : normalizeStoredImage(req.body.whyImage || previousDoc?.whyImage || ""),

    typesTitle: req.body.typesTitle || "",
    typesParagraph1: req.body.typesParagraph1 || "",
    typesParagraph2: req.body.typesParagraph2 || "",
    typesParagraph3: req.body.typesParagraph3 || "",
    typesParagraph4: req.body.typesParagraph4 || "",
    mantraTypes: parseJson(req.body.mantraTypes, []),

    gayatriVideoUrl: req.body.gayatriVideoUrl || "",
    gayatriTitle: req.body.gayatriTitle || "",
    gayatriLines: parseJson(req.body.gayatriLines, []),
    gayatriDesc: req.body.gayatriDesc || "",
    gayatriSanskrit: req.body.gayatriSanskrit || "",
    gayatriTranslation: req.body.gayatriTranslation || "",
    mantraCategories: parseJson(req.body.mantraCategories, []),
    bookButtonText: req.body.bookButtonText || "",

    benefitsTitle: req.body.benefitsTitle || "",
    benefitsIntro: req.body.benefitsIntro || "",
    benefits: parseJson(req.body.benefits, []),
    benefitsImage: uploadedFiles.benefitsImage
      ? `/uploads/${uploadedFiles.benefitsImage.filename}`
      : normalizeStoredImage(req.body.benefitsImage || previousDoc?.benefitsImage || ""),
    contactButtonText: req.body.contactButtonText || "",

    courseTitle: req.body.courseTitle || "",
    courseIntro: req.body.courseIntro || "",
    certificationTitle: req.body.certificationTitle || "",
    donationPrice: req.body.donationPrice || "",
    courseDuration: req.body.courseDuration || "",
    courseEligibility: req.body.courseEligibility || "",
    courseWhatYouGet: req.body.courseWhatYouGet || "",
    teacherImage: uploadedFiles.teacherImage
      ? `/uploads/${uploadedFiles.teacherImage.filename}`
      : normalizeStoredImage(req.body.teacherImage || previousDoc?.teacherImage || ""),

    rulesTitle: req.body.rulesTitle || "",
    prerequisitesSubtitle: req.body.prerequisitesSubtitle || "",
    prerequisitesContent: req.body.prerequisitesContent || "",
    rulesSubtitle: req.body.rulesSubtitle || "",
    rulesContent: req.body.rulesContent || "",
    refundSubtitle: req.body.refundSubtitle || "",
    refundContent: req.body.refundContent || "",
  };
};


// GET ALL
exports.getAll = async (req, res) => {
  try {
    const data = await VedicMantra.find().sort({ _id: -1 });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// CREATE
exports.create = async (req, res) => {
  try {
    const payload = buildPayload(req);
    const mantra = new VedicMantra(payload);
    const saved = await mantra.save();

    res.json({
      success: true,
      message: "Content created successfully",
      data: saved,
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// UPDATE
exports.update = async (req, res) => {
  try {
    const existing = await VedicMantra.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    const payload = buildPayload(req, existing);
    const updated = await VedicMantra.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      message: "Content updated successfully",
      data: updated,
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// DELETE
exports.remove = async (req, res) => {
  try {
    await VedicMantra.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Content deleted successfully",
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};