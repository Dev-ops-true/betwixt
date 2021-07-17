import React from 'react';
import SearchBox from '../components/searchBox';
import Venues from '../components/venues';

import {
  GoogleMap,
  LoadScriptNext,
  DirectionsService,
  DirectionsRenderer,
  Marker
} from "@react-google-maps/api";

import mapStyles from "../mapStyles";

const libraries = ["places"];

const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: 51.5084,
  lng: -0.2744,
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

export default function Home() {
  const [origin, setOrigin] = React.useState("");
  const [destination, setDestination] = React.useState("");
  const [travelMode, setTravelMode] = React.useState('DRIVING');
  const [directionsOptionsChanged, setDirectionsOptionsChanged] = React.useState(false);
  const [response, setResponse] = React.useState(null);
  const [midpoint, setMidpoint] = React.useState(null);
  const [restaurants, setRestaurants] = React.useState(null);
  const [bars, setBars] = React.useState(null);
  const [cafes, setCafes] = React.useState(null);
  const [category, setCategory] = React.useState(null);

  const directionsCallback = async (response) => {
    if (response !== null) {
      if (response.status === 'OK') {
        setDirectionsOptionsChanged(false)
        setResponse(response)
        const midpointIndex = Math.round(response.routes[0].overview_path.length / 2);
        const midpoint = response.routes[0].overview_path[midpointIndex]
        setMidpoint(midpoint)
        const places = await fetch(
          '/api/google', {
          method: 'POST',
          body: JSON.stringify(midpoint, category),
          headers: {
            "Content-Type": "application/json"
          }
        })
        const placesJson = await places.json()
        setRestaurants(placesJson[0].results)
        setBars(placesJson[1].results)
        setCafes(placesJson[2].results)
        console.log(placesJson[1].results)
      } else {
        console.log('response: ', response)
      }
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setOrigin(event.target.childNodes[0].value);
    setDestination(event.target.childNodes[1].value);
    setTravelMode(event.target.childNodes[2].value);
    setDirectionsOptionsChanged(true);
    setCategory(event.target.childNodes[3].value);
  }

  return (
    <div>
      <h1>Betwixt</h1>
      <SearchBox handleSubmit={handleSubmit} />
      <LoadScriptNext
        googleMapsApiKey={process.env.NEXT_PUBLIC_API_KEY}
      >
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={12}
          center={center}
          options={options}
        >
          {
            (
              destination !== '' &&
              origin !== '' &&
              directionsOptionsChanged
            ) && (
              <DirectionsService
                options={{
                  destination: destination,
                  origin: origin,
                  travelMode: travelMode
                }}
                callback={directionsCallback}
              />
            )
          }

          {
            response !== null && (
              <DirectionsRenderer
                options={{
                  directions: response
                }}
              />
            )
          }

          {
            midpoint !== null && (
              <Marker
                position={midpoint}
                title="Midpoint"
              />
            )
          }
        </GoogleMap>
      </LoadScriptNext>
      {
        (category === 'Restaurant') && (
          <Venues places={restaurants}></Venues>
        )
      }
      {
        (category === 'Bar') && (
          <Venues places={bars}></Venues>
        )
      }
      {
        (category === 'Cafe') && (
          <Venues places={cafes}></Venues>
        )
      }
    </div >
  );
}
