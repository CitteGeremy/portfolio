import { useEffect, useState } from 'react';
import { HiArrowUp } from 'react-icons/hi';

import { Competences, Footer, Header, Projets, Services } from './container';
import { Navbar, SocialMedia } from './components';
import { images } from './constants';
import './App.scss';

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = window.localStorage.getItem('portfolio-theme');
    if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  return (
    <div className="app">
      <a className="skip-link" href="#main-content">Aller au contenu</a>
      <Navbar
        theme={theme}
        onToggleTheme={() => setTheme((current) => (current === 'light' ? 'dark' : 'light'))}
      />

      <main id="main-content">
        <Header />
        <Services />
        <Projets />
        <Competences />
        <Footer />
      </main>

      <footer className="site-footer">
        <div className="site-footer__inner">
          <div className="site-footer__identity">
            <a className="site-footer__brand" href="#home" aria-label="Retour à l'accueil">
              <img src={images.logo} alt="" />
              <span>Gérémy Citté</span>
            </a>
            <SocialMedia />
          </div>
          <p>© {new Date().getFullYear()} KAIIZER971 · Tous droits réservés</p>
          <a className="site-footer__top" href="#home">
            Retour en haut <HiArrowUp aria-hidden="true" />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
