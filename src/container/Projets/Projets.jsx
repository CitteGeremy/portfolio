import React, { useState, useEffect } from 'react';
import { AiFillEye, AiFillGithub, AiOutlineCloudDownload } from 'react-icons/ai';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';

import './Projets.scss';

const Projets = () => {
  const [activeFilter, setActiveFilter] = useState('Tous les projets');
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [projets, setProjets] = useState([])
  const [filterProjet, setFilterProjet] = useState([])

  useEffect(() => {
    const query = '*[_type == "projets"]';

    client.fetch(query)
      .then((data) => {
        setProjets(data);
        setFilterProjet(data);
      })
  }, [])


  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard([{ y: 100, opacity: 0 }]);

    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);

      if (item === 'Tous les projets') {
        setFilterProjet(projets);
      } else {
        setFilterProjet(projets.filter((projets) => projets.tags.includes(item)))

      }
    }, 500);
  }
  return (
    <>
      <h2 className="head-text"> Mes <span>Projets</span></h2>
      <div className='text-deco'></div>

      <div className='app__work-filter'>
        {['Développement Web', 'Développement de jeux-vidéo', 'Applications Mobile', 'Tous les projets'].map((item, index) => (
          <div
            key={index}
            onClick={() => handleWorkFilter(item)}
            className={`app__work-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`}
          >
            {item}
          </div>
        ))}
      </div>

      <motion.div
        animate={animateCard}
        transitioning={{ duration: .5, delayChildren: .5 }}
        className="app__work-portfolio"
      >
        {filterProjet.map((projets, index) => (
          <div className='app__work-item app_flex' key={index}>
            <div className='app__work-img app__flex'>
              <img src={urlFor(projets.imgUrl)} alt={projets.name} />

              <motion.div
                whileHover={{ opacity: [0, 1] }}
                transition={{ duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5 }}
                className='app__work-hover app__flex'
              >
                <a href={projets.projectLink} target="_blank" rel="noreferrer">
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, .9] }}
                    transition={{ duration: 0.25 }}
                    className='app__flex'
                  >
                    <AiFillEye />
                  </motion.div>
                </a>

                <a href={projets.codeLink} target="_blank" rel="noreferrer">
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, .9] }}
                    transition={{ duration: 0.25 }}
                    className='app__flex'
                  >
                    <AiFillGithub />
                  </motion.div>
                </a>
              </motion.div>
            </div>

            <div className='app__work-content app__flex'>
              <h4 className='bold-text'>{projets.title}</h4>
              <p className='p-text' style={{ marginTop: 10 }}>{projets.description}</p>

              <div className='app__work-tag app__flex'>
                <p className='p-text'>{projets.tags[0]}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </>
  )
}

export default AppWrap(MotionWrap(Projets, 'app__works'), 'portfolio', 'app__thirdbg');