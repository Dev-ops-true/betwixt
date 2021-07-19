import React from 'react';
import ReactStars from "react-rating-stars-component";
import styles from './Card.module.css'
import Image from 'next/image'

export default function Card({ name, photo_reference, rating, ratings_num, address, onClick }) {

  return (
    <div className={styles.card} onMouseOver={() => { onClick(name) }} onMouseOut={() => { onClick(null) }}  >
      <div className={styles.card_info}>
        <p className={styles.card_title}>{name}</p>
        <p>
          {rating}
          <ReactStars
            size={20}
            max={5}
            value={rating}
            isHalf={true}
            edit={false}
          />
          {`(${ratings_num})`}
        </p>

        <p>{address}</p>
      </div>
      <div>
        <Image className={styles.card_photo} width={100} height={100} alt='Venue image' src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=100&photoreference=${photo_reference}&key=${process.env.NEXT_PUBLIC_API_KEY}`} />
      </div>
    </div>
  )
}