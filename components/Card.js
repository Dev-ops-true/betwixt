import React from 'react';
import styles from './Card.module.css'

export default function Card(props) {

  return <div className={styles.card}>
    <p>{props.name}</p>
    <p>
      <span>{props.rating}</span>
      <span>{`(${props.ratings_num})`}</span>
    </p>
    <p>{props.address}</p>
  </div>

}