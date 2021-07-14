import '../styles/globals.css';
import React from "react";

import {
  GoogleMap,
  LoadScriptNext,
  DirectionsService,
  DirectionsRenderer,
  Marker
} from "@react-google-maps/api";

import usePlacesComplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

import "@reach/combobox/styles.css";

import mapStyles from "../mapStyles";
import usePlacesAutocomplete from 'use-places-autocomplete';

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

export default function App() {
  const [origin, setOrigin] = React.useState("");
  const [destination, setDestination] = React.useState("");
  const [travelMode, setTravelMode] = React.useState('DRIVING');
  const [response, setResponse] = React.useState(null);
  const [midpoint, setMidpoint] = React.useState(null);

  const directionsCallback = (response) => {
    console.log(response)

    if (response !== null) {
      if (response.status === 'OK') {
        setResponse(response)
        const midpointIndex = Math.round(response.routes[0].overview_path.length / 2);
        setMidpoint(response.routes[0].overview_path[midpointIndex])
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
  }

  return (
    <div>
      <h1>Betwixt</h1>
      <SearchBox handleSubmit={handleSubmit}/>
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
              origin !== ''
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

function SearchBox({handleSubmit}) {
  return (
    <form className="search" onSubmit={(e) => handleSubmit(e)}>
      <input type="text" name="origin" placeholder="Your post code"/>
      <input type="text" name="destination" placeholder="Your friend's post code"/>
      <select name="travelMode">
        <option value="DRIVING">Driving</option>
        <option value="WALKING">Walking</option>
        <option value="BICYCLING">Bicycling</option>
        <option value="TRANSIT">Transit</option>
      </select>
      <button type="submit">Search</button>
    </form>
  )
}

// function Search(props) {
//   const {
//     ready,
//     value,
//     suggestions: { status, data },
//     setValue,
//     clearSuggestion
//   } = usePlacesAutocomplete({
//     requestOptions: {
//       location: { lat: () => 51.5084, lng: () => -0.2744 },
//       radius: 200000,
//     },
//   });

//   return (
//     <Combobox
//       onSelect={(address) => {
//         console.log(address);
//       }}
//     >
//       <ComboboxInput
//         value={value}
//         onChange={(e) => {
//           setValue(e.target.value);
//         }}
//         disabled={!ready}
//         placeholder={props.placeholder}
//       />
//       <ComboboxPopover>
//         {status === "OK" && data.map(({ id, description }) => (
//           <ComboboxOption key={id} value={description} />
//         ))}
//       </ComboboxPopover>
//     </Combobox>
//   );
// }
