// Served at /llms.txt (see next.config.js rewrites): a plain-markdown summary that
// language models can read without parsing the site. Format: https://llmstxt.org

import { profile, experience, projects, featuredProjects, skills, education } from '../../data/profile';
import { LINKS } from '../../lib/portfolio-tools';

const render = () => {
  const lines = [
    `# ${profile.name}`,
    '',
    `> ${profile.title}, ${profile.location}. ${profile.tagline}`,
    '',
    profile.summary,
    '',
    '## Machine-readable',
    '',
    `- [CV (PDF)](${LINKS.cv_pdf})`,
    `- [Full profile as JSON](${LINKS.profile_json})`,
    `- MCP server (Streamable HTTP, read-only tools): ${LINKS.mcp}`,
    `- Contact: ${profile.email}`,
    '',
    '## Experience',
    '',
    ...experience.map((job) => `- **${job.role}, ${job.org}** (${job.period}). ${job.summary}`),
    '',
    '## Projects',
    '',
    ...featuredProjects.map((p) => `- [${p.title}](${p.liveLink}): ${p.description}`),
    ...projects.map((p) => `- **${p.title}** (${p.period}): ${p.overview}`),
    '',
    '## Skills',
    '',
    ...skills.map((s) => `- ${s.group}: ${s.items.join(', ')}`),
    '',
    '## Education',
    '',
    ...education.map((e) => `- ${e.degree}, ${e.school} (${e.period})`),
    '',
  ];
  return lines.join('\n');
};

export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.status(200).send(render());
}
