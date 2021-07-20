import { useState, useEffect } from 'react';
import React from 'react';
import ReactStars from "react-rating-stars-component";
import styles from './detailedCard.module.css'
import Image from 'next/image'
import Collapsible from 'react-collapsible';

export default function DetailedCard({ place_id, photo_reference }) {

  const [activePlace, setActivePlace] = useState(null);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const activePlace = await fetch(
        '/api/google_place_details', {
        method: 'POST',
        body: JSON.stringify({ place_id: place_id }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const activePlaceJson = await activePlace.json()
      setActivePlace(activePlaceJson.result)
      console.log(activePlaceJson.result)
    }
    fetchData();
  }, [place_id]);
  return (
    <>
      {
        activePlace && (
          <div className={styles.card}>
            <div className={styles.card_info}>
              <p className={styles.card_title}>{activePlace.name}</p>
              <p>{activePlace.rating}
                <span><ReactStars
                  size={15}
                  max={5}
                  value={activePlace.rating}
                  isHalf={true}
                  edit={false}
                /></span>
                <span className={styles.card_ratings_num}>
                  {`${activePlace.user_ratings_total || 'No'} reviews`}
                </span>
              </p>
              <div>
                <Image className={styles.card_photo} width={100} height={100} alt='Venue image' src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=100&photoreference=${photo_reference}&key=${process.env.NEXT_PUBLIC_API_KEY}`} />
              </div >
              <div>
                <p>{`Address: ${activePlace.formatted_address}`}</p>
                <Collapsible trigger="Opening Hours &#9660;">
                  {
                    activePlace.opening_hours.weekday_text.map((dayHours) => {
                      return <p key={dayHours}>{dayHours}</p>
                    })
                  }
                </Collapsible>
                <p>{`Phone number: ${activePlace.international_phone_number}`}</p>
                {activePlace.website && <p> Website: <a href={`${activePlace.website}`} target="_blank" rel="noreferrer" >{`${activePlace.website.split('/')[2]}`} </a>
                </p>}
              </div>

            </div >
          </div >
        )
      }
    </>
  )
}
