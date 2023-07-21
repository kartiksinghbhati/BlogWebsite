import React, { useEffect, useState, useContext } from 'react'
import axios from "axios";
import {Link} from 'react-router-dom'
import { Context } from "../../Context/Context";
import styles from './Sidebar.module.css'
import defaultProfilePic from '../Images/defaultProfilePic.jpeg'

export default function Sidebar() {

    const PF = "https://blog-website-gamma-weld.vercel.app/Images/"
    const {user} = useContext(Context);
    const [cats, setCats] = useState([]);

    useEffect(() => {
        const getCats = async () => {
            const res = await axios.get("https://blog-website-gamma-weld.vercel.app/api/categories");
            setCats(res.data);
        };
        getCats();
    }, []);

  return (
    <div className={styles.sidebar}>
        <div className={styles.sidebarItem}>
            <span className={styles.sidebarTitle}>ABOUT ME</span>
            <img src={user.profilePic ? (PF+user.profilePic) : defaultProfilePic} alt="ProfilePic"/>
            <p>
                Simply type in the full or partial name and VSCode will automatically look into your current workspace and display the ones that contain the name you just wrote.
            </p>
        </div>
        <div className={styles.sidebarItem}>
            <span className={styles.sidebarTitle}>CATEGORIES</span>
            <ul className={styles.sidebarList}>
                {cats?.map((c) => (
                    <Link to={`/?cat=${c.name}`} className="link">
                    <li className="sidebarListItem">{c.name}</li>
                    </Link>
                ))}
            </ul> 
        </div>
        <div className={styles.sidebarItem}>
            <span className={styles.sidebarTitle}>FOLLOW US</span>
            <div className={styles.sidebarSocial}>
                <i className={`${styles.sidebarIcon} fa-brands fa-instagram`}></i>
                <i className={`${styles.sidebarIcon} fa-brands fa-twitter`}></i>
                <i className={`${styles.sidebarIcon} fa-brands fa-facebook`}></i>
                <i className={`${styles.sidebarIcon} fa-brands fa-pinterest`}></i>
            </div>
        </div>
      
    </div>
  )
}
