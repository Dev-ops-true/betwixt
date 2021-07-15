import React from 'react';
import SearchBox from '../components/searchBox';

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

  const directionsCallback = (response) => {
    console.log(response)

    if (response !== null) {
      if (response.status === 'OK') {
        setDirectionsOptionsChanged(false)
        setResponse(response)
        const midpointIndex = Math.round(response.routes[0].overview_path.length / 2);
        setMidpoint(response.routes[0].overview_path[midpointIndex])
      } else {
        console.log('response: ', response)
      }
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setOrigin(event.target.childNodes[0].value);
    setDestination(event.target.childNodes[1].value);
    setTravelMode(event.target.childNodes[2].value);
    setDirectionsOptionsChanged(true);
    const response = await fetch(
      '/api/google', {
      method: 'POST',
      body: JSON.stringify(midpoint),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const responseJson = await response.json()
    console.log(responseJson)
  }

  return (
    <div>
      <h1>Betwixt</h1>
      <SearchBox handleSubmit={handleSubmit} />
      <LoadScriptNext
        googleMapsApiKey={"AIzaSyBXlpinTY2iWYVXDuFFbE9PnrPIr7cfNHk"}
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
    </div>
  );
}
