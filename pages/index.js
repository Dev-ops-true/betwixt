import React from 'react';
import SearchBox from '../components/searchBox';
import Venues from '../components/venues';
import Markers from '../components/markers';
import MarkersAndPlaces from '../components/markersAndPlaces';
import logo from '../public/logo.png';

import {
  GoogleMap,
  LoadScriptNext,
  DirectionsService,
  DirectionsRenderer,
  Marker,
  Circle
} from "@react-google-maps/api";

import mapStyles from "../mapStyles";

const libraries = ["places"];

const mapContainerStyleInitial = {
  width: '100vw',
  height: '100vh',
};

const mapContainerStyleAfterSubmit = {
  width: '70vw',
  height: '100vh',

}

const defaultCenter = {
  lat: 51.5084,
  lng: -0.2744,
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const circleOptions = {
  strokeColor: '#FF0000',
  strokeOpacity: 0,
  strokeWeight: 0,
  fillColor: '#9FE2BF',
  fillOpacity: 0.45,
  clickable: false,
  draggable: true,
  editable: false,
  visible: true,
  radius: 500,
  zIndex: 1
}

export default function Home() {
  const [center, setCenter] = React.useState(defaultCenter);
  const [origin, setOrigin] = React.useState("");
  const [destination, setDestination] = React.useState("");
  const [travelMode, setTravelMode] = React.useState('DRIVING');
  const [directionsOptionsChanged, setDirectionsOptionsChanged] = React.useState(false);
  const [response, setResponse] = React.useState(null);
  const [midpoint, setMidpoint] = React.useState(null);
  const [radius, setRadius] = React.useState(500);
  const [places, setPlaces] = React.useState(null);
  const [category, setCategory] = React.useState(null);
  const [mapContainerStyle, setMapContainerStyle] = React.useState(mapContainerStyleInitial);

  const mapRef = React.useRef(null);
  const circleRef = React.useRef(null);

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setCenter({ lat: position.coords.latitude, lng: position.coords.longitude })
    });
  }, []);

  const directionsCallback = async (response) => {
    if (response !== null) {
      if (response.status === 'OK') {
        setDirectionsOptionsChanged(false);
        setResponse(response);
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
          body: JSON.stringify({ midpoint: midpoint, category: category, radius: radius }),
          headers: {
            "Content-Type": "application/json"
          }
        })

        const placesJson = await places.json()
        placesJson.results.splice(0, 1)
        setPlaces(placesJson.results)
      } else {
        console.log('response: ', response)
      }
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setMapContainerStyle(mapContainerStyleAfterSubmit);
    setDirectionsOptionsChanged(true);
  }

  const handleZoomLevel = () => {
    const bounds = circleRef.current.getBounds();
    mapRef.current.fitBounds(bounds);
  }

  React.useEffect(() => {
    if (circleRef.current) {
      handleZoomLevel();
    }
  }, [radius])

  return (
    <div>
      <h1>betwixt.</h1>
      <LoadScriptNext
        googleMapsApiKey={process.env.NEXT_PUBLIC_API_KEY}
        libraries={libraries}
      >
        <SearchBox setOrigin={setOrigin} setDestination={setDestination} setRadius={setRadius} setCategory={setCategory} setTravelMode={setTravelMode} handleSubmit={handleSubmit} />
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={12}
          center={midpoint || center}
          options={options}
          onLoad={(map) => mapRef.current = map}
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
                  directions: response,
                  preserveViewport: true
                }}
              />
            )
          }

          {
            midpoint !== null && (
              <>
                <Marker
                  icon={"http://maps.google.com/mapfiles/ms/icons/blue-dot.png"}
                  size={new google.maps.Size(71, 71)}
                  animation={google.maps.Animation.BOUNCE}
                  position={midpoint}
                  title="Midpoint"
                />
                <Circle
                  center={{
                    lat: midpoint.lat(),
                    lng: midpoint.lng()
                  }}
                  radius={radius}
                  options={circleOptions}
                  ref={circleRef}
                  onLoad={(circle) => {
                    circleRef.current = circle
                    handleZoomLevel()
                  }}
                />
              </>
            )
          }
          {
            places !== null && (
              <MarkersAndPlaces midpoint={midpoint} places={places} />
            )
          }
        </GoogleMap>
      </LoadScriptNext>
    </div >
  );
}
