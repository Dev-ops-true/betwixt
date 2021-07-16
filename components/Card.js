import React from 'react';
import styles from './Card.module.css'

export default function Card(props) {

  return <div className={styles.card}>
    <p>{props.name}</p>
    <p>
      <span>{props.rating}</span>
      <span>{props.hours}</span>
    </p>
  </div>

}