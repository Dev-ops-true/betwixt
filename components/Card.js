import React from 'react';
import ReactStars from "react-rating-stars-component";
import styles from './Card.module.css'

export default function Card(props) {

  return <div className={styles.card}>
    <p><img className={styles.card_image} src={props.photo_link}></img></p>
    <p className={styles.card_title}>{props.name}</p>
    <div className={styles.card_row_two}>
      <ReactStars
      size={20}
      max={5}
      value={props.rating}
      isHalf={true}
      edit={false}
    /></div>
    <div className={styles.card_ratings_num}>{`(${props.ratings_num})`}</div>
    <p className={styles.card_address}>{props.address}</p>
  </div>

}