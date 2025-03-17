import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { AppWrap } from '../../wrapper';
import { images } from '../../constants';

import './Header.scss';

const scaleVariants = {
  whileInView: {
    scale: [0, 1],
    opacity: [0, 1],
    transition: {
      ease: 'easeInOut',
      duration: 1,
    }
  }
};

export const Header = () => {

  const [ loopNum, setLoopNum ] = useState(0);
  const [ isDeleting, setIsDeleting ] = useState(false);
  const toRotate = [ "Gérémy CITTÉ", "Développeur Web", "Développeur Mobile", "Développeur de Jeux-Vidéo", "Créateur de Contenu" ];
  const [ text, setText] = useState('');
  const [index, setIndex] = useState(1);
  const [ delta, setDelta ] = useState(300 - Math.random() * 100);
  const period = 2000;
  const selector = '|';

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text])

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(100);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(100);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }

  return (

    <div className='app__header app__flex'>

      <div className="cols">
        <span className="topline">Bonjours</span>
        <h1>Je suis <span className="retour_ligne"></span><span className="multiText">{text + selector}</span></h1>
      </div>
      
      {/*
      <div className='stars'>
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        </div>
      */}

      <motion.div
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: .5, delayChildren: .5 }}
        className='app__header-img'
      >
        <img src={images.logo_dragon} alt="profile_bg" /> {/* image de moi sur la page principal */}
      </motion.div>

      <motion.div
        variants={scaleVariants}
        whileInView={scaleVariants.whileInView}
        className='app__header-circles'
      >
        {[images.react, images.ue5, images.js].map((circle, index) => (
          <div className='circle-cmp app__flex' key={`circle-${index}`}>
            <img src={circle} alt='circle' />
          </div>
        ))}

      </motion.div>
    </div>
  )
}

export default AppWrap(Header, 'home');