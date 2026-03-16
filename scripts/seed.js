const dotenv = require("dotenv");
const connectDB = require("../config/db");
const AboutFounderDetails = require("../models/AboutUs/AboutFounderDetailsModels");
const AboutFounderSection = require("../models/AboutUs/AboutFounderSection.Models");
const Course = require("../models/courses/CourseModel");
const CourseBatch = require("../models/courses/CourseBatchModel");
const CourseBooking = require("../models/courses/CourseBookingModel");
const Blog = require("../models/blog/BlogModel");
const BlogPage = require("../models/blog/BlogPageModel");
const Header = require("../models/header");
const HomeAyurvedaSection = require("../models/homepage/HomeAyurvedaSectionModel");
const HomeRetreatSection = require("../models/homepage/HomeRetreatSectionModel");
const HomeVideoSectionTwo = require("../models/homepage/HomeVideoSectionTwoModel");
const OurSchool = require("../models/ourSchool/OurSchoolModel");

dotenv.config();

// ── Shared section data (reused / adapted across TTC courses) ─────────────────

const SHARED_ACCOMMODATION = {
  tag: "Accommodation",
  title: "Experience a Comfortable Stay in Our Peaceful Ashram",
  image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&fit=crop",
  rooms: [
    {
      type: "Shared Rooms",
      description: "Twin-sharing with attached bathroom, 24/7 hot water, and mountain views",
    },
    {
      type: "Private Rooms",
      description: "Single occupancy with attached bathroom, study desk, and wardrobe",
    },
  ],
  features: [
    {
      label: "Room Features",
      detail: "Comfortable beds, storage, balcony/views, daily housekeeping",
    },
    {
      label: "Facilities",
      detail: "24/7 hot water, high-speed Wi-Fi, laundry service",
    },
    {
      label: "Environment",
      detail: "Serene ashram setting near the Ganges, surrounded by Himalayan nature",
    },
  ],
};

const SHARED_FOOD = {
  tag: "Food",
  title: "We Serve Fresh, Organic, Sattvic Vegetarian Meals",
  image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&fit=crop",
  meals: [
    {
      meal: "Breakfast",
      description:
        "Energizing and light — seasonal fruits, porridge, herbal tea, and yogurt",
    },
    {
      meal: "Lunch",
      description:
        "Wholesome Indian thali — dal, sabzi, rice, chapati, salad, and a sweet",
    },
    {
      meal: "Dinner",
      description:
        "Nourishing and easy to digest — soups, steamed vegetables, and light grains",
    },
    {
      meal: "Dietary Needs",
      description: "Vegan and gluten-free options available on request at no extra cost",
    },
  ],
};

// ── Course-specific Why Choose sections ───────────────────────────────────────

const WHY_CHOOSE_100 = {
  tag: "Why Choose This Course?",
  title: "The 100-Hour Training is Perfect For You",
  image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&fit=crop",
  idealForTitle: "This course is ideal for:",
  idealFor: [
    "Beginners stepping onto the yoga path for the first time",
    "Practitioners wanting to build a strong foundational practice",
    "Aspiring teachers preparing for their 200-hour certification",
    "Time-conscious students who want to split their training into two parts",
    "Self-discovery seekers looking for personal transformation in Rishikesh",
  ],
  benefitsTitle: "Key Benefits:",
  benefits: [
    "Learn authentic yoga in the birthplace of yoga",
    "Build a strong foundation in Hatha and Ashtanga yoga",
    "Understand basic anatomy, philosophy, and teaching methodology",
    "Complete the first half of your 200-hour certification",
    "Flexible completion — finish remaining 100 hours within 1 year",
    "Immerse yourself in the spiritual energy of Rishikesh",
  ],
};

const WHY_CHOOSE_200 = {
  tag: "Why Choose This Course?",
  title: "The 200-Hour Training Will Transform Your Teaching",
  image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&fit=crop",
  idealForTitle: "This course is ideal for:",
  idealFor: [
    "Dedicated practitioners ready to take the next step",
    "Those seeking Yoga Alliance RYT-200 certification",
    "Aspiring yoga teachers wanting to teach globally",
    "Students who completed a 100-hour and are ready to advance",
    "Individuals seeking deep personal transformation",
  ],
  benefitsTitle: "Key Benefits:",
  benefits: [
    "Earn internationally recognized Yoga Alliance RYT-200 certification",
    "Master Hatha and Ashtanga sequences with confidence",
    "Deepen anatomy, philosophy, and pranayama knowledge",
    "Develop strong teaching skills through daily practice teaching",
    "Join a global community of certified yoga teachers",
    "Full residential immersion in the yoga capital of the world",
  ],
};

const WHY_CHOOSE_300 = {
  tag: "Why Choose This Course?",
  title: "The 300-Hour Training Takes You to Mastery",
  image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&fit=crop",
  idealForTitle: "This course is ideal for:",
  idealFor: [
    "Certified 200-hour teachers ready to go deeper",
    "Teachers wanting to upgrade to RYT-300 or RYT-500",
    "Practitioners drawn to advanced philosophy and subtle body teachings",
    "Those seeking advanced therapeutics and sequencing skills",
    "Yoga professionals committed to lifelong learning",
  ],
  benefitsTitle: "Key Benefits:",
  benefits: [
    "Advance to Yoga Alliance RYT-300 or RYT-500 certification",
    "Study advanced asana, pranayama, and meditation in depth",
    "Learn therapeutic applications and injury prevention",
    "Master the subtle body — chakras, nadis, and prana vayus",
    "Develop a signature teaching style with guidance from senior teachers",
    "Small cohort for personalized mentorship and transformation",
  ],
};

const WHY_CHOOSE_500 = {
  tag: "Why Choose This Course?",
  title: "The 500-Hour Training is a Complete Mastery Path",
  image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&fit=crop",
  idealForTitle: "This course is ideal for:",
  idealFor: [
    "Passionate practitioners committed to complete mastery",
    "Teachers seeking the highest Yoga Alliance RYT-500 credential",
    "Those who want both 200-hour and 300-hour training in one journey",
    "Yoga professionals building a full-time teaching career",
    "Students craving a deep, uninterrupted immersion in Rishikesh",
  ],
  benefitsTitle: "Key Benefits:",
  benefits: [
    "Earn the prestigious Yoga Alliance RYT-500 certification",
    "Complete 200-hour and 300-hour curricula in a single immersion",
    "Study with senior masters across multiple yoga traditions",
    "Develop advanced teaching, sequencing, and adjustment skills",
    "Explore yoga therapy, chakra science, and tantric philosophy",
    "Graduate with the confidence and credentials to teach worldwide",
  ],
};

// ── Founder data (unchanged) ──────────────────────────────────────────────────

const founders = [
  {
    founderName: "Guru Ashish Ji",
    role: "Vinyasa Yogashala | Founder",
    img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=1000&fit=crop",
    shortTitle: "Master of Traditional Hatha Yog",
    stats: "20+ | Years Experience\n1000+ | Students\n50+ | Countries\n100+ | Workshops",
    mainQuote:
      "Yoga creates a rhythm between mind and body that leads to an understanding of our true self",
    quoteTitle: "Guru Ashish Ji",
    mainBiography:
      "His Philosophy on yoga teaches us beyond just physical well-being; it is more about unlocking the power of our subconscious mind. It is an exploration of our inner self that seeks to bring us closer to understanding our true nature.\n\nGuru Ji has dedicated his life to the practice of yoga and its philosophy, combining ancient teachings with modern-day techniques and tools to create an inclusive environment for all.\n\nYou are the greatest form of energy & that energy travels through several mediums (situations) before it takes the shape of your desired reality. No matter how difficult life is, you have the power to create your own destiny. Yoga is one way to achieve your desired reality as it taps into the source of your own inner power & awakens the yogi in you.",
    bioTitle: "Biography",
    mainPhilosophy: "Philosophy & Teachings",
    philosophyItems: [
      {
        icon: "🧘",
        heading: "Thought (Vichaar)",
        paragraph:
          "Guru Ashish Ji believes that he must have laid the foundation of Vinyasa Yogashala, but it is not his alone. Rather, he believes that everyone who walks through the door of Vinyasa Yogashala has a part to play in creating a community and family – for him, this feeling of belonging is just as important as the physical practice itself.",
      },
      {
        icon: "🔥",
        heading: "Passion (Junoon)",
        paragraph:
          "Guru Ji's passion for sharing yoga with others radiates through him. He is passionate about providing a safe and supportive learning environment for students and has developed an extensive syllabus to help his students develop their practice according to their own individual needs, abilities, and goals.",
      },
      {
        icon: "💪",
        heading: "Dedication (Lagan)",
        paragraph:
          "He dedicated his early childhood to practicing yoga in the mighty mountains of Rishikesh and became the most renowned & youngest child to get certified as a yoga trainer. He has been teaching yoga for more than 20 years and is considered one of the most experienced teachers in India.",
      },
      {
        icon: "✨",
        heading: "Karma (Karm)",
        paragraph:
          "Since he discovered yoga as his karma from an early age in his life, his mission to spread the knowledge and awareness of yoga around the world has been unstoppable. His intent for teaching yoga is not only to awaken people's spiritual connection but also to help them build physical strength and emotional resilience.",
      },
    ],
    mainAchievements:
      "20+ Years Teaching\n1000+ Students Trained\nYoungest Certified Teacher\nInternational Recognition",
    text: "",
  },
  {
    founderName: "Yogi Vishnu Panigrahi",
    role: "World Peace Yoga School | Founder",
    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=1000&fit=crop",
    shortTitle: "Spiritual Guide & Humanitarian",
    stats: "25+ | Years Journey\n2 | Ashrams Founded\n∞ | Lives Touched\n1 | Universal Love",
    mainQuote:
      "My life itself is a message, I am human, I make mistakes, these mistakes are the stepping stones for me to continue my journey",
    quoteTitle: "Yogi Vishnu Panigrahi",
    mainBiography:
      "He is humble and grounded and shows no ego or bias a man who gives his heart for humanity. This journey will show you that within the universe there is no You & I as we are One.\n\nA spinner of joy, a farmer of wisdom, and support for those who need guidance - a ray of light that the world needs as he showers his grace with no bias, to learn and feel you only need to be receptive. Vishnu Panigrahi is an Indian yoga guru and spiritual guide. His sole purpose is to serve humanity, give his life for charity, spreading the love and knowledge of yoga to create harmony and peace.\n\nHe works relentlessly to bring this to life in the modern chaotic world, imparting his knowledge to support the cause of serving humanity. The founder of World Peace Yoga School and Samadhi Ashram - he continues to impart and guide both his world teachers and students who come to expand their knowledge.",
    bioTitle: "Biography",
    mainPhilosophy: "Philosophy & Teachings",
    philosophyItems: [
      {
        icon: "🌍",
        heading: "Universal Oneness",
        paragraph:
          "Yogi Vishnu's philosophy centers on serving humanity with unconditional love. His teachings emphasize that we are all One - there is no separation between You and I in the universe.",
      },
      {
        icon: "🙏",
        heading: "Humility & Service",
        paragraph:
          "His approach is rooted in humility and groundedness, showing no ego or bias. He gives his heart completely for humanity, demonstrating that true spiritual wisdom comes from humble service to all beings.",
      },
      {
        icon: "💫",
        heading: "Receptivity",
        paragraph:
          "To learn from Yogi Vishnu, one only needs to be receptive. He showers his grace with no bias, acting as a ray of light that the world needs. His presence itself is a teaching.",
      },
      {
        icon: "🌱",
        heading: "Growth Through Mistakes",
        paragraph:
          "He teaches that being human means making mistakes, and these mistakes are not failures but rather stepping stones that teach us the greatest lessons on our spiritual journey.",
      },
    ],
    mainAchievements:
      "MA in Sanskrit\nMA in Yoga\n9 Years with Swami Veda\nFounder of 2 Ashrams",
    text: "",
  },
  {
    founderName: "Anand Mehrotra",
    role: "Sattva Yoga Academy | Founder",
    img: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800&h=1000&fit=crop",
    shortTitle: "Visionary Himalayan Yogi",
    stats: "2012 | Sattva Founded\n1000+ | Global Students\n8 | Yogic Practices\n∞ | Transformation",
    mainQuote:
      "Yoga is not just about feeling better — it is about awakening. We are here to transcend.",
    quoteTitle: "Anand Mehrotra",
    mainBiography:
      "Anand Mehrotra is a visionary Himalayan yogi, master teacher, and global thought leader whose work represents ancient yogic wisdom with the needs of the modern world. As the founder of the Sattva Yoga movement and Sattva Yoga Academy, Anand has touched thousands of lives worldwide, offering a path of wholeness, conscious evolution, and radical inner freedom.\n\nHis teachings — rooted in the Himalayan Yog-Vedantic tradition — embody a rare integration of depth, practicality, and transformative power. More than a teacher, Anand is a spiritual innovator, conscious entrepreneur, and humanitarian.\n\nBorn and raised in Rishikesh, India — widely regarded as the birthplace of yoga — Anand was immersed in a sacred environment of yogic study and sadhana from a very young age. Trained in the oral tradition under the guidance of his revered master, Maharaji, Anand was initiated into the timeless lineage of Himalayan sages.",
    bioTitle: "Biography",
    mainPhilosophy: "Philosophy & Teachings",
    philosophyItems: [
      {
        icon: "🏔️",
        heading: "Sattva Path",
        paragraph:
          "Sattva Yoga—a complete, integrated approach to yoga designed for modern living, rooted in the timeless wisdom of the Himalayas. Derived from the Sanskrit word Sattva, meaning wholeness, truth, or purity.",
      },
      {
        icon: "⚡",
        heading: "Transformation",
        paragraph:
          "Unlike fragmented styles, Sattva Yoga weaves together the entire spectrum of yogic technology, including Tantric Kriyas, Kundalini awakening, Pranayama, meditation, and Bhakti expression.",
      },
      {
        icon: "🎯",
        heading: "Living Yoga",
        paragraph:
          "For Anand, yoga is not a practice you do — it is who you are. It is a way of walking through the world with presence, integrity, and inner freedom. Yoga is the art of conscious living itself.",
      },
      {
        icon: "🛤️",
        heading: "Inner Pilgrimage",
        paragraph:
          "He teaches that if someone goes on a pilgrimage and returns as the same being, then that person was never truly on a pilgrimage. The ultimate pilgrimage is always inward — toward the realisation of the Self.",
      },
    ],
    mainAchievements:
      "Sattva Yoga Founder\nGlobal Teacher\nDocumentary Featured\nHimalayan Master",
    text: "",
  },
];

const section = {
  journeyHeading: "Sacred Lineage of",
  journeyTitle: "Our Revered Founders",
  journeyParagraph:
    "Enlightened masters guiding seekers on the path of self-realization and inner peace",
  videoTitle: "Yoga in Motion",
  videos: [
    { type: "link", url: "https://www.youtube.com/embed/v7AYKMP6rOE?controls=0&modestbranding=1" },
    { type: "link", url: "https://www.youtube.com/embed/sTANio_2E0Q?controls=0&modestbranding=1" },
    { type: "link", url: "https://www.youtube.com/embed/4pKly2JojMw?controls=0&modestbranding=1" },
    { type: "link", url: "https://www.youtube.com/embed/Nw-ksH2r6RY?controls=0&modestbranding=1" },
  ],
  lastHeading: "Ready to Transform Your Life?",
  lastParagraph: "Join thousands of students who have found their path through our teachings",
};

// ── Course seed data ──────────────────────────────────────────────────────────

const courseSeedData = [
  // ── 100 Hour YTTC ──────────────────────────────────────────────────────────
  {
    title: "100 Hour Yoga Teacher Training",
    slug: "100-hour-yttc",
    shortTitle: "100 Hour TTC",
    category: "teacher-training",
    homeSections: ["top-courses", "teacher-training"],
    featured: true,
    homeOrder: 1,
    legacyPath: "/YogaCourse100",
    card: {
      title: "100 Hour TTC",
      price: "$99.00",
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&fit=crop",
      formLink: "/course/100-hour-yttc#course-dates",
      link: "/course/100-hour-yttc",
    },
    teacherTraining: {
      images: [
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1000&fit=crop",
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1000&fit=crop",
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&fit=crop",
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1000&fit=crop",
      ],
      duration: "10 Days",
      privateRoom: "$612",
      sharedRoom: "$400",
      certification: "Yoga Alliance USA",
      style: "Multi-Style Hatha",
      path: "/course/100-hour-yttc",
    },
    // ── NEW top-level dynamic sections ──────────────────────────────────────
    accommodation: SHARED_ACCOMMODATION,
    food: SHARED_FOOD,
    whyChoose: WHY_CHOOSE_100,
    // ────────────────────────────────────────────────────────────────────────
    content: {
      hero: {
        quoteText: "Transform Your Practice, Inspire Others, Become a Certified Yoga Teacher",
        title: "100 Hour Yoga Teacher Training in Rishikesh, India",
        breadcrumbLabel: "100 Hour YTTC",
        bannerImage:
          "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1600&fit=crop",
      },
      overview: {
        tag: "Course Overview",
        title: "A Comprehensive, Residential Program Designed for Beginners and Practitioners",
        description:
          "The 100 Hour Yoga Teacher Training Course is your gateway to authentic yoga practice in the birthplace of yoga. This transformative journey in Rishikesh combines traditional teachings with modern methodology, covering essential aspects of yoga philosophy, anatomy, pranayama, meditation, and asanas.",
      },
      infoCards: [
        { title: "Duration",      tag: "12-14 Days",              detail: "📅 12-14 Days intensive residential program",  icon: "📅" },
        { title: "Level",         tag: "Beginner to Intermediate", detail: "📊 Suitable for all levels of practitioners",  icon: "📊" },
        { title: "Certification", tag: "Step to RYT-200",          detail: "🏆 Internationally recognized certificate",     icon: "🏆" },
        { title: "Location",      tag: "Rishikesh, India",         detail: "📍 Yoga capital of the world",                 icon: "📍" },
      ],
      whyRishikesh: {
        tag: "Why Rishikesh?",
        title: "Discover the Magic of Learning Yoga in Its Birthplace",
        description:
          "Rishikesh is the yoga capital of the world, home to authentic yoga schools and ancient wisdom.",
        items: [
          { icon: "🏔️", title: "Birthplace of Yoga",  description: "Rishikesh is the yoga capital of the world, home to authentic yoga schools and ancient wisdom." },
          { icon: "🕉️", title: "Divine Energy",        description: "Located in the Himalayas with the holy Ganges flowing through, creating awe-inspiring spiritual energy." },
          { icon: "🧘‍♂️", title: "Authentic Learning", description: "Learn from experienced masters who carry forward the traditional Himalayan yoga lineage." },
          { icon: "🌿", title: "Natural Setting",       description: "Peaceful environment surrounded by mountains and nature, perfect for deep yoga practice." },
        ],
      },
      curriculum: {
        tag: "What You'll Learn",
        title: "Comprehensive Curriculum Covering All Aspects of Yoga",
        items: [
          { category: "Hatha Yog",        items: ["140+ traditional asanas", "Surya & Chandra Namaskar", "Standing, sitting, prone & supine postures", "Balancing & twisting postures"] },
          { category: "Ashtanga Vinyasa", items: ["Primary series practice", "Sun salutations A & B", "Standing & sitting sequences", "Finishing postures"] },
          { category: "Pranayama",        items: ["Nadishodhana", "Kapalbhati", "Bhastrika", "Ujjayi, Bhramari, Sheetali"] },
          { category: "Meditation",       items: ["Himalayan meditation", "Breath awareness", "Mantra meditation", "Yoga Nidra"] },
          { category: "Philosophy",       items: ["Yoga Sutras of Patanjali", "8 limbs of Yoga", "Bhagavad Gita wisdom", "Chakras & Nadis"] },
          { category: "Anatomy",          items: ["Skeletal & muscular system", "Respiratory & circulatory system", "Alignment principles", "Injury prevention"] },
        ],
      },
      dailySchedule: {
        tag: "Daily Schedule",
        title: "A Typical Day in Your Yoga Teacher Training Journey",
        items: [
          { time: "6:00 AM",  activity: "Morning Tea" },
          { time: "6:30 AM",  activity: "Pranayama & Meditation" },
          { time: "8:00 AM",  activity: "Hatha Yog Asana Practice" },
          { time: "10:00 AM", activity: "Breakfast" },
          { time: "11:00 AM", activity: "Yoga Philosophy & Ancient Texts" },
          { time: "12:30 PM", activity: "Anatomy & Alignment" },
          { time: "1:30 PM",  activity: "Lunch" },
          { time: "3:00 PM",  activity: "Ashtanga Vinyasa Practice" },
          { time: "5:00 PM",  activity: "Teaching Methodology" },
          { time: "6:30 PM",  activity: "Dinner" },
          { time: "7:30 PM",  activity: "Satsang / Self Study / Kirtan" },
        ],
      },
      features: {
        tag: "Course Features",
        title: "Everything You Need for a Transformative Yoga Journey",
        items: [
          { icon: "🧘",   title: "Expert Teachers",         desc: "15-30+ years of experience in traditional yoga" },
          { icon: "🏔️",  title: "Rishikesh Setting",        desc: "Yoga capital of the world" },
          { icon: "📜",   title: "Yoga Alliance",            desc: "Internationally certified courses" },
          { icon: "🌿",   title: "Organic Meals",            desc: "Nutritious sattvic vegetarian food" },
          { icon: "🏠",   title: "Accommodation",            desc: "Comfortable & clean rooms with modern facilities" },
          { icon: "🧘‍♀️", title: "Small Groups",            desc: "Personal attention guaranteed" },
          { icon: "📚",   title: "Comprehensive Curriculum", desc: "100+ yoga postures and techniques" },
          { icon: "🎓",   title: "Certification",            desc: "Step towards 200hr RYT certification" },
        ],
      },
      included: {
        tag: "What's Included",
        title: "Everything You Need for a Comfortable Stay and Learning Experience",
        includedTitle: "What does the course fees include?",
        notIncludedTitle: "What is not included in the course fees?",
        toBringTitle: "What to bring with you?",
        items: [
          "11-12 nights accommodation (shared/private)",
          "3 nutritious vegetarian meals daily",
          "Yoga materials, books & manuals",
          "Weekend excursions & sightseeing",
          "Kirtan nights & cultural programs",
          "Cleansing kit (Jala neti, rubber neti)",
          "Fire ceremony & Ganga Aarti",
          "24/7 WiFi access",
          "Laundry service",
          "Free pickup from Dehradun Airport",
        ],
        notIncluded: [
          "Ayurvedic Panchakarma & Treatment",
          "Air-conditioner (On Additional Charges)",
          "Visa fee/Air fare/Taxi pick-up from Delhi, Haridwar",
        ],
        toBringImage: "",
      },
      testimonials: {
        tag: "What Our Students Say",
        title: "Hear from Those Who Experienced the Transformation",
        items: [
          { name: "Sarah Johnson", country: "USA",    text: "This course transformed my life. The teachers are incredibly knowledgeable, and the setting in Rishikesh is magical. I left feeling confident and prepared to continue my yoga journey." },
          { name: "Michael Chen",  country: "Canada", text: "The perfect introduction to yoga teacher training. Small class sizes meant I got personal attention, and the curriculum was comprehensive yet accessible for beginners." },
          { name: "Emma Williams", country: "UK",     text: "The spiritual atmosphere of Rishikesh combined with expert teaching made this an unforgettable experience. The daily practice by the Ganges was life-changing." },
        ],
      },
      faqs: {
        tag: "Frequently Asked Questions",
        title: "Get Answers to Common Questions",
        items: [
          { q: "Which airport should I fly to?",         a: "The closest airport is New Delhi (DEL). From there, you can take a domestic flight to Dehradun (DED) which is 30 minutes from Rishikesh, or travel by taxi/bus (6-7 hours)." },
          { q: "Do I need prior yoga experience?",        a: "No prior experience is required. The course is designed for beginners and those looking to deepen their practice. At least 6 months of practice is recommended but not mandatory." },
          { q: "Will I get certification?",               a: "You will receive a 100-hour certificate. To become a certified yoga teacher (RYT-200), you need to complete the remaining 100 hours within one year at the same school." },
          { q: "What is included in the course fee?",     a: "Accommodation, 3 meals daily, course materials, excursions, WiFi, and airport pickup from Dehradun are all included. AC/heater may cost extra." },
          { q: "Is the food suitable for special diets?", a: "Yes! We provide vegetarian, vegan, and gluten-free options. Please inform us of any allergies or dietary requirements in advance." },
        ],
      },
      cta: {
        title: "Ready to Begin Your Journey?",
        subtitle: "Transform your life through yoga. Join us in Rishikesh for an unforgettable experience.",
        primaryLabel: "Apply Now",
        primaryLink: "/BookingForm",
        secondaryLabel: "Contact Us",
        secondaryLink: "/contact-us",
      },
    },
  },

  // ── 200 Hour YTTC ──────────────────────────────────────────────────────────
  {
    title: "200 Hour Yoga Teacher Training",
    slug: "200-hour-yttc",
    shortTitle: "200 Hour TTC",
    category: "teacher-training",
    homeSections: ["top-courses", "teacher-training"],
    homeOrder: 2,
    legacyPath: "/YogaCourse200",
    card: {
      title: "200 Hour TTC",
      price: "$199.00",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&fit=crop",
      formLink: "/course/200-hour-yttc#course-dates",
      link: "/course/200-hour-yttc",
    },
    teacherTraining: {
      images: [
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&fit=crop",
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&fit=crop",
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&fit=crop",
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&fit=crop",
      ],
      duration: "24 Days",
      privateRoom: "$1270",
      sharedRoom: "$980",
      certification: "RYT-200 Certified",
      style: "Hatha & Ashtanga",
      path: "/course/200-hour-yttc",
    },
    accommodation: SHARED_ACCOMMODATION,
    food: SHARED_FOOD,
    whyChoose: WHY_CHOOSE_200,
    content: {
      hero: {
        quoteText: "Deepen Your Practice, Share Your Gift, Become a Certified Yoga Teacher",
        title: "200 Hour Yoga Teacher Training in Rishikesh, India",
        breadcrumbLabel: "200 Hour YTTC",
        bannerImage:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&fit=crop",
      },
      overview: {
        tag: "Course Overview",
        title: "The World's Most Trusted Path to Yoga Alliance RYT-200 Certification",
        description:
          "The 200 Hour Yoga Teacher Training is a complete residential immersion in Rishikesh. You will study Hatha and Ashtanga yoga, yoga philosophy, anatomy, pranayama, and teaching methodology — graduating as a confident, internationally certified yoga teacher.",
      },
      infoCards: [
        { title: "Duration",      tag: "24 Days",         detail: "📅 24 Days intensive residential program",      icon: "📅" },
        { title: "Level",         tag: "All Levels",       detail: "📊 Open to all practitioners",                  icon: "📊" },
        { title: "Certification", tag: "RYT-200 Certified", detail: "🏆 Yoga Alliance internationally recognized",  icon: "🏆" },
        { title: "Location",      tag: "Rishikesh, India", detail: "📍 Yoga capital of the world",                  icon: "📍" },
      ],
      whyRishikesh: {
        tag: "Why Rishikesh?",
        title: "Discover the Magic of Learning Yoga in Its Birthplace",
        description:
          "Rishikesh is the yoga capital of the world, home to authentic yoga schools and ancient wisdom.",
        items: [
          { icon: "🏔️", title: "Birthplace of Yoga",  description: "Rishikesh is where modern yoga was born. Study in the very city that inspired the world." },
          { icon: "🕉️", title: "Divine Energy",        description: "The sacred Ganges and Himalayan peaks create an unmatched atmosphere for deep practice." },
          { icon: "🧘‍♂️", title: "Authentic Lineage", description: "Our teachers carry forward unbroken lineages of Himalayan yoga wisdom." },
          { icon: "🌿", title: "Natural Sanctuary",     description: "Clean air, lush nature, and peaceful surroundings support full immersion in your training." },
        ],
      },
      curriculum: {
        tag: "What You'll Learn",
        title: "A Complete 200-Hour Yoga Curriculum",
        items: [
          { category: "Hatha Yoga",       items: ["200+ asanas in depth", "Alignment and adjustment", "Sequencing principles", "Therapeutic applications"] },
          { category: "Ashtanga Vinyasa", items: ["Full primary series", "Sun salutations A & B", "Standing and seated sequences", "Finishing postures and inversions"] },
          { category: "Pranayama",        items: ["8 classical pranayamas", "Kumbhaka (breath retention)", "Bandhas and mudras", "Subtle body awareness"] },
          { category: "Meditation",       items: ["Himalayan meditation", "Mantra japa", "Yoga Nidra", "Trataka (candle gazing)"] },
          { category: "Philosophy",       items: ["Patanjali Yoga Sutras", "Bhagavad Gita", "Samkhya philosophy", "History of yoga traditions"] },
          { category: "Anatomy",          items: ["Musculoskeletal system", "Nervous and respiratory systems", "Yoga anatomy in practice", "Injury prevention and safety"] },
          { category: "Teaching Methods", items: ["Class planning and sequencing", "Voice, language, and cueing", "Hands-on adjustments", "Ethics of teaching"] },
        ],
      },
      dailySchedule: {
        tag: "Daily Schedule",
        title: "A Typical Day in Your 200-Hour Training",
        items: [
          { time: "6:00 AM",  activity: "Morning Tea" },
          { time: "6:30 AM",  activity: "Pranayama & Meditation" },
          { time: "8:00 AM",  activity: "Hatha Yoga Asana Practice" },
          { time: "10:00 AM", activity: "Breakfast" },
          { time: "11:00 AM", activity: "Yoga Philosophy / Anatomy" },
          { time: "1:00 PM",  activity: "Lunch" },
          { time: "2:30 PM",  activity: "Ashtanga Vinyasa Practice" },
          { time: "4:30 PM",  activity: "Teaching Practice & Methodology" },
          { time: "6:30 PM",  activity: "Dinner" },
          { time: "7:30 PM",  activity: "Satsang / Self Study / Kirtan" },
        ],
      },
      features: {
        tag: "Course Features",
        title: "Everything Included in Your 200-Hour Training",
        items: [
          { icon: "🧘",   title: "Expert Faculty",           desc: "Teachers with 15-30+ years of authentic yoga experience" },
          { icon: "🏔️",  title: "Rishikesh Setting",         desc: "The global yoga capital — your ideal training environment" },
          { icon: "📜",   title: "Yoga Alliance Certified",   desc: "Globally recognized RYT-200 upon graduation" },
          { icon: "🌿",   title: "Sattvic Meals",             desc: "Three nutritious vegetarian meals served daily" },
          { icon: "🏠",   title: "Accommodation Included",    desc: "Comfortable ashram stay with modern amenities" },
          { icon: "🧘‍♀️", title: "Intimate Class Sizes",     desc: "Small groups ensure personal mentorship" },
          { icon: "📚",   title: "Complete Curriculum",       desc: "Asana, pranayama, philosophy, anatomy, and teaching skills" },
          { icon: "🎓",   title: "RYT-200 Certification",     desc: "Begin your teaching career worldwide" },
        ],
      },
      included: {
        tag: "What's Included",
        title: "Everything Provided for Your 24-Day Residential Training",
        includedTitle: "What does the course fee include?",
        notIncludedTitle: "What is not included?",
        toBringTitle: "What to bring with you?",
        items: [
          "23-24 nights accommodation (shared/private)",
          "3 nutritious vegetarian meals daily",
          "All course materials, books & manuals",
          "Weekend excursions & cultural programs",
          "Kirtan nights & fire ceremony",
          "Cleansing kit (Jala neti, rubber neti)",
          "Ganga Aarti ceremony",
          "24/7 WiFi access",
          "Laundry service",
          "Free pickup from Dehradun Airport",
        ],
        notIncluded: [
          "Ayurvedic Panchakarma & Treatment",
          "Air-conditioner (on additional charges)",
          "Visa fee / Air fare / Taxi from Delhi or Haridwar",
        ],
        toBringImage: "",
      },
      testimonials: {
        tag: "What Our Students Say",
        title: "Hear from Our 200-Hour Graduates",
        items: [
          { name: "Laura Becker",   country: "Germany",   text: "The 200-hour training was the most profound experience of my life. The teachers are deeply knowledgeable and the community is incredibly supportive." },
          { name: "James Nguyen",   country: "Australia", text: "I came as a student and left as a teacher. The curriculum was rigorous but the daily rhythm made it deeply enjoyable. I highly recommend this program." },
          { name: "Priya Sharma",   country: "India",     text: "Coming back to Rishikesh for my 200-hour felt like coming home. The teachings here carry a depth you simply cannot find anywhere else." },
        ],
      },
      faqs: {
        tag: "Frequently Asked Questions",
        title: "Common Questions About the 200-Hour Training",
        items: [
          { q: "Is prior yoga experience required?",        a: "A basic regular practice is recommended but not mandatory. We welcome all dedicated practitioners." },
          { q: "Which airport should I fly to?",            a: "Fly to Dehradun (DED) for the closest connection, or New Delhi (DEL) followed by a 6-7 hour taxi or bus." },
          { q: "What certification will I receive?",        a: "Upon completion you receive a Yoga Alliance accredited RYT-200 certificate, recognized worldwide." },
          { q: "Is accommodation included?",                a: "Yes — 23-24 nights in a shared or private room at the ashram, with all meals included." },
          { q: "Can I teach internationally after this?",   a: "Yes. The RYT-200 is the global standard for yoga teaching and is recognized in over 100 countries." },
        ],
      },
      cta: {
        title: "Begin Your Teaching Journey",
        subtitle: "Join the next batch and earn your RYT-200 certification in the birthplace of yoga.",
        primaryLabel: "Apply Now",
        primaryLink: "/BookingForm",
        secondaryLabel: "Contact Us",
        secondaryLink: "/contact-us",
      },
    },
  },

  // ── 300 Hour YTTC ──────────────────────────────────────────────────────────
  {
    title: "300 Hour Yoga Teacher Training",
    slug: "300-hour-yttc",
    shortTitle: "300 Hour TTC",
    category: "teacher-training",
    homeSections: ["top-courses", "teacher-training"],
    homeOrder: 3,
    legacyPath: "/YogaCourse300",
    card: {
      title: "300 Hour TTC",
      price: "$399.00",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&fit=crop",
      formLink: "/course/300-hour-yttc#course-dates",
      link: "/course/300-hour-yttc",
    },
    teacherTraining: {
      images: [
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&fit=crop",
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&fit=crop",
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&fit=crop",
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&fit=crop",
      ],
      duration: "28 Days",
      privateRoom: "$1480",
      sharedRoom: "$1150",
      certification: "RYT-300 Certified",
      style: "Advanced Multi-Style",
      path: "/course/300-hour-yttc",
    },
    accommodation: SHARED_ACCOMMODATION,
    food: SHARED_FOOD,
    whyChoose: WHY_CHOOSE_300,
  },

  // ── 500 Hour YTTC ──────────────────────────────────────────────────────────
  {
    title: "500 Hour Yoga Teacher Training",
    slug: "500-hour-yttc",
    shortTitle: "500 Hour TTC",
    category: "teacher-training",
    homeSections: ["top-courses", "teacher-training"],
    homeOrder: 4,
    legacyPath: "/YogaCourse500",
    card: {
      title: "500 Hour TTC",
      price: "$498.00",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&fit=crop",
      formLink: "/course/500-hour-yttc#course-dates",
      link: "/course/500-hour-yttc",
    },
    teacherTraining: {
      images: [
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&fit=crop",
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&fit=crop",
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&fit=crop",
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&fit=crop",
      ],
      duration: "56 Days",
      privateRoom: "$2350",
      sharedRoom: "$1900",
      certification: "RYT-500 Certified",
      style: "Complete Mastery",
      path: "/course/500-hour-yttc",
    },
    accommodation: SHARED_ACCOMMODATION,
    food: SHARED_FOOD,
    whyChoose: WHY_CHOOSE_500,
  },

  // ── Kundalini courses (no accommodation/food/whyChoose — different page layout) ──
  {
    title: "100 Hour Kundalini Yoga",
    slug: "kundalini-100",
    shortTitle: "100 Hour Kundalini Yoga",
    category: "kundalini",
    homeSections: ["top-courses", "kundalini"],
    homeOrder: 5,
    legacyPath: "/kundalini-100",
    card: {
      title: "100 Hour Kundalini Yoga",
      price: "$109.99",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&fit=crop",
    },
    kundalini: {
      title: "100-Hour Kundalini Yoga",
      label: "Foundation Course",
      price: "599",
      duration: "14 Days",
      date: "2nd of every month",
      badge: "Beginner",
      detailsRoute: "/kundalini-100",
    },
  },
  {
    title: "200 Hour Kundalini Yoga",
    slug: "kundalini-200",
    shortTitle: "200 Hour Kundalini Yoga",
    category: "kundalini",
    homeSections: ["top-courses", "kundalini"],
    homeOrder: 6,
    legacyPath: "/kundalini-200",
    card: {
      title: "200 Hour Kundalini Yoga",
      price: "$84.99",
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&fit=crop",
    },
    kundalini: {
      title: "200-Hour Kundalini Yoga",
      label: "Teacher Training Course",
      price: "980",
      duration: "24 Days",
      date: "2nd of every month",
      badge: "Popular",
      detailsRoute: "/kundalini-200",
    },
  },
  {
    title: "300 Hour Kundalini Yoga",
    slug: "kundalini-300",
    shortTitle: "300 Hour Kundalini Yoga",
    category: "kundalini",
    homeSections: ["top-courses", "kundalini"],
    homeOrder: 7,
    legacyPath: "/kundalini-300",
    card: {
      title: "300 Hour Kundalini Yoga",
      price: "$99.99",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&fit=crop",
    },
    kundalini: {
      title: "300-Hour Kundalini Yoga",
      label: "Advanced Teacher Training",
      price: "1150",
      duration: "28 Days",
      date: "2nd of every month",
      badge: "Advanced",
      detailsRoute: "/kundalini-300",
    },
  },

  // ── Short courses / retreats / ayurveda (no accommodation/food/whyChoose) ──
  {
    title: "Yin Yoga",
    slug: "yin-yoga",
    shortTitle: "Yin Yoga",
    category: "short-course",
    homeSections: ["top-courses"],
    homeOrder: 8,
    legacyPath: "/YinYoga",
    card: {
      title: "Yin Yoga",
      price: "$89.99",
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&fit=crop",
    },
  },
  {
    title: "Vedic Mantra Chanting",
    slug: "vedic-mantra",
    shortTitle: "Vedic Mantra",
    category: "short-course",
    homeSections: ["top-courses"],
    homeOrder: 9,
    legacyPath: "/vedic-mantra",
    card: {
      title: "Vedic Mantra",
      price: "$64.99",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&fit=crop",
    },
  },
  {
    title: "5 Days Yoga Retreat",
    slug: "retreat-5-days",
    shortTitle: "5 Days Yoga Retreat",
    category: "retreat",
    homeSections: ["top-courses", "retreat"],
    homeOrder: 10,
    legacyPath: "/5-days-yoga-retreat",
    card: {
      title: "5 Days Yoga Retreat",
      price: "$119.99",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&fit=crop",
    },
    retreat: {
      title: "5 Days Yoga Retreat",
      privatePrice: "₹22,500 ($261)",
      sharedPrice: "₹15,500 ($180)",
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&fit=crop",
      path: "/5-days-yoga-retreat",
    },
  },
  {
    title: "10 Days Yoga Retreat",
    slug: "retreat-10-days",
    shortTitle: "10 Days Yoga Retreat",
    category: "retreat",
    homeSections: ["top-courses", "retreat"],
    homeOrder: 11,
    legacyPath: "/10-days-yoga-retreat",
    card: {
      title: "10 Days Yoga Retreat",
      price: "$104.99",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&fit=crop",
    },
    retreat: {
      title: "10 Days Yoga Retreat",
      privatePrice: "₹40,000 ($464)",
      sharedPrice: "₹31,000 ($359)",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&fit=crop",
      path: "/10-days-yoga-retreat",
    },
  },
  {
    title: "20 Days Yoga Retreat",
    slug: "retreat-20-days",
    shortTitle: "20 Days Yoga Retreat",
    category: "retreat",
    homeSections: ["top-courses", "retreat"],
    homeOrder: 12,
    legacyPath: "/20-days-yoga-retreat",
    card: {
      title: "20 Days Yoga Retreat",
      price: "$69.99",
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&fit=crop",
    },
    retreat: {
      title: "20 Days Yoga Retreat",
      privatePrice: "₹85,000 ($985)",
      sharedPrice: "₹64,000 ($742)",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&fit=crop",
      path: "/20-days-yoga-retreat",
    },
  },
  {
    title: "Meditation",
    slug: "meditation",
    shortTitle: "Meditation",
    category: "short-course",
    homeSections: ["top-courses"],
    homeOrder: 13,
    legacyPath: "/Meditation",
    card: {
      title: "Meditation",
      price: "$114.99",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&fit=crop",
    },
  },
  {
    title: "Pranayama",
    slug: "pranayama",
    shortTitle: "Pranayama",
    category: "short-course",
    homeSections: ["top-courses"],
    homeOrder: 14,
    legacyPath: "/Pranayama",
    card: {
      title: "Pranayama",
      price: "$84.99",
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&fit=crop",
    },
  },
  {
    title: "Ayurveda",
    slug: "ayurveda",
    shortTitle: "Ayurveda",
    category: "ayurveda",
    homeSections: ["top-courses"],
    homeOrder: 15,
    legacyPath: "/Ayurveda",
    card: {
      title: "Ayurveda",
      price: "$100.99",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&fit=crop",
    },
    ayurveda: {
      title: "5 Days Ayurveda Courses",
      label: "Introduction to Ayurveda",
      price: "299",
      duration: "5 Days",
      date: "2nd of every month",
      badge: "Beginner",
      detailsRoute: "/ayurveda-foundation",
    },
  },
  {
    title: "Online Courses",
    slug: "online-courses",
    shortTitle: "Online Courses",
    category: "online",
    homeSections: ["top-courses"],
    homeOrder: 16,
    legacyPath: "/Pranayama",
    card: {
      title: "Online Courses",
      price: "$99.99",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&fit=crop",
    },
  },
  {
    title: "5 Days Ayurveda Courses",
    slug: "ayurveda-5-days",
    shortTitle: "Ayurveda 5 Days",
    category: "ayurveda",
    homeSections: ["ayurveda"],
    homeOrder: 17,
    legacyPath: "/ayurveda-foundation",
    ayurveda: {
      title: "5 Days Ayurveda Courses",
      label: "Introduction to Ayurveda",
      price: "299",
      duration: "5 Days",
      date: "2nd of every month",
      badge: "Beginner",
      detailsRoute: "/ayurveda-foundation",
    },
  },
  {
    title: "10 Days Ayurveda Courses",
    slug: "ayurveda-10-days",
    shortTitle: "Ayurveda 10 Days",
    category: "ayurveda",
    homeSections: ["ayurveda"],
    homeOrder: 18,
    legacyPath: "/ayurveda-practitioner",
    ayurveda: {
      title: "10 Days Ayurveda Courses",
      label: "Wellness & Lifestyle Course",
      price: "649",
      duration: "10 Days",
      date: "2nd of every month",
      badge: "Popular",
      detailsRoute: "/ayurveda-practitioner",
    },
  },
  {
    title: "15 Days Ayurveda Courses",
    slug: "ayurveda-15-days",
    shortTitle: "Ayurveda 15 Days",
    category: "ayurveda",
    homeSections: ["ayurveda"],
    homeOrder: 19,
    legacyPath: "/ayurveda-therapist",
    ayurveda: {
      title: "15 Days Ayurveda Courses",
      label: "Advanced Healing Training",
      price: "950",
      duration: "15 Days",
      date: "2nd of every month",
      badge: "Advanced",
      detailsRoute: "/ayurveda-therapist",
    },
  },
];

// ── Blog data (unchanged) ─────────────────────────────────────────────────────

const blogPageSeed = {
  topLabel: "Wisdom, Insights & Inspiration",
  title: "Yoga Blog - Rishikesh Yogkulam®",
  breadcrumbLabel: "Blog",
  sectionTitle: "Latest Articles & Yoga Insights",
  description:
    "Explore our collection of articles covering yoga philosophy, teacher training tips, pranayama techniques, and transformative experiences from our yoga community in Rishikesh.",
};

const blogSeedData = [
  {
    title: "Sheetkari Pranayama: Benefits and Techniques for Daily Yoga",
    slug: "sheetkari-pranayama",
    category: "Yoga Philosophy",
    badge: "Pranayama Guide",
    subtitle: "Benefits and Techniques for Daily Yoga",
    excerpt:
      "Sheetkari Pranayama helps bring a wave of calm and coolness into daily yoga practice. Learn the steps, benefits, and best times to practice.",
    coverImage:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1600&fit=crop",
    readTime: "5 min read",
    publishedAt: new Date("2026-01-15"),
    contentHtml: `
      <p><strong>Sheetkari Pranayama</strong>, also known as the Hissing Breath, is a cooling breathing technique that calms the nervous system and lowers body heat.</p>
      <h2>What is Sheetkari Pranayama?</h2>
      <p>The word "Sheetkari" comes from Sanskrit, meaning "cooling" or "soothing." This pranayama creates a soft hissing sound during inhalation.</p>
      <h2>How to Practice</h2>
      <ol>
        <li>Sit comfortably with a tall spine and relaxed shoulders.</li>
        <li>Close the lips and part the teeth slightly.</li>
        <li>Inhale slowly through the teeth, creating a soft hiss.</li>
        <li>Close the mouth and exhale through the nose.</li>
        <li>Repeat for 5–10 rounds.</li>
      </ol>
      <h2>Key Benefits</h2>
      <ul>
        <li>Cools the body and mind during heat or stress.</li>
        <li>Reduces anxiety and supports emotional balance.</li>
        <li>Improves focus for meditation and study.</li>
        <li>Supports digestion and soothes acidity.</li>
      </ul>
      <h2>Best Time to Practice</h2>
      <p>Practice in the early morning, after an active session, or whenever the body feels overheated. Avoid in cold weather or with low blood pressure.</p>
    `,
  },
  {
    title: "5 Ways to Prepare for Yoga Teacher Training in Rishikesh, India",
    slug: "prepare-ytt-rishikesh",
    category: "Yoga Training",
    badge: "Teacher Training",
    subtitle: "Essential preparation tips before arriving in Rishikesh",
    excerpt:
      "Feeling the call to deepen your practice? Here are five essential ways to prepare for your yoga teacher training in Rishikesh.",
    coverImage:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&fit=crop",
    readTime: "7 min read",
    publishedAt: new Date("2026-01-12"),
    contentHtml: `
      <p>Preparing for a yoga teacher training is as important as the training itself.</p>
      <h2>1. Build a Consistent Practice</h2>
      <p>Establish a simple daily routine of asana, pranayama, and meditation.</p>
      <h2>2. Learn the Basics of Yoga Philosophy</h2>
      <p>Read the Yoga Sutras or Bhagavad Gita to familiarize yourself with yogic principles.</p>
      <h2>3. Prepare Your Body and Mind</h2>
      <p>Prioritize sleep, hydration, and a sattvic diet.</p>
      <h2>4. Pack with Intention</h2>
      <p>Bring comfortable clothing, a reusable water bottle, and personal wellness essentials.</p>
      <h2>5. Set a Clear Intention</h2>
      <p>Clarify why you want to train and what you hope to learn.</p>
    `,
  },
  {
    title: "500-Hour Yoga Teacher Training in Rishikesh: Key Benefits for Advanced Practitioners",
    slug: "500-hour-ytt",
    category: "Yoga Training",
    badge: "Advanced Training",
    subtitle: "Deepen your practice with a complete 500-hour training",
    excerpt:
      "Discover how a 500-hour yoga teacher training can elevate your teaching skills and deepen your spiritual practice.",
    coverImage:
      "https://images.unsplash.com/photo-1545389336-cf090694435e?w=1600&fit=crop",
    readTime: "6 min read",
    publishedAt: new Date("2026-01-10"),
    contentHtml: `
      <p>The 500-hour training is a full-spectrum immersion for dedicated practitioners.</p>
      <h2>Why 500 Hours?</h2>
      <ul>
        <li>Advanced sequencing, adjustments, and cueing.</li>
        <li>Deeper study of philosophy, anatomy, and subtle body.</li>
        <li>Confidence to teach internationally with clarity.</li>
      </ul>
      <h2>Who Should Join</h2>
      <p>If you already teach or want to refine your skills, the 500-hour path provides structure, mentorship, and a powerful community.</p>
    `,
  },
];

// ── Our School data (unchanged) ───────────────────────────────────────────────

const ourSchoolSeedData = {
  hero: {
    title: "About Our Schools",
    subtitle: "Yoga Alliance Certified Teacher Training Schools in Rishikesh, India",
    omText: "ॐ",
  },
  sectionNav: [
    { id: "about",    label: "About School",    iconKey: "School" },
    { id: "vision",   label: "Vision & Mission", iconKey: "Target" },
    { id: "teaching", label: "Teaching",         iconKey: "BookOpen" },
    { id: "values",   label: "Values",           iconKey: "Star" },
    { id: "edge",     label: "Our Edge",         iconKey: "Zap" },
  ],
  schools: [
    {
      id: "worldpeace",
      name: "World Peace Yoga School",
      iconKey: "Heart",
      sections: {
        about: {
          title: "About World Peace Yoga School",
          image: "https://images.unsplash.com/photo-1588286840104-8957b019727f?w=1200&h=400&fit=crop",
          imageAlt: "Yoga School in Rishikesh",
          contentHtml: `<p>World Peace Yoga School offers Yoga Alliance certified training in the spiritual heart of Rishikesh. We teach 200, 300, and 500-hour programs in Hatha, Ashtanga, and Vinyasa yoga.</p><p>Our approach focuses on intimate class sizes, authentic Himalayan lineage, and a warm, supportive community.</p><h3>What Makes Us Different</h3><ul><li>Small, personalized classes</li><li>Traditional teachings in a modern setting</li><li>Global community of dedicated yogis</li></ul>`,
        },
        vision: { title: "Our Mission & Services", image: "", imageAlt: "", contentHtml: `<p>Our mission is to deliver authentic yoga education while serving humanity through mindful, compassionate teaching.</p>` },
        teaching: { title: "Our Teaching Approach", image: "", imageAlt: "", contentHtml: `<p>We guide students through a holistic study of asana, pranayama, meditation, and philosophy.<h3>Course Offerings</h3><ul><li>200-Hour Beginner Level (RYT 200)</li><li>300-Hour Intermediate Level (RYT 300)</li><li>500-Hour Master Level (RYT 500)</li></ul>` },
        values: { title: "Our Values & Philosophy", image: "", imageAlt: "", contentHtml: `<p>We uphold unity, compassion, and authenticity as the foundation of every program.</p>` },
        edge: { title: "Our Competitive Edge", image: "", imageAlt: "", contentHtml: `<p>World Peace Yoga School stands out through experienced teachers, authentic lineage, and a nurturing environment.</p>` },
      },
    },
    {
      id: "vinyasa",
      name: "Vinyasa Yogashram",
      iconKey: "School",
      sections: {
        about: {
          title: "About Vinyasa Yogashram",
          image: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=1200&h=400&fit=crop",
          imageAlt: "Vinyasa Yoga Practice",
          contentHtml: `<p>Founded in 2015, Vinyasa Yogashram is rooted in the vibrant spirit of Rishikesh and offers dynamic, heart-centered training.</p>`,
        },
        vision: { title: "Vision & Mission", image: "", imageAlt: "", contentHtml: `<p>We aim to inspire confident teachers with a strong foundation in anatomy, philosophy, and teaching methodology.</p>` },
        teaching: { title: "Teaching Philosophy", image: "", imageAlt: "", contentHtml: `<p>Our teachers blend classical practice with modern alignment and sequencing.</p>` },
        values: { title: "Values", image: "", imageAlt: "", contentHtml: `<p>We honor discipline, curiosity, and compassionate leadership.</p>` },
        edge: { title: "Our Edge", image: "", imageAlt: "", contentHtml: `<p>Students value our supportive mentorship, experiential teaching style, and global community.</p>` },
      },
    },
    {
      id: "sattva",
      name: "Sattva Yoga Academy",
      iconKey: "Mountain",
      sections: {
        about: {
          title: "About Sattva Yoga Academy",
          image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=1200&h=400&fit=crop",
          imageAlt: "Sattva Yoga Academy",
          contentHtml: `<p>Sattva Yoga Academy offers a holistic approach blending kriya, mantra, meditation, and asana practice rooted in Himalayan tradition.</p>`,
        },
        vision: { title: "Vision & Mission", image: "", imageAlt: "", contentHtml: `<p>We cultivate wholeness, truth, and compassion through a complete yogic lifestyle.</p>` },
        teaching: { title: "Teaching Style", image: "", imageAlt: "", contentHtml: `<p>Our trainings weave together breathwork, kriya, mindfulness, and devotion.</p>` },
        values: { title: "Core Values", image: "", imageAlt: "", contentHtml: `<ul><li>Integrity and self-inquiry</li><li>Embodied spirituality</li><li>Service and conscious action</li></ul>` },
        edge: { title: "Our Edge", image: "", imageAlt: "", contentHtml: `<p>Sattva offers a rare integration of yogic technology for modern living.</p>` },
      },
    },
    {
      id: "yogkulam",
      name: "Rishikesh Yogkulam",
      iconKey: "Sparkles",
      sections: {
        about: {
          title: "About Rishikesh Yogkulam",
          image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=400&fit=crop",
          imageAlt: "Rishikesh Yogkulam",
          contentHtml: `<p>Rishikesh Yogkulam is a traditional school dedicated to classical yoga education with heartfelt guidance. We welcome practitioners from around the world.</p>`,
        },
        vision: { title: "Vision & Mission", image: "", imageAlt: "", contentHtml: `<p>Our vision is to spread authentic yogic wisdom through disciplined study and compassionate living.</p>` },
        teaching: { title: "Teaching Approach", image: "", imageAlt: "", contentHtml: `<p>We combine systematic training with personal mentorship for long-term growth.</p>` },
        values: { title: "Values", image: "", imageAlt: "", contentHtml: `<ul><li>Humility and respect</li><li>Consistency and discipline</li><li>Community and service</li></ul>` },
        edge: { title: "Our Edge", image: "", imageAlt: "", contentHtml: `<p>Our alumni network and lineage support continuous learning and connection.</p>` },
      },
    },
  ],
};

// ── Batch builder (unchanged) ─────────────────────────────────────────────────

const makeDate = (value) => new Date(value);

const buildBatches = (courseMap) => {
  const batches = [];

  const addBatch = (slug, startDate, endDate, capacity, prices, status) => {
    const course = courseMap[slug];
    if (!course) return;
    batches.push({
      course: course._id,
      startDate: makeDate(startDate),
      endDate: makeDate(endDate),
      capacity,
      priceShared: prices?.shared,
      priceSharedOld: prices?.sharedOld,
      pricePrivate: prices?.private,
      pricePrivateOld: prices?.privateOld,
      status,
    });
  };

  const price100 = { shared: "$449", sharedOld: "$599", private: "$599", privateOld: "$799" };

  addBatch("100-hour-yttc", "2026-04-01", "2026-04-12", 0,  price100, "Fully Booked");
  addBatch("100-hour-yttc", "2026-05-01", "2026-05-12", 0,  price100, "Waiting List");
  addBatch("100-hour-yttc", "2026-06-01", "2026-06-12", 3,  price100);
  addBatch("100-hour-yttc", "2026-07-01", "2026-07-12", 6,  price100);
  addBatch("100-hour-yttc", "2026-08-01", "2026-08-12", 6,  price100);
  addBatch("100-hour-yttc", "2026-09-01", "2026-09-12", 5,  price100);

  addBatch("200-hour-yttc", "2026-06-05", "2026-06-28", 12, { shared: "$980",  sharedOld: "$1200", private: "$1270", privateOld: "$1450" });
  addBatch("300-hour-yttc", "2026-07-05", "2026-08-01", 8,  { shared: "$1150", sharedOld: "$1350", private: "$1480", privateOld: "$1650" });
  addBatch("500-hour-yttc", "2026-08-05", "2026-09-30", 10, { shared: "$1900", sharedOld: "$2100", private: "$2350", privateOld: "$2500" });

  addBatch("kundalini-100", "2026-05-02", "2026-05-15", 10, { shared: "$599",  sharedOld: "$699",  private: "$749",  privateOld: "$849"  });
  addBatch("kundalini-200", "2026-06-02", "2026-06-25", 8,  { shared: "$980",  sharedOld: "$1150", private: "$1199", privateOld: "$1350" });
  addBatch("kundalini-300", "2026-07-02", "2026-07-30", 6,  { shared: "$1150", sharedOld: "$1299", private: "$1399", privateOld: "$1550" });

  addBatch("retreat-5-days",  "2026-04-10", "2026-04-14", 20, { shared: "₹15,500 ($180)", private: "₹22,500 ($261)" });
  addBatch("retreat-10-days", "2026-05-10", "2026-05-19", 16, { shared: "₹31,000 ($359)", private: "₹40,000 ($464)" });
  addBatch("retreat-20-days", "2026-06-10", "2026-06-29", 12, { shared: "₹64,000 ($742)", private: "₹85,000 ($985)" });

  addBatch("yin-yoga",       "2026-05-20", "2026-05-27", 14, { shared: "$89.99",  private: "$99.99"  });
  addBatch("vedic-mantra",   "2026-06-10", "2026-06-16", 9,  { shared: "$64.99",  private: "$79.99"  });
  addBatch("meditation",     "2026-07-05", "2026-07-11", 6,  { shared: "$114.99", private: "$129.99" });
  addBatch("pranayama",      "2026-08-02", "2026-08-08", 11, { shared: "$84.99",  private: "$99.99"  });
  addBatch("ayurveda",       "2026-09-02", "2026-09-08", 11, { shared: "$100.99", private: "$120.99" });
  addBatch("online-courses", "2026-04-01", "2026-04-30", 20, { shared: "$99.99",  private: "$99.99"  });

  addBatch("ayurveda-5-days",  "2026-04-12", "2026-04-16", 15, { shared: "$299",  private: "$349"  });
  addBatch("ayurveda-10-days", "2026-05-12", "2026-05-21", 12, { shared: "$649",  private: "$699"  });
  addBatch("ayurveda-15-days", "2026-06-12", "2026-06-26", 10, { shared: "$950",  private: "$1100" });

  return batches;
};

// ── Runner ────────────────────────────────────────────────────────────────────

const run = async () => {
  await connectDB();

  await AboutFounderDetails.deleteMany();
  await AboutFounderSection.deleteMany();
  await AboutFounderDetails.insertMany(founders);
  await AboutFounderSection.create(section);

  await CourseBooking.deleteMany();
  await CourseBatch.deleteMany();
  await Course.deleteMany();
  await Blog.deleteMany();
  await BlogPage.deleteMany();
  await Header.deleteMany();
  await HomeAyurvedaSection.deleteMany();
  await HomeRetreatSection.deleteMany();
  await HomeVideoSectionTwo.deleteMany();
  await OurSchool.deleteMany();

  const createdCourses = await Course.insertMany(courseSeedData);
  const courseMap = createdCourses.reduce((acc, course) => {
    acc[course.slug] = course;
    return acc;
  }, {});

  const batches = buildBatches(courseMap);
  if (batches.length) {
    await CourseBatch.insertMany(batches);
  }

  await BlogPage.create(blogPageSeed);
  await Blog.insertMany(blogSeedData);
  await Header.create({
    address:
      "Hatha Yogashram, Balaknath Rd, Upper Tapovan, Rishikesh, Uttarakhand India 249192",
    phone: "+91 9335606336",
    yogaAllianceId: "Yoga Alliance ID: 401771",
    facebookUrl: "https://www.facebook.com/profile.php?id=100095297992781",
    instagramUrl: "https://www.instagram.com/hathayogashram/",
    logoUrl: "",
    ctaLabel: "Register Now",
    ctaPath: "/BookingForm",
    navItems: [
      { type: "link", label: "Home", path: "/", side: "left", order: 0 },
      {
        type: "dropdown",
        label: "About",
        side: "left",
        order: 1,
        dropdown: {
          label: "About",
          links: [
            { label: "Founder", path: "/Our-Founder" },
            { label: "Our Teachers", path: "/teachers" },
            { label: "Our School", path: "/Our-School" },
            { label: "Accommodation", path: "/Accommodation-Food" },
            { label: "Blog", path: "/blog" },
            { label: "Yoga Books", path: "/Yoga-Books" },
            { label: "Gallery", path: "/gallery" },
          ],
        },
      },
      {
        type: "dropdown",
        label: "Rishikesh TTC",
        side: "left",
        order: 2,
        dropdown: {
          label: "Rishikesh TTC",
          links: [
            { label: "100 Hour TTC", path: "/course/100-hour-yttc" },
            { label: "200 Hour TTC", path: "/course/200-hour-yttc" },
            { label: "300 Hour TTC", path: "/course/300-hour-yttc" },
            { label: "500 Hour TTC", path: "/course/500-hour-yttc" },
          ],
        },
      },
      {
        type: "dropdown",
        label: "Short Course",
        side: "left",
        order: 3,
        dropdown: {
          label: "Short Course",
          links: [
            { label: "Meditation", path: "/course/meditation" },
            { label: "Pranayama", path: "/course/pranayama" },
          ],
        },
      },
      {
        type: "link",
        label: "Ayurveda",
        path: "/Ayurveda-Page",
        side: "right",
        order: 4,
      },
      {
        type: "dropdown",
        label: "Online Courses",
        side: "right",
        order: 5,
        dropdown: {
          label: "Online Courses",
          links: [
            { label: "Online YTTC", path: "/Online-YTTC" },
            { label: "Yoga Online", path: "/Yoga-Online" },
          ],
        },
      },
      { type: "link", label: "Payment", path: "/payment", side: "right", order: 6 },
      {
        type: "link",
        label: "Contact",
        path: "/contact-us",
        side: "right",
        order: 7,
      },
    ],
  });
  await HomeAyurvedaSection.create({
    title: "Discover Ayurveda Courses",
    subtitle: "Ayurveda Wellness & Healing Programs",
    description:
      'Ayurveda, the ancient "science of life," offers a holistic path to balance your body, mind, and spirit. At Hatha Yogashram, we integrate Ayurveda deeply into our yoga teacher trainings and therapies — from the three doshas and Dinacharya to Shirodhara and seasonal practices.',
    imageUrl: "",
    bookPath: "/BookingForm",
  });
  await HomeRetreatSection.create({
    title: "Yoga Meditation Retreat",
    highlightText: "in Rishikesh",
    description:
      "Elevate your life with an unforgettable yoga retreat experience. Discover and book rejuvenating yoga retreats, vacations, and yoga teacher training courses at Hatha Yogashram",
  });
  await HomeVideoSectionTwo.create({
    heading: "Deepen and Enhance The Quality of Your Teachings",
    description:
      "Our program focuses on refining your techniques, understanding the subtleties of alignment, and mastering the art of effective communication.",
    videoUrl: "",
  });
  await OurSchool.create(ourSchoolSeedData);

  console.log(
    "✅ Seeded founders, courses, batches, blogs, header settings, ayurveda section, retreat section, video section two, and school data."
  );
  process.exit(0);
};

run().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
