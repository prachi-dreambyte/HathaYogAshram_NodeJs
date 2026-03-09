const dotenv = require("dotenv");
const connectDB = require("../config/db");
const AboutFounderDetails = require("../models/AboutUs/AboutFounderDetailsModels");
const AboutFounderSection = require("../models/AboutUs/AboutFounderSection.Models");

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

const run = async () => {
  await connectDB();
  await AboutFounderDetails.deleteMany();
  await AboutFounderSection.deleteMany();

  await AboutFounderDetails.insertMany(founders);
  await AboutFounderSection.create(section);

  console.log("Seeded About Founder data.");
  process.exit(0);
};

run().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
