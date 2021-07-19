import React from 'react';

export default function Card(props) {

  return <div className={styles.card}>
    <p>{props.name}</p>
    <p>{props.rating}</p>
    {/* <p>{props.address}</p> */}
  </div>

}