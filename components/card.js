import React from 'react';
import ReactStars from "react-rating-stars-component";
import styles from './Card.module.css'

export default function Card({ name, photo_reference, rating, ratings_num, address }) {

  return <div className={styles.card}>
    <p className={styles.card_title}>{name}</p>
    <p>
      <span>{rating}</span>
      <span>{`(${ratings_num})`}</span>
    </p>
    <ReactStars
      size={20}
      max={5}
      value={rating}
      isHalf={true}
      edit={false}
    />
    <p>{address}</p>
    <img className={styles.card_image} src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference=${photo_reference}&key=${process.env.NEXT_PUBLIC_API_KEY}`} />
  </div>

}