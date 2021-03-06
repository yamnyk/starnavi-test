import React from 'react';

import styles from './Preloader.module.css'

const Preloader = ({size = 'small'}) => {
  return (
    <div className={[styles.Preloader, styles.Preloader_Small].join(' ')}>
    </div>
  );
};

export default Preloader;