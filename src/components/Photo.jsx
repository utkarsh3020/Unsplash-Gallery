import React from 'react'
import { FaHeart } from 'react-icons/fa';

const Photo = ({
    urls: {regular},
    alt_description,
    likes,
    user:{
        name,
        portfolio_url,
        profile_image:{medium},
    },
}) => {
  return (
    <article className='photo'>
        <img src={regular} alt={alt_description} />
        <div className="favourite">
            <button><FaHeart /></button>
        </div>
        <div className="photo-info">
            <div>
                <h4>{name}</h4>
                <p>Likes : {likes}</p>
            </div>
            <a href={portfolio_url}>
                <img className='user-img' src={medium} alt="" />
            </a>
        </div>
    </article>
  )
}

export default Photo;