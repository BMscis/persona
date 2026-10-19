import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { applyVariant } from '../data/variants';

// Printable CV. Rendered on screen at /cv and printed to
// public/Melvin-Wafula-CV.pdf by scripts/build-cv-pdf.mjs.
// /cv?variant=<name> applies a role-specific variant from data/variants.js.

const stripScheme = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

// "A, B, C and D" with each name linked.
const OrgList = ({ orgs }) => (
  <>
    {orgs.map((org, i) => (
      <span key={org.name}>
        {i > 0 ? (i === orgs.length - 1 ? ' and ' : ', ') : ''}
        <a className="font-semibold text-gray-800 hover:text-brand" href={org.url}>
          {org.name}
        </a>
      </span>
    ))}
  </>
);

const SectionTitle = ({ children }) => (
  <h2 className="mt-5 mb-2 font-body text-xs font-bold tracking-widest uppercase text-brand border-b border-gray-200 pb-1">
    {children}
  </h2>
);

export default function CV() {
  const { query } = useRouter();
  const {
    profile,
    skills,
    experience,
    projects,
    organizations,
    education,
    certifications,
    variant,
  } = applyVariant(query.variant);

  return (
    <div className="min-h-screen bg-gray-100 print:bg-white">
      <Head>
        <title>{`${profile.name} | CV`}</title>
        <meta name="description" content={`CV of ${profile.name}, ${profile.title}`} />
        <meta name="robots" content="noindex" />
      </Head>
      <style jsx global>{`
        body {
          background: #f3f4f6;
          color: #111827;
        }
        @page {
          size: A4;
          margin: 14mm 14mm 14mm 14mm;
        }
        @media print {
          html {
            font-size: 12.5px;
          }
          body {
            background: #fff;
          }
          .cv-entry {
            break-inside: avoid;
          }
        }
      `}</style>

      <div
        className={`flex justify-end max-w-3xl px-4 pt-6 mx-auto print:hidden ${variant ? 'invisible' : ''}`}
      >
        <a
          href="/Melvin-Wafula-CV.pdf"
          download
          className="px-4 py-2 text-sm text-white rounded-sm bg-brand hover:bg-brandAlt hover:text-white"
        >
          Download PDF
        </a>
      </div>

      <article className="max-w-3xl px-10 py-10 mx-auto my-4 bg-white shadow-sm print:shadow-none print:p-0 print:m-0 print:max-w-none font-body text-gray-800 text-sm leading-snug">
        {/* Header */}
        <header>
          <h1 className="mb-0 text-3xl text-gray-900 md:text-3xl">{profile.name}</h1>
          <p className="mb-1 text-base font-semibold text-brand">{profile.title}</p>
          <p className="mb-0 text-xs text-gray-600">
            {profile.location} ·{' '}
            <a className="text-gray-600 hover:text-brand" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>{' '}
            ·{' '}
            <a className="text-gray-600 hover:text-brand" href={`tel:${profile.phone.replace(/\s/g, '')}`}>
              {profile.phone}
            </a>
            <br />

            <a className="text-gray-600 hover:text-brand" href={profile.site}>
              {stripScheme(profile.site)}
            </a>{' '}
            ·{' '}
            <a className="text-gray-600 hover:text-brand" href={profile.links.github}>
              {stripScheme(profile.links.github)}
            </a>{' '}
            ·{' '}
            <a className="text-gray-600 hover:text-brand" href={profile.links.linkedin}>
              {stripScheme(profile.links.linkedin)}
            </a>
          </p>
          <p className="mt-1 mb-0 text-xs text-gray-600">
            <span className="font-semibold text-gray-900">Ask my AI assistant</span> at{' '}
            <a className="text-gray-600 hover:text-brand" href={profile.site}>
              {stripScheme(profile.site)}
            </a>
            . AI agents can read{' '}
            <a className="text-gray-600 hover:text-brand" href={`${profile.site}/llms.txt`}>
              {stripScheme(profile.site)}/llms.txt
            </a>{' '}
            or connect to my MCP server at{' '}
            <a className="text-gray-600 hover:text-brand" href={`${profile.site}/api/mcp`}>
              {stripScheme(profile.site)}/api/mcp
            </a>
            .
          </p>
        </header>

        <SectionTitle>Profile</SectionTitle>
        <p className="mb-0 text-sm leading-snug text-gray-800">{profile.summary}</p>

        <SectionTitle>Skills</SectionTitle>
        <dl className="grid grid-cols-1 gap-y-0.5">
          {skills.map(({ group, items }) => (
            <div key={group} className="flex text-sm">
              <dt className="flex-shrink-0 w-40 font-semibold text-gray-900">{group}</dt>
              <dd className="text-gray-700">{items.join(' · ')}</dd>
            </div>
          ))}
        </dl>

        <SectionTitle>Experience</SectionTitle>
        {experience.map((job) => (
          <section key={job.org} className="mb-3 cv-entry">
            <div className="flex items-baseline justify-between">
              <h3 className="mb-0 font-body text-sm font-bold text-gray-900 md:text-sm">
                {job.role} · <span className="text-brand">{job.org}</span>
              </h3>
              <span className="flex-shrink-0 ml-4 text-xs text-gray-500">
                {job.period}
              </span>
            </div>
            <p className="mb-1 text-sm italic leading-snug text-gray-600">{job.summary}</p>
            {job.points.length > 0 ? (
              <ul className="pl-4 list-disc">
                {job.points.map((point, i) => (
                  <li key={i} className="mb-0.5 text-gray-800">
                    {point}
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}

        <SectionTitle>Selected projects</SectionTitle>
        {projects.filter((project) => project.cv).map((project) => (
          <section key={project.title} className="mb-2 cv-entry">
            <div className="flex items-baseline justify-between">
              <h3 className="mb-0 font-body text-sm font-bold text-gray-900 md:text-sm">
                {project.title}
                {project.repo ? (
                  <a className="ml-2 text-xs font-normal text-gray-500" href={project.repo}>
                    {stripScheme(project.repo)}
                  </a>
                ) : null}
              </h3>
              <span className="flex-shrink-0 ml-4 text-xs text-gray-500">
                {project.period}
              </span>
            </div>
            <p className="mb-0 text-sm leading-snug text-gray-800">{project.overview}</p>
          </section>
        ))}

        {education.length > 0 ? (
          <>
            <SectionTitle>Education</SectionTitle>
            {education.map((item) => (
              <div key={item.school} className="flex items-baseline justify-between mb-1 cv-entry">
                <p className="mb-0 text-sm text-gray-800">
                  <span className="font-semibold text-gray-900">{item.degree}</span>, {item.school}
                </p>
                <span className="flex-shrink-0 ml-4 text-xs text-gray-500">{item.period}</span>
              </div>
            ))}
          </>
        ) : null}

        {certifications.length > 0 ? (
          <>
            <SectionTitle>Certifications</SectionTitle>
            <p className="mb-0 text-sm text-gray-800">{certifications.join(' · ')}</p>
          </>
        ) : null}

        <SectionTitle>Organisations and languages</SectionTitle>
        <p className="mb-0 text-sm text-gray-800">
          I run the <OrgList orgs={organizations.filter((o) => o.role === 'Admin')} /> GitHub
          organisations and contribute to{' '}
          <OrgList orgs={organizations.filter((o) => o.role !== 'Admin')} />. I write at{' '}
          {stripScheme(profile.links.blog)}, and I speak {profile.languages.join(' and ')}.
        </p>
      </article>
    </div>
  );
}
