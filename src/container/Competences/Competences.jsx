import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiCheckCircle } from 'react-icons/hi'

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';

import './Competences.scss';


const Competences = () => {
  const [competences, setCompetences] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const query = '*[_type == "competences"]';
    const skillsQuery = '*[_type == "skills"]';

    client.fetch(query).then((data) => {
      setCompetences(data);
    });

    client.fetch(skillsQuery).then((data) => {
      setSkills(data);
    });
  }, []);

  return (
    <>
      <h2 className="head-text" id="comp">Mes compétences</h2>
    <div className='text-deco'></div>
      <div className="app__skills-container">
        <motion.div className="app__skills-list">
          {skills.map((skill) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="app__skills-item app__flex"
              key={skill.name}
            >
              <div
                className="app__flex"
                style={{ backgroundColor: skill.bgColor }}
              >
                <img src={urlFor(skill.icon)} alt={skill.name} />
              </div>
              <p className="p-text">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>
        <div className="app__skills-exp">
          <p className='body-text'>Domaines de compétences</p>
          {competences.map((competences) => (
              <motion.div className="app__skills-exp-works">
                  <>
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 0.5 }}
                      className="app__skills-exp-work"
                      data-tip
                      data-for={competences.titre}
                      key={competences.titre}
                    >
                        <div className='comp-div'>
                        <HiCheckCircle className='check-icon'/>
                        <h4 className="bold-text" id="comp-titre">{competences.titre}</h4>
                        </div>
                      <p className="p-desc">{competences.description}</p>
                    </motion.div>
                    {/*<Tooltip
                      id={work.name}
                      effect="solid"
                      arrowColor="#fff"
                      className="skills-tooltip"
                    >
                      {work.desc}
                </Tooltip>*/}
                  </>
              </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AppWrap(MotionWrap(Competences, 'app__skills'), 'compétences', 'app__primarybg');