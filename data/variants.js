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
};

// Returns the CV data with a variant applied, or the base CV for an unknown name.
export const applyVariant = (name) => {
  const v = variants[name];
  if (!v) return { ...base, variant: null };

  const byGroup = new Map(base.skills.map((s) => [s.group, s]));
  const skills = [
    ...v.skillsOrder.map((g) => byGroup.get(g)).filter(Boolean),
    ...base.skills.filter((s) => !v.skillsOrder.includes(s.group)),
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
