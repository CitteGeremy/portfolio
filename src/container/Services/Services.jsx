import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';

import './Services.scss';
import { urlFor, client } from '../../client';


const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const query = '*[_type == "services"]';

    client.fetch(query)
    .then((data) => setServices(data))
    }, []);

  return (

    <>
      <h2 className="head-text"> Mes <span>Services</span></h2>
      <div className='text-deco'></div>

      <div className='app__profiles'>
        {services.map((services, index) => (
          <motion.div
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: .5, type: 'tween' }}
            className="app__profile-item"
            key={services.title + index}
          >
            <img src={urlFor(services.imgUrl)} alt={services.title} />
            <h2 className='bold-text' id='service-title' style={{ marginTop: 20 }}>{services.title}</h2>
            <p className='p-text' id='service-description' style={{ marginTop: 10 }}>{services.description}</p>

          </motion.div>
        ))}
      </div>
    </>
  )
}

export default AppWrap(MotionWrap(Services, 'app__about'), 'services', 'app__primarybg');