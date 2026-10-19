// Single source of truth for the website (pages/index.js) and the CV (pages/cv.js).
// The PDF at public/Melvin-Wafula-CV.pdf is printed from /cv by scripts/build-cv-pdf.mjs,
// so edit content here and re-run `npm run cv` rather than editing either page.

export const profile = {
  name: 'Melvin Wafula',
  fullName: 'Melvin Wakhungu Wafula',
  title: 'Senior Backend Engineer, Digital Assets & Digital Health',
  location: 'Nairobi, Kenya',
  email: 'melvinwafula@gmail.com',
  phone: '+254 729 675 138',
  site: 'https://persona-eosin.vercel.app',
  links: {
    github: 'https://github.com/BMscis',
    linkedin: 'https://www.linkedin.com/in/melvin-wakhungu-26a29259/',
    blog: 'https://bmscis.hashnode.dev/',
  },
  languages: ['English', 'Kiswahili'],
  roles: ['Backend Engineer', 'Digital Assets', 'Digital Health', 'Full-Stack Developer'],
  tagline:
    'I build backend systems for digital assets and digital health. In both, a wrong record costs someone their money or their care.',
  summary:
    "Backend engineer in Nairobi with four years of professional work on digital assets. I've built lending platforms, NFT marketplaces, a bitcoin on-ramp and an on-chain game, and the lending platform I maintain at Shufl Labs moves over $10,000 in loans a month. Since 2025 I have also worked in digital health. I'm building a registry for kidney patients in Kenya and converting the national kidney guidelines into a WHO SMART Guideline. The two fields overlap more than people expect. Both need records you can audit, systems that recover cleanly when something fails, and shared standards so institutions can exchange data (FHIR in health, open ledgers in finance). That overlap is where I want to work next.",
};

// Paragraphs for the website's About section.
export const about = [
  "I'm a backend engineer in Nairobi, and I came to software by an unusual route. I wrote and directed film, produced music for a few years, and sold bancassurance at KCB in 2022, the same year I started writing smart contracts for a living. Python at university was where the habit started.",
  "Most of my work since then has been with digital assets. I've built lending platforms, NFT marketplaces and a bitcoin on-ramp. The Goanna lending platform I maintain now handles over $10,000 in loans a month. Working on systems where a bug loses someone's money changed how I build. I assume any payment can fail halfway, so each one is safe to retry, and I trust the ledger over my own database when they disagree.",
  "In 2025 I started on digital health. I'm building a registry for kidney patients in Kenya, and I'm turning the national kidney guidelines into a WHO SMART Guideline, the format WHO uses to make clinical guidance usable by software. A patient record and a loan record need the same things: a clear history, strict access and a standard format that other systems can read.",
  "I also founded PentacostAi. Its first product, AlgoCity, is a city-trading game that's live on Algorand MainNet. I'm looking for senior backend roles in digital assets or digital health, remote or in Nairobi.",
];

export const skills = [
  {
    group: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'SQL'],
  },
  {
    group: 'Backend',
    items: [
      'Node.js',
      'Express',
      'REST APIs',
      'PostgreSQL',
      'Redis',
      'Supabase',
      'Firebase / Firestore',
      'Background workers',
    ],
  },
  {
    group: 'Digital assets',
    items: [
      'Algorand (AlgoKit, Algorand Python, PyTeal)',
      'Smart contracts',
      'Reach',
      'x402 payments',
      'USDC settlement',
      'Escrow and LogicSig flows',
      'Lending protocols',
    ],
  },
  {
    group: 'Digital health',
    items: [
      'HL7 FHIR',
      'WHO SMART Guidelines',
      'Digital Adaptation Kits (DAK)',
      'BPMN',
      'ICD-11 / LOINC',
    ],
  },
  {
    group: 'Frontend & apps',
    items: ['React', 'Next.js', 'Tailwind CSS', 'Svelte', 'React Native / Expo', 'Electron'],
  },
  {
    group: 'Cloud & delivery',
    items: [
      'AWS (EC2, Amplify, Secrets Manager)',
      'Vercel',
      'Fly.io',
      'Google App Engine',
      'Docker',
      'GitHub Actions',
    ],
  },
  {
    group: 'Testing',
    items: ['Jest', 'Playwright', 'pytest', 'Integration tests', 'Architecture reviews'],
  },
  {
    group: 'AI tooling',
    items: ['LLM extraction pipelines', 'Claude Code and agent skills', 'Multi-agent workflows', 'Knowledge graphs'],
  },
];

// Organisations, titles and dates match the LinkedIn profile so recruiters can
// cross-check them. Bullet detail comes from the matching GitHub repositories.
export const experience = [
  {
    org: 'PentacostAi',
    role: 'Founder & Lead Engineer',
    period: '2026 – Present',
    location: 'Nairobi · Remote',
    summary:
      'My own studio. The first product is AlgoCity, a four-player city-trading game on Algorand MainNet in which AI agents can take a seat.',
    points: [
      'Wrote the six Algorand Python smart contracts behind the game (game, factory, deeds, rules, treasury and swap pool), the Next.js client, and a keeper worker that runs on Fly.io.',
      "Built a paid x402 endpoint for the Algorand x402 Global Challenge. A player pays once in USDC and gets a game table. If the table fails to open, the payment never settles, and one payment can't open two tables.",
      'Every state change goes through a contract that checks it. The database and the UI only display what the chain says.',
      'Each contract has a written spec and a cost proof measured from real builds. Tests run in pytest, Jest and Playwright.',
    ],
    stack: ['Algorand Python', 'TypeScript', 'Next.js', 'x402', 'USDC', 'Fly.io', 'Playwright'],
  },
  {
    org: 'Shufl Labs',
    role: 'Blockchain Developer',
    period: 'Jul 2024 – Present',
    location: 'Remote',
    summary:
      "Backend and smart-contract work for the Shufl NFT marketplace and the Goanna DAO lending platform. I'm an admin of the Al Goanna and Rand Gallery GitHub organisations.",
    points: [
      'Reworked the Goanna lending platform, which now handles over $10,000 in loans a month, and brought its cloud costs down significantly.',
      'Leading the merge of two old marketplace backends, Shufl (AWS EC2) and RandSwap (App Engine and Firestore), into one Node.js and Express service on PostgreSQL and Redis.',
      "Each transaction is submitted under a unique key, so a retry can't charge anyone twice. A background reconciler checks stuck transactions against the chain and corrects the records. Three settlement methods (escrow, app call and LogicSig) share one interface, and the service has 300 automated tests.",
      "I plan the work and AI coding models implement it. I review each module's architecture before it's ported and again afterwards.",
      'Found an encryption key hardcoded in the old code, with its IV reused. The new service keeps no keys in code and reads secrets from AWS Secrets Manager.',
      'Built the Mutant vs Zombies staking game and worked on the Shufl marketplace. Both are live on mainnet.',
    ],
    stack: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'AWS', 'React', 'Next.js', 'PyTeal'],
  },
  {
    org: 'MulaStack',
    role: 'Backend / Blockchain Developer',
    period: 'Mar 2024 – Present',
    location: 'Nairobi',
    summary: 'A service for buying bitcoin with local currency.',
    points: ['I work on the backend and the blockchain side of the purchase flow.'],
    stack: ['Bitcoin'],
  },
  {
    org: 'Safariblocks',
    role: 'Lead Developer',
    period: 'Aug 2022 – Jul 2023',
    location: 'Kenya',
    summary:
      'Led development of the Jasiri Protocol on Algorand, a micropayments system meant to free up capital locked in real-world assets and commodities.',
    points: ['Led the build of the Jasiri browser extension and dApp through to Algorand TestNet.'],
    stack: ['Reach', 'React', 'AWS'],
  },
  {
    org: 'Reach Platform',
    role: 'Blockchain Developer',
    period: 'Apr 2022 – May 2023',
    location: 'Remote',
    summary: 'Smart contracts in Reach, a language that compiles one program for several blockchains.',
    points: ['Published a tutorial that deploys the same NFT auction contract to Ethereum and Algorand.'],
    stack: ['Reach', 'JavaScript', 'Svelte'],
  },
  {
    org: 'KCB Bank Group',
    role: 'Bancassurance Specialist',
    period: 'May 2022 – Aug 2022',
    location: 'Kenya',
    summary: 'Sold insurance products through the bank.',
    points: [],
    stack: [],
  },
];

// One line on the CV for roles outside software.
export const earlierCareer =
  'MyArt Productions, Nairobi. Writer and director from 2011 to 2014, then music producer and writer until 2018.';

// Featured projects on the website (with screenshots).
export const featuredProjects = [
  {
    title: 'AlgoCity',
    status: 'Live on Mainnet',
    description:
      'A city-trading game for up to four players on Algorand. If a player steps away, a labelled bot holds their seat, and AI agents can play too. Hosting a table costs one USDC payment over x402.',
    imgSrc: '/projects/algocity.png',
    liveLink: 'https://algocity.pentacostai.com',
    repoLink: 'https://github.com/BMscis/algocity-x402',
    stack: ['Algorand Python', 'Next.js', 'x402', 'Fly.io'],
  },
  {
    title: 'Goanna Lending Platform',
    status: 'Live on Mainnet',
    description:
      'Members of the Goanna DAO borrow Algo here at low interest. It handles over $10,000 in loans a month.',
    imgSrc: '/projects/lending.png',
    liveLink: 'https://lending.algoanna.com',
    repoLink: 'https://github.com/Al-Goanna/LendingPlatform',
    stack: ['AlgoKit', 'React', 'Next.js', 'AWS'],
  },
  {
    title: 'DEFI P2P',
    status: 'Live on Mainnet',
    description: 'Peer-to-peer lending on Algorand. Lenders fund borrowers directly through smart contracts.',
    imgSrc: '/projects/defip2p.png',
    liveLink: 'https://www.defi-p2p.com/',
    repoLink: 'https://github.com/defip2p',
    stack: ['AlgoKit', 'Next.js', 'Supabase'],
  },
  {
    title: 'Shufl Marketplace',
    status: 'Live on Mainnet',
    description: 'An Algorand marketplace where people list, buy and auction NFTs.',
    imgSrc: '/projects/shufl.png',
    liveLink: 'https://shufl.app/',
    repoLink: 'https://github.com/Al-Goanna/website',
    stack: ['PyTeal', 'React', 'AWS'],
  },
  {
    title: 'Mutant vs Zombies Battles',
    status: 'Live on Mainnet',
    description: 'A Goanna DAO game. Players stake their MvZ NFTs for a chance to win GOANNA tokens.',
    imgSrc: '/projects/battles.png',
    liveLink: 'https://battle.algoanna.com/',
    repoLink: 'https://github.com/Al-Goanna/MvZBattle',
    stack: ['PyTeal', 'Reach', 'React', 'AWS'],
  },
];

// Selected projects for the website's "Other projects" grid.
// Entries with cv: true also appear on the CV.
export const projects = [
  {
    title: 'Kenya Renal Registry',
    period: '2025 – 2026',
    overview:
      'A national registry for kidney patients, with clinical decision support based on WHO SMART Guidelines. Web (Next.js), mobile (Expo) and desktop (Electron) apps share an AWS Amplify backend. Diagnoses and lab results are coded in ICD-11 and LOINC so they map onto FHIR.',
    stack: ['Next.js', 'React Native', 'Electron', 'AWS Amplify', 'FHIR'],
    repo: null,
    link: null,
    cv: true,
  },
  {
    title: 'Kidney guidelines to WHO SMART',
    period: '2026',
    overview:
      "Turning the Kenya National Kidney Guidelines 2026 into a WHO SMART Digital Adaptation Kit, the structured form a guideline takes before it becomes software. I wrote a 17-part method guide and a tool that traces each WHO rule back to the document it came from. An AI-assisted pipeline pulls decision tables and care pathways out of each chapter for review against the source.",
    stack: ['Python', 'LLM pipelines', 'WHO SMART', 'BPMN', 'FHIR'],
    repo: null,
    link: null,
    cv: true,
  },
  {
    title: 'DEFI-P2P',
    period: '2025',
    overview:
      "Peer-to-peer lending on Algorand, which I built on my own: AlgoKit contracts, a Next.js frontend and Supabase, with CI that deploys the contracts to TestNet. Asset details that rarely change are cached separately from live balances, and requests are queued by priority so the dashboard loads what's on screen first.",
    stack: ['AlgoKit', 'TypeScript', 'Next.js', 'Supabase'],
    repo: 'https://github.com/defip2p',
    link: 'https://www.defi-p2p.com/',
    cv: true,
  },
  {
    title: 'Table Banking model',
    period: '2025',
    overview:
      "A white paper on the maths behind chamas, Kenya's community savings-and-credit groups. It sets rules for how much each member can borrow and how profit is shared (30% by savings, 70% by interest paid). I tested the model in Python against one group's real ledger.",
    stack: ['Python', 'Financial modelling', 'Data validation'],
    repo: null,
    link: null,
    cv: true,
  },
  {
    title: 'Algox402 SDK',
    period: '2025',
    overview:
      'An SDK for paying per request with x402 on Algorand. It covers the buyer, seller and facilitator roles and includes Express middleware with PostgreSQL storage.',
    stack: ['Node.js', 'Express', 'PostgreSQL', 'Algorand'],
    repo: 'https://github.com/BMscis/cointext-algorand-x402',
    link: null,
    cv: true,
  },
  {
    title: 'SmartSeat Ticketing',
    period: '2022 – 2023',
    overview: 'NFT event tickets on Algorand, which I built with one other engineer.',
    stack: ['JavaScript', 'Python', 'Algorand'],
    repo: 'https://github.com/SmartSeatTicketing/smartseat',
    link: null,
    cv: false,
  },
  {
    title: 'Digital Health Ecosystem Explorer',
    period: '2026',
    overview:
      "An interactive version of WHO's diagram of the digital health ecosystem. It shows health workers and developers where a Digital Adaptation Kit fits.",
    stack: ['Next.js 14', 'TypeScript'],
    repo: null,
    link: null,
    cv: false,
  },
  {
    title: 'Research-to-Skill Generator',
    period: '2026',
    overview:
      'Turns research notes into Agent Skills that Claude Code, Codex and GitHub Copilot can all load, with a small validator that needs no dependencies.',
    stack: ['Python', 'Agent Skills'],
    repo: null,
    link: null,
    cv: false,
  },
];

// GitHub organisations administered or contributed to.
export const organizations = [
  { name: 'Al-Goanna', role: 'Admin', url: 'https://github.com/Al-Goanna' },
  { name: 'RandGallery', role: 'Admin', url: 'https://github.com/RandGallery' },
  { name: 'defip2p', role: 'Admin', url: 'https://github.com/defip2p' },
  {
    name: 'SmartSeatTicketing',
    role: 'Admin',
    url: 'https://github.com/SmartSeatTicketing',
  },
  { name: 'Shufl-Labs', role: 'Member', url: 'https://github.com/Shufl-Labs' },
  {
    name: 'Algorand-Developer-Retreat',
    role: 'Member',
    url: 'https://github.com/Algorand-Developer-Retreat',
  },
];

export const education = [
  {
    school: 'United States International University',
    degree: 'Tourism Management',
    period: '2013 – 2017',
  },
];

export const certifications = [];
