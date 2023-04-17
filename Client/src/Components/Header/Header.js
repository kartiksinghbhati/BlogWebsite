import React from 'react'
import styles from './Header.module.css';
import headerimg from '../Images/headerimg.webp';

export default function Header() {
  return (
    <div  className={styles.header}>
        <div className={styles.headerTitles}>
            <span className={styles.headerTitleSm}>React & Node</span>
            <span className={styles.headerTitleLg}>Blog</span>
        </div>
        <img className={styles.headerImg} src={headerimg} alt=""/>
      
    </div>
  )
}
