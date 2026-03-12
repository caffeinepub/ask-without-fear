import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useSendTeacherMessage, useSubmitDoubt } from "@/hooks/useQueries";
import {
  Award,
  BookOpen,
  Brain,
  CheckCircle2,
  Clock,
  Eye,
  Globe,
  HandHeart,
  Heart,
  Lightbulb,
  Loader2,
  Menu,
  MessageCircle,
  Mic,
  Pause,
  Pencil,
  Search,
  Shield,
  Smile,
  Sparkles,
  Star,
  ThumbsUp,
  Trophy,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Why We Fear", href: "#fears" },
  { label: "Solutions", href: "#solutions" },
  { label: "Tips", href: "#tips" },
  { label: "Teachers", href: "#teachers" },
  { label: "Meet Teachers", href: "#teacher-directory" },
  { label: "Explain", href: "#explain" },
  { label: "Ask", href: "#form" },
];

const FEAR_CARDS = [
  {
    icon: Brain,
    title: "Fear of Looking Stupid",
    description:
      "Many students worry that asking a basic question will make peers think they're not smart. But every expert once asked the same 'basic' question.",
    color: "bg-sunshine/20 text-sunshine",
    border: "border-sunshine",
  },
  {
    icon: Users,
    title: "Peer Pressure & Judgment",
    description:
      "The classroom can feel like a stage. Students fear being laughed at or judged by classmates, so they stay silent to fit in.",
    color: "bg-skyblue/20 text-skyblue",
    border: "border-skyblue",
  },
  {
    icon: Mic,
    title: "Fear of Public Speaking",
    description:
      "Even one sentence spoken aloud can feel terrifying for students with social anxiety or shyness. Speaking up takes real courage.",
    color: "bg-coral/20 text-coral",
    border: "border-coral",
  },
  {
    icon: Clock,
    title: "Past Negative Experiences",
    description:
      "A single dismissive response from a teacher or laughter from the class can leave a lasting impact that stops future questions.",
    color: "bg-mint/20 text-mint",
    border: "border-mint",
  },
  {
    icon: Globe,
    title: "Language Barriers",
    description:
      "Students who aren't fluent in the instruction language struggle to phrase questions correctly, leading to self-censorship.",
    color: "bg-lavender/20 text-lavender",
    border: "border-lavender",
  },
  {
    icon: Shield,
    title: "Teacher Intimidation",
    description:
      "Strict or unapproachable teachers can create an environment where students feel too nervous to speak up, even when completely lost.",
    color: "bg-sunshine/20 text-sunshine",
    border: "border-sunshine",
  },
];

const SOLUTIONS = [
  {
    icon: MessageCircle,
    title: "Anonymous Question Boxes",
    description:
      "Physical or digital boxes where students can drop questions without revealing their identity. Zero judgment, maximum learning.",
    color: "bg-sunshine",
    textColor: "text-primary-foreground",
  },
  {
    icon: Users,
    title: "Buddy System Learning",
    description:
      "Pair students together so they can discuss doubts with a peer first. Asking one person feels much safer than asking the whole class.",
    color: "bg-skyblue",
    textColor: "text-secondary-foreground",
  },
  {
    icon: Heart,
    title: "Nurturing Classroom Culture",
    description:
      'Teachers who model curiosity, celebrate questions, and explicitly say "no question is stupid" transform classroom dynamics.',
    color: "bg-coral",
    textColor: "text-white",
  },
  {
    icon: Star,
    title: "Reward Curiosity",
    description:
      "Systems that give points, shoutouts, or badges for asking questions reframe questioning as a strength, not a weakness.",
    color: "bg-mint",
    textColor: "text-white",
  },
  {
    icon: Lightbulb,
    title: "Growth Mindset Programs",
    description:
      "Teach students that the brain grows when it struggles. Not knowing something yet is the starting line, not the finish.",
    color: "bg-lavender",
    textColor: "text-white",
  },
  {
    icon: Smile,
    title: "Think-Pair-Share Activities",
    description:
      "Students discuss with a partner before sharing with the class. This builds confidence and refines thinking before going public.",
    color: "bg-sunshine",
    textColor: "text-primary-foreground",
  },
];

const STUDENT_TIPS = [
  {
    number: "01",
    icon: Pencil,
    title: "Write It Down First",
    description:
      "Keep a small notebook or use your phone to jot down confusing points. Writing clarifies your thinking and gives you something concrete to ask.",
    accent: "text-sunshine",
  },
  {
    number: "02",
    icon: Star,
    title: "Start Small",
    description:
      "Ask one simple question after class or in a small group setting. Each small act of courage makes the next one easier.",
    accent: "text-skyblue",
  },
  {
    number: "03",
    icon: Mic,
    title: 'Use "I\'m Not Sure If..." Framing',
    description:
      "Say \"I'm not sure if I understand this correctly...\" — this framing shows you're thinking critically, not just confused.",
    accent: "text-coral",
  },
  {
    number: "04",
    icon: BookOpen,
    title: "Ask After Class",
    description:
      "Approach the teacher one-on-one after the lesson. It's less intimidating and teachers appreciate the initiative.",
    accent: "text-mint",
  },
  {
    number: "05",
    icon: Globe,
    title: "Use Online Resources First",
    description:
      'Try searching your question online first. Coming to class with "I found this but I still don\'t understand X" shows real effort.',
    accent: "text-lavender",
  },
  {
    number: "06",
    icon: Trophy,
    title: "Remember Everyone Started Here",
    description:
      "Your teacher, your favorite scientist, every expert — they all had moments of complete confusion. Confusion is the beginning of understanding.",
    accent: "text-sunshine",
  },
];

const TEACHER_TIPS = [
  {
    icon: Shield,
    title: "Create Psychological Safety",
    description:
      'Explicitly tell your class on day one: "In this room, all questions are welcome. There is no such thing as a stupid question." Mean it. Repeat it.',
    color: "border-sunshine bg-sunshine/10",
    accent: "text-sunshine",
  },
  {
    icon: ThumbsUp,
    title: "Never Mock or Dismiss",
    description:
      'A sigh, a smirk, or "we covered that already" can silence a student forever. Treat every question as a gift — because it is.',
    color: "border-skyblue bg-skyblue/10",
    accent: "text-skyblue",
  },
  {
    icon: HandHeart,
    title: "Use Think-Pair-Share",
    description:
      "Give students 60 seconds to discuss with a neighbor before cold-calling. This lowers the stakes and improves answer quality dramatically.",
    color: "border-coral bg-coral/10",
    accent: "text-coral",
  },
  {
    icon: Pause,
    title: "Give Wait Time",
    description:
      "After asking a question, wait at least 5–10 seconds before calling on someone. Silence is not failure — it's thinking happening.",
    color: "border-mint bg-mint/10",
    accent: "text-mint",
  },
  {
    icon: Award,
    title: "Praise Question-Askers Publicly",
    description:
      '"That\'s a brilliant question!" or "I\'m so glad you asked that" — public praise for questions sets the tone for the whole room.',
    color: "border-lavender bg-lavender/10",
    accent: "text-lavender",
  },
  {
    icon: Eye,
    title: 'Model "I Don\'t Know"',
    description:
      "When you don't know something, say so and look it up together. Normalizing not-knowing is the most powerful lesson you can teach.",
    color: "border-sunshine bg-sunshine/10",
    accent: "text-sunshine",
  },
];

const TEACHERS = [
  {
    name: "Ms. Priya Sharma",
    subject: "Mathematics",
    bio: "10 years experience. Makes complex problems simple and relatable for every student.",
    emoji: "📐",
    badgeColor: "bg-sunshine/20 text-yellow-700",
    borderColor: "border-yellow-200",
    bgColor: "bg-yellow-50",
  },
  {
    name: "Mr. Rahul Verma",
    subject: "Science",
    bio: "Loves experiments and visual explanations. Learning science is always an adventure.",
    emoji: "🔬",
    badgeColor: "bg-mint/20 text-green-700",
    borderColor: "border-green-200",
    bgColor: "bg-green-50",
  },
  {
    name: "Ms. Anita Rao",
    subject: "English",
    bio: "Passionate about grammar and creative writing. Every word matters in communication.",
    emoji: "📝",
    badgeColor: "bg-skyblue/20 text-blue-700",
    borderColor: "border-blue-200",
    bgColor: "bg-blue-50",
  },
  {
    name: "Mr. Suresh Kumar",
    subject: "History",
    bio: "Makes the past come alive with stories. History isn't boring when told right.",
    emoji: "🏛️",
    badgeColor: "bg-lavender/20 text-purple-700",
    borderColor: "border-purple-200",
    bgColor: "bg-purple-50",
  },
  {
    name: "Ms. Deepa Nair",
    subject: "Computer Science",
    bio: "Teaches coding with fun real-world projects. From HTML to AI — she covers it all.",
    emoji: "💻",
    badgeColor: "bg-violet-100 text-violet-700",
    borderColor: "border-violet-200",
    bgColor: "bg-violet-50",
  },
  {
    name: "Mr. Arun Singh",
    subject: "Computer Science",
    bio: "Expert in algorithms, AI, and web development. Makes complex tech concepts click.",
    emoji: "🤖",
    badgeColor: "bg-violet-100 text-violet-700",
    borderColor: "border-violet-200",
    bgColor: "bg-violet-50",
  },
];

const SUBJECTS = [
  "Math",
  "Science",
  "English",
  "History",
  "Computer Science",
  "Other",
];

const KNOWLEDGE_BASE = [
  {
    keywords: [
      "fraction",
      "fractions",
      "numerator",
      "denominator",
      "divide fraction",
    ],
    subject: "Math",
    subjectColor: "bg-sunshine/20 text-sunshine",
    question: "How do fractions work?",
    explanation:
      "A fraction shows a part of a whole. The top number (numerator) tells you how many parts you have, and the bottom number (denominator) tells you how many equal parts the whole is divided into. So 3/4 means you have 3 out of 4 equal pieces.",
    tip: "Try drawing a pizza divided into equal slices to visualize any fraction!",
  },
  {
    keywords: [
      "photosynthesis",
      "plant",
      "plants",
      "chlorophyll",
      "sunlight food",
    ],
    subject: "Science",
    subjectColor: "bg-mint/20 text-mint",
    question: "What is photosynthesis?",
    explanation:
      "Photosynthesis is how plants make their own food using sunlight. Plants absorb sunlight through their leaves, take in carbon dioxide from the air, and draw water from the soil. They combine these to make sugar (their food) and release oxygen — the air we breathe!",
    tip: "Remember: plants are the only living things that make their own food from sunlight.",
  },
  {
    keywords: ["gravity", "fall", "weight", "gravitational", "newton"],
    subject: "Science",
    subjectColor: "bg-mint/20 text-mint",
    question: "What is gravity?",
    explanation:
      "Gravity is the invisible force that pulls objects toward each other. The Earth's gravity pulls everything toward its center — that's why things fall down when you drop them. The bigger and heavier an object, the stronger its gravitational pull.",
    tip: "Isaac Newton discovered gravity when he observed an apple falling from a tree!",
  },
  {
    keywords: [
      "adjective",
      "noun",
      "verb",
      "adverb",
      "parts of speech",
      "grammar",
    ],
    subject: "English",
    subjectColor: "bg-skyblue/20 text-skyblue",
    question: "What are the parts of speech?",
    explanation:
      "Parts of speech are the building blocks of sentences. A noun names a person, place, or thing (dog, city). A verb shows action or state (run, is). An adjective describes a noun (big, red). An adverb describes a verb or adjective (quickly, very). Together they build every sentence you read or write.",
    tip: "Try labeling words in your favorite sentence to practice identifying parts of speech.",
  },
  {
    keywords: ["multiply", "multiplication", "times table", "times", "product"],
    subject: "Math",
    subjectColor: "bg-sunshine/20 text-sunshine",
    question: "How does multiplication work?",
    explanation:
      "Multiplication is just repeated addition. When you say 4 × 3, it means adding 4 three times: 4 + 4 + 4 = 12. The two numbers you multiply are called factors, and the answer is called the product. Times tables are a shortcut for doing this quickly.",
    tip: "Use skip-counting to learn your times tables — count by 4s: 4, 8, 12, 16...",
  },
  {
    keywords: ["cell", "cells", "nucleus", "membrane", "organism"],
    subject: "Science",
    subjectColor: "bg-mint/20 text-mint",
    question: "What is a cell?",
    explanation:
      "A cell is the smallest living unit that makes up all living things. Every plant, animal, and human is made of cells. Most cells have a nucleus (the control center), a membrane (the outer boundary), and cytoplasm (the jelly-like inside). Some living things like bacteria are made of just one cell!",
    tip: "Think of a cell like a tiny city — every part has a specific job to keep things running.",
  },
  {
    keywords: ["metaphor", "simile", "figurative", "like as", "comparison"],
    subject: "English",
    subjectColor: "bg-skyblue/20 text-skyblue",
    question: "What is the difference between a simile and a metaphor?",
    explanation:
      "Both are comparisons, but they work differently. A simile uses 'like' or 'as': 'Her smile is like sunshine.' A metaphor makes the comparison directly without those words: 'Her smile is sunshine.' Metaphors feel stronger and more poetic because they say something IS something else.",
    tip: "Simile = uses like/as. Metaphor = direct comparison. Both make writing more vivid!",
  },
  {
    keywords: [
      "world war",
      "ww1",
      "ww2",
      "world war 1",
      "world war 2",
      "war cause",
    ],
    subject: "History",
    subjectColor: "bg-lavender/20 text-lavender",
    question: "What caused World War I?",
    explanation:
      "World War I (1914–1918) was sparked by the assassination of Archduke Franz Ferdinand of Austria-Hungary. But the deeper causes were a tangle of military alliances, nationalism, imperial competition, and a massive military buildup in Europe. When one country was pulled into war, its allies followed — like dominoes falling.",
    tip: "Remember MAIN: Militarism, Alliances, Imperialism, Nationalism — the four causes of WWI.",
  },
  {
    keywords: ["area", "perimeter", "rectangle", "square", "shape measurement"],
    subject: "Math",
    subjectColor: "bg-sunshine/20 text-sunshine",
    question: "What is the difference between area and perimeter?",
    explanation:
      "Perimeter is the total distance around the outside edge of a shape — like fencing a yard. Area is the amount of space inside the shape — like the grass you'd need to cover the yard. For a rectangle: perimeter = 2×(length + width), area = length × width.",
    tip: "Perimeter = around the outside (think: parameter = boundary). Area = inside space.",
  },
  {
    keywords: ["atom", "electron", "proton", "neutron", "atomic", "element"],
    subject: "Science",
    subjectColor: "bg-mint/20 text-mint",
    question: "What is an atom?",
    explanation:
      "An atom is the smallest piece of an element that still has the properties of that element. Every atom has a nucleus in the center (made of protons and neutrons) surrounded by electrons orbiting outside. Protons are positively charged, electrons are negatively charged, and neutrons have no charge.",
    tip: "Think of an atom like a tiny solar system — the nucleus is the sun, electrons are the planets.",
  },
  {
    keywords: ["sentence", "paragraph", "essay", "writing", "topic sentence"],
    subject: "English",
    subjectColor: "bg-skyblue/20 text-skyblue",
    question: "How do I write a good paragraph?",
    explanation:
      "A good paragraph has three parts: a topic sentence that states the main idea, body sentences that explain and support that idea with details or examples, and a concluding sentence that wraps it up. Every sentence in the paragraph should relate to the topic sentence — if it doesn't, it belongs in a different paragraph.",
    tip: "Ask yourself: does every sentence support my topic sentence? If not, it shouldn't be there.",
  },
  {
    keywords: ["democracy", "government", "voting", "election", "parliament"],
    subject: "History",
    subjectColor: "bg-lavender/20 text-lavender",
    question: "What is democracy?",
    explanation:
      "Democracy is a system of government where the people hold power, usually by voting for representatives who make decisions on their behalf. The word comes from the Greek 'demos' (people) and 'kratos' (power). Key features include free elections, freedom of speech, and protection of individual rights.",
    tip: "Ancient Athens in Greece is considered the birthplace of democracy, over 2,500 years ago.",
  },
  {
    keywords: [
      "decimal",
      "percentage",
      "percent",
      "convert decimal",
      "percent to decimal",
    ],
    subject: "Math",
    subjectColor: "bg-sunshine/20 text-sunshine",
    question: "How do I convert between decimals and percentages?",
    explanation:
      "A percentage is just a fraction out of 100. To convert a decimal to a percentage, multiply by 100 (move the decimal point two places right): 0.75 → 75%. To go the other way, divide by 100: 85% → 0.85. That's all there is to it!",
    tip: "Per-cent literally means 'per hundred' — 75% means 75 out of every 100.",
  },
  {
    keywords: ["ecosystem", "habitat", "food chain", "predator", "prey"],
    subject: "Science",
    subjectColor: "bg-mint/20 text-mint",
    question: "What is a food chain?",
    explanation:
      "A food chain shows who eats whom in nature. It starts with producers (plants) that make energy from sunlight, then primary consumers (herbivores) that eat plants, then secondary consumers (carnivores) that eat herbivores. Energy flows from one level to the next, but some is lost at each step.",
    tip: "Arrows in a food chain point from the eaten to the eater — they show where energy flows.",
  },
  {
    keywords: [
      "pronoun",
      "he she they",
      "pronoun reference",
      "subject pronoun",
    ],
    subject: "English",
    subjectColor: "bg-skyblue/20 text-skyblue",
    question: "What is a pronoun?",
    explanation:
      "A pronoun is a word that replaces a noun so you don't have to keep repeating it. Instead of saying 'Maria went to the store. Maria bought milk,' you say 'Maria went to the store. She bought milk.' Common pronouns include I, you, he, she, it, we, they, me, him, her, us, them.",
    tip: "Pronouns must match the noun they replace in number (singular/plural) and gender.",
  },
  // Computer Science entries
  {
    keywords: [
      "variable",
      "variables",
      "data type",
      "integer",
      "string",
      "boolean",
      "declare",
    ],
    subject: "Computer Science",
    subjectColor: "bg-violet-100 text-violet-600",
    question: "What are variables and data types?",
    explanation:
      "A variable is like a labelled box that stores information in a program. You give it a name and store a value inside. Data types tell the computer what kind of value is stored — a number (integer), decimal (float), text (string), or true/false (boolean). For example: age = 15 stores the number 15 in a box called 'age'.",
    tip: "Think of variables as named containers — the data type tells the computer how much space to reserve.",
  },
  {
    keywords: [
      "loop",
      "for loop",
      "while loop",
      "repeat",
      "iteration",
      "iterate",
    ],
    subject: "Computer Science",
    subjectColor: "bg-violet-100 text-violet-600",
    question: "What are loops in programming?",
    explanation:
      "A loop is a way to repeat a block of code multiple times without writing it over and over. A 'for loop' repeats a set number of times (e.g., print numbers 1 to 10). A 'while loop' keeps repeating as long as a condition is true. Loops save time and make programs much shorter and smarter.",
    tip: "Loops are everywhere! When Instagram loads more posts as you scroll, that's a loop working.",
  },
  {
    keywords: [
      "algorithm",
      "algorithms",
      "step by step",
      "recipe",
      "instructions",
    ],
    subject: "Computer Science",
    subjectColor: "bg-violet-100 text-violet-600",
    question: "What is an algorithm?",
    explanation:
      "An algorithm is a set of step-by-step instructions to solve a problem or complete a task. It's like a recipe — follow the steps in order and you get the result. Computers follow algorithms to do everything from sorting a list to recommending a YouTube video. Good algorithms are clear, ordered, and have a definite end.",
    tip: "You follow algorithms every day! Getting ready for school is an algorithm: wake up → brush teeth → get dressed → eat → leave.",
  },
  {
    keywords: [
      "internet",
      "how internet works",
      "network",
      "wifi",
      "web",
      "online",
    ],
    subject: "Computer Science",
    subjectColor: "bg-violet-100 text-violet-600",
    question: "How does the internet work?",
    explanation:
      "The internet is a global network of computers connected together. When you visit a website, your computer sends a request to a server (another computer) that stores that website. The server sends the data back in small packets, and your browser puts them together to display the page. This all happens in milliseconds!",
    tip: "The internet is not in space — most of it travels through undersea fiber-optic cables connecting continents.",
  },
  {
    keywords: ["binary", "binary numbers", "bits", "0 and 1", "base 2"],
    subject: "Computer Science",
    subjectColor: "bg-violet-100 text-violet-600",
    question: "What are binary numbers?",
    explanation:
      "Binary is the number system computers use, with only two digits: 0 and 1. Every piece of data — text, images, videos — is stored as a series of 0s and 1s (called bits). The number 5 in binary is 101. Computers use binary because electronic circuits have two states: off (0) and on (1).",
    tip: "A single bit is a 0 or 1. Eight bits = 1 byte. A typical photo is about 5 million bytes (5 MB)!",
  },
  {
    keywords: [
      "debugging",
      "debug",
      "bug",
      "error",
      "fix code",
      "syntax error",
    ],
    subject: "Computer Science",
    subjectColor: "bg-violet-100 text-violet-600",
    question: "What is debugging?",
    explanation:
      "Debugging is the process of finding and fixing errors (bugs) in your code. When a program doesn't work as expected, you look through the code step by step to find where things go wrong. Common bugs include typos, wrong logic, and missing punctuation. Every programmer debugs — even professional ones!",
    tip: "The term 'bug' came from 1947 when a moth was found stuck in a computer relay causing errors!",
  },
  {
    keywords: [
      "function",
      "functions",
      "method",
      "def",
      "reusable code",
      "procedure",
    ],
    subject: "Computer Science",
    subjectColor: "bg-violet-100 text-violet-600",
    question: "What are functions in programming?",
    explanation:
      "A function is a reusable block of code that performs a specific task. Instead of writing the same code many times, you write it once as a function and call it whenever you need it. Functions take inputs (parameters) and can return an output. For example, a function 'add(a, b)' takes two numbers and returns their sum.",
    tip: "Functions are like appliances — you plug in (input), it does the job, and gives you a result (output).",
  },
  {
    keywords: ["html", "tag", "webpage", "markup", "heading", "paragraph html"],
    subject: "Computer Science",
    subjectColor: "bg-violet-100 text-violet-600",
    question: "What is HTML?",
    explanation:
      "HTML (HyperText Markup Language) is the code used to build web pages. It uses tags — special labels in angle brackets — to structure content. For example, <h1> creates a big heading, <p> creates a paragraph, and <img> inserts an image. Every website you visit is built with HTML at its foundation.",
    tip: "Right-click any webpage and select 'View Page Source' to see the actual HTML code behind it!",
  },
  {
    keywords: [
      "database",
      "sql",
      "data storage",
      "table",
      "rows columns",
      "record",
    ],
    subject: "Computer Science",
    subjectColor: "bg-violet-100 text-violet-600",
    question: "What is a database?",
    explanation:
      "A database is an organized collection of information stored so it can be easily accessed, managed, and updated. Think of it like a super-powered spreadsheet. Databases store data in tables (rows and columns). SQL (Structured Query Language) is used to ask questions of a database — like searching for all students with marks above 80.",
    tip: "Every app you use — Instagram, Spotify, WhatsApp — stores your data in a database.",
  },
  {
    keywords: [
      "artificial intelligence",
      "ai",
      "machine learning",
      "neural network",
      "deep learning",
    ],
    subject: "Computer Science",
    subjectColor: "bg-violet-100 text-violet-600",
    question: "What is artificial intelligence (AI)?",
    explanation:
      "Artificial Intelligence (AI) is the ability of computers to perform tasks that normally require human intelligence — like recognizing faces, understanding speech, or making recommendations. Machine learning is a type of AI where the computer learns from data (examples) rather than being given strict rules. The more data it sees, the better it gets.",
    tip: "When Netflix suggests a movie you like, that's AI at work — it learned your preferences from what you watched!",
  },
];

function matchQuestion(input: string) {
  if (!input.trim()) return null;
  const lower = input.toLowerCase();
  let best: (typeof KNOWLEDGE_BASE)[0] | null = null;
  let bestScore = 0;
  for (const entry of KNOWLEDGE_BASE) {
    const score = entry.keywords.filter((kw) => lower.includes(kw)).length;
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }
  return bestScore > 0 ? best : null;
}

function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border shadow-xs">
      <div className="container flex items-center justify-between h-16">
        <a
          href="#home"
          className="flex items-center gap-2 font-display font-bold text-xl text-foreground"
          data-ocid="nav.link"
        >
          <span className="text-2xl">✋</span>
          <span>
            Ask <span className="text-sunshine">Without</span> Fear
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              data-ocid="nav.link"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#form"
            className="ml-2 px-4 py-2 rounded-xl bg-sunshine text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
            data-ocid="nav.primary_button"
          >
            Ask Now ✨
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          type="button"
          data-ocid="nav.toggle"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-border bg-white"
          >
            <nav className="container py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
                  onClick={() => setOpen(false)}
                  data-ocid="nav.link"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function HeroSection() {
  return (
    <section
      id="home"
      className="relative overflow-hidden py-16 md:py-24"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.97 0.04 90) 0%, oklch(0.96 0.03 220) 50%, oklch(0.97 0.03 0) 100%)",
      }}
      data-ocid="hero.section"
    >
      {/* Decorative blobs */}
      <div
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(circle, oklch(0.88 0.19 90), transparent)",
        }}
      />
      <div
        className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, oklch(0.70 0.16 220), transparent)",
        }}
      />

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sunshine/30 text-primary-foreground font-semibold text-sm mb-6">
              <Sparkles size={14} />
              Student Awareness Initiative
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-black text-foreground leading-[1.05] mb-6">
              Ask{" "}
              <span
                className="inline-block"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.72 0.20 28), oklch(0.85 0.17 88))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Without
              </span>
              <br />
              <span className="text-skyblue">Fear</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-lg">
              Every question you hold back is a lesson you miss.{" "}
              <strong className="text-foreground">
                Your doubts deserve answers.
              </strong>{" "}
              Let's build a classroom where every hand can go up.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#fears"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-sunshine text-primary-foreground font-bold text-base hover:opacity-90 transition-opacity shadow-warm"
                data-ocid="hero.primary_button"
              >
                Learn Why ✋
              </a>
              <a
                href="#explain"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-skyblue text-secondary-foreground font-bold text-base hover:opacity-90 transition-opacity shadow-blue"
                data-ocid="hero.secondary_button"
              >
                Get an Explanation 💡
              </a>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-6 mt-10 pt-8 border-t border-border">
              {[
                {
                  value: "1 in 3",
                  label: "students never ask a doubt in class",
                },
                {
                  value: "78%",
                  label: "wish their teachers were more approachable",
                },
                { value: "0", label: "stupid questions — ever" },
              ].map((stat) => (
                <div key={stat.value}>
                  <div className="font-display text-2xl font-black text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground max-w-[140px]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="flex justify-center"
          >
            <div className="relative max-w-md w-full">
              <img
                src="/assets/generated/hero-ask-without-fear.dim_800x500.png"
                alt="Students confidently raising hands in a classroom"
                className="w-full rounded-3xl shadow-float"
              />
              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="absolute -top-4 -left-4 bg-white rounded-2xl px-3 py-2 shadow-float text-sm font-bold flex items-center gap-2"
              >
                <span>💡</span> Great question!
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute -bottom-4 -right-4 bg-sunshine rounded-2xl px-3 py-2 shadow-warm text-sm font-bold flex items-center gap-2 text-primary-foreground"
              >
                <span>🙋</span> You can ask!
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FearsSection() {
  return (
    <section id="fears" className="py-20 bg-white" data-ocid="fears.section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-coral/20 text-coral font-semibold text-sm mb-4">
            🤫 Understanding the Problem
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-black text-foreground mb-4">
            Why Do We Stay Silent?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            You're not alone. These are the real reasons students hold back
            their questions — and understanding them is the first step to
            overcoming them.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEAR_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              data-ocid={`fears.item.${i + 1}`}
            >
              <div
                className={`h-full rounded-2xl border-2 ${card.border} p-6 hover:shadow-card transition-all duration-300 hover:-translate-y-1`}
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${card.color} mb-4`}
                >
                  <card.icon size={22} />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2">
                  {card.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionsSection() {
  return (
    <section
      id="solutions"
      className="py-20"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.97 0.03 88) 0%, oklch(0.96 0.03 220) 100%)",
      }}
      data-ocid="solutions.section"
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-mint/20 text-mint font-semibold text-sm mb-4">
            🌱 Making Things Better
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-black text-foreground mb-4">
            Breaking the Silence
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real, proven strategies that transform classrooms from silent spaces
            into vibrant conversations.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOLUTIONS.map((sol, i) => (
            <motion.div
              key={sol.title}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              data-ocid={`solutions.item.${i + 1}`}
            >
              <div className="h-full bg-white rounded-2xl p-6 shadow-card hover:shadow-float transition-all duration-300 hover:-translate-y-1">
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${sol.color} mb-4`}
                >
                  <sol.icon size={24} className={sol.textColor} />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2">
                  {sol.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {sol.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TipsSection() {
  return (
    <section id="tips" className="py-20 bg-white" data-ocid="tips.section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-skyblue/20 text-skyblue font-semibold text-sm mb-4">
            💪 For Students
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-black text-foreground mb-4">
            You've Got This!
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Six practical, proven tips that make asking questions feel less
            scary and more natural.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STUDENT_TIPS.map((tip, i) => (
            <motion.div
              key={tip.number}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              data-ocid={`tips.item.${i + 1}`}
            >
              <div className="h-full rounded-2xl border border-border bg-white p-6 hover:shadow-card transition-all duration-300 hover:-translate-y-1 group">
                <div className="flex items-start gap-4">
                  <div
                    className={`font-display text-4xl font-black ${tip.accent} opacity-25 leading-none group-hover:opacity-60 transition-opacity`}
                  >
                    {tip.number}
                  </div>
                  <div className="flex-1">
                    <div
                      className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${tip.accent} bg-muted mb-3`}
                    >
                      <tip.icon size={18} />
                    </div>
                    <h3 className="font-display font-bold text-base text-foreground mb-1">
                      {tip.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {tip.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeachersSection() {
  return (
    <section
      id="teachers"
      className="py-20"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.97 0.03 305) 0%, oklch(0.97 0.03 155) 100%)",
      }}
      data-ocid="teachers.section"
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lavender/20 text-lavender font-semibold text-sm mb-4">
            🏫 Educator Corner
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-black text-foreground mb-4">
            Dear Teachers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            You have immense power to shape whether a student ever asks a
            question again. Here's how to use it for good.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEACHER_TIPS.map((tip, i) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              data-ocid={`teachers.item.${i + 1}`}
            >
              <div
                className={`h-full rounded-2xl border-2 ${tip.color} p-6 hover:shadow-card transition-all duration-300 hover:-translate-y-1`}
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white mb-4 ${tip.accent}`}
                >
                  <tip.icon size={22} />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2">
                  {tip.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {tip.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 rounded-3xl bg-white p-8 md:p-10 shadow-card text-center"
        >
          <div className="text-4xl mb-4">💬</div>
          <blockquote className="font-display text-2xl md:text-3xl font-black text-foreground mb-4 max-w-3xl mx-auto">
            "The art of teaching is the art of assisting discovery."
          </blockquote>
          <p className="text-muted-foreground font-medium">— Mark Van Doren</p>
        </motion.div>
      </div>
    </section>
  );
}

function TeacherCard({
  teacher,
  index,
}: {
  teacher: (typeof TEACHERS)[0];
  index: number;
}) {
  const [formOpen, setFormOpen] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [doubt, setDoubt] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { mutate, isPending, isError } = useSendTeacherMessage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !doubt.trim()) return;
    mutate(
      { teacherName: teacher.name, studentName, message: doubt },
      {
        onSuccess: () => {
          setSubmitted(true);
          setStudentName("");
          setDoubt("");
        },
      },
    );
  };

  const handleClose = () => {
    setFormOpen(false);
    setSubmitted(false);
    setStudentName("");
    setDoubt("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      data-ocid={`teacher_dir.item.${index + 1}`}
    >
      <div
        className={`h-full rounded-2xl border-2 ${teacher.borderColor} ${teacher.bgColor} p-6 hover:shadow-card transition-all duration-300 flex flex-col`}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl shrink-0">
            {teacher.emoji}
          </div>
          <div>
            <h3 className="font-display font-bold text-base text-foreground leading-tight">
              {teacher.name}
            </h3>
            <span
              className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mt-1 ${teacher.badgeColor}`}
            >
              {teacher.subject}
            </span>
          </div>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
          {teacher.bio}
        </p>

        <Button
          onClick={() => setFormOpen(!formOpen)}
          className="w-full rounded-xl bg-foreground text-background font-bold text-sm hover:opacity-90 transition-opacity"
          data-ocid={`teacher_dir.ask_button.${index + 1}`}
        >
          {formOpen ? "Close Form ✕" : "Ask This Teacher 💬"}
        </Button>

        <AnimatePresence>
          {formOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="pt-4 mt-4 border-t border-border/50">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-4"
                      data-ocid="teacher_dir.success_state"
                    >
                      <div className="text-3xl mb-2">🎉</div>
                      <p className="font-semibold text-foreground text-sm mb-1">
                        Message sent to {teacher.name}!
                      </p>
                      <p className="text-xs text-muted-foreground mb-3">
                        They'll get back to you soon.
                      </p>
                      <button
                        onClick={handleClose}
                        className="text-xs text-muted-foreground underline hover:text-foreground transition-colors"
                        type="button"
                        data-ocid="teacher_dir.close_button"
                      >
                        Close
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-3"
                    >
                      <div className="space-y-1">
                        <Label
                          htmlFor={`name-${index}`}
                          className="text-xs font-semibold text-foreground"
                        >
                          Your Name
                        </Label>
                        <Input
                          id={`name-${index}`}
                          placeholder="Enter your name..."
                          value={studentName}
                          onChange={(e) => setStudentName(e.target.value)}
                          className="rounded-xl border-2 h-10 text-sm"
                          data-ocid="teacher_dir.input"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label
                          htmlFor={`doubt-${index}`}
                          className="text-xs font-semibold text-foreground"
                        >
                          Your Doubt
                        </Label>
                        <Textarea
                          id={`doubt-${index}`}
                          placeholder={`What would you like to ask ${teacher.name}?`}
                          value={doubt}
                          onChange={(e) => setDoubt(e.target.value)}
                          rows={3}
                          className="rounded-xl border-2 resize-none text-sm"
                          data-ocid="teacher_dir.textarea"
                        />
                      </div>
                      {isError && (
                        <p
                          className="text-xs text-destructive"
                          data-ocid="teacher_dir.error_state"
                        >
                          ⚠️ Something went wrong. Please try again.
                        </p>
                      )}
                      <Button
                        type="submit"
                        disabled={
                          isPending || !studentName.trim() || !doubt.trim()
                        }
                        className="w-full h-10 rounded-xl bg-sunshine text-primary-foreground font-bold text-sm hover:opacity-90 disabled:opacity-50"
                        data-ocid="teacher_dir.submit_button"
                      >
                        {isPending ? (
                          <span className="flex items-center gap-2">
                            <Loader2 size={14} className="animate-spin" />
                            Sending...
                          </span>
                        ) : (
                          "Send Doubt ✉️"
                        )}
                      </Button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function TeacherDirectorySection() {
  return (
    <section
      id="teacher-directory"
      className="py-20 bg-white"
      data-ocid="teacher_dir.section"
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-100 text-violet-600 font-semibold text-sm mb-4">
            👩‍🏫 Teacher Directory
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-black text-foreground mb-4">
            Meet Your Teachers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Send your doubt directly to the right teacher. Click{" "}
            <strong className="text-foreground">"Ask This Teacher"</strong> on
            any card to send a message.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEACHERS.map((teacher, i) => (
            <TeacherCard key={teacher.name} teacher={teacher} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExplainSection() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<
    (typeof KNOWLEDGE_BASE)[0] | null | "none"
  >(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      const match = matchQuestion(query);
      setResult(match ?? "none");
      setLoading(false);
    }, 800);
  };

  return (
    <section
      id="explain"
      className="py-20"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.97 0.02 280) 0%, oklch(0.97 0.03 88) 100%)",
      }}
      data-ocid="explain.section"
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sunshine/20 text-sunshine font-semibold text-sm mb-4">
              🧑‍🏫 Instant Teacher Explanation
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-black text-foreground mb-4">
              Type Your Doubt
            </h2>
            <p className="text-lg text-muted-foreground">
              Ask anything — get a clear, simple explanation like your teacher
              would give you. Covers{" "}
              <strong className="text-foreground">
                Math, Science, English, History & Computer Science
              </strong>
              .
            </p>
          </div>

          {/* Search hint tags */}
          <div className="flex flex-wrap gap-2 mb-5 justify-center">
            {[
              { label: "📐 Math", color: "bg-sunshine/20 text-yellow-700" },
              { label: "🔬 Science", color: "bg-mint/20 text-green-700" },
              { label: "📝 English", color: "bg-skyblue/20 text-blue-700" },
              { label: "🏛️ History", color: "bg-lavender/20 text-purple-700" },
              {
                label: "💻 Computer Science",
                color: "bg-violet-100 text-violet-700",
              },
            ].map((tag) => (
              <span
                key={tag.label}
                className={`text-xs font-semibold px-3 py-1 rounded-full ${tag.color}`}
              >
                {tag.label}
              </span>
            ))}
          </div>

          <form
            onSubmit={handleAsk}
            className="flex gap-3 mb-8"
            data-ocid="explain.panel"
          >
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                placeholder="e.g. What is an algorithm? How does the internet work? What are variables?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="rounded-2xl border-2 pl-9 h-12 text-base"
                data-ocid="explain.input"
              />
            </div>
            <Button
              type="submit"
              disabled={loading || !query.trim()}
              className="rounded-2xl bg-sunshine text-primary-foreground font-bold px-6 h-12 hover:opacity-90 disabled:opacity-50 shrink-0"
              data-ocid="explain.submit_button"
            >
              {loading ? (
                <span className="h-4 w-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
              ) : (
                "Search ✨"
              )}
            </Button>
          </form>

          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl border-2 border-border p-6 space-y-3"
                data-ocid="explain.loading_state"
              >
                <div className="h-4 bg-muted rounded-full w-1/3 animate-pulse" />
                <div className="h-3 bg-muted rounded-full w-full animate-pulse" />
                <div className="h-3 bg-muted rounded-full w-5/6 animate-pulse" />
                <div className="h-3 bg-muted rounded-full w-4/6 animate-pulse" />
              </motion.div>
            )}

            {result && result !== "none" && !loading && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl border-2 border-sunshine/50 bg-white p-6 shadow-card"
                data-ocid="explain.success_state"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-sunshine flex items-center justify-center text-lg shrink-0">
                    🧑‍🏫
                  </div>
                  <div>
                    <div className="font-display font-black text-foreground text-sm">
                      Teacher's Explanation
                    </div>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${result.subjectColor}`}
                    >
                      {result.subject}
                    </span>
                  </div>
                </div>
                <p className="text-foreground leading-relaxed mb-4">
                  {result.explanation}
                </p>
                <div className="flex items-start gap-2 rounded-xl bg-mint/10 border border-mint/30 px-4 py-3">
                  <Lightbulb size={16} className="text-mint mt-0.5 shrink-0" />
                  <p className="text-sm text-foreground/80">{result.tip}</p>
                </div>
              </motion.div>
            )}

            {result === "none" && !loading && (
              <motion.div
                key="none"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl border-2 border-border bg-white p-6 text-center"
                data-ocid="explain.error_state"
              >
                <div className="text-3xl mb-3">🤔</div>
                <p className="font-semibold text-foreground mb-1">
                  That's a great question!
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  We don't have a ready explanation for that one yet. Use the
                  anonymous form below to submit it — a teacher will answer it!
                </p>
                <a
                  href="#form"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sunshine text-primary-foreground font-bold text-sm hover:opacity-90 transition-opacity"
                  data-ocid="explain.primary_button"
                >
                  Submit Anonymously 🔒
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function AskFormSection() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { mutate, isPending, isError } = useSubmitDoubt();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message.trim()) return;
    mutate(
      { category: subject, message },
      {
        onSuccess: () => {
          setSubmitted(true);
          setMessage("");
          setSubject("");
        },
      },
    );
  };

  return (
    <section id="form" className="py-20 bg-white" data-ocid="form.section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-coral/20 text-coral font-semibold text-sm mb-4">
              🔒 100% Anonymous
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-black text-foreground mb-4">
              Ask Anonymously
            </h2>
            <p className="text-lg text-muted-foreground">
              No name. No judgment. Just your question. We'll make sure it gets
              answered.
            </p>
          </div>

          <div
            className="rounded-3xl border-2 border-sunshine/50 bg-sunshine/5 p-8 shadow-warm"
            data-ocid="form.card"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-8"
                  data-ocid="form.success_state"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-mint/20 text-mint mb-6"
                  >
                    <CheckCircle2 size={40} />
                  </motion.div>
                  <h3 className="font-display text-2xl font-black text-foreground mb-3">
                    Question Received! 🎉
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                    Your question has been submitted anonymously. You're braver
                    than you think for asking!
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    className="rounded-xl bg-sunshine text-primary-foreground hover:opacity-90 font-bold px-6"
                    data-ocid="form.secondary_button"
                  >
                    Ask Another Question
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <Label
                      htmlFor="subject"
                      className="font-semibold text-foreground"
                    >
                      Subject / Category
                    </Label>
                    <Select value={subject} onValueChange={setSubject}>
                      <SelectTrigger
                        id="subject"
                        className="rounded-xl border-2 h-12"
                        data-ocid="form.select"
                      >
                        <SelectValue placeholder="Pick a subject..." />
                      </SelectTrigger>
                      <SelectContent>
                        {SUBJECTS.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="question"
                      className="font-semibold text-foreground"
                    >
                      Your Question
                    </Label>
                    <Textarea
                      id="question"
                      placeholder="What's been confusing you? Don't hold back — there's no such thing as a bad question here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={5}
                      className="rounded-xl border-2 resize-none text-base"
                      data-ocid="form.textarea"
                    />
                  </div>

                  {isError && (
                    <div
                      className="rounded-xl bg-destructive/10 text-destructive px-4 py-3 text-sm font-medium"
                      data-ocid="form.error_state"
                    >
                      ⚠️ Something went wrong. Please try again.
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isPending || !subject || !message.trim()}
                    className="w-full h-12 rounded-xl bg-sunshine text-primary-foreground font-bold text-base hover:opacity-90 disabled:opacity-50"
                    data-ocid="form.submit_button"
                  >
                    {isPending ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
                        Submitting...
                      </span>
                    ) : (
                      "Submit Anonymously ✨"
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    🔒 Your identity is never stored. This question goes in
                    completely anonymously.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-foreground text-white py-12">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 font-display font-bold text-xl mb-3">
              <span>✋</span>
              <span>
                Ask <span className="text-sunshine">Without</span> Fear
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              A safe space for every student who ever swallowed a question. Your
              curiosity matters.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-white/80">Sections</h4>
            <ul className="space-y-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                    data-ocid="footer.link"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-white/80">Remember</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>💡 Every expert was once a beginner</li>
              <li>🙋 Asking is a sign of strength</li>
              <li>📚 Questions drive all learning</li>
              <li>❤️ Your teacher wants to help you</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-sm text-white/40">
            © {year}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sunshine hover:text-sunshine/80 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen font-body">
      <NavBar />
      <main>
        <HeroSection />
        <FearsSection />
        <SolutionsSection />
        <TipsSection />
        <TeachersSection />
        <TeacherDirectorySection />
        <ExplainSection />
        <AskFormSection />
      </main>
      <Footer />
    </div>
  );
}
