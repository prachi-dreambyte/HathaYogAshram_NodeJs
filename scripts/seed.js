const dotenv = require("dotenv");
const connectDB = require("../config/db");
const AboutFounderDetails = require("../models/AboutUs/AboutFounderDetailsModels");
const AboutFounderSection = require("../models/AboutUs/AboutFounderSection.Models");
const Course = require("../models/courses/CourseModel");
const CourseBatch = require("../models/courses/CourseBatchModel");
const CourseBooking = require("../models/courses/CourseBookingModel");

dotenv.config();

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
    {
      type: "link",
      url: "https://www.youtube.com/embed/v7AYKMP6rOE?controls=0&modestbranding=1",
    },
    {
      type: "link",
      url: "https://www.youtube.com/embed/sTANio_2E0Q?controls=0&modestbranding=1",
    },
    {
      type: "link",
      url: "https://www.youtube.com/embed/4pKly2JojMw?controls=0&modestbranding=1",
    },
    {
      type: "link",
      url: "https://www.youtube.com/embed/Nw-ksH2r6RY?controls=0&modestbranding=1",
    },
  ],
  lastHeading: "Ready to Transform Your Life?",
  lastParagraph:
    "Join thousands of students who have found their path through our teachings",
};

const courseSeedData = [
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
    content: {
      hero: {
        quoteText: "Transform Your Practice, Inspire Others, Become a Certified Yoga Teacher",
        title: "100 Hour Yoga Teacher Training in Rishikesh, India",
        breadcrumbLabel: "100 Hour YTTC",
        bannerImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1600&fit=crop",
      },
      overview: {
        tag: "Course Overview",
        title: "A Comprehensive, Residential Program Designed for Beginners and Practitioners",
        description:
          "The 100 Hour Yoga Teacher Training Course is your gateway to authentic yoga practice in the birthplace of yoga. This transformative journey in Rishikesh combines traditional teachings with modern methodology, covering essential aspects of yoga philosophy, anatomy, pranayama, meditation, and asanas.",
      },
      infoCards: [
        {
          title: "Duration",
          tag: "12-14 Days",
          detail: "📅 12-14 Days intensive residential program",
          icon: "📅",
        },
        {
          title: "Level",
          tag: "Beginner to Intermediate",
          detail: "📊 Suitable for all levels of practitioners",
          icon: "📊",
        },
        {
          title: "Certification",
          tag: "Step to RYT-200",
          detail: "🏆 Internationally recognized certificate",
          icon: "🏆",
        },
        {
          title: "Location",
          tag: "Rishikesh, India",
          detail: "📍 Yoga capital of the world",
          icon: "📍",
        },
      ],
      whyRishikesh: {
        tag: "Why Rishikesh?",
        title: "Discover the Magic of Learning Yoga in Its Birthplace",
        description:
          "Rishikesh is the yoga capital of the world, home to authentic yoga schools and ancient wisdom.",
        items: [
          {
            icon: "🏔️",
            title: "Birthplace of Yoga",
            description:
              "Rishikesh is the yoga capital of the world, home to authentic yoga schools and ancient wisdom.",
          },
          {
            icon: "🕉️",
            title: "Divine Energy",
            description:
              "Located in the Himalayas with the holy Ganges flowing through, creating awe-inspiring spiritual energy.",
          },
          {
            icon: "🧘‍♂️",
            title: "Authentic Learning",
            description:
              "Learn from experienced masters who carry forward the traditional Himalayan yoga lineage.",
          },
          {
            icon: "🌿",
            title: "Natural Setting",
            description:
              "Peaceful environment surrounded by mountains and nature, perfect for deep yoga practice.",
          },
        ],
      },
      curriculum: {
        tag: "What You'll Learn",
        title: "Comprehensive Curriculum Covering All Aspects of Yoga",
        items: [
          {
            category: "Hatha Yog",
            items: [
              "140+ traditional asanas",
              "Surya & Chandra Namaskar",
              "Standing, sitting, prone & supine postures",
              "Balancing & twisting postures",
            ],
          },
          {
            category: "Ashtanga Vinyasa",
            items: [
              "Primary series practice",
              "Sun salutations A & B",
              "Standing & sitting sequences",
              "Finishing postures",
            ],
          },
          {
            category: "Pranayama",
            items: [
              "Nadishodhana",
              "Kapalbhati",
              "Bhastrika",
              "Ujjayi, Bhramari, Sheetali",
            ],
          },
          {
            category: "Meditation",
            items: [
              "Himalayan meditation",
              "Breath awareness",
              "Mantra meditation",
              "Yoga Nidra",
            ],
          },
          {
            category: "Philosophy",
            items: [
              "Yoga Sutras of Patanjali",
              "8 limbs of Yoga",
              "Bhagavad Gita wisdom",
              "Chakras & Nadis",
            ],
          },
          {
            category: "Anatomy",
            items: [
              "Skeletal & muscular system",
              "Respiratory & circulatory system",
              "Alignment principles",
              "Injury prevention",
            ],
          },
        ],
      },
      dailySchedule: {
        tag: "Daily Schedule",
        title: "A Typical Day in Your Yoga Teacher Training Journey",
        items: [
          { time: "6:00 AM", activity: "Morning Tea" },
          { time: "6:30 AM", activity: "Pranayama & Meditation" },
          { time: "8:00 AM", activity: "Hatha Yog Asana Practice" },
          { time: "10:00 AM", activity: "Breakfast" },
          { time: "11:00 AM", activity: "Yoga Philosophy & Ancient Texts" },
          { time: "12:30 PM", activity: "Anatomy & Alignment" },
          { time: "1:30 PM", activity: "Lunch" },
          { time: "3:00 PM", activity: "Ashtanga Vinyasa Practice" },
          { time: "5:00 PM", activity: "Teaching Methodology" },
          { time: "6:30 PM", activity: "Dinner" },
          { time: "7:30 PM", activity: "Satsang / Self Study / Kirtan" },
        ],
      },
      features: {
        tag: "Course Features",
        title: "Everything You Need for a Transformative Yoga Journey",
        items: [
          { icon: "🧘", title: "Expert Teachers", desc: "15-30+ years of experience in traditional yoga" },
          { icon: "🏔️", title: "Rishikesh Setting", desc: "Yoga capital of the world" },
          { icon: "📜", title: "Yoga Alliance", desc: "Internationally certified courses" },
          { icon: "🌿", title: "Organic Meals", desc: "Nutritious sattvic vegetarian food" },
          { icon: "🏠", title: "Accommodation", desc: "Comfortable & clean rooms with modern facilities" },
          { icon: "🧘‍♀️", title: "Small Groups", desc: "Personal attention guaranteed" },
          { icon: "📚", title: "Comprehensive Curriculum", desc: "100+ yoga postures and techniques" },
          { icon: "🎓", title: "Certification", desc: "Step towards 200hr RYT certification" },
        ],
      },
      included: {
        tag: "What's Included",
        title: "Everything You Need for a Comfortable Stay and Learning Experience",
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
      },
      testimonials: {
        tag: "What Our Students Say",
        title: "Hear from Those Who Experienced the Transformation",
        items: [
          {
            name: "Sarah Johnson",
            country: "USA",
            text:
              "This course transformed my life. The teachers are incredibly knowledgeable, and the setting in Rishikesh is magical. I left feeling confident and prepared to continue my yoga journey.",
          },
          {
            name: "Michael Chen",
            country: "Canada",
            text:
              "The perfect introduction to yoga teacher training. Small class sizes meant I got personal attention, and the curriculum was comprehensive yet accessible for beginners.",
          },
          {
            name: "Emma Williams",
            country: "UK",
            text:
              "The spiritual atmosphere of Rishikesh combined with expert teaching made this an unforgettable experience. The daily practice by the Ganges was life-changing.",
          },
        ],
      },
      faqs: {
        tag: "Frequently Asked Questions",
        title: "Get Answers to Common Questions",
        items: [
          {
            q: "Which airport should I fly to?",
            a: "The closest airport is New Delhi (DEL). From there, you can take a domestic flight to Dehradun (DED) which is 30 minutes from Rishikesh, or travel by taxi/bus (6-7 hours).",
          },
          {
            q: "Do I need prior yoga experience?",
            a: "No prior experience is required. The course is designed for beginners and those looking to deepen their practice. At least 6 months of practice is recommended but not mandatory.",
          },
          {
            q: "Will I get certification?",
            a: "You will receive a 100-hour certificate. To become a certified yoga teacher (RYT-200), you need to complete the remaining 100 hours within one year at the same school.",
          },
          {
            q: "What is included in the course fee?",
            a: "Accommodation, 3 meals daily, course materials, excursions, WiFi, and airport pickup from Dehradun are all included. AC/heater may cost extra.",
          },
          {
            q: "Is the food suitable for special diets?",
            a: "Yes! We provide vegetarian, vegan, and gluten-free options. Please inform us of any allergies or dietary requirements in advance.",
          },
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
  },
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
  },
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
  },
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
    legacyPath: "/Vedic-Mantra-Chanting",
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

  const price100 = {
    shared: "$449",
    sharedOld: "$599",
    private: "$599",
    privateOld: "$799",
  };

  addBatch("100-hour-yttc", "2026-04-01", "2026-04-12", 0, price100, "Fully Booked");
  addBatch("100-hour-yttc", "2026-05-01", "2026-05-12", 0, price100, "Waiting List");
  addBatch("100-hour-yttc", "2026-06-01", "2026-06-12", 3, price100);
  addBatch("100-hour-yttc", "2026-07-01", "2026-07-12", 6, price100);
  addBatch("100-hour-yttc", "2026-08-01", "2026-08-12", 6, price100);
  addBatch("100-hour-yttc", "2026-09-01", "2026-09-12", 5, price100);

  addBatch("200-hour-yttc", "2026-06-05", "2026-06-28", 12, {
    shared: "$980",
    sharedOld: "$1200",
    private: "$1270",
    privateOld: "$1450",
  });
  addBatch("300-hour-yttc", "2026-07-05", "2026-08-01", 8, {
    shared: "$1150",
    sharedOld: "$1350",
    private: "$1480",
    privateOld: "$1650",
  });
  addBatch("500-hour-yttc", "2026-08-05", "2026-09-30", 10, {
    shared: "$1900",
    sharedOld: "$2100",
    private: "$2350",
    privateOld: "$2500",
  });

  addBatch("kundalini-100", "2026-05-02", "2026-05-15", 10, {
    shared: "$599",
    sharedOld: "$699",
    private: "$749",
    privateOld: "$849",
  });
  addBatch("kundalini-200", "2026-06-02", "2026-06-25", 8, {
    shared: "$980",
    sharedOld: "$1150",
    private: "$1199",
    privateOld: "$1350",
  });
  addBatch("kundalini-300", "2026-07-02", "2026-07-30", 6, {
    shared: "$1150",
    sharedOld: "$1299",
    private: "$1399",
    privateOld: "$1550",
  });

  addBatch("retreat-5-days", "2026-04-10", "2026-04-14", 20, {
    shared: "₹15,500 ($180)",
    private: "₹22,500 ($261)",
  });
  addBatch("retreat-10-days", "2026-05-10", "2026-05-19", 16, {
    shared: "₹31,000 ($359)",
    private: "₹40,000 ($464)",
  });
  addBatch("retreat-20-days", "2026-06-10", "2026-06-29", 12, {
    shared: "₹64,000 ($742)",
    private: "₹85,000 ($985)",
  });

  addBatch("yin-yoga", "2026-05-20", "2026-05-27", 14, {
    shared: "$89.99",
    private: "$99.99",
  });
  addBatch("vedic-mantra", "2026-06-10", "2026-06-16", 9, {
    shared: "$64.99",
    private: "$79.99",
  });
  addBatch("meditation", "2026-07-05", "2026-07-11", 6, {
    shared: "$114.99",
    private: "$129.99",
  });
  addBatch("pranayama", "2026-08-02", "2026-08-08", 11, {
    shared: "$84.99",
    private: "$99.99",
  });
  addBatch("ayurveda", "2026-09-02", "2026-09-08", 11, {
    shared: "$100.99",
    private: "$120.99",
  });
  addBatch("online-courses", "2026-04-01", "2026-04-30", 20, {
    shared: "$99.99",
    private: "$99.99",
  });

  addBatch("ayurveda-5-days", "2026-04-12", "2026-04-16", 15, {
    shared: "$299",
    private: "$349",
  });
  addBatch("ayurveda-10-days", "2026-05-12", "2026-05-21", 12, {
    shared: "$649",
    private: "$699",
  });
  addBatch("ayurveda-15-days", "2026-06-12", "2026-06-26", 10, {
    shared: "$950",
    private: "$1100",
  });

  return batches;
};

const run = async () => {
  await connectDB();

  await AboutFounderDetails.deleteMany();
  await AboutFounderSection.deleteMany();
  await AboutFounderDetails.insertMany(founders);
  await AboutFounderSection.create(section);

  await CourseBooking.deleteMany();
  await CourseBatch.deleteMany();
  await Course.deleteMany();

  const createdCourses = await Course.insertMany(courseSeedData);
  const courseMap = createdCourses.reduce((acc, course) => {
    acc[course.slug] = course;
    return acc;
  }, {});

  const batches = buildBatches(courseMap);
  if (batches.length) {
    await CourseBatch.insertMany(batches);
  }

  console.log("Seeded About Founder data and Courses data.");
  process.exit(0);
};

run().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
