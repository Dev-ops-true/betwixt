import { Marker, InfoWindow } from '@react-google-maps/api';
import { useState } from 'react';
import ReactStars from "react-rating-stars-component";

export default function Markers({ places, currentPlace }) {
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
              {((open && selectedPlace && selectedPlace.name === place.name) || (currentPlace === place.name)) && (
                <InfoWindow
                  position={place.vicinity}
                  onCloseClick={() => mouseOutHandler}
                >
                  <div>
                    <p>{place.name}</p>
                    <p>
                      {place.rating}
                      <ReactStars
                        size={20}
                        max={5}
                        value={place.rating}
                        isHalf={true}
                        edit={false}
                      />
                      {`(${place.user_ratings_total})`}
                    </p>
                    <p>{place.vicinity}</p>
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




