// Read-only tools over data/profile.js. The same definitions back two front doors:
//   pages/api/mcp.js    MCP server for visiting AI agents
//   pages/api/agent.js  the on-site assistant (DeepSeek, OpenAI-format tool calls)
// Every answer either assistant gives is built from these results, so neither can
// say anything the CV does not.

import {
  profile,
  about,
  skills,
  experience,
  earlierCareer,
  featuredProjects,
  projects,
  organizations,
  education,
} from '../data/profile';

const SECTIONS = [
  'summary',
  'experience',
  'skills',
  'projects',
  'education',
  'organizations',
  'contact',
];

const SITE = profile.site;

export const LINKS = {
  site: SITE,
  cv_pdf: `${SITE}/Melvin-Wafula-CV.pdf`,
  profile_json: `${SITE}/api/profile`,
  llms_txt: `${SITE}/llms.txt`,
  mcp: `${SITE}/api/mcp`,
};

const sectionData = (section) => {
  switch (section) {
    case 'summary':
      return { name: profile.name, title: profile.title, summary: profile.summary, about };
    case 'experience':
      return { experience, earlier_career: earlierCareer };
    case 'skills':
      return { skills };
    case 'projects':
      return { featured: featuredProjects, other: projects };
    case 'education':
      return { education, languages: profile.languages };
    case 'organizations':
      return { github_organizations: organizations };
    case 'contact':
      return {
        email: profile.email,
        location: profile.location,
        links: { ...profile.links, cv_pdf: LINKS.cv_pdf, site: SITE },
      };
    default:
      return null;
  }
};

// Flatten the profile into small searchable documents, each with a source label.
const documents = () => [
  ...experience.map((job) => ({
    source: `experience: ${job.role}, ${job.org} (${job.period})`,
    text: [job.summary, ...job.points, job.stack.join(', ')].join(' '),
  })),
  ...featuredProjects.map((p) => ({
    source: `project: ${p.title}`,
    text: [p.description, p.stack.join(', '), p.liveLink || ''].join(' '),
  })),
  ...projects.map((p) => ({
    source: `project: ${p.title} (${p.period})`,
    text: [p.overview, p.stack.join(', ')].join(' '),
  })),
  ...skills.map((s) => ({ source: `skills: ${s.group}`, text: s.items.join(', ') })),
  ...about.map((text, i) => ({ source: `about (paragraph ${i + 1})`, text })),
  { source: 'summary', text: profile.summary },
  { source: 'earlier career', text: earlierCareer },
];

const words = (text) =>
  text
    .toLowerCase()
    .split(/[^a-z0-9.+#-]+/)
    .filter((w) => w.length > 2);

const searchPortfolio = (query) => {
  const terms = [...new Set(words(query))];
  if (terms.length === 0) return { query, results: [] };
  const results = documents()
    .map((doc) => {
      const lower = doc.text.toLowerCase();
      const hits = terms.filter((t) => lower.includes(t));
      return { ...doc, score: hits.length, matched_terms: hits };
    })
    .filter((doc) => doc.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map(({ score, ...doc }) => doc);
  return { query, results };
};

// Terms a job description might use, mapped to how the profile names them.
// Only terms backed by the profile appear on the left.
const SKILL_ALIASES = {
  typescript: 'TypeScript',
  javascript: 'JavaScript',
  python: 'Python',
  sql: 'SQL',
  'node.js': 'Node.js',
  nodejs: 'Node.js',
  node: 'Node.js',
  express: 'Express',
  rest: 'REST APIs',
  api: 'REST APIs',
  postgres: 'PostgreSQL',
  postgresql: 'PostgreSQL',
  redis: 'Redis',
  supabase: 'Supabase',
  firebase: 'Firebase / Firestore',
  firestore: 'Firebase / Firestore',
  react: 'React',
  'next.js': 'Next.js',
  nextjs: 'Next.js',
  tailwind: 'Tailwind CSS',
  svelte: 'Svelte',
  'react native': 'React Native / Expo',
  expo: 'React Native / Expo',
  electron: 'Electron',
  aws: 'AWS',
  vercel: 'Vercel',
  docker: 'Docker',
  'ci/cd': 'GitHub Actions',
  'github actions': 'GitHub Actions',
  jest: 'Jest',
  playwright: 'Playwright',
  pytest: 'pytest',
  testing: 'Testing',
  blockchain: 'Blockchain (Algorand)',
  algorand: 'Algorand',
  'smart contract': 'Smart contracts',
  'smart contracts': 'Smart contracts',
  web3: 'Blockchain (Algorand)',
  defi: 'Lending protocols',
  lending: 'Lending protocols',
  payments: 'Payments (x402, USDC, escrow)',
  payment: 'Payments (x402, USDC, escrow)',
  stablecoin: 'USDC settlement',
  usdc: 'USDC settlement',
  bitcoin: 'Bitcoin (MulaStack)',
  crypto: 'Blockchain (Algorand)',
  'digital assets': 'Digital assets',
  tokenization: 'Real-world asset tokenisation (Jasiri)',
  nft: 'NFT marketplaces',
  fintech: 'Fintech',
  fhir: 'HL7 FHIR',
  hl7: 'HL7 FHIR',
  'digital health': 'Digital health',
  'health informatics': 'Digital health',
  interoperability: 'Health data interoperability',
  'who smart': 'WHO SMART Guidelines',
  'clinical decision support': 'Clinical decision support',
  bpmn: 'BPMN',
  'icd-11': 'ICD-11',
  loinc: 'LOINC',
  llm: 'LLM pipelines',
  ai: 'AI tooling',
  agents: 'Agentic workflows',
  agentic: 'Agentic workflows',
  'knowledge graph': 'Knowledge graphs',
};

// Common requirements the profile has no evidence for. Reported as gaps, never as matches.
const KNOWN_GAPS = [
  'java', 'kotlin', 'go', 'golang', 'rust', 'c#', '.net', 'php', 'ruby', 'scala', 'c++',
  'kubernetes', 'terraform', 'kafka', 'rabbitmq', 'graphql', 'grpc', 'mongodb', 'mysql',
  'dynamodb', 'elasticsearch', 'gcp', 'azure', 'spring', 'django', 'fastapi', 'flask',
  'solidity', 'ethereum', 'evm', 'solana', 'hyperledger', 'swift', 'flutter', 'dart',
  'angular', 'vue', 'hipaa', 'gdpr', 'openmrs', 'dhis2', 'hl7 v2', 'spark', 'airflow',
];

const hasTerm = (lowerText, term) => {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`).test(lowerText);
};

const matchJobDescription = (jobDescription) => {
  const jd = jobDescription.toLowerCase();
  const matched = new Map();
  for (const [term, skill] of Object.entries(SKILL_ALIASES)) {
    if (hasTerm(jd, term)) matched.set(skill, [...(matched.get(skill) || []), term]);
  }
  const gaps = KNOWN_GAPS.filter((term) => hasTerm(jd, term));

  const matchedTerms = [...matched.values()].flat();
  const relevant = documents()
    .filter((doc) => doc.source.startsWith('experience') || doc.source.startsWith('project'))
    .map((doc) => {
      const lower = doc.text.toLowerCase();
      const hits = matchedTerms.filter((t) => hasTerm(lower, t));
      return { source: doc.source, matched_terms: [...new Set(hits)], evidence: doc.text };
    })
    .filter((doc) => doc.matched_terms.length > 0)
    .sort((a, b) => b.matched_terms.length - a.matched_terms.length)
    .slice(0, 5);

  return {
    matched_skills: [...matched.entries()].map(([skill, terms]) => ({ skill, job_terms: terms })),
    requirements_without_evidence: gaps,
    most_relevant_experience: relevant,
    note: 'Matching is keyword-based. Treat gaps as "not shown in the profile", not as "cannot do".',
  };
};

// Tool definitions in a neutral shape; each front door adapts them to its wire format.
export const tools = [
  {
    name: 'get_profile_section',
    title: 'Get profile section',
    description:
      "Return one section of Melvin Wafula's CV as structured data: summary, experience, skills, projects, education, organizations or contact.",
    inputSchema: {
      type: 'object',
      properties: {
        section: { type: 'string', enum: SECTIONS, description: 'Which section to return.' },
      },
      required: ['section'],
      additionalProperties: false,
    },
    run: ({ section }) => {
      const data = sectionData(section);
      if (!data) throw new Error(`Unknown section "${section}". Use one of: ${SECTIONS.join(', ')}.`);
      return data;
    },
  },
  {
    name: 'search_portfolio',
    title: 'Search portfolio',
    description:
      "Keyword search across Melvin's experience, projects, skills and about text. Returns the matching passages with where each came from.",
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Words to look for, e.g. "FHIR registry" or "escrow payments".' },
      },
      required: ['query'],
      additionalProperties: false,
    },
    run: ({ query }) => searchPortfolio(String(query || '')),
  },
  {
    name: 'match_job_description',
    title: 'Match job description',
    description:
      "Compare a job description with Melvin's profile. Returns skills with evidence, requirements the profile shows no evidence for, and the most relevant roles and projects.",
    inputSchema: {
      type: 'object',
      properties: {
        job_description: { type: 'string', description: 'The full text of the job description.' },
      },
      required: ['job_description'],
      additionalProperties: false,
    },
    run: ({ job_description }) => matchJobDescription(String(job_description || '')),
  },
];

export const runTool = (name, args) => {
  const tool = tools.find((t) => t.name === name);
  if (!tool) throw new Error(`Unknown tool "${name}".`);
  return tool.run(args || {});
};
