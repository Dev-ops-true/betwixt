import React from 'react';
import styles from './Card.module.css'

export default function Card(props) {

  return <div className={styles.card}>
    <p>{props.name}</p>
    <p>{props.rating}</p>
    {/* <p>{props.address}</p> */}
  </div>

}