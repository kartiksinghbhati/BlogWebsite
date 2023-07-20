import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router";
import axios from "axios";
import Header from '../Header/Header';
import Postcard from '../Postcard/Postcard';
import Footer from '../Footer/Footer';


export default function Home() {
  const [posts, setPosts] = useState([]);
  const {search} = useLocation()

  useEffect(() => {
    const fetchPosts = async ()=>{

      try {
        const res = await axios.get("/posts" + search);
        console.log(res.data);
        if (Array.isArray(res.data)) {
          setPosts(res.data);
        } else {
          setPosts([]);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);
      }
    }
    fetchPosts();
  }, [search])

  return (
    <>
      <Header/>
      <div className="home">
        <Postcard posts={posts}/>
      </div>
      <Footer/>
    </>
    
  )
}
