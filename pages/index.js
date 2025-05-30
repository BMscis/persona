import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import ReactTypingEffect from 'react-typing-effect';

import Icon from '../components/Icon';
// Icons
import Html from '../components/icons/Html';
import Css from '../components/icons/Css';
import Javascript from '../components/icons/Javascript';
import ReachIcon from '../components/icons/ReachIcon';
import SvelteIcon from '../components/icons/SvelteIcon';
import AlgoIcon from '../components/icons/AlgoIcon';
import EthIcon from '../components/icons/EthIcon';
import Bmscis from '../components/icons/Bmscis';
import Tailwind from '../components/icons/Tailwind';
import Bootstrap from '../components/icons/Bootstrap';
import Sass from '../components/icons/Sass';
import ReactJs from '../components/icons/ReactJs';
import NextJs from '../components/icons/NextJs';
import NodeJs from '../components/icons/NodeJs';
import Firebase from '../components/icons/Firebase';
import Figma from '../components/icons/Figma';
import Photoshop from '../components/icons/Photoshop';
import Illustrator from '../components/icons/Illustrator';
import AfterEffects from '../components/icons/AfterEffects';
import AdobeXd from '../components/icons/AdobeXd';
// Project Card
import ProjectCard from '../components/ProjectCard';
import GitHubProfile from '../components/icons/GitHubProfile';
import TwitterProfile from '../components/icons/TwitterProfile';
import LinkedInProfile from '../components/icons/LinkedInProfile';
import FeaturedProjectCard from '../components/FeaturedProjectCard';
import AwsIcon from '../components/icons/AwsIcon';
import Python from '../components/icons/python';

const projects = [
  {
    title: 'DEFI-P2P',
    overview: 'A P2P lending platform on the Algorand blockchain.',
    stack: ['Nexjs', 'Algokit'],
    link: null,
    repo: '',
    isSiteLive: false,
  },

];

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

export default function Home() {
  const [visibleSection, setVisibleSection] = useState();
  const [scrolling, setScrolling] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    if (window.innerWidth < 1024) {
    } else {
      setNavbarOpen(false);
    }
  };

  const headerRef = useRef(null);
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const myWorkRef = useRef(null);
  const blogRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const sectionRefs = [
      { section: 'home', ref: homeRef, id: 1 },
      { section: 'about', ref: aboutRef, id: 2 },
      { section: 'skills', ref: skillsRef, id: 3 },
      { section: 'my-work', ref: myWorkRef, id: 4 },
      { section: 'blog', ref: blogRef, id: 5 },
      { section: 'contact', ref: contactRef, id: 6 },
    ];

    const handleScroll = () => {
      const { height: headerHeight } = getDimensions(headerRef.current);
      const scrollPosition = window.scrollY + headerHeight;

      const selected = sectionRefs.find(({ section, ref }) => {
        const ele = ref.current;
        if (ele) {
          const { offsetBottom, offsetTop } = getDimensions(ele);
          return scrollPosition >= offsetTop && scrollPosition <= offsetBottom;
        }
      });

      if (selected && selected.section !== visibleSection) {
        setVisibleSection(selected.section);
        // console.log(visibleSection);
      } else if (!selected && visibleSection) {
        setVisibleSection(undefined);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [visibleSection]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () =>
        setScrolling(window.pageYOffset > 110)
      );
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  });

  return (
    <div
      className={`relative w-full bg-right-bottom bg-cover bg-dark overflow-auto min-h-screen ${navbarOpen ? 'overflow-hidden' : 'overflow-auto'
        }`}
    >
      <Head>
        <title>Melvin Wafula | Backend Developer & Blockchain Developer</title>
        <meta
          name="description"
          content="The portfolio of backend developer and blockchain developer, Melvin Wafula"
        />
        <meta
          property="og:title"
          content="Melvin Wafula | Backend Developer and Blockchain Developer"
        ></meta>
        <meta
          property="og:image"
          content="https://github.com/BMscis/persona/blob/2927783b3ac490cd28efa5481d9ced2daad62a1d/public/projects/persona.png"
        ></meta>
        <link rel="icon" href="/favicon/favicon.ico" />
      </Head>

      {/* Full-screen Menu */}
      <div
        className={`fixed w-full z-50 h-screen pt-24 bg-darker bg-opacity-100 transform delay-100 transition-all duration-300 ${navbarOpen
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 -translate-x-full'
          }`}
      >
        <div className="container relative mx-auto">
          <nav className="block ml-auto">
            <ul className="z-50 flex flex-col items-start">
              <li className="z-50 block py-2 list-none lg:inline-block">
                <button
                  href="#"
                  className={`header_link text-xl font-semibold transition-all duration-300 ease-in-out ${visibleSection === 'home'
                    ? 'selected delay-300'
                    : 'opacity-50 hover:opacity-100 border-b-2 border-transparent'
                    }`}
                  onClick={() => {
                    setNavbarOpen(false);
                    scrollTo(homeRef.current);
                  }}
                >
                  Home
                </button>
              </li>
              <li className="z-50 block py-2 list-none lg:inline-block">
                <button
                  href="#"
                  className={`header_link text-xl font-semibold transition-all duration-300 ease-in-out ${visibleSection === 'about'
                    ? 'selected delay-300'
                    : 'opacity-50 hover:opacity-100 border-b-2 border-transparent'
                    }`}
                  onClick={() => {
                    setNavbarOpen(false);
                    scrollTo(aboutRef.current);
                  }}
                >
                  About
                </button>
              </li>
              <li className="z-50 block py-2 list-none lg:inline-block">
                <button
                  href="#"
                  className={`header_link text-xl font-semibold transition-all duration-300 ease-in-out ${visibleSection === 'skills'
                    ? 'selected delay-300'
                    : 'opacity-50 hover:opacity-100 border-b-2 border-transparent'
                    }`}
                  onClick={() => {
                    setNavbarOpen(false);
                    scrollTo(skillsRef.current);
                  }}
                >
                  Skills
                </button>
              </li>
              <li className="z-50 block py-2 list-none lg:inline-block">
                <button
                  href="#"
                  className={`header_link text-xl font-semibold transition-all duration-300 ease-in-out ${visibleSection === 'my-work'
                    ? 'selected delay-300'
                    : 'opacity-50 hover:opacity-100 border-b-2 border-transparent'
                    }`}
                  onClick={() => {
                    setNavbarOpen(false);
                    scrollTo(myWorkRef.current);
                  }}
                >
                  My Work
                </button>
              </li>
              <li className="z-50 block py-2 list-none lg:inline-block">
                <a
                  href="https://bmscis.hashnode.dev/"
                  target="_blank"
                  rel="noreferrer"
                  className={`header_link text-xl font-semibold transition-all duration-300 ease-in-out text-white ${visibleSection === 'blog'
                    ? 'selected delay-300'
                    : 'opacity-50 hover:opacity-100 border-b-2 border-transparent'
                    }`}
                >
                  Blog
                </a>
              </li>
              <li className="z-50 block py-2 list-none lg:inline-block">
                <button
                  href="#"
                  className={`header_link text-xl font-semibold transition-all duration-300 ease-in-out ${visibleSection === 'contact'
                    ? 'selected delay-300'
                    : 'opacity-50 hover:opacity-100 border-b-2 border-transparent'
                    }`}
                  onClick={() => {
                    setNavbarOpen(false);
                    scrollTo(contactRef.current);
                  }}
                >
                  Contact
                </button>
              </li>
              <li className="z-50 block py-2 mt-6 list-none lg:inline-block">
                <a
                  href={`mailto:melvinwafula@gmail.com`}
                  className="text-lg btn-brand btn-lg"
                >
                  Hire me
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Header and Nav */}
      <header
        className={`header top-0 mx-auto flex items-center py-6 z-50 fixed w-full transition-all duration-500 h-24 ${scrolling && !navbarOpen ? 'bg-dark' : 'bg-transparent'
          }`}
        ref={headerRef}
      >
        {/* Logo and Nav container */}
        <div className="container relative flex items-center mx-auto">
          {/* Logo */}
          <div className="z-50 w-12 h-12">
            <Icon
              IconType={Bmscis}
              title="Bmscis"
              columnSizing={'w-1/4 sm:w-1/3 lg:w-1/6'}
              width={'w-16 sm:w-24'}
              height={'h-16 sm:h-24'}
              padding={'p-0'}
              flexDirection={'flex-col'}
              titleMargins={'mt-4'}
              titleSize={'text-sm sm:text-base'}
              marginBottom={'mb-4'}
              marginRight={'mr-0'}
              textTransform={'normal-case'}
              fixedHeight={'h-28'}
            />
          </div>
          {/* Nav */}
          <nav className="block ml-auto">
            <ul className="z-50 flex items-center">
              <li className="z-50 hidden mx-5 list-none lg:inline-block">
                <button
                  href="#"
                  className={`header_link font-semibold transition-all duration-300 ease-in-out ${visibleSection === 'home'
                    ? 'selected delay-300'
                    : 'opacity-50 hover:opacity-100 border-b-2 border-transparent'
                    }`}
                  onClick={() => {
                    scrollTo(homeRef.current);
                  }}
                >
                  Home
                </button>
              </li>
              <li className="z-50 hidden mx-5 list-none lg:inline-block">
                <button
                  href="#"
                  className={`header_link font-semibold transition-all duration-300 ease-in-out ${visibleSection === 'about'
                    ? 'selected delay-300'
                    : 'opacity-50 hover:opacity-100 border-b-2 border-transparent'
                    }`}
                  onClick={() => {
                    scrollTo(aboutRef.current);
                  }}
                >
                  About
                </button>
              </li>
              <li className="z-50 hidden mx-5 list-none lg:inline-block">
                <button
                  href="#"
                  className={`header_link font-semibold transition-all duration-300 ease-in-out ${visibleSection === 'skills'
                    ? 'selected delay-300'
                    : 'opacity-50 hover:opacity-100 border-b-2 border-transparent'
                    }`}
                  onClick={() => {
                    scrollTo(skillsRef.current);
                  }}
                >
                  Skills
                </button>
              </li>
              <li className="z-50 hidden mx-5 list-none lg:inline-block">
                <button
                  href="#"
                  className={`header_link font-semibold transition-all duration-300 ease-in-out ${visibleSection === 'my-work'
                    ? 'selected delay-300'
                    : 'opacity-50 hover:opacity-100 border-b-2 border-transparent'
                    }`}
                  onClick={() => {
                    scrollTo(myWorkRef.current);
                  }}
                >
                  My Work
                </button>
              </li>
              <li className="z-50 hidden mx-5 list-none lg:inline-block">
                <a
                  href="https://bmscis.hashnode.dev/"
                  target="_blank"
                  rel="noreferrer"
                  className={`header_link font-semibold transition-all duration-300 ease-in-out text-white ${visibleSection === 'blog'
                    ? 'selected delay-300'
                    : 'opacity-50 hover:opacity-100 border-b-2 border-transparent'
                    }`}
                >
                  Blog
                </a>
              </li>
              <li className="z-50 hidden mx-5 list-none lg:inline-block">
                <button
                  href="#"
                  className={`header_link font-semibold transition-all duration-300 ease-in-out ${visibleSection === 'contact'
                    ? 'selected delay-300'
                    : 'opacity-50 hover:opacity-100 border-b-2 border-transparent'
                    }`}
                  onClick={() => {
                    scrollTo(contactRef.current);
                  }}
                >
                  Contact
                </button>
              </li>
              <li className="z-50 hidden ml-5 list-none lg:inline-block">
                <a
                  href={`mailto:melvinwafula@gmail.com`}
                  className="btn-brand btn-md"
                >
                  Hire me
                </a>
              </li>
              <li className="z-50 inline-block ml-5 list-none lg:hidden">
                <button
                  className="relative w-10 h-10 text-white focus:outline-none"
                  onClick={() => setNavbarOpen(!navbarOpen)}
                >
                  <div className="absolute block w-5 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                    <span
                      aria-hidden="true"
                      className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${navbarOpen ? 'rotate-45' : '-translate-y-1.5'
                        }`}
                    ></span>
                    <span
                      aria-hidden="true"
                      className={`block absolute  h-0.5 w-5 bg-current   transform transition duration-500 ease-in-out ${navbarOpen ? 'opacity-0' : 'opacity-100'
                        }`}
                    ></span>
                    <span
                      aria-hidden="true"
                      className={`block absolute  h-0.5 w-5 bg-current transform  transition duration-500 ease-in-out ${navbarOpen ? '-rotate-45' : 'translate-y-1.5'
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
        <main className={`flex-col flex h-screen`} id="home" ref={homeRef}>
          {/* Main */}
          <div className="container relative flex flex-col items-start justify-center flex-grow px-0 mx-auto md:px-20 lg:px-24 section">
            <div className="w-full">
              <span className="text-2xl font-semibold text-brand">
                Hello! 👋 My name is
              </span>

              <h1 className="mb-4 text-5xl md:text-7xl">Melvin Wafula</h1>
              <h2 className="mb-4 text-3xl md:text-4xl text-light">
                <ReactTypingEffect
                  typingDelay={200}
                  speed={30}
                  eraseSpeed={30}
                  eraseDelay={1500}
                  text={[
                    `Backend Developer`,
                    `Blockchain Developer`,
                    `Teacher`,
                    `WEB3`,
                  ]}
                />
              </h2>
              <p className="w-4/5 text-xl md:w-full">
                I design and build websites that look good, and work well.
              </p>
              <button
                className="mt-4 btn-brand btn-lg"
                onClick={() => {
                  scrollTo(myWorkRef.current);
                }}
              >
                See my Work
              </button>
            </div>
          </div>
        </main>

        {/* About */}
        <section
          className="flex flex-col w-full px-0 md:px-20 lg:px-24 py-28 section"
          id="about"
          ref={aboutRef}
        >
          <div className="flex flex-col">
            <h2 className="text-5xl">About</h2>
            <hr className="bg-brand w-40 h-1.5 mt-4 mb-6 border-0"></hr>

            <div className="flex flex-col-reverse items-start w-full md:flex-row">
              <div className="flex flex-col w-full md:pr-8 md:w-3/5">
                <p className="text-lg">
                  Hello! I'm Melvin and I'm a backend developer, blockchain
                  developer from Nairobi, Kenya.
                </p>
                <p className="text-lg">
                  I started experimenting with Python in University and got
                  obsessed with starring at the computer and pressing buttons
                  until it produced an output.
                </p>
                <p className="text-lg">
                  Neadless to say that I have tested almost every new package
                  and new program; from coding to design: until money ran out.
                  That's why I love open-source. Computer graphic softwares like
                  blender offer what adobe offers and more, without the guilt of
                  knowing that you're using a cracked version of the software.
                </p>
                <p className="text-lg">
                  Then blockchain came along, and the future seems hopeful
                  again. Blockchain single handedly carried humanity through a
                  pandemic. Blockhain was a silver lining for many, before
                  blockchain young Africans did not exists, and now here we are
                  sharpening our tools and preparing to battle an oppressive
                  regime.
                </p>
                <p className="text-lg">
                  I have focused mainly on the Algorand blockain due to its
                  reliability and it has not let me down. With tools like{' '}
                  <a
                    href="https://developer.algorand.org/docs/get-started/algokit/"
                    target="_blank"
                    className="underline-link"
                    rel="noreferrer"
                  >
                    Algokit
                  </a>{' '}
                  , programming in algorand has never been easier.
                </p>
                <p className="text-lg">
                  Take a look at my work below to see what I'm working on, and
                  get in touch if you'd like to work together!
                </p>
                {/* <button className="self-start inline-block mt-8 btn-outline btn-lg">
                  See my CV
                </button> */}
              </div>
              <div className="flex w-full h-full mb-4 md:pl-8 md:w-2/5 md:mb-0">
                <Image
                  src="/cvme.jpg"
                  className="overflow-hidden rounded-md"
                  width={880}
                  height={880}
                  alt={'Melvin Wafula headshot'}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section
          className="flex flex-col w-full px-0 md:px-20 lg:px-24 py-28 section"
          id="skills"
          ref={skillsRef}
        >
          <h2 className="text-5xl">Skills</h2>
          <hr className="bg-brand w-40 h-1.5 mt-4 mb-6 border-0"></hr>

          {/* Skills icons */}
          <div className="flex flex-wrap w-full pr-4 mt-8">
            {/* HTML */}
            <Icon
              IconType={Html}
              title="HTML"
              columnSizing={'w-1/4 sm:w-1/3 lg:w-1/6'}
              width={'w-16 sm:w-24'}
              height={'h-16 sm:h-24'}
              padding={'p-0'}
              flexDirection={'flex-col'}
              titleMargins={'mt-4'}
              titleSize={'text-sm sm:text-base'}
              marginBottom={'mb-4'}
              marginRight={'mr-0'}
              textTransform={'normal-case'}
              fixedHeight={'h-28'}
            />

            {/* CSS */}
            <Icon
              IconType={Css}
              title="CSS"
              columnSizing={'w-1/4 sm:w-1/3 lg:w-1/6'}
              width={'w-16 sm:w-24'}
              height={'h-16 sm:h-24'}
              padding={'p-0'}
              flexDirection={'flex-col'}
              titleMargins={'mt-4'}
              titleSize={'text-sm sm:text-base'}
              marginBottom={'mb-4'}
              marginRight={'mr-0'}
              textTransform={'normal-case'}
              fixedHeight={'h-28'}
            />

            {/* Sass */}
            <Icon
              IconType={Sass}
              title="Sass"
              columnSizing={'w-1/4 sm:w-1/3 lg:w-1/6'}
              width={'w-16 sm:w-24'}
              height={'h-16 sm:h-24'}
              padding={'p-0'}
              flexDirection={'flex-col'}
              titleMargins={'mt-4'}
              titleSize={'text-sm sm:text-base'}
              marginBottom={'mb-4'}
              marginRight={'mr-0'}
              textTransform={'normal-case'}
              fixedHeight={'h-28'}
            />

            {/* Python */}
            <Icon
              IconType={Python}
              title="Python"
              columnSizing={'w-1/4 sm:w-1/3 lg:w-1/6'}
              width={'w-16 sm:w-24'}
              height={'h-16 sm:h-24'}
              padding={'p-0'}
              flexDirection={'flex-col'}
              titleMargins={'mt-4'}
              titleSize={'text-sm sm:text-base'}
              marginBottom={'mb-4'}
              marginRight={'mr-0'}
              textTransform={'normal-case'}
              fixedHeight={'h-28'}
            />
            {/* Pyteal */}
            <Icon
              IconType={AlgoIcon}
              title="Pyteal"
              columnSizing={'w-1/4 sm:w-1/3 lg:w-1/6'}
              width={'w-16 sm:w-24'}
              height={'h-16 sm:h-24'}
              padding={'p-0'}
              flexDirection={'flex-col'}
              titleMargins={'mt-4'}
              titleSize={'text-sm sm:text-base'}
              marginBottom={'mb-4'}
              marginRight={'mr-0'}
              textTransform={'normal-case'}
              fixedHeight={'h-28'}
            />
            {/* Algokit */}
            <Icon
              IconType={AlgoIcon}
              title="Algokit"
              columnSizing={'w-1/4 sm:w-1/3 lg:w-1/6'}
              width={'w-16 sm:w-24'}
              height={'h-16 sm:h-24'}
              padding={'p-0'}
              flexDirection={'flex-col'}
              titleMargins={'mt-4'}
              titleSize={'text-sm sm:text-base'}
              marginBottom={'mb-4'}
              marginRight={'mr-0'}
              textTransform={'normal-case'}
              fixedHeight={'h-28'}
            />
            {/* Beaker */}
            <Icon
              IconType={AlgoIcon}
              title="Beaker"
              columnSizing={'w-1/4 sm:w-1/3 lg:w-1/6'}
              width={'w-16 sm:w-24'}
              height={'h-16 sm:h-24'}
              padding={'p-0'}
              flexDirection={'flex-col'}
              titleMargins={'mt-4'}
              titleSize={'text-sm sm:text-base'}
              marginBottom={'mb-4'}
              marginRight={'mr-0'}
              textTransform={'normal-case'}
              fixedHeight={'h-28'}
            />

            {/* Tailwind */}
            <Icon
              IconType={Tailwind}
              title="Tailwind"
              columnSizing={'w-1/4 sm:w-1/3 lg:w-1/6'}
              width={'w-16 sm:w-24'}
              height={'h-16 sm:h-24'}
              padding={'p-0'}
              flexDirection={'flex-col'}
              titleMargins={'mt-4'}
              titleSize={'text-sm sm:text-base'}
              marginBottom={'mb-4'}
              marginRight={'mr-0'}
              textTransform={'normal-case'}
              fixedHeight={'h-28'}
            />

            {/* Javascript */}
            <Icon
              IconType={Javascript}
              title="Javascript"
              columnSizing={'w-1/4 sm:w-1/3 lg:w-1/6'}
              width={'w-16 sm:w-24'}
              height={'h-16 sm:h-24'}
              padding={'p-0'}
              flexDirection={'flex-col'}
              titleMargins={'mt-4'}
              titleSize={'text-sm sm:text-base'}
              marginBottom={'mb-4'}
              marginRight={'mr-0'}
              textTransform={'normal-case'}
              fixedHeight={'h-28'}
            />

            {/* React */}
            <Icon
              IconType={ReactJs}
              title="React"
              columnSizing={'w-1/4 sm:w-1/3 lg:w-1/6'}
              width={'w-16 sm:w-24'}
              height={'h-16 sm:h-24'}
              padding={'p-0'}
              flexDirection={'flex-col'}
              titleMargins={'mt-4'}
              titleSize={'text-sm sm:text-base'}
              marginBottom={'mb-4'}
              marginRight={'mr-0'}
              textTransform={'normal-case'}
              fixedHeight={'h-28'}
            />

            {/* Next */}
            <Icon
              IconType={SvelteIcon}
              title="Svelte Framework"
              columnSizing={'w-1/4 sm:w-1/3 lg:w-1/6'}
              width={'w-16 sm:w-24'}
              height={'h-16 sm:h-24'}
              padding={'p-0'}
              flexDirection={'flex-col'}
              titleMargins={'mt-4'}
              titleSize={'text-sm sm:text-base'}
              marginBottom={'mb-4'}
              marginRight={'mr-0'}
              textTransform={'normal-case'}
              fixedHeight={'h-28'}
            />

            {/* Node */}
            <Icon
              IconType={NodeJs}
              title="Node"
              columnSizing={'w-1/4 sm:w-1/3 lg:w-1/6'}
              width={'w-16 sm:w-24'}
              height={'h-16 sm:h-24'}
              padding={'p-0'}
              flexDirection={'flex-col'}
              titleMargins={'mt-4'}
              titleSize={'text-sm sm:text-base'}
              marginBottom={'mb-4'}
              marginRight={'mr-0'}
              textTransform={'normal-case'}
              fixedHeight={'h-28'}
            />

            {/* Firebase */}
            <Icon
              IconType={Firebase}
              title="Firebase"
              columnSizing={'w-1/4 sm:w-1/3 lg:w-1/6'}
              width={'w-16 sm:w-24'}
              height={'h-16 sm:h-24'}
              padding={'p-0'}
              flexDirection={'flex-col'}
              titleMargins={'mt-4'}
              titleSize={'text-sm sm:text-base'}
              marginBottom={'mb-4'}
              marginRight={'mr-0'}
              textTransform={'normal-case'}
              fixedHeight={'h-28'}
            />

            {/* Photoshop */}
            <Icon
              IconType={Photoshop}
              title="Photoshop"
              columnSizing={'w-1/4 sm:w-1/3 lg:w-1/6'}
              width={'w-16 sm:w-24'}
              height={'h-16 sm:h-24'}
              padding={'p-0'}
              flexDirection={'flex-col'}
              titleMargins={'mt-4'}
              titleSize={'text-sm sm:text-base'}
              marginBottom={'mb-4'}
              marginRight={'mr-0'}
              textTransform={'normal-case'}
              fixedHeight={'h-28'}
            />

            {/* Illustrator */}
            <Icon
              IconType={Illustrator}
              title="Illustrator"
              columnSizing={'w-1/4 sm:w-1/3 lg:w-1/6'}
              width={'w-16 sm:w-24'}
              height={'h-16 sm:h-24'}
              padding={'p-0'}
              flexDirection={'flex-col'}
              titleMargins={'mt-4'}
              titleSize={'text-sm sm:text-base'}
              marginBottom={'mb-4'}
              marginRight={'mr-0'}
              textTransform={'normal-case'}
              fixedHeight={'h-28'}
            />

            {/* After Effects */}
            <Icon
              IconType={AfterEffects}
              title="After Effects"
              columnSizing={'w-1/4 sm:w-1/3 lg:w-1/6'}
              width={'w-16 sm:w-24'}
              height={'h-16 sm:h-24'}
              padding={'p-0'}
              flexDirection={'flex-col'}
              titleMargins={'mt-4'}
              titleSize={'text-sm sm:text-base'}
              marginBottom={'mb-4'}
              marginRight={'mr-0'}
              textTransform={'normal-case'}
              fixedHeight={'h-28'}
            />

            {/* Adobe XD */}
            <Icon
              IconType={AdobeXd}
              title="Adobe XD"
              columnSizing={'w-1/4 sm:w-1/3 lg:w-1/6'}
              width={'w-16 sm:w-24'}
              height={'h-16 sm:h-24'}
              padding={'p-0'}
              flexDirection={'flex-col'}
              titleMargins={'mt-4'}
              titleSize={'text-sm sm:text-base'}
              marginBottom={'mb-4'}
              marginRight={'mr-0'}
              textTransform={'normal-case'}
              fixedHeight={'h-28'}
            />

          </div>
        </section>

        {/* My Work */}
        <section
          className="flex flex-col w-full px-0 md:px-20 lg:px-24 py-28 section"
          id="my-work"
          ref={myWorkRef}
        >
          {/* My Work header */}
          <h2 className="text-5xl">My Work</h2>
          <hr className="bg-brand w-40 h-1.5 mt-4 mb-6 border-0"></hr>

          {/* Featured Projects Container */}
          <div className="flex flex-col w-full mb-12">
            {/* Project One */}
            <FeaturedProjectCard
              title={'Goanna Lending Platform'}
              status={'Live on Mainnet'}
              description={`The Goanna lending platform is run by the Goanna DAO community an initiative that allows the Goanna community to access Algo based loans at low interest rates.`}
              float={`right-0`}
              flexDirection={`flex-col lg:flex-row`}
              imgWidth={'1366'}
              imgHeight={'666'}
              imgSrc={'/projects/lending.png'}
              liveLink={'https://lending.algoanna.com'}
              repoLink={'https://github.com/Al-Goanna/LendingPlatform'}
              stack={
                <>
                  <Icon
                    IconType={AlgoIcon}
                    title="Algokit"
                    columnSizing={'w-auto'}
                    width={'w-6'}
                    height={'h-6'}
                    flexDirection={'flex-row'}
                    padding={'p-0'}
                    titleMargins={'my-0 ml-1'}
                    titleSize={'text-sm'}
                    marginBottom={'mb-4'}
                    marginRight={'mr-3'}
                    textTransform={'uppercase'}
                    fixedHeight={'h-auto'}
                  />
                  <Icon
                    IconType={ReactJs}
                    title="React"
                    columnSizing={'w-auto'}
                    width={'w-6'}
                    height={'h-6'}
                    flexDirection={'flex-row'}
                    padding={'p-0'}
                    titleMargins={'my-0 ml-1'}
                    titleSize={'text-sm'}
                    marginBottom={'mb-4'}
                    marginRight={'mr-3'}
                    textTransform={'uppercase'}
                    fixedHeight={'h-auto'}
                  />
                  <Icon
                    IconType={NextJs}
                    title="Nextjs"
                    columnSizing={'w-auto'}
                    width={'w-6'}
                    height={'h-6'}
                    flexDirection={'flex-row'}
                    padding={'p-0'}
                    titleMargins={'my-0 ml-1'}
                    titleSize={'text-sm'}
                    marginBottom={'mb-4'}
                    marginRight={'mr-3'}
                    textTransform={'uppercase'}
                    fixedHeight={'h-auto'}
                  />
                  <Icon
                    IconType={AwsIcon}
                    title="Aws Cloud"
                    columnSizing={'w-auto'}
                    width={'w-6'}
                    height={'h-6'}
                    flexDirection={'flex-row'}
                    padding={'p-0'}
                    titleMargins={'my-0 ml-1'}
                    titleSize={'text-sm'}
                    marginBottom={'mb-4'}
                    marginRight={'mr-3'}
                    textTransform={'uppercase'}
                    fixedHeight={'h-auto'}
                  />
                </>
              }
            />
            <FeaturedProjectCard
              title={'Mutant Vs Zombies Battles.'}
              status={'Live on Mainnet'}
              description={`Mutants Vs Zombies is another initiative by the Goanna Dao, players can stake their MVZs to stand a chance to win GOANNA.`}
              float={`right-0`}
              flexDirection={`flex-col lg:flex-row`}
              imgWidth={'1366'}
              imgHeight={'666'}
              imgSrc={'/projects/battles.png'}
              liveLink={'https://battle.algoanna.com/'}
              repoLink={'https://github.com/Al-Goanna/MvZBattle'}
              stack={
                <>
                  <Icon
                    IconType={Html}
                    title="HTML"
                    columnSizing={'w-auto'}
                    width={'w-6'}
                    height={'h-6'}
                    flexDirection={'flex-row'}
                    padding={'p-0'}
                    titleMargins={'my-0 ml-1'}
                    titleSize={'text-sm'}
                    marginBottom={'mb-4'}
                    marginRight={'mr-3'}
                    textTransform={'uppercase'}
                    fixedHeight={'h-auto'}
                  />

                  <Icon
                    IconType={AlgoIcon}
                    title="Pyteal"
                    columnSizing={'w-auto'}
                    width={'w-6'}
                    height={'h-6'}
                    flexDirection={'flex-row'}
                    padding={'p-0'}
                    titleMargins={'my-0 ml-1'}
                    titleSize={'text-sm'}
                    marginBottom={'mb-4'}
                    marginRight={'mr-3'}
                    textTransform={'uppercase'}
                    fixedHeight={'h-auto'}
                  />
                  <Icon
                    IconType={ReachIcon}
                    title="Reach"
                    columnSizing={'w-auto'}
                    width={'w-6'}
                    height={'h-6'}
                    flexDirection={'flex-row'}
                    padding={'p-0'}
                    titleMargins={'my-0 ml-1'}
                    titleSize={'text-sm'}
                    marginBottom={'mb-4'}
                    marginRight={'mr-3'}
                    textTransform={'uppercase'}
                    fixedHeight={'h-auto'}
                  />

                  <Icon
                    IconType={ReactJs}
                    title="React"
                    columnSizing={'w-auto'}
                    width={'w-6'}
                    height={'h-6'}
                    flexDirection={'flex-row'}
                    padding={'p-0'}
                    titleMargins={'my-0 ml-1'}
                    titleSize={'text-sm'}
                    marginBottom={'mb-4'}
                    marginRight={'mr-3'}
                    textTransform={'uppercase'}
                    fixedHeight={'h-auto'}
                  />

                  <Icon
                    IconType={NextJs}
                    title="Nextjs"
                    columnSizing={'w-auto'}
                    width={'w-6'}
                    height={'h-6'}
                    flexDirection={'flex-row'}
                    padding={'p-0'}
                    titleMargins={'my-0 ml-1'}
                    titleSize={'text-sm'}
                    marginBottom={'mb-4'}
                    marginRight={'mr-3'}
                    textTransform={'uppercase'}
                    fixedHeight={'h-auto'}
                  />

                  <Icon
                    IconType={AwsIcon}
                    title="Aws Cloud"
                    columnSizing={'w-auto'}
                    width={'w-6'}
                    height={'h-6'}
                    flexDirection={'flex-row'}
                    padding={'p-0'}
                    titleMargins={'my-0 ml-1'}
                    titleSize={'text-sm'}
                    marginBottom={'mb-4'}
                    marginRight={'mr-3'}
                    textTransform={'uppercase'}
                    fixedHeight={'h-auto'}
                  />
                </>
              }
            />
            <FeaturedProjectCard
              title={'Soti Ticketing Platform'}
              status={'Live on Testnet'}
              description={`A ticketing platform on the blockchain designed to empower the event creators`}
              float={`right-0`}
              flexDirection={`flex-col lg:flex-row`}
              imgWidth={'1366'}
              imgHeight={'666'}
              imgSrc={'/projects/soti.png'}
              liveLink={'https://soti.vip/events/music'}
              repoLink={'https://bitbucket.org/sotimedia/soti/src/version1-frontend/'}
              stack={
                <>
                  <Icon
                    IconType={AlgoIcon}
                    title="Algokit"
                    columnSizing={'w-auto'}
                    width={'w-6'}
                    height={'h-6'}
                    flexDirection={'flex-row'}
                    padding={'p-0'}
                    titleMargins={'my-0 ml-1'}
                    titleSize={'text-sm'}
                    marginBottom={'mb-4'}
                    marginRight={'mr-3'}
                    textTransform={'uppercase'}
                    fixedHeight={'h-auto'}
                  />

                  <Icon
                    IconType={NextJs}
                    title="Nextjs"
                    columnSizing={'w-auto'}
                    width={'w-6'}
                    height={'h-6'}
                    flexDirection={'flex-row'}
                    padding={'p-0'}
                    titleMargins={'my-0 ml-1'}
                    titleSize={'text-sm'}
                    marginBottom={'mb-4'}
                    marginRight={'mr-3'}
                    textTransform={'uppercase'}
                    fixedHeight={'h-auto'}
                  />

                  <Icon
                    IconType={AwsIcon}
                    title="Aws Cloud"
                    columnSizing={'w-auto'}
                    width={'w-6'}
                    height={'h-6'}
                    flexDirection={'flex-row'}
                    padding={'p-0'}
                    titleMargins={'my-0 ml-1'}
                    titleSize={'text-sm'}
                    marginBottom={'mb-4'}
                    marginRight={'mr-3'}
                    textTransform={'uppercase'}
                    fixedHeight={'h-auto'}
                  />
                </>
              }
            />
            <FeaturedProjectCard
              title={'Shufl Marketplace'}
              status={'Live on Mainnet'}
              description={`Shufl is an algorand marketplace that allows users to list, buy and auction their nfts on the Algorand blockchain.`}
              float={`right-0`}
              flexDirection={`flex-col lg:flex-row`}
              imgWidth={'1366'}
              imgHeight={'666'}
              imgSrc={'/projects/shufl.png'}
              liveLink={'https://shufl.app/'}
              repoLink={'https://github.com/Al-Goanna/website'}
              stack={
                <>
                  <Icon
                    IconType={AlgoIcon}
                    title="Pyteal"
                    columnSizing={'w-auto'}
                    width={'w-6'}
                    height={'h-6'}
                    flexDirection={'flex-row'}
                    padding={'p-0'}
                    titleMargins={'my-0 ml-1'}
                    titleSize={'text-sm'}
                    marginBottom={'mb-4'}
                    marginRight={'mr-3'}
                    textTransform={'uppercase'}
                    fixedHeight={'h-auto'}
                  />
                  <Icon
                    IconType={ReactJs}
                    title="React"
                    columnSizing={'w-auto'}
                    width={'w-6'}
                    height={'h-6'}
                    flexDirection={'flex-row'}
                    padding={'p-0'}
                    titleMargins={'my-0 ml-1'}
                    titleSize={'text-sm'}
                    marginBottom={'mb-4'}
                    marginRight={'mr-3'}
                    textTransform={'uppercase'}
                    fixedHeight={'h-auto'}
                  />
                  <Icon
                    IconType={AwsIcon}
                    title="Aws Cloud"
                    columnSizing={'w-auto'}
                    width={'w-6'}
                    height={'h-6'}
                    flexDirection={'flex-row'}
                    padding={'p-0'}
                    titleMargins={'my-0 ml-1'}
                    titleSize={'text-sm'}
                    marginBottom={'mb-4'}
                    marginRight={'mr-3'}
                    textTransform={'uppercase'}
                    fixedHeight={'h-auto'}
                  />
                </>
              }
            />
            <FeaturedProjectCard
              title={'Algobambino Marketplace'}
              status={'Live on Mainnet'}
              description={`Algobamino is a marketplace with a variety of tools such as auctions, raffles, and purchasing of NFTs. It also includes a swap with various coins`}
              float={`right-0`}
              flexDirection={`flex-col lg:flex-row`}
              imgWidth={'1366'}
              imgHeight={'666'}
              imgSrc={'/projects/algobambino.png'}
              liveLink={'https://www.algobambino.xyz/algobambinoModel'}
              repoLink={'https://github.com/BMscis/bambinotest'}
              stack={
                <>
                  <Icon
                    IconType={Html}
                    title="HTML"
                    columnSizing={'w-auto'}
                    width={'w-6'}
                    height={'h-6'}
                    flexDirection={'flex-row'}
                    padding={'p-0'}
                    titleMargins={'my-0 ml-1'}
                    titleSize={'text-sm'}
                    marginBottom={'mb-4'}
                    marginRight={'mr-3'}
                    textTransform={'uppercase'}
                    fixedHeight={'h-auto'}
                  />

                  <Icon
                    IconType={AlgoIcon}
                    title="Pyteal"
                    columnSizing={'w-auto'}
                    width={'w-6'}
                    height={'h-6'}
                    flexDirection={'flex-row'}
                    padding={'p-0'}
                    titleMargins={'my-0 ml-1'}
                    titleSize={'text-sm'}
                    marginBottom={'mb-4'}
                    marginRight={'mr-3'}
                    textTransform={'uppercase'}
                    fixedHeight={'h-auto'}
                  />
                  <Icon
                    IconType={ReachIcon}
                    title="Reach"
                    columnSizing={'w-auto'}
                    width={'w-6'}
                    height={'h-6'}
                    flexDirection={'flex-row'}
                    padding={'p-0'}
                    titleMargins={'my-0 ml-1'}
                    titleSize={'text-sm'}
                    marginBottom={'mb-4'}
                    marginRight={'mr-3'}
                    textTransform={'uppercase'}
                    fixedHeight={'h-auto'}
                  />

                  <Icon
                    IconType={ReactJs}
                    title="React"
                    columnSizing={'w-auto'}
                    width={'w-6'}
                    height={'h-6'}
                    flexDirection={'flex-row'}
                    padding={'p-0'}
                    titleMargins={'my-0 ml-1'}
                    titleSize={'text-sm'}
                    marginBottom={'mb-4'}
                    marginRight={'mr-3'}
                    textTransform={'uppercase'}
                    fixedHeight={'h-auto'}
                  />

                  <Icon
                    IconType={NextJs}
                    title="Nextjs"
                    columnSizing={'w-auto'}
                    width={'w-6'}
                    height={'h-6'}
                    flexDirection={'flex-row'}
                    padding={'p-0'}
                    titleMargins={'my-0 ml-1'}
                    titleSize={'text-sm'}
                    marginBottom={'mb-4'}
                    marginRight={'mr-3'}
                    textTransform={'uppercase'}
                    fixedHeight={'h-auto'}
                  />

                  <Icon
                    IconType={AwsIcon}
                    title="Aws Cloud"
                    columnSizing={'w-auto'}
                    width={'w-6'}
                    height={'h-6'}
                    flexDirection={'flex-row'}
                    padding={'p-0'}
                    titleMargins={'my-0 ml-1'}
                    titleSize={'text-sm'}
                    marginBottom={'mb-4'}
                    marginRight={'mr-3'}
                    textTransform={'uppercase'}
                    fixedHeight={'h-auto'}
                  />
                </>
              }
            />
            {/* <FeaturedProjectCard
              title={'Jasiri Protocol powered by Algorand'}
              status={'Live on Testnet'}
              description={`A crypto-economic primitive powering fast, below-zero micropayments, and unlocking dead capital from real-world assets and commodities in one piece of novel, robust infrastructure`}
              float={`right-0`}
              flexDirection={`flex-col lg:flex-row`}
              imgWidth={'1366'}
              imgHeight={'666'}
              imgSrc={'/projects/jasiri.png'}
              liveLink={'https://jasiriprotocol.org/'}
              repoLink={
                'https://github.com/Safariblocks-LTD/jasiri-web-extension'
              }
              stack={
                <>
                  <Icon
                    IconType={Html}
                    title="HTML"
                    columnSizing={'w-auto'}
                    width={'w-6'}
                    height={'h-6'}
                    flexDirection={'flex-row'}
                    padding={'p-0'}
                    titleMargins={'my-0 ml-1'}
                    titleSize={'text-sm'}
                    marginBottom={'mb-4'}
                    marginRight={'mr-3'}
                    textTransform={'uppercase'}
                    fixedHeight={'h-auto'}
                  />

                  <Icon
                    IconType={ReachIcon}
                    title="Reach"
                    columnSizing={'w-auto'}
                    width={'w-6'}
                    height={'h-6'}
                    flexDirection={'flex-row'}
                    padding={'p-0'}
                    titleMargins={'my-0 ml-1'}
                    titleSize={'text-sm'}
                    marginBottom={'mb-4'}
                    marginRight={'mr-3'}
                    textTransform={'uppercase'}
                    fixedHeight={'h-auto'}
                  />

                  <Icon
                    IconType={ReactJs}
                    title="React"
                    columnSizing={'w-auto'}
                    width={'w-6'}
                    height={'h-6'}
                    flexDirection={'flex-row'}
                    padding={'p-0'}
                    titleMargins={'my-0 ml-1'}
                    titleSize={'text-sm'}
                    marginBottom={'mb-4'}
                    marginRight={'mr-3'}
                    textTransform={'uppercase'}
                    fixedHeight={'h-auto'}
                  />

                  <Icon
                    IconType={AwsIcon}
                    title="Aws Cloud"
                    columnSizing={'w-auto'}
                    width={'w-6'}
                    height={'h-6'}
                    flexDirection={'flex-row'}
                    padding={'p-0'}
                    titleMargins={'my-0 ml-1'}
                    titleSize={'text-sm'}
                    marginBottom={'mb-4'}
                    marginRight={'mr-3'}
                    textTransform={'uppercase'}
                    fixedHeight={'h-auto'}
                  />
                </>
              }
            /> */}
            {/* <FeaturedProjectCard
              title={'NFTea Auction With Reach'}
              status={'Just launched'}
              description={`Deploy an auction contract with reach on Etherium and Algorand`}
              float={`right-0`}
              flexDirection={`flex-col lg:flex-row`}
              imgWidth={'1366'}
              imgHeight={'666'}
              imgSrc={'/projects/auction.png'}
              liveLink={'https://bmscis.github.io/reach-tutorial/'}
              repoLink={'https://github.com/BMscis/reach-tutorial'}
              stack={
                <>
                  <Icon
                    IconType={Html}
                    title="HTML"
                    columnSizing={'w-auto'}
                    width={'w-6'}
                    height={'h-6'}
                    flexDirection={'flex-row'}
                    padding={'p-0'}
                    titleMargins={'my-0 ml-1'}
                    titleSize={'text-sm'}
                    marginBottom={'mb-4'}
                    marginRight={'mr-3'}
                    textTransform={'uppercase'}
                    fixedHeight={'h-auto'}
                  />

                  <Icon
                    IconType={ReachIcon}
                    title="Reach"
                    columnSizing={'w-auto'}
                    width={'w-6'}
                    height={'h-6'}
                    flexDirection={'flex-row'}
                    padding={'p-0'}
                    titleMargins={'my-0 ml-1'}
                    titleSize={'text-sm'}
                    marginBottom={'mb-4'}
                    marginRight={'mr-3'}
                    textTransform={'uppercase'}
                    fixedHeight={'h-auto'}
                  />

                  <Icon
                    IconType={SvelteIcon}
                    title="Svelte"
                    columnSizing={'w-auto'}
                    width={'w-6'}
                    height={'h-6'}
                    flexDirection={'flex-row'}
                    padding={'p-0'}
                    titleMargins={'my-0 ml-1'}
                    titleSize={'text-sm'}
                    marginBottom={'mb-4'}
                    marginRight={'mr-3'}
                    textTransform={'uppercase'}
                    fixedHeight={'h-auto'}
                  />

                  <Icon
                    IconType={AwsIcon}
                    title="Aws Cloud"
                    columnSizing={'w-auto'}
                    width={'w-6'}
                    height={'h-6'}
                    flexDirection={'flex-row'}
                    padding={'p-0'}
                    titleMargins={'my-0 ml-1'}
                    titleSize={'text-sm'}
                    marginBottom={'mb-4'}
                    marginRight={'mr-3'}
                    textTransform={'uppercase'}
                    fixedHeight={'h-auto'}
                  />
                </>
              }
            />
            <FeaturedProjectCard
              title={'Components view'}
              status={'Currently working on'}
              description={`Created personal components and incorporated some Binance Websockets into the project`}
              float={`right-0`}
              flexDirection={`flex-col lg:flex-row-reverse`}
              imgWidth={'1366'}
              imgHeight={'666'}
              imgSrc={'/projects/components.png'}
              liveLink={'https://bmscis.github.io/components/'}
              repoLink={'https://github.com/BMscis/components'}
              stack={
                <>
                  <Icon
                    IconType={Html}
                    title="HTML"
                    columnSizing={'w-auto'}
                    width={'w-6'}
                    height={'h-6'}
                    flexDirection={'flex-row'}
                    padding={'p-0'}
                    titleMargins={'my-0 ml-1'}
                    titleSize={'text-sm'}
                    marginBottom={'mb-4'}
                    marginRight={'mr-3'}
                    textTransform={'uppercase'}
                    fixedHeight={'h-auto'}
                  />

                  <Icon
                    IconType={Javascript}
                    title="Tailwind"
                    columnSizing={'w-auto'}
                    width={'w-6'}
                    height={'h-6'}
                    flexDirection={'flex-row'}
                    padding={'p-0'}
                    titleMargins={'my-0 ml-1'}
                    titleSize={'text-sm'}
                    marginBottom={'mb-4'}
                    marginRight={'mr-3'}
                    textTransform={'uppercase'}
                    fixedHeight={'h-auto'}
                  />

                  <Icon
                    IconType={Sass}
                    title="React"
                    columnSizing={'w-auto'}
                    width={'w-6'}
                    height={'h-6'}
                    flexDirection={'flex-row'}
                    padding={'p-0'}
                    titleMargins={'my-0 ml-1'}
                    titleSize={'text-sm'}
                    marginBottom={'mb-4'}
                    marginRight={'mr-3'}
                    textTransform={'uppercase'}
                    fixedHeight={'h-auto'}
                  />
                </>
              }
            />
            <FeaturedProjectCard
              title={'Alumni Store'}
              status={'launched'}
              description={`An Alumni page with access to alumni store with an alumni pass.`}
              float={`right-0`}
              flexDirection={`flex-col lg:flex-row`}
              imgWidth={'1366'}
              imgHeight={'666'}
              imgSrc={'/projects/laa.png'}
              liveLink={'https://bmscis.github.io/LW/'}
              repoLink={'https://github.com/BMscis/LW/tree/Website3.0'}
              stack={
                <>
                  <Icon
                    IconType={Html}
                    title="HTML"
                    columnSizing={'w-auto'}
                    width={'w-6'}
                    height={'h-6'}
                    flexDirection={'flex-row'}
                    padding={'p-0'}
                    titleMargins={'my-0 ml-1'}
                    titleSize={'text-sm'}
                    marginBottom={'mb-4'}
                    marginRight={'mr-3'}
                    textTransform={'uppercase'}
                    fixedHeight={'h-auto'}
                  />

                  <Icon
                    IconType={Javascript}
                    title="Javascript"
                    columnSizing={'w-auto'}
                    width={'w-6'}
                    height={'h-6'}
                    flexDirection={'flex-row'}
                    padding={'p-0'}
                    titleMargins={'my-0 ml-1'}
                    titleSize={'text-sm'}
                    marginBottom={'mb-4'}
                    marginRight={'mr-3'}
                    textTransform={'uppercase'}
                    fixedHeight={'h-auto'}
                  />

                  <Icon
                    IconType={Sass}
                    title="React"
                    columnSizing={'w-auto'}
                    width={'w-6'}
                    height={'h-6'}
                    flexDirection={'flex-row'}
                    padding={'p-0'}
                    titleMargins={'my-0 ml-1'}
                    titleSize={'text-sm'}
                    marginBottom={'mb-4'}
                    marginRight={'mr-3'}
                    textTransform={'uppercase'}
                    fixedHeight={'h-auto'}
                  />
                </>
              }
            /> */}
          </div>

          {/* Other Projects header */}
          <h2 className="text-4xl text-center">Other Projects</h2>
          <hr className="bg-brand w-40 h-1.5 mt-4 mb-6 mx-auto border-0"></hr>
          <p className="mb-16 text-lg text-center">
            Check out some of the projects I've been a part of...
          </p>

          {/* Other Projects Container */}
          <div className="grid grid-flow-row grid-rows-2 gap-4 grid-col-1 lg:grid-cols-3">
            {projects.map(function (project, i) {
              return <ProjectCard project={project} key={i} />;
            })}
          </div>
        </section>

        {/* Contact */}
        <section
          className="flex flex-col w-full px-0 md:px-20 lg:px-24 py-28 section"
          id="contact"
          ref={contactRef}
        >
          <h2 className="text-5xl">Contact</h2>
          <hr className="bg-brand w-40 h-1.5 mt-4 mb-6 border-0"></hr>

          <div className="flex flex-col-reverse w-full md:flex-row">
            <div className="w-full mb-4 md:pl-0 md:mb-0">
              <p className="text-lg">
                I'm currently available to get involved in new projects, so get
                in touch if you'd like to work together.
              </p>
              <p className="text-lg">
                Simply email me at{' '}
                <Link href="mailto:melvinwafula@gmail.com">
                  <a className="underline-link">melvinwafula@gmail.com</a>
                </Link>{' '}
                and let's talk about your project!
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="flex flex-col w-full px-0 py-16 md:px-20 lg:px-24 section">
          <hr className="w-full h-1 mb-16 bg-white border-0 opacity-10"></hr>
          <div className="w-8 mb-4">
            <Icon
              IconType={Bmscis}
              title="Bmscis"
              columnSizing={'w-1/4 sm:w-1/3 lg:w-1/6'}
              width={'w-16 sm:w-24'}
              height={'h-16 sm:h-24'}
              padding={'p-0'}
              flexDirection={'flex-col'}
              titleMargins={'mt-4'}
              titleSize={'text-sm sm:text-base'}
              marginBottom={'mb-4'}
              marginRight={'mr-0'}
              textTransform={'normal-case'}
              fixedHeight={'h-28'}
            />
          </div>

          <div className="flex flex-col items-start md:flex-row">
            <p className="w-auto mb-4 md:mb-0">
              &copy; Designed and built by Melvin Wafula 2022
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
            {/* Hero - Diamond 1 */}
            <button
              className="w-5 h-5 mb-4"
              onClick={() => {
                scrollTo(homeRef.current);
              }}
            >
              <svg
                id="e5c888e5-3206-4553-8f53-60ee93248ad9"
                className={`group rounded-sm transform  transition duration-500 ease-in-out hover:rotate-45 hover:scale-110 ${visibleSection === 'home'
                  ? 'rotate-45 scale-110'
                  : 'rotate-0 scale-100'
                  }`}
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0
              0 24 24"
              >
                {/* Fill */}
                <path
                  className={`fill-current origin-center transform transition duration-200 ease-in-out group-hover:text-dark group-hover:rotate-90 ${visibleSection === 'home'
                    ? 'text-white rotate-90'
                    : 'text-dark rotate-0'
                    }`}
                  d="M5.64 5.64h12.73v12.73H5.64z"
                />
                {/* Border */}
                <path
                  className={`fill-current origin-center transform transition duration-500 ease-in-out group-hover:text-white group-hover:rotate-45 group-hover:opacity-100 ${visibleSection === 'home'
                    ? 'text-white rotate-45 opacity-100'
                    : 'text-white rotate-45 opacity-40'
                    }`}
                  d="M12 22.41L1.59 12 12 1.59 22.41 12zM4.41 12L12 19.59 19.59 12 12 4.41z"
                />
              </svg>
            </button>
            {/* About - Diamond 2 */}
            <button
              className="w-5 h-5 mb-4"
              onClick={() => {
                scrollTo(aboutRef.current);
              }}
            >
              <svg
                id="e5c888e5-3206-4553-8f53-60ee93248ad9"
                className={`group rounded-sm transform  transition duration-500 ease-in-out hover:rotate-45 hover:scale-110 ${visibleSection === 'about'
                  ? 'rotate-45 scale-110'
                  : 'rotate-0 scale-100'
                  }`}
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0
              0 24 24"
              >
                {/* Fill */}
                <path
                  className={`fill-current origin-center transform transition duration-200 ease-in-out group-hover:text-dark group-hover:rotate-90 ${visibleSection === 'about'
                    ? 'text-white rotate-90'
                    : 'text-dark rotate-0'
                    }`}
                  d="M5.64 5.64h12.73v12.73H5.64z"
                />
                {/* Border */}
                <path
                  className={`fill-current origin-center transform transition duration-500 ease-in-out group-hover:text-white group-hover:rotate-45 group-hover:opacity-100 ${visibleSection === 'about'
                    ? 'text-white rotate-45 opacity-100'
                    : 'text-white rotate-45 opacity-40'
                    }`}
                  d="M12 22.41L1.59 12 12 1.59 22.41 12zM4.41 12L12 19.59 19.59 12 12 4.41z"
                />
              </svg>
            </button>
            {/* Skills - Diamond 3 */}
            <button
              className="w-5 h-5 mb-4"
              onClick={() => {
                scrollTo(skillsRef.current);
              }}
            >
              <svg
                id="e5c888e5-3206-4553-8f53-60ee93248ad9"
                className={`group rounded-sm transform  transition duration-500 ease-in-out hover:rotate-45 hover:scale-110 ${visibleSection === 'skills'
                  ? 'rotate-45 scale-110'
                  : 'rotate-0 scale-100'
                  }`}
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0
              0 24 24"
              >
                {/* Fill */}
                <path
                  className={`fill-current origin-center transform transition duration-200 ease-in-out group-hover:text-dark group-hover:rotate-90 ${visibleSection === 'skills'
                    ? 'text-white rotate-90'
                    : 'text-dark rotate-0'
                    }`}
                  d="M5.64 5.64h12.73v12.73H5.64z"
                />
                {/* Border */}
                <path
                  className={`fill-current origin-center transform transition duration-500 ease-in-out group-hover:text-white group-hover:rotate-45 group-hover:opacity-100 ${visibleSection === 'skills'
                    ? 'text-white rotate-45 opacity-100'
                    : 'text-white rotate-45 opacity-40'
                    }`}
                  d="M12 22.41L1.59 12 12 1.59 22.41 12zM4.41 12L12 19.59 19.59 12 12 4.41z"
                />
              </svg>
            </button>
            {/* My Work - Diamond 4 */}
            <button
              className="w-5 h-5 mb-4"
              onClick={() => {
                scrollTo(myWorkRef.current);
              }}
            >
              <svg
                id="e5c888e5-3206-4553-8f53-60ee93248ad9"
                className={`group rounded-sm transform transition duration-500 ease-in-out hover:rotate-45 hover:scale-110 ${visibleSection === 'my-work'
                  ? 'rotate-45 scale-110'
                  : 'rotate-0 scale-100'
                  }`}
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0
              0 24 24"
              >
                {/* Fill */}
                <path
                  className={`fill-current origin-center transform transition duration-200 ease-in-out group-hover:text-dark group-hover:rotate-90 ${visibleSection === 'my-work'
                    ? 'text-white rotate-90'
                    : 'text-dark rotate-0'
                    }`}
                  d="M5.64 5.64h12.73v12.73H5.64z"
                />
                {/* Border */}
                <path
                  className={`fill-current origin-center transform transition duration-500 ease-in-out group-hover:text-white group-hover:rotate-45 group-hover:opacity-100 ${visibleSection === 'my-work'
                    ? 'text-white rotate-45 opacity-100'
                    : 'text-white rotate-45 opacity-40'
                    }`}
                  d="M12 22.41L1.59 12 12 1.59 22.41 12zM4.41 12L12 19.59 19.59 12 12 4.41z"
                />
              </svg>
            </button>
            {/* Contact - Diamond 5 */}
            <button
              className="w-5 h-5 mb-4"
              onClick={() => {
                scrollTo(contactRef.current);
              }}
            >
              <svg
                id="e5c888e5-3206-4553-8f53-60ee93248ad9"
                className={`group rounded-sm transform  transition duration-500 ease-in-out hover:rotate-45 hover:scale-110 ${visibleSection === 'contact'
                  ? 'rotate-45 scale-110'
                  : 'rotate-0 scale-100'
                  }`}
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0
              0 24 24"
              >
                {/* Fill */}
                <path
                  className={`fill-current origin-center transform transition duration-200 ease-in-out group-hover:text-dark group-hover:rotate-90 ${visibleSection === 'contact'
                    ? 'text-white rotate-90'
                    : 'text-dark rotate-0'
                    }`}
                  d="M5.64 5.64h12.73v12.73H5.64z"
                />
                {/* Border */}
                <path
                  className={`fill-current origin-center transform transition duration-500 ease-in-out group-hover:text-white group-hover:rotate-45 group-hover:opacity-100 ${visibleSection === 'contact'
                    ? 'text-white rotate-45 opacity-100'
                    : 'text-white rotate-45 opacity-40'
                    }`}
                  d="M12 22.41L1.59 12 12 1.59 22.41 12zM4.41 12L12 19.59 19.59 12 12 4.41z"
                />
              </svg>
            </button>

            {/* Line */}
            <div className="w-0.5 bg-white h-24 opacity-20 mt-2 z-30"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
