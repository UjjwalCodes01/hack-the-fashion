// All site copy lives here so sections stay purely presentational.
// Copy follows the original hackthefashion.fabricvton.com site and the sponsor brochure.

export const EVENT = {
  name: "Hack the Fashion",
  year: "2026",
  dates: "2–3 November 2026",
  // Hacking begins 2 Nov, 10:00 AM IST.
  startsAt: "2026-11-02T10:00:00+05:30",
  venue: "AI Skills Lab, KIET",
  address:
    "KIET Group of Institutions, Delhi-NCR, Meerut Road (NH-58), Ghaziabad, Uttar Pradesh",
  email: "hackthefashion@fabricvton.com",
  instagram: "https://instagram.com/coeaiskills",
  linkedin: "https://linkedin.com/company/hackthefashion",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=KIET%20Group%20of%20Institutions%2C%20Ghaziabad",
  mapsEmbed:
    "https://maps.google.com/maps?q=KIET%20Group%20of%20Institutions%20Ghaziabad&t=&z=14&ie=UTF8&iwloc=&output=embed",
  brochure: "/sponsor-brochure.pdf",
  clothsyUrl: "https://clothsyai.fabricvton.com",
  fabricvtonUrl: "https://fabricvton.com",
  // Set this to the Unstop listing once applications open.
  registerUrl: "",
  // Set this once the submission portal (Devfolio / Unstop / Google Form) is live.
  submissionUrl: "",
  lat: "28°45'09.6\"N",
  lon: "77°29'54.2\"E",
};

export const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#tracks", label: "Tracks" },
  { href: "#prizes", label: "Prizes" },
  { href: "#timeline", label: "Timeline" },
  { href: "#faq", label: "FAQ" },
];

export const STATS = [
  { value: "24", label: "Hours of building" },
  { value: "6", label: "Challenge tracks" },
  { value: "₹50K+", label: "Prize pool" },
  { value: "250", label: "Students building" },
];

export const KEY_DATES = [
  { label: "Registrations open", value: "16 OCT" },
  { label: "Registrations close", value: "28 OCT" },
  { label: "Shortlist", value: "30 OCT" },
  { label: "Briefing", value: "01 NOV" },
  { label: "Duration", value: "24 HRS" },
  { label: "Showtime", value: "2–3 NOV" },
  { label: "Venue", value: "KIET GZB" },
];

export type Track = {
  no: string;
  title: string;
  ideas: string[];
  tone: "magenta" | "cyan" | "violet" | "teal" | "gold";
  icon: "shirt" | "search" | "pen" | "leaf" | "cart" | "star";
};

export const TRACKS: Track[] = [
  {
    no: "01",
    title: "Virtual try-on & visual fashion",
    ideas: ["AR/VR try-on experiences", "Photo-based outfit suggestions", "Body measurement & fit prediction", "3D garment visualization"],
    tone: "magenta",
    icon: "shirt",
  },
  {
    no: "02",
    title: "Fashion discovery & personalization",
    ideas: ["AI-powered style recommendations", "Visual search for fashion items", "Mood & occasion-based curation", "Personalized wardrobes"],
    tone: "cyan",
    icon: "search",
  },
  {
    no: "03",
    title: "Fashion design & content creation",
    ideas: ["AI design generators", "Print & pattern creation tools", "Outfit and lookbook creators", "Mood-board to design pipelines"],
    tone: "violet",
    icon: "pen",
  },
  {
    no: "04",
    title: "Sustainable & circular fashion",
    ideas: ["Waste reduction solutions", "Resale & rental platforms", "Sustainable material innovation", "Lifecycle tracking & impact analysis"],
    tone: "teal",
    icon: "leaf",
  },
  {
    no: "05",
    title: "Fashion commerce & marketplaces",
    ideas: ["Smart shopping experiences", "Social commerce & creator tools", "Trend analytics & market insights", "Inventory & supply chain solutions"],
    tone: "magenta",
    icon: "cart",
  },
  {
    no: "06",
    title: "Open innovation",
    ideas: ["Anything that doesn't fit above", "Wild ideas are welcome", "Solve a real fashion problem", "Use any technology stack"],
    tone: "gold",
    icon: "star",
  },
];

export const PODIUM = [
  {
    place: 2,
    title: "1st runner-up",
    amount: "₹15,000",
    perks: ["Internship interview", "Certificates", "Goodies"],
  },
  {
    place: 1,
    title: "Winner",
    amount: "₹25,000",
    perks: [
      "Internship interview with Clothsy AI / FabricVTON",
      "Trophy",
      "Certificates",
      "Goodies",
    ],
  },
  {
    place: 3,
    title: "2nd runner-up",
    amount: "₹10,000",
    perks: ["Certificates", "Goodies"],
  },
];

export const SPECIAL_AWARDS: { title: string; by?: string; reward: string }[] = [
  { title: "Best use of virtual try-on", by: "by Clothsy AI", reward: "₹5,000 + Clothsy AI mentorship session" },
  { title: "Best sustainable solution", reward: "₹3,000 + goodies" },
  { title: "Best UI/UX design", reward: "₹3,000 + goodies" },
  { title: "Best all-first-year team", reward: "Goodies + certificates" },
];

export type TimelineIcon = "register" | "lock" | "shortlist" | "briefing" | "start" | "submit" | "trophy";

export const TIMELINE: {
  date: string;
  stamp: string;
  title: string;
  sub?: string;
  text: string;
  icon: TimelineIcon;
}[] = [
  { date: "16 Oct 2026", stamp: "Oct 16, 2026", title: "Registrations open", text: "Form your team and register.", icon: "register" },
  { date: "28 Oct, 11:59 PM", stamp: "Oct 28, 2026 | 11:59 PM", title: "Registrations close", text: "Last date to submit team details and idea.", icon: "lock" },
  { date: "30 Oct 2026", stamp: "Oct 30, 2026", title: "Shortlist announced", sub: "Confirmation by email", text: "Selected teams receive confirmation by email.", icon: "shortlist" },
  { date: "1 Nov 2026", stamp: "Nov 01, 2026", title: "Pre-hackathon briefing", sub: "Tracks, rules & Clothsy AI tools", text: "Online session on tracks, rules and Clothsy AI tools.", icon: "briefing" },
  { date: "2 Nov, 10:00 AM", stamp: "Nov 02, 2026 | 10:00 AM", title: "Hacking begins", sub: "Day 1", text: "24-hour build sprint starts at the AI Skills Lab.", icon: "start" },
  { date: "3 Nov, 10:00 AM", stamp: "Nov 03, 2026 | 10:00 AM", title: "Submissions close", sub: "Day 2 · Code freeze", text: "Code freeze. Final submissions due.", icon: "submit" },
  { date: "3 Nov, 2:00 PM", stamp: "Nov 03, 2026 | 02:00 PM", title: "Results & closing", sub: "Awards ceremony", text: "Winners announced at the closing ceremony.", icon: "trophy" },
];

export type ScheduleKind = "Milestone" | "Food" | "Mentors" | "Checkpoint" | "Judging" | "Fun";

export type ScheduleItem = {
  time: string;
  title: string;
  // Runway-flavoured subtitle, the way off-grid used "Pit Stop" etc.
  cue: string;
  kind: ScheduleKind;
};

export const SCHEDULE: { day: string; label: string; items: ScheduleItem[] }[] = [
  {
    day: "Day 1",
    label: "Monday, 2 November",
    items: [
      { time: "8:30 AM", title: "Check-in and registration desk", cue: "Backstage call", kind: "Milestone" },
      { time: "9:30 AM", title: "Opening ceremony and keynote", cue: "Curtain up", kind: "Milestone" },
      { time: "10:00 AM", title: "Hacking begins", cue: "Lights, runway, go", kind: "Milestone" },
      { time: "1:00 PM", title: "Lunch", cue: "Catering", kind: "Food" },
      { time: "3:00 PM", title: "Mentor round 1", cue: "First fitting", kind: "Mentors" },
      { time: "5:00 PM", title: "Evening snacks", cue: "Refuel", kind: "Food" },
      { time: "6:00 PM", title: "Checkpoint 1 — progress check", cue: "Mid-show check", kind: "Checkpoint" },
      { time: "8:30 PM", title: "Dinner", cue: "Dinner service", kind: "Food" },
      { time: "11:00 PM", title: "Mentor round 2", cue: "Second fitting", kind: "Mentors" },
      { time: "12:00 AM", title: "Midnight fun activity / mini challenge", cue: "After-party", kind: "Fun" },
    ],
  },
  {
    day: "Day 2",
    label: "Tuesday, 3 November",
    items: [
      { time: "2:00 AM", title: "Midnight snacks", cue: "Late bite", kind: "Food" },
      { time: "6:00 AM", title: "Checkpoint 2", cue: "Dress rehearsal", kind: "Checkpoint" },
      { time: "8:00 AM", title: "Breakfast", cue: "Morning call", kind: "Food" },
      { time: "10:00 AM", title: "Code freeze — submissions close", cue: "Final stitch", kind: "Milestone" },
      { time: "10:30 AM", title: "Judging round 1 (table demos)", cue: "Table showcase", kind: "Judging" },
      { time: "12:00 PM", title: "Final pitches (top teams)", cue: "The final walk", kind: "Judging" },
      { time: "1:00 PM", title: "Lunch", cue: "Catering", kind: "Food" },
      { time: "2:00 PM", title: "Closing ceremony and prize distribution", cue: "Finale bow", kind: "Milestone" },
    ],
  },
];

export const CRITERIA = [
  { weight: 25, title: "Innovation and originality", text: "Is the idea fresh? Does it approach the problem in a new way?" },
  { weight: 25, title: "Technical execution", text: "Does the prototype work? How well is it built?" },
  { weight: 20, title: "Problem relevance", text: "Does it solve a real, meaningful fashion problem?" },
  { weight: 15, title: "User experience and design", text: "Is it easy and pleasant to use?" },
  { weight: 15, title: "Impact and feasibility", text: "Could it scale or be used by real shoppers or brands?" },
];

export const ROUNDS = [
  { name: "Round 1 · Table demos", time: "5 min + 2 min", text: "Judges visit each table for a 5-minute demo and a 2-minute Q&A." },
  { name: "Final round · Top 8 teams", time: "4 min + 3 min", text: "Finalists pitch on stage: a 4-minute pitch and 3 minutes of Q&A." },
];

export type Judge = {
  name: string;
  role: string;
  title: string;
  org: string;
  category: string;
  initials?: string;
  // Drop a photo in public/judges/ and set this to show it instead of the initials portrait.
  photo?: string;
  logo?: { src: string; alt: string; w: number; h: number };
};

export const JUDGES: Judge[] = [
  {
    name: "Aaditya Singhal",
    role: "CEO · Clothsy AI",
    title: "CEO",
    org: "Clothsy AI",
    category: "Fashion tech",
    initials: "AS",
    logo: { src: "/logos/clothsy-wordmark.png", alt: "Clothsy AI", w: 600, h: 149 },
  },
  {
    name: "To be announced",
    role: "Faculty · KIET Group of Institutions",
    title: "Faculty",
    org: "KIET Group of Institutions",
    category: "AI & computer vision",
    logo: { src: "/logos/kiet.png", alt: "KIET", w: 662, h: 223 },
  },
  { name: "To be announced", role: "Industry · Fashion brand / retailer", title: "Industry", org: "Fashion brand / retailer", category: "Fashion business" },
  { name: "To be announced", role: "Fashion expert · NIFT / fashion industry", title: "Fashion expert", org: "NIFT / fashion industry", category: "Fashion design" },
  { name: "To be announced", role: "Engineering · Tech company", title: "Engineering", org: "Tech company", category: "Tech & innovation" },
];

export const MENTOR_AREAS = [
  { title: "AI/ML", text: "Models, fine-tuning, prompting" },
  { title: "Computer vision", text: "Pose, segmentation, try-on" },
  { title: "Web dev", text: "Full-stack, APIs, deploys" },
  { title: "UI/UX", text: "Flows, prototyping, polish" },
  { title: "Fashion business", text: "Retail, D2C, merchandising" },
];

export const SPONSOR_LOGOS = [
  { src: "/logos/clothsy-wordmark.png", alt: "Clothsy AI", w: 600, h: 149 },
  { src: "/logos/fabricvton.webp", alt: "FabricVTON", w: 900, h: 253 },
  { src: "/logos/hp.png", alt: "HP", w: 228, h: 228 },
  { src: "/logos/intel.png", alt: "Intel", w: 328, h: 217 },
  { src: "/logos/kiet.png", alt: "KIET Deemed to be University", w: 662, h: 223 },
  { src: "/logos/ai-skills-lab.png", alt: "AI Skills Lab CoE", w: 500, h: 500 },
];

export const TIERS = [
  {
    name: "Category 1",
    price: "₹20,000",
    tag: "Maximum visibility",
    per: "₹80 per student",
    perks: ["Prime stall on campus", "8–10 min tech session", "Own challenge track", "Mentor or jury seat", "Full résumé database", "Top logo placement"],
  },
  {
    name: "Category 2",
    price: "₹15,000",
    tag: "Core event partner",
    per: "₹60 per student",
    perks: ["Standard stall on campus", "5–7 min tech session", "Mentor seat", "Finalists’ résumés", "Prominent logo placement"],
  },
  {
    name: "Category 3",
    price: "₹10,000",
    tag: "Growth partner",
    per: "₹40 per student",
    perks: ["Stage mention at opening & closing", "Winners’ profiles", "Logo on banners & socials"],
  },
  {
    name: "Category 4",
    price: "₹5,000",
    tag: "Supporting partner",
    per: "₹20 per student",
    perks: ["Logo on banners & standees", "Logo on social posts", "Logo in the brochure"],
  },
];

export const COORDINATORS = [
  { name: "Aaditya Singhal", phone: "9031851732" },
  { name: "Tanmay Krishna Gupta", phone: "9555993072" },
  { name: "Shaswat Mishra", phone: "7388660378" },
];

export const ELIGIBILITY = [
  { title: "Students", text: "Open to all undergraduate and postgraduate students with a valid college ID." },
  { title: "Team size: 2–4 members", text: "Teams of 2–4 members. Cross-college and cross-discipline teams are encouraged." },
  { title: "One team each", text: "Each participant can be in only one team." },
];

export const CONDUCT = [
  "Be respectful and inclusive.",
  "Harassment of any kind is not tolerated.",
  "Look after the venue and equipment.",
  "Organisers may remove anyone who breaks these rules.",
];

export const RULES: { title: string; text: string; icon: "users" | "bulb" | "code" | "target" | "cog" | "trophy" | "shield" }[] = [
  { title: "Eligibility", text: "Open to all undergraduate and postgraduate students with a valid college ID, from any college or background.", icon: "users" },
  { title: "Team size", text: "Teams of 2–4 members. Cross-college and cross-discipline teams are encouraged. Each person can be in only one team.", icon: "users" },
  { title: "Originality", text: "Your idea and solution must be original. Plagiarism or submitting a previous project leads to disqualification. You keep full ownership of what you build.", icon: "bulb" },
  { title: "Use of resources", text: "Pre-trained models, open-source libraries, public APIs and frameworks are allowed — all third-party resources must be credited.", icon: "code" },
  { title: "Theme alignment", text: "Your project must fit the theme of fashion and technology — pick one of the tracks or go open innovation.", icon: "target" },
  { title: "Build during event", text: "All code must be written during the hackathon (ideas and designs may be planned in advance). Teams must be at the venue for the full event.", icon: "cog" },
  { title: "Judges' decision", text: "The judges' decision is final in all matters related to evaluation, shortlisting and prizes.", icon: "trophy" },
  { title: "Code of conduct", text: "Be respectful and inclusive, and look after the venue. Harassment of any kind is not tolerated; organisers may remove anyone who breaks the rules.", icon: "shield" },
];

export const SUBMISSION: { title: string; text: string; via: string; icon: "box" | "play" | "file" | "book"; tone: string }[] = [
  { title: "Source code", text: "GitHub repository (public) with clean code and proper documentation.", via: "GitHub link", icon: "box", tone: "#22c55e" },
  { title: "Demo video", text: "2–3 minute video explaining the problem, solution and demo.", via: "YouTube / Drive link", icon: "play", tone: "#e8a112" },
  { title: "Pitch deck", text: "Max 8 slides (PDF) covering problem, solution, tech stack and impact.", via: "Upload PDF", icon: "file", tone: "#f5b83d" },
  { title: "README", text: "Clear setup instructions, features and future scope.", via: "Include in repo", icon: "book", tone: "#f6863c" },
  { title: "Solution brief", text: "One-page summary of your idea, approach and expected impact.", via: "Upload PDF", icon: "file", tone: "#fa6027" },
];

export const SUBMISSION_STEPS = [
  { title: "Prepare your files", text: "Source code, README, demo video, pitch deck and solution brief.", icon: "file" as const },
  { title: "Fill submission form", text: "Provide team details and project information.", icon: "list" as const },
  { title: "Verify & review", text: "Check all files and links are working properly.", icon: "check" as const },
  { title: "Submit before deadline", text: "Once submitted, you cannot make changes after code freeze.", icon: "send" as const },
];

export const PACKING = ["Laptop", "Charger", "Extension board", "College ID", "Toiletries for the overnight stay"];

export const FAQS = [
  { q: "Who can participate?", a: "Any undergraduate or postgraduate student with a valid college ID." },
  { q: "Is there a registration fee?", a: "No, participation is free." },
  { q: "What is the team size?", a: "2 to 4 members." },
  { q: "I don't know how to code. Can I join?", a: "Yes! Teams need designers, researchers and fashion thinkers too." },
  { q: "Can I participate solo?", a: "Solo registration isn't allowed, but we'll help you find a team on our community group." },
  { q: "Do I need a fashion background?", a: "Not at all. Curiosity and problem-solving matter more." },
  { q: "Will food be provided?", a: "Yes, all meals and snacks during the 24 hours are covered." },
  { q: "Can I use AI tools and pre-trained models?", a: "Yes, as long as you credit them. Judges focus on your idea and how you built on top of them." },
  { q: "Who owns the project?", a: "Your team keeps full ownership of everything you build." },
  { q: "Will there be accommodation?", a: "The venue stays open overnight for hacking. Details on separate accommodation will be shared with shortlisted teams." },
  { q: "How will we receive prize money?", a: "Via bank transfer to the team leader after the event." },
  { q: "Who do I contact for help?", a: "Email us or reach out on Instagram — details are in the footer below." },
];

export const LOOKBOOK = [
  "/images/gallery/g01.jpg",
  "/images/gallery/g02.jpg",
  "/images/gallery/g03.jpg",
  "/images/gallery/g04.jpg",
  "/images/gallery/g05.jpg",
  "/images/gallery/g06.jpg",
  "/images/gallery/g07.jpg",
  "/images/gallery/g08.jpg",
  "/images/gallery/g09.jpg",
  "/images/gallery/g10.jpg",
];
