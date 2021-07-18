import { Marker, InfoWindow } from '@react-google-maps/api';
import { useState } from 'react';

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
              {selectedPlace && (
                <InfoWindow
                  position={selectedPlace.vicinity}
                  onCloseClick={() => mouseOutHandler}
                >
                  <span>{selectedPlace.name}</span>
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


