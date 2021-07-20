import React from 'react';
import ReactStars from "react-rating-stars-component";
import styles from './Card.module.css'
import Image from 'next/image'
import { MdLocationOn, MdExplore } from "react-icons/md";

export default function Card({ name, photo_reference, rating, ratings_num, address, distance, onClick, onMouseOver, open_now }) {
  return (
    <div className={styles.card} onMouseOver={() => { onMouseOver(name) }} onMouseOut={() => { onMouseOver(null) }} onClick={onClick}  >
      <div className={styles.card_info}>
        <p className={styles.card_title}>{name}</p>
        {open_now ? <p className={styles.open}>OPEN NOW</p> : <p className={styles.closed}>CLOSED</p>}
          <span className={styles.card_rating}>{rating  || 'No reviews'} </span>
          <span className={styles.card_rating}>
            <ReactStars
            size={20}
            max={5}
            value={rating}
            isHalf={true}
            edit={false}
          /></span>
          <span className={styles.card_ratings_num} > {`${ratings_num || 'No'} reviews`}</span>
        <p className={styles.card_address}><MdLocationOn/> {address}</p>
        <p className={styles.card_distance}><MdExplore/> {Math.round(distance)}m from your midpoint</p>
      </div>
      <div>
        {photo_reference && <Image className={styles.card_photo} width={100} height={100} alt='Venue image' src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=100&photoreference=${photo_reference}&key=${process.env.NEXT_PUBLIC_API_KEY}`} />}
      </div>
    </div>
  )
}