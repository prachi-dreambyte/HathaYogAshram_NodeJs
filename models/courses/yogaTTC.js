const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  id: { type: Number, default: Date.now },
  title: { type: String, default: '' },
  duration: { type: String, default: '' },
  certification: { type: String, default: '' },
  style: { type: String, default: '' },
  date: { type: String, default: '' },
  image: { type: String, default: '' },
  oldPrice: { type: String, default: '' },
  newPrice: { type: String, default: '' },
  isNew: { type: Boolean, default: true }
});

const TestimonialSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  time: { type: String, default: '' },
  text: { type: String, default: '' },
  rating: { type: Number, default: 5, min: 1, max: 5 }
});

const BenefitSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  description: { type: String, default: '' }
});

const StepSchema = new mongoose.Schema({
  step: { type: String, default: '' },
  title: { type: String, default: '' },
  description: { type: String, default: '' }
});

const CertificationLogoSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  image: { type: String, default: '' },
  alt: { type: String, default: '' }
});

const OnlineYogaTTCModel = new mongoose.Schema({
  // Hero Section
  heroWelcomeText: { type: String, default: 'Welcome to Hatha Yogashram' },
  heroTitleLine1: { type: String, default: 'Your Gateway to' },
  heroTitleLine2: { type: String, default: 'Ancient Wisdom' },
  heroSubtitle: { 
    type: String, 
    default: 'Our Online Yoga Teacher Training Course (TTC) brings the transformative essence of traditional Hatha Yog directly to you, no matter where you are in the world.' 
  },
  heroImage: { type: String, default: '' },
  heroButtonText: { type: String, default: 'Begin Your Journey' },
  heroButtonLink: { type: String, default: '/BookingForm' },

  // About Courses Section
  aboutSectionLabel: { type: String, default: 'Our Offerings' },
  aboutSectionTitle: { type: String, default: 'About Our Courses' },
  courses: { type: [CourseSchema], default: [] },

  // Booking Section
  bookingSectionLabel: { type: String, default: 'Reserve Your Spot' },
  bookingSectionTitle: { type: String, default: 'Booking Courses Now' },
  bookingSectionDescription: { 
    type: String, 
    default: 'At Hatha Yogashram, we believe yoga is more than just a practice—it\'s a way of life. Nestled in the serene foothills of the Himalayas, our ashram has been a sanctuary for seekers for years.' 
  },
  bookingCourses: { type: [CourseSchema], default: [] },

  // Testimonials Section
  testimonialsSectionLabel: { type: String, default: 'Student Experiences' },
  testimonialsSectionTitle: { type: String, default: 'What Students are Saying' },
  testimonials: { type: [TestimonialSchema], default: [] },

  // Why Us Section
  whyUsSectionLabel: { type: String, default: 'Our Promise' },
  whyUsSectionTitle: { type: String, default: 'Why Choose Us' },
  whyUsIntro: { 
    type: String, 
    default: 'At Hatha Yogashram, we believe yoga is more than just a practice—it\'s a way of life. Nestled in the serene foothills of the Himalayas, our ashram has been a sanctuary for seekers for years.' 
  },
  whyUsImage: { type: String, default: '' },
  whyUsBenefits: { type: [BenefitSchema], default: [] },

  // Certification Section
  certificationLogos: { type: [CertificationLogoSchema], default: [] },
  certificationParagraph1: { type: String, default: '' },
  certificationParagraph2: { type: String, default: '' },
  certificationHighlight: { type: String, default: 'best yoga teacher training in India' },

  // How It Works Section
  howItWorksLabel: { type: String, default: 'Simple Process' },
  howItWorksTitle: { type: String, default: 'How It Works' },
  steps: { type: [StepSchema], default: [] },

  // Final CTA Section
  finalCtaTitle: { type: String, default: 'Ready to Begin?' },
  finalCtaText: { 
    type: String, 
    default: 'Enroll now and take the first step toward becoming a certified yoga teacher with Hatha Yogashram!' 
  },
  finalCtaButtonText: { type: String, default: 'Contact Us Today' },
  finalCtaButtonLink: { type: String, default: '/contact-us' }
}, {
  timestamps: true
});

module.exports = mongoose.model('OnlineYogaTTC', OnlineYogaTTCModel);