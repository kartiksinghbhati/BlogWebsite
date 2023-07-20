import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { Context } from "../../Context/Context";
import styles from './Topbar.module.css'
import defaultProfilePic from '../Images/defaultProfilePic.jpeg'


export default function Topbar() {

  const PF = "https://blog-website-gamma-weld.vercel.app/Images/"
  const {user, dispatch} = useContext(Context);

  const handleLogout = () =>{
    dispatch({type: "LOGOUT"});
  };

  return (
    <div className={styles.top}>
      <div className={styles.topLeft}>
        <i className={`${styles.topIcons} fa-brands fa-instagram`}></i>
        <i className={`${styles.topIcons} fa-brands fa-twitter`}></i>
        <i className={`${styles.topIcons} fa-brands fa-facebook`}></i>
        <i className={`${styles.topIcons} fa-brands fa-pinterest`}></i>
      </div>
      <div className={styles.topCenter}>
        <ul className={styles.topList}>
            <li className={styles.topListItem}>
              <Link className='link' to="/">HOME</Link>
            </li>
            <li className={styles.topListItem}>
              <Link className='link' to="/">ABOUT</Link>
            </li>
            <li className={styles.topListItem}>
              <Link className='link' to="/">CONTACT</Link>
            </li>
            <li className={styles.topListItem}>
              <Link className='link' to="/write">WRITE</Link>
            </li>
            <li className={styles.topListItem} onClick={handleLogout}>
              {user && "LOGOUT"}
            </li>
        </ul>
      </div>
      <div className={styles.topRight}>
        {
          user ? (
            <Link to="/settings">
              <img className={styles.topImg} src={user.profilePic ? (PF+user.profilePic) : defaultProfilePic} alt="ProfilePic"/>
            </Link>
          ) : (
            <ul className={styles.topList}>
              <li className={styles.topListItem}>
                <Link className='link' to="/login">LOGIN</Link>
              </li>
              <li className={styles.topListItem}>
                <Link className='link' to="/register">REGISTER</Link>
              </li>
            </ul>
          )
        }
        
        <i className={`${styles.topSearchIcon} fa-solid fa-magnifying-glass`}></i>
      </div>
    </div>
  )
}
