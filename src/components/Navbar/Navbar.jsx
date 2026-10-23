import { useEffect, useRef, useState } from 'react';
import { HiArrowRight, HiMenuAlt3, HiOutlineMoon, HiOutlineSun, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';

import { images } from '../../constants';
import './Navbar.scss';

const navigation = [
  { id: 'home', label: 'Accueil' },
  { id: 'services', label: 'Services' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'competences', label: 'Compétences' },
  { id: 'contact', label: 'Contact' },
];

const Navbar = ({ theme, onToggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const headerRef = useRef(null);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    const updatePosition = () => {
      const marker = window.scrollY + window.innerHeight * 0.42;
      const visibleSection = navigation.reduce((current, { id }) => {
        const section = document.getElementById(id);
        return section && section.offsetTop <= marker ? id : current;
      }, 'home');

      setActiveSection(visibleSection);
      setIsScrolled(window.scrollY > 24);
    };

    updatePosition();
    window.addEventListener('scroll', updatePosition, { passive: true });
    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const closeOutside = (event) => {
      if (!headerRef.current?.contains(event.target)) setIsMenuOpen(false);
    };

    document.addEventListener('keydown', closeOnEscape);
    document.addEventListener('pointerdown', closeOutside);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('pointerdown', closeOutside);
    };
  }, [isMenuOpen]);

  return (
    <header
      ref={headerRef}
      className={['app__navbar', isScrolled && 'app__navbar--scrolled'].filter(Boolean).join(' ')}
    >
      <a className="app__navbar-logo" href="#home" aria-label="Retour à l'accueil">
        <img src={images.logo} alt="" />
        <span className="app__navbar-brand">
          <strong>Gérémy Citté</strong>
          <small>Développeur web & mobile</small>
        </span>
      </a>

      <nav className="app__navbar-links" aria-label="Navigation principale">
        <ul>
          {navigation.slice(0, -1).map(({ id, label }) => (
            <li key={id}>
              <a href={'#' + id} aria-current={activeSection === id ? 'location' : undefined}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="app__navbar-actions">
        <a
          className="app__navbar-contact"
          href="#contact"
          aria-current={activeSection === 'contact' ? 'location' : undefined}
        >
          Parlons projet <HiArrowRight aria-hidden="true" />
        </a>

        <button
          className="theme-toggle"
          type="button"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre'}
          aria-pressed={theme === 'dark'}
          title={theme === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre'}
        >
          {theme === 'dark' ? <HiOutlineSun aria-hidden="true" /> : <HiOutlineMoon aria-hidden="true" />}
        </button>

        <button
          ref={menuButtonRef}
          className="app__navbar-menu-button"
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? <HiX aria-hidden="true" /> : <HiMenuAlt3 aria-hidden="true" />}
        </button>
      </div>

      {isMenuOpen && (
        <motion.nav
          id="mobile-menu"
          className="app__navbar-menu"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          aria-label="Navigation mobile"
        >
          <ul>
            {navigation.map(({ id, label }, index) => (
              <li key={id}>
                <a
                  href={'#' + id}
                  aria-current={activeSection === id ? 'location' : undefined}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {label}
                  <HiArrowRight aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </motion.nav>
      )}
    </header>
  );
};

export default Navbar;
