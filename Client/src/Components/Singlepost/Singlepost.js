import React, { useEffect, useState, useContext } from 'react'
import { Context } from "../../Context/Context";
import { useLocation } from "react-router";
import {Link} from 'react-router-dom'
import styles from './Singlepost.module.css'
import axios from "axios";

export default function Singlepost() {
    
    const PF = "http://localhost:5000/Images/";

    const location = useLocation();
    const path = location.pathname.split("/")[2];
    //console.log(path);
    const { user } = useContext(Context);
    const [post, setPost] = useState({});
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get("/posts/" + path);
            console.log(res);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
        };
        getPost();
      }, [path]);

    const handleDelete = async () => {
        try {
            await axios.delete(`/posts/${post._id}`, {
            data: { username: user.username },
            });
            window.location.replace("/");
        } catch (err) {}
    };

    const handleUpdate = async () => {
        try {
          await axios.put(`/posts/${post._id}`, {
            username: user.username,
            title,
            desc,
          });
          setUpdateMode(false)
        } catch (err) {}
    };

  return (
    <div className={styles.singlepost}>
        <div className={styles.singlePostWrapper}>

            {post.photo && (<img className={styles.singlePostImg} src={PF + post.photo} alt="" />)}

            {updateMode ? (
                <input
                    type="text"
                    value={title}
                    className={styles.singlePostTitleInput}
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                />
            ) : (    
                <h1 className={styles.singlePostTitle}>
                {post.title}
                {post.username === user?.username && (
                    <div className={styles.singlePostEdit}>
                        <i className={`${styles.singlePostIcon} fa-solid fa-pen-to-square`} onClick={() => setUpdateMode(true)}></i>
                        <i className={`${styles.singlePostIcon} fa-solid fa-trash`} onClick={handleDelete}></i>
                    </div>
                )}  
                </h1>
            )}

            <div className={styles.singlePostInfo}>
                <span className={styles.singlePostAuthor}>
                    Author: 
                    <Link to={`/?user=${post.username}`} className="link">
                        <b> {post.username}</b>
                    </Link>
                </span>
                <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
            </div>

            {updateMode ? (
                <textarea
                    className={styles.singlePostDescInput}
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                />
            ) : (
                <p className={styles.singlePostDesc}>{desc}</p>
            )}

            {updateMode && (
                <button className={styles.singlePostButton} onClick={handleUpdate}>Update</button>
            )}
        </div>
    </div>

  )
}
