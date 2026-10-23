import { useEffect, useMemo, useState } from 'react';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import './Projets.scss';

const categories = [
  { value: 'Développement Web', label: 'Développement Web' },
  { value: 'Développement de jeux-vidéo', label: 'Jeux vidéo' },
  { value: 'Applications Mobile', label: 'Applications Mobile' },
  { value: 'Tous les projets', label: 'Tous les projets' },
];

// Public portfolio entries remain visible if the Sanity API is unavailable in the browser.
const fallbackProjects = [
  {
    title: 'Predecessor FR',
    description: "Site web partageant l'actualité en français du jeu Predecessor.",
    imgUrl: { asset: { _ref: 'image-ded68c53725a8155b4adaa963e93e51de085035d-1918x944-png' } },
    projectLink: 'https://predecessorfr.netlify.app/',
    tags: ['Développement Web'],
  },
  {
    title: 'Bot Discord',
    description: 'Bunny, un bot Discord pour le serveur The First Descendant FR.',
    imgUrl: { asset: { _ref: 'image-09039bf066182aaf21daa5fd5afb4522091530db-1024x1536-png' } },
    projectLink: 'https://discord.com/servers/the-first-descendant-fr-1148947715896655872',
    tags: ['Développement Web'],
  },
  {
    title: "Boulangerie Baker's Heart (en cours)",
    description: "Site web de la boulangerie Baker's Heart localisée en Écosse.",
    imgUrl: { asset: { _ref: 'image-e20352aacb7715d987a9729e0f27a27fec5af548-1852x908-png' } },
    projectLink: 'https://bakers-heart.com',
    tags: ['Développement Web'],
  },
  {
    title: 'Climax Radio App',
    description: "Application permettant d'écouter quelques radios locales.",
    imgUrl: { asset: { _ref: 'image-03c7beb7e477b830905c11ce35ce7d580d52f77c-484x846-png' } },
    projectLink: 'https://www.dropbox.com/s/onoxjuu7z4ztl0e/app-release.apk?dl=0',
    tags: ['Applications Mobile'],
  },
  {
    title: 'Core Of Duty [CORE]',
    description: 'FPS réalisé sur CORE pour découvrir cet outil.',
    imgUrl: { asset: { _ref: 'image-e689065499c996bf0c971e72213ed5962b7ac015-1914x1007-png' } },
    projectLink: 'https://www.coregames.com/games/343077/coreofduty',
    tags: ['Développement de jeux-vidéo'],
  },
  {
    title: 'FPS Battle Royal [UE4]',
    description: "Projet d'introduction au multijoueur réalisé sur Unreal Engine 4.",
    imgUrl: { asset: { _ref: 'image-9eb5653e2af85d3cf33d7aa39dc8fb1f479784b5-1920x1080-png' } },
    projectLink: 'https://drive.google.com/file/d/1UHCvoY0mJ3lZiqrlSDGJc66Ks_nGh-BT/view',
    tags: ['Développement de jeux-vidéo'],
  },
  {
    title: 'TPS Solo [Unity]',
    description: 'Premier projet jouable sur Unity, réalisé en dernière année de BTS.',
    imgUrl: { asset: { _ref: 'image-10351b716e2f29bde9eae4de605fa24d1ac380e4-1729x1078-png' } },
    projectLink: 'https://drive.google.com/file/d/1YfSPYjSJMZuKqrFVsYtI4yd35IO9M3hA/view',
    tags: ['Développement de jeux-vidéo'],
  },
];

const Projets = () => {
  const [activeFilter, setActiveFilter] = useState('Tous les projets');
  const [projects, setProjects] = useState(fallbackProjects);

  useEffect(() => {
    client.fetch('*[_type == "projets"]')
      .then((data) => {
        if (Array.isArray(data)) setProjects(data);
      })
      .catch(() => {});
  }, []);

  const filteredProjects = useMemo(() => (
    activeFilter === 'Tous les projets'
      ? projects
      : projects.filter((project) => project.tags?.includes(activeFilter))
  ), [activeFilter, projects]);

  return (
    <>
      <h2 className="head-text">Mes <span>Projets</span></h2>
      <div className="text-deco" />
      <p className="section-intro projects-intro">
        Une sélection de réalisations web, mobiles et interactives.
      </p>

      <div className="app__work-filter" role="tablist" aria-label="Filtrer les projets">
        {categories.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={activeFilter === value}
            className={['app__work-filter-item', 'app__flex', activeFilter === value && 'item-active'].filter(Boolean).join(' ')}
            onClick={() => setActiveFilter(value)}
          >
            {label}
          </button>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <p className="portfolio-status">Aucun projet dans cette catégorie pour le moment.</p>
      )}

      <motion.div layout className="app__work-portfolio">
        {filteredProjects.map((project) => {
          const imageUrl = project.imgUrl ? urlFor(project.imgUrl).width(800).height(650).url() : null;

          return (
            <motion.article layout className="app__work-item" key={project._id || project.title}>
              <div className="app__work-img app__flex">
                {imageUrl ? (
                  <img src={imageUrl} alt={project.title} loading="lazy" />
                ) : (
                  <div className="project-placeholder">{project.title}</div>
                )}
                <div className="app__work-hover app__flex">
                  {project.projectLink && (
                    <a href={project.projectLink} target="_blank" rel="noreferrer" aria-label={'Voir ' + project.title}>
                      <span className="app__flex"><AiFillEye aria-hidden="true" /></span>
                    </a>
                  )}
                  {project.codeLink && (
                    <a href={project.codeLink} target="_blank" rel="noreferrer" aria-label={'Voir le code de ' + project.title}>
                      <span className="app__flex"><AiFillGithub aria-hidden="true" /></span>
                    </a>
                  )}
                </div>
              </div>

              <div className="app__work-content app__flex">
                <h3 className="bold-text">{project.title}</h3>
                <p className="p-text">{project.description}</p>
                <div className="app__work-tag app__flex">
                  <p className="p-text">{project.tags?.[0] || 'Projet'}</p>
                </div>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </>
  );
};

export default AppWrap(MotionWrap(Projets, 'app__works'), 'portfolio', 'app__thirdbg');
