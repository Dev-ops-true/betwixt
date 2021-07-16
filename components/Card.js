import React from 'react';
import styles from './Card.module.css'

export default function Card(props) {

  return <div className={styles.card}>
    <p className={styles.card_title}>{props.name}</p>
    <p>
      <span>{props.rating}</span>
      <span className={`fa fa-star ${styles.checked}`}></span>
      <span className={`fa fa-star ${styles.checked}`}></span>
      <span className={`fa fa-star ${styles.checked}`}></span>
      <span className="fa fa-star"></span>
      <span className="fa fa-star"></span>
      <span>{`(${props.ratings_num})`}</span>
    </p>
    <p>{props.address}</p>
    <img className={styles.card_image} src={props.photo_link}></img>
  </div>
}