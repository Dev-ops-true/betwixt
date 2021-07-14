import '../styles/globals.css';
import React from "react";

import {
  GoogleMap,
  useLoadScript,
  Marker,
  Infowindow,
  DirectionsService,
  Polyline
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
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: "AIzaSyBXlpinTY2iWYVXDuFFbE9PnrPIr7cfNHk",
    libraries,
  });

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const [postCode1, setPostCode1] = React.useState("SG12 7LW");
  const [postCode2, setPostCode2] = React.useState("CV4 7GG");

  // const onDirectionsServiceLoad = React.useCallback((directionsService) => {
  //   directionsService.route({
  //     origin: getLatLng(postCode1),
  //     destination: getLatLng(postCode2),
  //     travelMode: 'DRIVING',
  //   }, (response, status) => {
  //     if (status === 'OK') {
  //       const {routes} = response;
  //       const {legs} = routes[0];
  //       const {steps} = legs[0];
  //       const polyline = new Polyline({
  //         path: steps[0].polyline.points,
  //         strokeColor: "#FF0000",
  //         strokeOpacity: 0.3,
  //         strokeWeight: 5,
  //       });
  //       mapRef.current.addOverlay(polyline);
  //     }
  //   });
  // }, [postCode1, postCode2]);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  const handleChange = (event) => {
    event.preventDefault();
    event.target.name === "postCode1" ? setPostCode1(event.target.value) : setPostCode2(event.target.value);
  }

  return (
    <div>
      <h1>Betwixt</h1>
      <SearchBox handleSubmit={handleSubmit} handleChange={handleChange}/>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        {/* <>
          <DirectionsService onLoad={onDirectionsServiceLoad} options={{}}/>
        </> */}
      </GoogleMap>
    </div>
  );
}

function SearchBox({handleChange, handleSubmit}) {
  return (
    <form onSubmit={(e) => handleSubmit(e)} className="search">
      <input type="text" name="postCode1" placeholder="Your post code" onChange={(e) => handleChange(e)}/>
      <input type="text" name="postCode2" placeholder="Your friend's post code" onChange={(e) => handleChange(e)}/>
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
