import Markers from "./markers"
import Venues from "./venues"
import React from 'react'

export default function MarkersAndPlaces({places}) {
  const [currentlySelectedPlace, setCurrentlySelectedPlace] = React.useState(null);

  const cardClickHandle = (place) => {
    setCurrentlySelectedPlace(place);
  }

  return (
    <>
      {
        places !== null && (
          <Markers currentPlace={currentlySelectedPlace} places={places} />
        )
      }
      {
        places !== null && (
          <Venues onClick={cardClickHandle} places={places} />
        )
      }
    </>
  )
}