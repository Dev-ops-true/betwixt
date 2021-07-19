import React from 'react';
import ReactStars from "react-rating-stars-component";
import styles from './Card.module.css'

export default function Card({ name, photo_reference, rating, ratings_num, address }) {

  return <div className={styles.card}>
    {name && <p className={styles.card_title}>{name}</p>}
    <p>
      {rating && <span>{rating}</span>}
      {ratings_num && <span>{`(${ratings_num})`}</span>}
    </p>
    {rating && <ReactStars
      size={20}
      max={5}
      value={rating}
      isHalf={true}
      edit={false}
    />}
    {address && <p>{address}</p>}
    {photo_reference && <img className={styles.card_image} src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference=${photo_reference}&key=${process.env.NEXT_PUBLIC_API_KEY}`} />}
  </div>

}