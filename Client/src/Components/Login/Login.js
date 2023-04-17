import React, { useContext, useRef } from 'react'
import { Link } from 'react-router-dom';
import { Context } from "../../Context/Context"
import axios from "axios";
import styles from './Login.module.css'

export default function Login() {

  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className={styles.login}>
        <span className={styles.loginTitle}>Login</span>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
            <label>Username</label>
            <input className={styles.loginInput} type="text" placeholder="Enter your username..." ref={userRef}/>
            <label>Password</label>
            <input className={styles.loginInput} type="password" placeholder="Enter your password..." ref={passwordRef}/>
            <button className={styles.loginButton} type='submit' disabled={isFetching}>Login</button>
        </form>
        <button className={styles.loginRegisterButton}>
          <Link className='link' to="/register">Register</Link>
        </button>
    </div>
  )
}
