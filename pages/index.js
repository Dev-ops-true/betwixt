import React from 'react';
import SearchBox from '../components/searchBox';
import Venues from '../components/venues';
import Markers from '../components/markers';
import MarkersAndPlaces from '../components/markersAndPlaces';
import logo from '../public/logo.png';
import CircleComponent from "../components/circle";

import {
  GoogleMap,
  LoadScriptNext,
  DirectionsService,
  DirectionsRenderer,
  Marker
} from "@react-google-maps/api";

import mapStyles from "../mapStyles";

const libraries = ["places"];

const mapContainerStyleInitial = {
  width: '100vw',
  height: '100vh',
};

const mapContainerStyleAfterSubmit = {
  width: '75vw',
  height: '100vh',

}

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
  const [places, setPlaces] = React.useState(null);
  const [category, setCategory] = React.useState(null);
  const [mapContainerStyle, setMapContainerStyle] = React.useState(mapContainerStyleInitial);

  const directionsCallback = async (response) => {
    if (response !== null) {
      if (response.status === 'OK') {
        setDirectionsOptionsChanged(false);
        setResponse(response);
        console.log(response);
        const currentJourney = response.routes[0].legs[0];
        const currentJourneyHalfDuration = currentJourney.duration.value / 2;
        let currentTotalDuration = 0;
        let midpoint;

        for (let i = 0; i < currentJourney.steps.length; i++) {
          currentTotalDuration += currentJourney.steps[i].duration.value;
          if (currentTotalDuration >= currentJourneyHalfDuration) {
            midpoint = currentJourney.steps[i].lat_lngs[0];
            setMidpoint(midpoint);
            break;
          }
        }

        const places = await fetch(
          '/api/google', {
          method: 'POST',
          body: JSON.stringify({ midpoint: midpoint, category: category }),
          headers: {
            "Content-Type": "application/json"
          }
        })
        const placesJson = await places.json()
        placesJson.results.splice(0, 1)
        setPlaces(placesJson.results)
        console.log(placesJson.results)
      } else {
        console.log('response: ', response)
      }
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setTravelMode(event.target.childNodes[2].value);
    setCategory(event.target.childNodes[3].value);
    setMapContainerStyle(mapContainerStyleAfterSubmit);
    setDirectionsOptionsChanged(true);
  }

  return (
    <div>
      <h1>betwixt.</h1>
      <LoadScriptNext
        googleMapsApiKey={process.env.NEXT_PUBLIC_API_KEY}
        libraries={libraries}
      >
        <SearchBox setOrigin={setOrigin} setDestination={setDestination} handleSubmit={handleSubmit} />
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={12}
          center={midpoint || center}
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
              <>
                <Marker
                  position={midpoint}
                  title="Midpoint"
                />
                <CircleComponent
                  midPoint={midpoint}
                  radius={1500}
                />
              </>
            )
          }
          {
            places !== null && (
               <MarkersAndPlaces midpoint={midpoint} places={places}/>
            )
          }
        </GoogleMap>
      </LoadScriptNext>
    </div >
  );
}
