/**
 * All deck copy lives here. To add a new play, append to `plays` —
 * the index, counter, progress bar and navigation update automatically.
 * `visual` picks the animated illustration (see components/visuals).
 * Leave `visual` as "default" if a play doesn't have a bespoke one yet.
 */

export type VisualKey =
  | "drop"
  | "interview"
  | "people"
  | "credit"
  | "algorave"
  | "shine"
  | "wildcard"
  | "match"
  | "unfinished"
  | "bb"
  | "default";

export type Play = {
  id: string;
  title: string;
  kicker: string;
  body: string;
  hook: string;
  /** Optional highlighted box, for answering the obvious question in the room. */
  callout?: { label: string; text: string };
  flow: [string, string, string];
  visual: VisualKey;
};

export const meta = {
  title: "The BlackBook Playbook",
  client: "BlackBook by Roksia",
  eyebrow: "A proposal for BlackBook's marketing strategy. By Razik Darji",
  preparedBy: "By Razik Darji", // shown on the closing slide. Leave empty to hide.
  year: "2026",
};

export const moment = {
  opener: "It's loud out there.",
  lines: [
    "The algorithm decides who gets seen.",
    "AI is messing with everyone's hopes and dreams.",
    "Getting in the room still comes down to who you know.",
    "And most of us are making things alone.",
  ],
  noise: [
    "Your reach is down 64%",
    "Can you do it for free?",
    "Unpaid — great exposure!",
    "Made with AI",
    "Is this AI?",
    "Post 3x a day to stay relevant",
    "Sponsored",
    "Seen",
    "Left on read",
    "Algorithm update",
    "Guest list full",
    "Invite only",
    "Suggested for you",
    "Photo: uncredited",
    "Boost this post",
    "Who do you know?",
    "Project abandoned",
    "0 replies",
  ],
};

export const insight = {
  label: "The insight",
  pre: "People need to",
  em: "feel something",
  post: "more than ever.",
};

export const position = {
  label: "The position",
  line: "BlackBook is purely for the artists and creators.",
  sub: "Not a job board. Not another feed. A little black book of the people, projects and opportunities that actually move a creative life forward.",
};

export const strategy = {
  label: "The strategy",
  headline: "Be the culture.",
  sub: "The best marketing doesn't feel like marketing. We don't react to culture, we create it. The FOMO is the seasoning, not the meal.",
  lines: ["The best events", "The best collaborations", "The best projects", "The best opportunities"],
  tail: "start here.",
};

export const feeling = {
  label: "The feeling we want every creative to have",
  a: "“If I need a real leg up in life,",
  b: "I need this app.”",
};

export const loop = {
  label: "The engine",
  headline: "Every play runs on the same loop.",
  steps: [
    { k: "Tease", t: "Tease it in public", d: "Socials, events, partners. Show people what's up for grabs." },
    { k: "Apply", t: "Apply through BlackBook", d: "The only way in. Profiles, portfolios and applications live on the app." },
    { k: "Reveal", t: "Show what happens next", d: "Credit the people chosen. Publish the outcome. Prove it's real." },
  ],
  back: "Every outcome becomes the next tease. People come back without being asked.",
};

export const plays: Play[] = [
  {
    id: "the-drop",
    title: "The BlackBook Drop",
    kicker: "Curated briefs · Collabs · Exclusive access",
    body: "A regular drop of paid briefs, collaborations and exclusive event opportunities. To start, we curate every drop ourselves, hunting down the best opportunities online and bringing them into one place. Tease them publicly, open applications on the app, and show what happens next.",
    hook: "Make checking BlackBook a habit that could change someone's week.",
    callout: {
      label: "How it grows",
      text: "Anyone can submit an opportunity to the Drop. The best submissions get featured in the public tease for free, reaching a curated pool of creatives rather than a job-board crowd. Posting on BlackBook becomes the easiest way to find the right people.",
    },
    flow: ["We curate the best opportunities online", "Tease publicly, apply on the app", "Organisers start posting direct to get featured"],
    visual: "drop",
  },
  {
    id: "big-break",
    title: "Your Next Interview Could Be Your Big Break",
    kicker: "Emerging meets established",
    body: "Give an emerging creative the chance to interview an established artist or industry figure. Apply through BlackBook, with the chosen interviewer featured and credited in the final content.",
    hook: "A meaningful connection, and a portfolio piece worth sharing.",
    callout: {
      label: "Who's in the chair",
      text: "We find an established artist or curator who wants to back new talent and is up for being interviewed. It's a good look for them: they're seen championing the next generation, on their terms.",
    },
    flow: ["We line up an artist or curator", "Emerging creatives apply through BlackBook", "Featured and credited in the final piece"],
    visual: "interview",
  },
  {
    id: "people-to-know",
    title: "The People You Should Know",
    kicker: "A recurring Instagram collab series",
    body: "A regular series of Instagram collab posts, published jointly with each creative's own account. Showcase their work, their personality, and what they want to make next. Then send people to BlackBook to discover and connect with them.",
    hook: "Every episode puts BlackBook in front of a whole new audience.",
    callout: {
      label: "Why it's powerful",
      text: "A collab post lives on both accounts, so each feature reaches the creative's followers as well as ours. Run it every week and it becomes a series people want to be picked for, and every feature is a new audience discovering BlackBook through someone they already follow.",
    },
    flow: ["A new creative every episode", "Published on both accounts", "Their audience discovers BlackBook"],
    visual: "people",
  },
  {
    id: "photo-credit",
    title: "Your Name on the Photo Credit",
    kicker: "Official event shooting access",
    body: "Partner with events to offer emerging photographers access and an official shooting opportunity. Creatives apply through BlackBook using their portfolios, and selected photographers get credited when the images are published.",
    hook: "Real access, a real credit, and payment and usage terms clear upfront.",
    flow: ["Apply with your BlackBook portfolio", "Shoot officially at partner events", "Credited when the images are published"],
    visual: "credit",
  },
  {
    id: "algorave",
    title: "Main Sponsor: Futuretense × ALGORITHM",
    kicker: "Southbank Centre · Queen Elizabeth Hall · 2027",
    body: "Southbank Centre runs a series called Futuretense. Next year I'm hosting my own edition: ALGORITHM, an algorave. Think a big music gig taking over the Queen Elizabeth Hall, where the music is made live on stage by artists writing code.",
    hook: "BlackBook as main sponsor, in front of a room full of exactly the creatives it's built for.",
    callout: {
      label: "The opportunity",
      text: "Put BlackBook's name on the night and introduce the artists behind it. An adventurous, creative, tech-curious crowd, in one of London's most iconic venues, meeting BlackBook for the first time.",
    },
    flow: ["Southbank Centre's Futuretense series", "My edition: an algorave takeover of the QEH", "BlackBook as main sponsor"],
    visual: "algorave",
  },
  {
    id: "shadow-to-shine",
    title: "Shadow to Shine: The Next Chapter",
    kicker: "The first-ever alumni get-together",
    body: "Shadow To Shine has an incredible alumni of creatives, and most of them have barely met each other. Let's bring them together in one room for the first time, centred on what they're making next.",
    hook: "Turn conversations from the night into collaborations.",
    callout: {
      label: "Why BlackBook",
      text: "After the night, BlackBook is where the alumni stay connected: sharing work, passing on opportunities, and picking up the collaborations they started in the room.",
    },
    flow: ["Bring the alumni together for the first time", "Centre it on what they're making next", "Keep the community connected on BlackBook"],
    visual: "shine",
  },
  {
    id: "wildcard",
    title: "The BlackBook Wildcard Series",
    kicker: "Recurring · Unexpected · For a cause",
    body: "Create a recurring series of unexpected events, starting with a robot dance-off accompanied by live music, raising money for a cause. Registration through BlackBook unlocks ticket access.",
    hook: "Each edition gives people another reason to watch for what's coming.",
    flow: ["Edition 01: a robot dance-off with live music", "Register on BlackBook to unlock tickets", "Raise money for a cause"],
    visual: "wildcard",
  },
  {
    id: "in-this-room",
    title: "Your Next Collaborator Is in This Room",
    kicker: "Curated creative matchmaking",
    body: "Host a carefully curated creative matchmaking event. People apply through BlackBook, sharing what they make, what they need, and what they can offer. We personally match complementary creatives.",
    hook: "Introductions built around projects people could actually make together.",
    flow: ["Apply: what you make, need and offer", "We personally match complementary creatives", "Programmed introductions on the night"],
    visual: "match",
  },
  {
    id: "unfinished-business",
    title: "Unfinished Business",
    kicker: "An open call for unseen work",
    body: "Launch an open call for unseen work, abandoned projects, and ideas that never found their moment. Curate selected submissions into a physical exhibition, with each piece linked to its creator on BlackBook.",
    hook: "Where work is unfinished, find the collaborators who could help move it forward.",
    flow: ["Open call for the unseen and unfinished", "Curated into a physical exhibition", "Every piece linked to its creator on BlackBook"],
    visual: "unfinished",
  },
  {
    id: "meet-bb",
    title: "Meet BB: Someone in Your Corner",
    kicker: "A personal creative companion",
    body: "Develop BB into a personal creative companion that understands your work, ambitions, and next steps. It finds relevant opportunities across the internet and helps you discover collaborators within BlackBook.",
    hook: "Specific suggestions, with sources, deadlines and a clear next action.",
    flow: ["Understands your work and ambitions", "Finds opportunities across the internet", "Surfaces collaborators inside BlackBook"],
    visual: "bb",
  },
];

export const close = {
  a: "Start here.",
  b: "Build something great.",
};
