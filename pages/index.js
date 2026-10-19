import React, { useState, useEffect, useMemo, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import ReactTypingEffect from 'react-typing-effect';

import Icon from '../components/Icon';
import Bmscis from '../components/icons/Bmscis';
import ProjectCard from '../components/ProjectCard';
import FeaturedProjectCard from '../components/FeaturedProjectCard';
import GitHubProfile from '../components/icons/GitHubProfile';
import TwitterProfile from '../components/icons/TwitterProfile';
import LinkedInProfile from '../components/icons/LinkedInProfile';
import AgentChat from '../components/AgentChat';

import {
  profile,
  about,
  skills,
  experience,
  featuredProjects,
  projects,
  organizations,
  education,
} from '../data/profile';

const CV_PATH = '/Melvin-Wafula-CV.pdf';

// schema.org Person markup, so search engines and agents can read the profile
// without parsing the page.
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  alternateName: profile.fullName,
  jobTitle: profile.title,
  description: profile.summary,
  email: `mailto:${profile.email}`,
  url: profile.site,
  address: { '@type': 'PostalAddress', addressLocality: 'Nairobi', addressCountry: 'KE' },
  sameAs: [profile.links.github, profile.links.linkedin, profile.links.blog],
  knowsLanguage: profile.languages,
  knowsAbout: skills.flatMap((s) => s.items),
  alumniOf: education.map((e) => ({ '@type': 'CollegeOrUniversity', name: e.school })),
  worksFor: experience
    .filter((job) => job.period.includes('Present'))
    .map((job) => ({ '@type': 'Organization', name: job.org })),
};

const getDimensions = (ele) => {
  const { height } = ele.getBoundingClientRect();
  const offsetTop = ele.offsetTop;
  const offsetBottom = offsetTop + height;

  return {
    height,
    offsetTop,
    offsetBottom,
  };
};

const scrollTo = (ele) => {
  ele.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
};

const logoProps = {
  columnSizing: 'w-1/4 sm:w-1/3 lg:w-1/6',
  width: 'w-16 sm:w-24',
  height: 'h-16 sm:h-24',
  padding: 'p-0',
  flexDirection: 'flex-col',
  titleMargins: 'mt-4',
  titleSize: 'text-sm sm:text-base',
  marginBottom: 'mb-4',
  marginRight: 'mr-0',
  textTransform: 'normal-case',
  fixedHeight: 'h-28',
};

const StackChips = ({ items }) => (
  <>
    {items.map((item) => (
      <span key={item} className="mb-2 mr-3 small-text text-brand">
        {item}
      </span>
    ))}
  </>
);

const SectionHeading = ({ children }) => (
  <>
    <h2 className="text-5xl">{children}</h2>
    <hr className="bg-brand w-40 h-1.5 mt-4 mb-6 border-0"></hr>
  </>
);

export default function Home() {
  const [visibleSection, setVisibleSection] = useState();
  const [scrolling, setScrolling] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);

  const headerRef = useRef(null);
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const experienceRef = useRef(null);
  const skillsRef = useRef(null);
  const myWorkRef = useRef(null);
  const contactRef = useRef(null);

  const sections = useMemo(
    () => [
      { section: 'home', label: 'Home', ref: homeRef },
      { section: 'about', label: 'About', ref: aboutRef },
      { section: 'experience', label: 'Experience', ref: experienceRef },
      { section: 'skills', label: 'Skills', ref: skillsRef },
      { section: 'my-work', label: 'My Work', ref: myWorkRef },
      { section: 'contact', label: 'Contact', ref: contactRef },
    ],
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      const { height: headerHeight } = getDimensions(headerRef.current);
      const scrollPosition = window.scrollY + headerHeight;

      const selected = sections.find(({ ref }) => {
        const ele = ref.current;
        if (ele) {
          const { offsetBottom, offsetTop } = getDimensions(ele);
          return scrollPosition >= offsetTop && scrollPosition <= offsetBottom;
        }
      });

      if (selected && selected.section !== visibleSection) {
        setVisibleSection(selected.section);
      } else if (!selected && visibleSection) {
        setVisibleSection(undefined);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [visibleSection, sections]);

  useEffect(() => {
    const handleScrolling = () => setScrolling(window.pageYOffset > 110);
    const handleResize = () => {
      if (window.innerWidth >= 1024) setNavbarOpen(false);
    };
    window.addEventListener('scroll', handleScrolling);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScrolling);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const linkClass = (section) =>
    `header_link font-semibold transition-all duration-300 ease-in-out ${
      visibleSection === section
        ? 'selected delay-300'
        : 'opacity-50 hover:opacity-100 border-b-2 border-transparent'
    }`;

  const pageTitle = `${profile.name} | ${profile.title}`;

  return (
    <div
      className={`relative w-full bg-right-bottom bg-cover bg-dark min-h-screen ${
        navbarOpen ? 'overflow-hidden' : 'overflow-auto'
      }`}
    >
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={profile.tagline} />
        <meta property="og:title" content={pageTitle}></meta>
        <meta property="og:description" content={profile.tagline}></meta>
        <meta
          property="og:image"
          content="https://raw.githubusercontent.com/BMscis/persona/master/public/projects/persona.png"
        ></meta>
        <link rel="icon" href="/favicon/favicon.ico" />
        <link rel="alternate" type="text/markdown" href="/llms.txt" title="Profile for language models" />
        <link rel="alternate" type="application/json" href="/api/profile" title="Profile as JSON" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </Head>

      <AgentChat
        email={profile.email}
        showLauncher={scrolling && visibleSection !== 'home'}
      />

      {/* Full-screen Menu */}
      <div
        className={`fixed w-full z-50 h-screen pt-24 bg-darker bg-opacity-100 transform delay-100 transition-all duration-300 ${
          navbarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'
        }`}
      >
        <div className="container relative mx-auto">
          <nav className="block ml-auto">
            <ul className="z-50 flex flex-col items-start">
              {sections.map(({ section, label, ref }) => (
                <li key={section} className="z-50 block py-2 list-none lg:inline-block">
                  <button
                    className={`text-xl ${linkClass(section)}`}
                    onClick={() => {
                      setNavbarOpen(false);
                      scrollTo(ref.current);
                    }}
                  >
                    {label}
                  </button>
                </li>
              ))}
              <li className="z-50 block py-2 list-none lg:inline-block">
                <a
                  href={profile.links.blog}
                  target="_blank"
                  rel="noreferrer"
                  className={`text-xl text-white ${linkClass('blog')}`}
                >
                  Blog
                </a>
              </li>
              <li className="z-50 block py-2 mt-6 list-none lg:inline-block">
                <a href={CV_PATH} download className="text-lg btn-brand btn-lg">
                  Download CV
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Header and Nav */}
      <header
        className={`header top-0 mx-auto flex items-center py-6 z-50 fixed w-full transition-all duration-500 h-24 ${
          scrolling && !navbarOpen ? 'bg-dark' : 'bg-transparent'
        }`}
        ref={headerRef}
      >
        <div className="container relative flex items-center mx-auto">
          {/* Logo */}
          <div className="z-50 w-12 h-12">
            <Icon IconType={Bmscis} title="Bmscis" {...logoProps} />
          </div>
          {/* Nav */}
          <nav className="block ml-auto">
            <ul className="z-50 flex items-center">
              {sections.map(({ section, label, ref }) => (
                <li key={section} className="z-50 hidden mx-4 list-none lg:inline-block">
                  <button className={linkClass(section)} onClick={() => scrollTo(ref.current)}>
                    {label}
                  </button>
                </li>
              ))}
              <li className="z-50 hidden mx-4 list-none lg:inline-block">
                <a
                  href={profile.links.blog}
                  target="_blank"
                  rel="noreferrer"
                  className={`text-white ${linkClass('blog')}`}
                >
                  Blog
                </a>
              </li>
              <li className="z-50 hidden ml-4 list-none lg:inline-block">
                <a href={CV_PATH} download className="btn-brand btn-md">
                  Download CV
                </a>
              </li>
              <li className="z-50 inline-block ml-5 list-none lg:hidden">
                <button
                  className="relative w-10 h-10 text-white focus:outline-none"
                  aria-label="Toggle menu"
                  onClick={() => setNavbarOpen(!navbarOpen)}
                >
                  <div className="absolute block w-5 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                    <span
                      aria-hidden="true"
                      className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
                        navbarOpen ? 'rotate-45' : '-translate-y-1.5'
                      }`}
                    ></span>
                    <span
                      aria-hidden="true"
                      className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
                        navbarOpen ? 'opacity-0' : 'opacity-100'
                      }`}
                    ></span>
                    <span
                      aria-hidden="true"
                      className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
                        navbarOpen ? '-rotate-45' : 'translate-y-1.5'
                      }`}
                    ></span>
                  </div>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Content Container */}
      <div className="container relative z-30 mx-auto">
        {/* Hero Content */}
        <main className="flex flex-col h-screen" id="home" ref={homeRef}>
          <div className="container relative flex flex-col items-start justify-center flex-grow px-0 mx-auto md:px-20 lg:px-24 section">
            <div className="w-full">
              <span className="text-2xl font-semibold text-brand">Hello! 👋 My name is</span>

              <h1 className="mb-4 text-5xl md:text-7xl">{profile.name}</h1>
              <h2 className="mb-4 text-3xl md:text-4xl text-light">
                <ReactTypingEffect
                  typingDelay={200}
                  speed={30}
                  eraseSpeed={30}
                  eraseDelay={1500}
                  text={profile.roles}
                />
              </h2>
              <p className="w-4/5 text-xl md:w-3/5">{profile.tagline}</p>
              <div className="flex flex-wrap gap-4 mt-4">
                <button
                  className="btn-brand btn-lg"
                  onClick={() => {
                    scrollTo(myWorkRef.current);
                  }}
                >
                  See my work
                </button>
                <a href={CV_PATH} download className="btn-outline btn-lg">
                  Download CV
                </a>
                <button
                  className="btn-outline btn-lg"
                  onClick={() => window.dispatchEvent(new Event('open-agent'))}
                >
                  Ask my AI assistant
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* About */}
        <section
          className="flex flex-col w-full px-0 md:px-20 lg:px-24 py-28 section"
          id="about"
          ref={aboutRef}
        >
          <SectionHeading>About</SectionHeading>
          <div className="flex flex-col-reverse items-start w-full md:flex-row">
            <div className="flex flex-col w-full md:pr-8 md:w-3/5">
              {about.map((paragraph, i) => (
                <p key={i} className="text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="flex w-full h-full mb-4 md:pl-8 md:w-2/5 md:mb-0">
              <Image
                src="/cvme.jpg"
                className="overflow-hidden rounded-md"
                width={880}
                height={880}
                alt={`${profile.name} headshot`}
              />
            </div>
          </div>
        </section>

        {/* Experience */}
        <section
          className="flex flex-col w-full px-0 md:px-20 lg:px-24 py-28 section"
          id="experience"
          ref={experienceRef}
        >
          <SectionHeading>Experience</SectionHeading>
          <ol className="relative border-l-2 border-mid">
            {experience.map((job) => (
              <li key={job.org} className="mb-12 ml-8 list-none">
                <span className="absolute w-4 h-4 transform rotate-45 -left-2.5 bg-brand mt-1.5"></span>
                <p className="mb-1 small-text">
                  {job.period} · {job.location}
                </p>
                <h3 className="mb-1 text-2xl">
                  {job.role} <span className="text-brand">· {job.org}</span>
                </h3>
                <p className="mb-3">{job.summary}</p>
                {job.points.length > 0 ? (
                  <ul className="mb-3 ml-5 list-disc text-light">
                    {job.points.map((point, i) => (
                      <li key={i} className="mb-2 leading-relaxed font-body">
                        {point}
                      </li>
                    ))}
                  </ul>
                ) : null}
                <div className="flex flex-wrap">
                  <StackChips items={job.stack} />
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Skills */}
        <section
          className="flex flex-col w-full px-0 md:px-20 lg:px-24 py-28 section"
          id="skills"
          ref={skillsRef}
        >
          <SectionHeading>Skills</SectionHeading>
          <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-4">
            {skills.map(({ group, items }) => (
              <div key={group} className="p-6 rounded-sm bg-mid">
                <p className="pb-3 mb-4 text-lg font-bold text-white border-b-4 border-brand">
                  {group}
                </p>
                <ul>
                  {items.map((item) => (
                    <li key={item} className="mb-1 list-none font-body text-light">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* My Work */}
        <section
          className="flex flex-col w-full px-0 md:px-20 lg:px-24 py-28 section"
          id="my-work"
          ref={myWorkRef}
        >
          <SectionHeading>My Work</SectionHeading>

          <div className="flex flex-col w-full mb-12">
            {featuredProjects.map((project) => (
              <FeaturedProjectCard
                key={project.title}
                title={project.title}
                status={project.status}
                description={project.description}
                float={`right-0`}
                flexDirection={`flex-col lg:flex-row`}
                imgWidth={'1366'}
                imgHeight={'666'}
                imgSrc={project.imgSrc}
                liveLink={project.liveLink}
                repoLink={project.repoLink}
                stack={<StackChips items={project.stack} />}
              />
            ))}
          </div>

          <h2 className="text-4xl text-center">Other Projects</h2>
          <hr className="bg-brand w-40 h-1.5 mt-4 mb-6 mx-auto border-0"></hr>
          <p className="mb-16 text-lg text-center">
            Health records, lending maths, payment tools and a few AI experiments.
          </p>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard project={project} key={project.title} />
            ))}
          </div>

          <p className="mt-16 text-lg text-center">
            I administer or contribute to these GitHub organisations:{' '}
            {organizations.map((org, i) => (
              <span key={org.name}>
                <a href={org.url} target="_blank" rel="noreferrer" className="underline-link">
                  {org.name}
                </a>
                {i < organizations.length - 1 ? ', ' : '.'}
              </span>
            ))}
          </p>
        </section>

        {/* Contact */}
        <section
          className="flex flex-col w-full px-0 md:px-20 lg:px-24 py-28 section"
          id="contact"
          ref={contactRef}
        >
          <SectionHeading>Contact</SectionHeading>
          <div className="w-full">
            <p className="text-lg">
              I'm looking for senior backend work in digital assets or digital health, remote or
              in Nairobi. I also take on contract work for payment, lending and health-data systems.
            </p>
            <p className="text-lg">
              Email me at{' '}
              <a href={`mailto:${profile.email}`} className="underline-link">
                {profile.email}
              </a>{' '}
              or{' '}
              <a href={CV_PATH} download className="underline-link">
                download my CV
              </a>
              .
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="flex flex-col w-full px-0 py-16 md:px-20 lg:px-24 section">
          <hr className="w-full h-1 mb-16 bg-white border-0 opacity-10"></hr>
          <div className="w-8 mb-4">
            <Icon IconType={Bmscis} title="Bmscis" {...logoProps} />
          </div>

          <div className="flex flex-col items-start md:flex-row">
            <p className="w-auto mb-4 md:mb-0">
              &copy; Designed and built by {profile.name} {new Date().getFullYear()}
            </p>

            <div className="flex md:hidden">
              <span className="mr-2">
                <GitHubProfile marginBottom={'mb-0'} />
              </span>
              <span className="mr-2">
                <TwitterProfile marginBottom={'mb-0'} />
              </span>
              <span className="mr-2">
                <LinkedInProfile marginBottom={'mb-0'} />
              </span>
            </div>
          </div>
        </footer>
      </div>

      {/* Fixed Container */}
      <div className="fixed bottom-0 z-30 w-full">
        <div className="container relative flex h-full mx-auto">
          {/* Profile Icons */}
          <div className="absolute bottom-0 items-center hidden mt-auto mr-auto text-white left-8 md:flex md:flex-col">
            <GitHubProfile marginBottom={'mb-4'} />
            <TwitterProfile marginBottom={'mb-4'} />
            <LinkedInProfile marginBottom={'mb-4'} />
            <div className="w-0.5 bg-white h-24 opacity-20 mt-2"></div>
          </div>

          {/* Pagination */}
          <div className="absolute bottom-0 items-center hidden mt-auto ml-auto text-white right-8 md:flex md:flex-col">
            {sections.map(({ section, label, ref }) => (
              <button
                key={section}
                className="w-5 h-5 mb-4"
                aria-label={`Go to ${label}`}
                onClick={() => {
                  scrollTo(ref.current);
                }}
              >
                <svg
                  className={`group rounded-sm transform transition duration-500 ease-in-out hover:rotate-45 hover:scale-110 ${
                    visibleSection === section ? 'rotate-45 scale-110' : 'rotate-0 scale-100'
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  {/* Fill */}
                  <path
                    className={`fill-current origin-center transform transition duration-200 ease-in-out group-hover:text-dark group-hover:rotate-90 ${
                      visibleSection === section ? 'text-white rotate-90' : 'text-dark rotate-0'
                    }`}
                    d="M5.64 5.64h12.73v12.73H5.64z"
                  />
                  {/* Border */}
                  <path
                    className={`fill-current origin-center transform transition duration-500 ease-in-out group-hover:text-white group-hover:rotate-45 group-hover:opacity-100 ${
                      visibleSection === section
                        ? 'text-white rotate-45 opacity-100'
                        : 'text-white rotate-45 opacity-40'
                    }`}
                    d="M12 22.41L1.59 12 12 1.59 22.41 12zM4.41 12L12 19.59 19.59 12 12 4.41z"
                  />
                </svg>
              </button>
            ))}

            {/* Line */}
            <div className="w-0.5 bg-white h-24 opacity-20 mt-2 z-30"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
