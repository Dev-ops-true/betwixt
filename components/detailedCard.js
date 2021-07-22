import { useState, useEffect } from 'react';
import React from 'react';
import ReactStars from "react-rating-stars-component";
import styles from './detailedCard.module.css'
import Image from 'next/image'
import Collapsible from 'react-collapsible';
import { BiPhone, BiWindowAlt, BiTime, BiMap } from "react-icons/bi";

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

  if (!activePlace) return "Loading..."

  return (
    <>
      {
        activePlace && (
          <div className={styles.card}>
            <div className={styles.card_info}>
              <p className={styles.card_title}>{activePlace.name}</p>
              {
                activePlace.opening_hours?.open_now ? <p>OPEN NOW</p> : <p className={styles.closed}>CLOSED</p>
              }
              <span className={styles.card_rating}>{activePlace.rating}
                <ReactStars
                  size={20}
                  max={5}
                  value={activePlace.rating}
                  isHalf={true}
                  edit={false}
                /></span>
              <span className={styles.card_ratings_num}>
                {`${activePlace.user_ratings_total || 'No'} reviews`}
              </span>
              <div>
                <p className={styles.phonenumber}><BiPhone />&nbsp;&nbsp;{`${activePlace.international_phone_number}`}</p>
                {activePlace.website && <p className={styles.phonenumber}><BiWindowAlt />&nbsp;&nbsp;<a href={`${activePlace.website}`} target="_blank" rel="noreferrer" >{`${activePlace.website.split('/')[2]}`} </a>
                </p>}
                <p className={styles.phonenumber}><BiMap />&nbsp;&nbsp;{`${activePlace.formatted_address}`}</p>
                <p className={styles.openinghours}><Collapsible trigger="&#128337;&nbsp;&nbsp;Opening Hours &#9660;">
                  {
                    activePlace.opening_hours?.weekday_text.map((dayHours) => {
                      return <p className={styles.openinghours_hours} key={dayHours}>{dayHours}</p>
                    })
                  }
                </Collapsible></p>
              </div>

            </div >
          </div >
        )
      }
    </>
  )
}
