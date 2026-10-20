// Role-specific versions of the CV. A variant changes emphasis and order only:
// every fact still comes from data/profile.js, and variant bullets restate the
// same work in the target employer's terms. Print one with
//   CV_VARIANT=google npm run cv
// which writes variants/Melvin-Wafula-CV-<Variant>.pdf (git-ignored).

import * as base from './profile';

export const variants = {
  google: {
    title: 'Senior Software Engineer, Backend & Full-Stack',
    location: 'Nairobi, Kenya',
    summary:
      "Software engineer in Nairobi with five years of software development, four and a half of them professional, mostly on server-side systems where users see every mistake, such as purchases, marketplaces, lending and games. I design and ship backends in Node.js, TypeScript and Python, and I write the tests that guard them. I led development as Lead Developer at Safariblocks and as founder of PentacostAi. Two of the products I've built are games that are live today. One is AlgoCity, a four-player strategy game, and the other is the Mutant vs Zombies staking battles. I'm comfortable owning a feature from design review to production debugging, and I use AI coding tools every day, behind review gates that keep the output trustworthy.",
    skillsOrder: [
      'Languages',
      'Backend',
      'Testing',
      'Cloud & delivery',
      'Frontend & apps',
      'AI tooling',
      'Digital assets',
      'Digital health',
    ],
    points: {
      PentacostAi: [
        'Designed and built the game end to end, with its rules written as six smart contracts, a Next.js client, and a keeper service on Fly.io that keeps games moving when a player steps away.',
        'Built the purchase flow. One payment opens a game table, the charge settles only after the table exists, and each payment can be used once, so retries and double taps are safe.',
        'Wrote a specification for every contract and test suites in pytest, Jest and Playwright. Behaviour is proven in tests before each release.',
      ],
      'Shufl Labs': [
        'Reworked the Goanna lending platform, which now handles over $10,000 in loans a month, and brought its cloud costs down significantly.',
        'Leading the redesign that merges two legacy marketplace backends, one on AWS EC2 and one on App Engine with Firestore, into a single Node.js and Express service on PostgreSQL and Redis.',
        'Made purchases safe to retry. Each transaction carries a unique key, and a background reconciler checks stuck transactions against the source of truth and repairs the records. 300 automated tests cover the service.',
        "Run a design review before and after each module is ported, and review the code before it merges, including code written by AI tools.",
        'Traced a security flaw in the old code, an encryption key hardcoded with its IV reused, and designed the replacement, which reads secrets from AWS Secrets Manager.',
        'Built the Mutant vs Zombies staking battle game and worked on the Shufl NFT marketplace. Both are live.',
      ],
    },
    projects: ['Kenya Renal Registry', 'Kidney guidelines to WHO SMART', 'DEFI-P2P', 'Algox402 SDK'],
  },

  // Web platform developer roles at UN agencies. Adds the evidence confirmed in the
  // job-requirements review (PHP via the WordPress migration, PostgreSQL search,
  // AI retrieval). Drupal, Elasticsearch and multilingual CMS work are left out
  // because there is no evidence for them.
  un: {
    title: 'Senior Full-Stack Developer, Web Platforms',
    location: 'Nairobi, Kenya · Open to remote work',
    summary:
      "Full-stack developer with over four years of professional experience building and modernising web platforms in TypeScript, JavaScript, Python and PHP. I moved RandGallery.com off a custom WordPress theme and onto Next.js, and I'm leading the merge of two legacy marketplace backends into one Node.js service on PostgreSQL and Redis. I build interfaces in React and Next.js, put REST APIs and relational databases behind them, and use Git, code review and CI/CD on my projects. I've also built search and retrieval, from fuzzy PostgreSQL search to an AI assistant that answers only from structured data. Since 2025 I've worked in digital health on WHO SMART Guidelines, and I want to bring the same care to platforms that serve the public.",
    skillsOrder: [
      'Languages',
      'Frontend & apps',
      'Backend',
      'Cloud & delivery',
      'Testing',
      'AI tooling',
      'Digital health',
      'Digital assets',
    ],
    skillsAdd: {
      Languages: ['PHP (WordPress)', 'HTML5', 'CSS3'],
      'Frontend & apps': ['WordPress (custom themes, migration)'],
      Backend: ['PostgreSQL trigram search'],
      'AI tooling': ['Tool-based retrieval', 'MCP servers'],
    },
    points: {
      'Shufl Labs': [
        "Moved RandGallery.com off its custom WordPress theme, written in PHP and hosted on Linode, onto the Shufl platform's Next.js and TypeScript stack. I ported the Shuffle page, fixed image loading from IPFS and the production build, and retired the old site, which now redirects to the new platform.",
        'Leading the merge of two legacy marketplace backends, Shufl on AWS EC2 and RandSwap on Google App Engine with Firestore, into one Node.js and Express service on PostgreSQL and Redis.',
        "Built the platform's search on PostgreSQL trigram similarity. It finds collections and NFTs by approximate name and ranks exact ID matches first, and a separate aggregator merges listings from several marketplaces and removes duplicates.",
        "Each transaction is submitted under a unique key, so a retry can't charge anyone twice. A background reconciler checks stuck transactions against the chain and corrects the records, and 300 automated tests cover the service.",
        "I review each module's design before it's ported and again afterwards, including code written by AI tools.",
        'Found an encryption key hardcoded in the old code, with its IV reused. The new service keeps no keys in code and reads secrets from AWS Secrets Manager.',
        'Reworked the Goanna lending platform, which now handles over $10,000 in loans a month, and brought its cloud costs down significantly.',
      ],
      PentacostAi: [
        'Designed and built AlgoCity end to end, with six smart contracts, a Next.js client and a keeper service on Fly.io.',
        'Built a paid web endpoint where one payment opens a game table. The charge settles only after the table exists, and a payment can never be used twice.',
        'Wrote a specification for every contract and covered the system with pytest, Jest and Playwright tests.',
      ],
    },
    projects: [
      'Kenya Renal Registry',
      'Kidney guidelines to WHO SMART',
      'Digital Health Ecosystem Explorer',
      'Portfolio AI assistant and MCP server',
    ],
  },
};

// Returns the CV data with a variant applied, or the base CV for an unknown name.
export const applyVariant = (name) => {
  const v = variants[name];
  if (!v) return { ...base, variant: null };

  const byGroup = new Map(
    base.skills.map((s) => [s.group, { ...s, items: [...s.items, ...((v.skillsAdd || {})[s.group] || [])] }])
  );
  const skills = [
    ...v.skillsOrder.map((g) => byGroup.get(g)).filter(Boolean),
    ...base.skills.filter((s) => !v.skillsOrder.includes(s.group)).map((s) => byGroup.get(s.group)),
  ];
  const experience = base.experience.map((job) =>
    v.points[job.org] ? { ...job, points: v.points[job.org] } : job
  );
  const projects = v.projects
    .map((title) => base.projects.find((p) => p.title === title))
    .filter(Boolean)
    .map((p) => ({ ...p, cv: true }));

  return {
    ...base,
    profile: { ...base.profile, title: v.title, summary: v.summary, location: v.location || base.profile.location },
    skills,
    experience,
    projects,
    variant: name,
  };
};
