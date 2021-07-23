import { useState, useEffect } from 'react';
import React from 'react';
import ReactStars from "react-rating-stars-component";
import styles from './detailedCard.module.css'
import Image from 'next/image'
import Collapsible from 'react-collapsible';
import { RiPhoneFill, RiComputerFill, RiMapPin2Fill } from "react-icons/ri";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

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

  if (!activePlace) return (
    <Loader
      type="ThreeDots"
      color="#9aebc2"
      height={100}
      width={100}
      timeout={3000} //3 secs
    />)

  return (
    <>
      {
        activePlace && (
          <div className={styles.card}>
            <div className={styles.card_info}>
              <p className={styles.card_title}>{activePlace.name}</p>
              {
                activePlace.opening_hours?.open_now ? <p className={styles.open}>OPEN NOW</p> : <p className={styles.closed}>CLOSED</p>
              }

              <div className={styles.photodiv}>
                {photo_reference && <Image className={styles.card_photo} width={100} height={100} alt='Venue image' src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=100&photoreference=${photo_reference}&key=${process.env.NEXT_PUBLIC_API_KEY}`} />}
              </div>
              <span className={styles.card_rating}>{activePlace.rating} </span>&nbsp;&nbsp;
              <span className={styles.card_rating}>
                <ReactStars
                  size={20}
                  max={5}
                  value={activePlace.rating}
                  isHalf={true}
                  edit={false}
                /></span>&nbsp;&nbsp;
              <span className={styles.card_ratings_num}>
                {`${activePlace.user_ratings_total || 'No'} reviews`}</span>
              <div>
                <p className={styles.phonenumber}><RiPhoneFill />&nbsp;&nbsp;{`${activePlace.international_phone_number || "No Phone"}`}</p>
                {activePlace.website && <p className={styles.phonenumber}><RiComputerFill />&nbsp;&nbsp;<a href={`${activePlace.website}`} target="_blank" rel="noreferrer" >{`${activePlace.website.split('/')[2]}`} </a>
                </p>}
                <p className={styles.phonenumber}><RiMapPin2Fill />&nbsp;&nbsp;{`${activePlace.formatted_address}`}</p>
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
