import { useEffect, useState } from 'react';
import { HiCheckCircle } from 'react-icons/hi';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import { images } from '../../constants';
import { urlFor, client } from '../../client';
import './Competences.scss';

const fallbackSkills = [
  { name: 'React', bgColor: '#e7f7fb', iconSrc: images.react },
  { name: 'JavaScript', bgColor: '#fff6c8', iconSrc: images.javascript },
  { name: 'Node.js', bgColor: '#e7f5e9', iconSrc: images.node },
  { name: 'Flutter', bgColor: '#e6f2ff', iconSrc: images.flutter },
  { name: 'Git', bgColor: '#fce8e3', iconSrc: images.git },
  { name: 'Figma', bgColor: '#f5e9ff', iconSrc: images.figma },
];

const fallbackCompetences = [
  {
    titre: 'Conception d’interfaces',
    description: 'Des parcours clairs, accessibles et cohérents avec votre identité.',
  },
  {
    titre: 'Développement front-end',
    description: 'Des interfaces réactives, performantes et adaptées à tous les écrans.',
  },
  {
    titre: 'Solutions sur mesure',
    description: 'Un accompagnement du cadrage initial jusqu’à la mise en ligne.',
  },
];

const Competences = () => {
  const [skills, setSkills] = useState(fallbackSkills);
  const [competences, setCompetences] = useState(fallbackCompetences);

  useEffect(() => {
    client.fetch('*[_type == "skills"]')
      .then((data) => {
        if (data?.length) setSkills(data);
      })
      .catch(() => {});

    client.fetch('*[_type == "competences"]')
      .then((data) => {
        if (data?.length) setCompetences(data);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <h2 className="head-text">Mes <span>Compétences</span></h2>
      <div className="text-deco" />
      <p className="section-intro skills-intro">
        Des outils actuels au service de solutions durables et faciles à faire évoluer.
      </p>

      <div className="app__skills-container">
        <motion.div className="app__skills-list">
          {skills.map((skill, index) => {
            const icon = skill.iconSrc || (
              skill.icon ? urlFor(skill.icon).width(180).height(180).url() : null
            );

            return (
              <motion.div
                className="app__skills-item app__flex"
                key={skill._id || skill.name}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
              >
                <div className="app__flex">
                  {icon && <img src={icon} alt={skill.name} loading="lazy" />}
                </div>
                <p className="p-text">{skill.name}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="app__skills-exp">
          <p className="body-text">Domaines de compétences</p>
          {competences.map((competence, index) => (
            <motion.article
              className="app__skills-exp-work"
              key={competence._id || competence.titre}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
            >
              <div className="comp-div">
                <HiCheckCircle className="check-icon" aria-hidden="true" />
                <h3 className="bold-text">{competence.titre}</h3>
              </div>
              <p className="p-desc">{competence.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </>
  );
};

export default AppWrap(MotionWrap(Competences, 'app__skills'), 'competences', 'app__primarybg');
