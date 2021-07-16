import React from 'react';
import ReactStars from "react-rating-stars-component";
import styles from './Card.module.css'

export default function Card(props) {

  return <div className={styles.card}>
    <p className={styles.card_title}>{props.name}</p>
    <p>
      <span>{props.rating}</span>
      <span>{`(${props.ratings_num})`}</span>
    </p>
    <ReactStars
      size={20}
      max={5}
      value={props.rating}
      isHalf={true}
      edit={false}
    />
    <p>{props.address}</p>
    <img className={styles.card_image} src={props.photo_link}></img>
  </div>

}