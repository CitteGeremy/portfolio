import React, { useState } from 'react';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion } from "framer-motion"

import { images } from '../../constants';
import './Navbar.scss';

var root = document.querySelector(':root');
var rootStyles = getComputedStyle(root);
var primary = rootStyles.getPropertyValue('--navdark-color');


const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  

  window.onscroll = function (event) {
    var scroll = window.pageYOffset;
    if (scroll < 300) {
      document.getElementById("navb").style.backgroundColor = "rgba(255, 255, 255, 0.25)";
      document.getElementById("navb").style.transition = "all 1s";
      document.getElementById("logo").style.filter = "invert(0%)";      
      }
      else {
        document.getElementById("navb").style.transition = "all 1s";
        document.getElementById("navb").style.backgroundColor = primary;
        document.getElementById("logo").style.filter = "invert(100%)";
    } 
 }

  return (
    <nav className="app__navbar" id="navb">
      <div className="app__navbar-logo">
        <img id='logo' src={images.logo} alt="logo" />
      </div>
      <ul className="app__navbar-links">
        {['home', 'services', 'portfolio', 'compétences', 'contact'].map((item) => (
          <li className="app__flex p-text" key={`link-${item}`}>
            <div />
            <a href={`#${item}`}>{item}</a>
          </li>
        ))}
      </ul>

      <div className="app__navbar-menu">
        <HiMenuAlt4 onClick={() => setToggle(true)} />

        {toggle && (
          <motion.div
            whileInView={{ x: [150, 0] }}
            transition={{ duration: 0.8, stiffness: 100, type: 'spring' }}
          >
            <HiX onClick={() => setToggle(false)} />
            <ul>
              {['home', 'services', 'portfolio', 'compétences', 'contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item}`} onClick={() => setToggle(false)}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;