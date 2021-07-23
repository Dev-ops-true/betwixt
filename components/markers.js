import { Marker, InfoWindow } from '@react-google-maps/api';
import { useState } from 'react';
import ReactStars from "react-rating-stars-component";
import styles from './marker.module.css'

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
            <Marker key={place.place_id} position={place.geometry.location} title={place.name} onMouseOver={() => mouseOverHandler(place)}
              onMouseOut={mouseOutHandler}
              animation={google.maps.Animation.DROP}>
              {((open && selectedPlace && selectedPlace.place_id === place.place_id) || (currentPlace === place)) && (
                <InfoWindow
                  position={place.geometry.location}
                  onCloseClick={() => mouseOutHandler}
                >
                  <div className={styles.window}>
                    <p className={styles.window_title}>{place.name}</p>
                    <span className={styles.window_rating}>
                      {place.rating}
                      <ReactStars
                        size={11}
                        max={5}
                        value={place.rating}
                        isHalf={true}
                        edit={false}
                      />
                    </span>
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




