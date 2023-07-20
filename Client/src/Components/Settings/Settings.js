import React, { useContext, useState } from 'react'
import axios from "axios";
import { Context } from "../../Context/Context";
import styles from './Settings.module.css'
import Sidebar from  '../Sidebar/Sidebar'
import defaultProfilePic from '../Images/defaultProfilePic.jpeg'

export default function Settings() {

  const PF = "https://blog-website-gamma-weld.vercel.app/Images/"
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }

    try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  const handleDelete = () => {
    alert("SORRY, This funtionality currently not available");
  }


  return (
    <div className={styles.settings}>
      <div className={styles.settingsWrapper}>
        <div className={styles.settingsTitle}>
          <span className={styles.settingsTitleUpdate}>Update Your Account</span>
          <span className={styles.settingsTitleDelete} onClick={handleDelete}>Delete Account</span>
        </div>

        <form className={styles.settingsForm} onSubmit={handleUpdate}>
          <label>Profile Picture</label>
          <div className={styles.settingsPP}>
            <img src={file ? URL.createObjectURL(file) : (user.profilePic ? (PF+user.profilePic) : defaultProfilePic)} alt="" />
            <label htmlFor="fileInput">
              <i className={`${styles.settingsPPIcon} far fa-user-circle`}></i>{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              className={styles.settingsPPInput}
              onChange={(e) =>setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input type="text" placeholder={user.username} name="name" onChange={(e) =>setUsername(e.target.value)}/>
          <label>Email</label>
          <input type="email" placeholder={user.email} name="email" onChange={(e) =>setEmail(e.target.value)}/>
          <label>Password</label>
          <input type="password" name="password" onChange={(e) =>setPassword(e.target.value)}/>
          <button className={styles.settingsSubmitButton} type="submit">
            Update
          </button>

          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated...
            </span>
          )}

        </form>
      </div>
      <Sidebar/>
    </div>
  )
}
