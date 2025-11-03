import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function CardItem(props) {
  const [isStarred, setIsStarred] = useState(props.starred || false);

  const handleStarClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsStarred(!isStarred);
  };

  return (
    <>
      <li className={`cards__item ${props.className}`} data-aos={props['data-aos']}>
        <div className='cards__item__star' onClick={handleStarClick}>
          <span className={`star ${isStarred ? 'star--filled' : 'star--empty'}`}>
            ★
          </span>
        </div>
        <Link className='cards__item__link' to={`/project/${props.id}`}>
          <figure className='cards__item__pic-wrap' data-category={props.label}>
            <img
              className='cards__item__img'
              alt='Project Image'
              src={props.src}
            />
          </figure>
          <div className='cards__item__info'>
            <h3 className='cards__item__header'>{props.heading}</h3>
            <h5 className='cards__item__text'>{props.text}</h5>
          </div>
        </Link>
      </li>
    </>
  );
}

export default CardItem;
