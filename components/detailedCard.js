import { useState, useEffect } from 'react';
import React from 'react';
import ReactStars from "react-rating-stars-component";
import styles from './detailedCard.module.css'
import Image from 'next/image'
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
    </>
  )
}
