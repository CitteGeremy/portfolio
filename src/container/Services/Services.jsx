import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import { client } from '../../client';
import './Services.scss';

const fallbackServices = [
  {
    title: 'Développement Web',
    description: 'Création et refonte de sites modernes, rapides, accessibles et adaptés à tous les écrans.',
  },
  {
    title: 'Applications Mobile',
    description: 'Conception d’applications multiplateformes fluides, utiles et pensées pour leurs utilisateurs.',
  },
  {
    title: 'Développement Discord',
    description: 'Création de serveurs structurés et de solutions sur mesure pour animer votre communauté.',
  },
];

const Services = () => {
  const [services, setServices] = useState(fallbackServices);

  useEffect(() => {
    client.fetch('*[_type == "services"]')
      .then((data) => {
        if (data?.length) setServices(data);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <h2 className="head-text">Mes <span>Services</span></h2>
      <div className="text-deco" />
      <p className="section-intro services-intro">
        Un accompagnement professionnel, de l’idée à la mise en ligne.
      </p>

      <div className="app__profiles">
        {services.map((service, index) => {
          return (
            <motion.article
              className="app__profile-item"
              key={service._id || service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
            >
              <span className="service-index">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="bold-text">{service.title}</h3>
              <p className="p-text">{service.description}</p>
            </motion.article>
          );
        })}
      </div>
    </>
  );
};

export default AppWrap(MotionWrap(Services, 'app__about'), 'services', 'app__primarybg');
