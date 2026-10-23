import React from 'react';
const MotionWrap = (Component, classNames) => function HOC() {
  return (
    <div className={`${classNames} app__flex`}>
      <Component />
    </div>
  );
};

export default MotionWrap;
