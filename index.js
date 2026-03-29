const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");
const ensureDefaultAdmin = require("./utils/ensureDefaultAdmin");

dotenv.config();
connectDB().then(() => {
  ensureDefaultAdmin().catch((error) => {
    console.error("Failed to ensure default admin:", error.message);
  });
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Images
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/banners", require("./routes/newRouteBanner"));
app.use("/api/section1", require("./routes/Section1Routes"));
app.use("/api/home-teacher", require("./routes/teacherHeadingRoute"));
app.use("/api/teacher-heading", require("./routes/teacherHeadingRoute"));
app.use("/api/teacher-name", require("./routes/teacherName"));
app.use(
  "/api/teacher-training",
  require("./routes/HomeTeacherTrainingRoutes")
);
app.use(
  "/api/teacher-training-heading",
  require("./routes/HomeTeacherTrainingOverviewHeading")
);
app.use("/api/teacher-training-cards", require("./routes/TeacherTrainingCardRoutes"));
app.use("/api/home-facility-cards", require("./routes/HomeFacilityCardsRoute"));
app.use("/api/homeyogaalliance", require("./routes/HomeYogaAllianceRoutes"));
app.use("/api/header", require("./routes/headerRoutes"));
app.use("/api/footer", require("./routes/footerRoutes"));
app.use("/api/home-ayurveda-section", require("./routes/HomeAyurvedaSectionRoute"));
app.use("/api/home-retreat-section", require("./routes/HomeRetreatSectionRoute"));
app.use("/api/home-video-section-two", require("./routes/HomeVideoSectionTwoRoute"));
app.use("/api/why-choose-heading", require("./routes/WhychooseHeadingRoute"));
app.use("/api/homewhychoosecard", require("./routes/WhychoosecardsRoute"));
app.use("/api/testimonials", require("./routes/TestinomialCard"));
// app.use("/api/home-video", require("./routes/HomepageVideoSection"));
app.use("/api/home-video-section", require('./routes/HomepageVideoSection'));
app.use("/api/faq", require('./routes/HomeFaqHeadingRoute'));
app.use("/api/giving-back", require('./routes/HomeGivingBackRoute'));
app.use("/api/how-to-reach-heading", require('./routes/HowToReachUsRoutes'));
app.use("/api/home-what-we-offer", require('./routes/WhatweOffer'));
app.get("/", (req, res) => {
  res.send("TeacherHeading API Running...");
});
app.use("/api/testimonial-heading", require("./routes/HomeTestinomialHeading"));
app.use("/api/student-review", require("./routes/StudentReview"));


// ******************************************/////////////**************************** */
app.use("/api/about-founder-details", require('./routes/AboutFounderDetailsRoute'));
app.use("/api/about-founder", require('./routes/AboutFounderRouter'));
app.use("/api/about-foun", require('./routes/AboutFounderRouter'));
app.use("/api/about-us", require("./routes/AboutUsPageRoute"));
app.use("/api/about-teacher", require('./routes/AboutTeacherHeadingRoute'));
app.use("/api/books", require("./routes/books"));
app.use("/api/books-page", require("./routes/booksPage"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/course-batches", require("./routes/courseBatchRoutes"));
app.use("/api/course-bookings", require("./routes/courseBookingRoutes"));
app.use("/api/vedic-mantra", require("./routes/VedicMantraPage"));
app.use("/api/yoga-courses", require("./routes/courseRoutes"));
app.use("/api/gallery", require('./routes/GalleryHeading'));
app.use("/api/gallery-heading" , require('./routes/GalleryRoute'));
app.use("/api/accommodation", require('./routes/Accommodation'));
app.use("/api/hours24", require('./routes/Hours24'));
app.use("/api/rules-refund", require('./routes/RulesRefundForm'));
app.use('/api/ayurveda-page', require('./routes/ayurveda'));
app.use("/api/online-yoga", require('./routes/OnlineYoga'));
app.use('/api/online-yoga-ttc', require('./routes/yogaTTC'));
app.use("/api/yin-yoga", require("./routes/yinyogaRoute"));

app.use("/api/blog-details", require("./routes/blogRoutes"));
app.use("/api/blog-page", require("./routes/blogPageRoutes"));
app.use("/api/our-school", require("./routes/ourSchoolRoutes"));
app.use("/api/contact-us", require("./routes/contactUsRoutes"));
app.use("/api/contact-inquiries", require("./routes/contactInquiryRoutes"));
app.use(errorHandler);
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
