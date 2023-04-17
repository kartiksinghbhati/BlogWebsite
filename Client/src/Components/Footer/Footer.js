import React from 'react'
import styles from './Footer.module.css';


export default function Footer() {
  return (
    <div  className={styles.footer}>
        <div className='para'>
          <p>© 2022 GorkCoder - All Rights Reserved.</p>
        </div>
        <div className='icon'>
          <i className='fab fa-facebook-f'></i>
          <i className='fab fa-instagram'></i>
          <i className='fab fa-twitter'></i>
          <i className='fab fa-youtube'></i>
        </div>
    </div>
  )
}

