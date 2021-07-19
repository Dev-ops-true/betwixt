import { Marker, InfoWindow } from '@react-google-maps/api';
import { useState } from 'react';
import ReactStars from "react-rating-stars-component";

export default function Markers({ places }) {
  const [open, setOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const mouseOverHandler = (place) => {
    setOpen(true)
    setSelectedPlace(place)
  }

  const mouseOutHandler = () => {
    setOpen(false)
    setSelectedPlace(null)
  }

  return (
    <>
      {
        places.map(place => {
          return (
            <Marker key={place.place_id} position={place.geometry.location} title={place.name} onMouseOver={() => mouseOverHandler(place)} onMouseOut={() => mouseOutHandler}>
              {open && selectedPlace && selectedPlace.name === place.name && (
                <InfoWindow
                  position={selectedPlace.vicinity}
                  onCloseClick={() => mouseOutHandler}
                >
                  <div>
                    <p>{selectedPlace.name}</p>
                    <p>
                      {selectedPlace.rating}
                      <ReactStars
                        size={20}
                        max={5}
                        value={selectedPlace.rating}
                        isHalf={true}
                        edit={false}
                      />
                      {`(${selectedPlace.user_ratings_total})`}
                    </p>
                    <p>{selectedPlace.vicinity}</p>
                  </div>
                </InfoWindow>
              )
              }
            </Marker>
          )
        })
      }
    </>
  )
};




