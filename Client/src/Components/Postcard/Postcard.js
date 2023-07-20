import React from 'react'
import { Link } from 'react-router-dom'
import './Postcard.css'


export default function Postcard(props) {

  const PF = "https://blog-website-gamma-weld.vercel.app/Images/";
  return (

    <div className='right-content'>
      {props.posts?.map((post, index) => (

        <Link className='link' to={`/post/${post._id}`}>
          <div className='CardTwo top slide card'>
            <div className={`card box${index % 2 === 0 ? ' left' : ' right'}`} key={index}>
              <div className='img'>
                {post.photo && (<img src={PF + post.photo} alt="" />)}
              </div>
              <div className='text'>
                <span className='textSpan'>categories</span>
                <h2 className='textH2'>{post.title}</h2>
                <p className='textP'>{post.desc}</p>
                <span className='textSpan'>By {post.username}</span>
              </div>
            </div>
          </div>
        </Link>


      ))}
    </div>
  )
}
