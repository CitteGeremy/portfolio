import { useEffect, useState } from 'react';
import { HiArrowRight } from 'react-icons/hi';
import { motion } from 'framer-motion';

import { AppWrap } from '../../wrapper';
import { images } from '../../constants';
import './Header.scss';

const roles = [
  'Gérémy CITTÉ',
  'Développeur Web',
  'Développeur Mobile',
  'Développeur de Jeux-Vidéo',
  'Créateur de Contenu',
];

const Header = () => {
  const [reducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState(reducedMotion ? roles[0] : '');

  useEffect(() => {
    if (reducedMotion) return undefined;

    const word = roles[wordIndex];
    const isComplete = text === word;
    const isEmpty = text.length === 0;
    const delay = isComplete && !isDeleting ? 1800 : isDeleting ? 65 : 105;

    const timeout = window.setTimeout(() => {
      if (isComplete && !isDeleting) {
        setIsDeleting(true);
      } else if (isEmpty && isDeleting) {
        setIsDeleting(false);
        setWordIndex((current) => (current + 1) % roles.length);
      } else {
        setText(word.slice(0, text.length + (isDeleting ? -1 : 1)));
      }
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [reducedMotion, wordIndex, isDeleting, text]);

  return (
    <div className="app__header">
      <div className="cols">
        <span className="topline">Bonjour,</span>
        <h1>
          <span className="hero-intro">Je suis</span>
          <span className="hero-typed" aria-hidden="true">
            {text}<span className="hero-cursor">|</span>
          </span>
          <span className="visually-hidden">Gérémy Citté, développeur web et mobile</span>
        </h1>
        <p className="h_p">
          Je conçois des expériences web, mobiles et communautaires fiables,
          soignées et adaptées à vos objectifs.
        </p>
        <div className="header-actions">
          <a href="#portfolio">Découvrir mes projets <HiArrowRight aria-hidden="true" /></a>
          <a href="#contact">Parler de votre projet</a>
        </div>
      </div>

      <motion.div
        className="app__header-img"
        initial={reducedMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
      >
        <img src={images.logo_dragon} alt="Dragon, emblème de KAIIZER971" />
      </motion.div>

      <div className="app__header-circles" aria-hidden="true">
        {[images.react, images.ue5, images.js].map((icon, index) => (
          <motion.div
            className="circle-cmp"
            key={icon}
            initial={reducedMotion ? false : { opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.12 }}
          >
            <img src={icon} alt="" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AppWrap(Header, 'home', 'app__primarybg');
