import React from 'react';
import ReactStars from "react-rating-stars-component";
import styles from './Card.module.css'

export default function Card(props) {

  return <div className={styles.card}>
    <p><img className={styles.card_image} src={props.photo_link}></img></p>
    <p className={styles.card_title}>{props.name}</p>
    <ReactStars
      size={20}
      max={5}
      value={props.rating}
      isHalf={true}
      edit={false}
    />
    <span className={styles.card_ratings_num}>{`(${props.ratings_num})`}</span>
    <p className={styles.card_address}>{props.address}</p>
  </div>

}