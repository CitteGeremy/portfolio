import React from 'react';

const AppWrap = (Component, idName, classNames = '') => function AppSection() {
  return (
    <section id={idName} className={['app__container', classNames].filter(Boolean).join(' ')}>
      <div className="app__wrapper app__flex">
        <Component />
      </div>
    </section>
  );
};

export default AppWrap;
