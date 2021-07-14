import '../styles/globals.css';
import React from "react";

import {
  GoogleMap,
  useLoadScript,
  Marker,
  Infowindow,
} from "@react-google-maps/api";

import usePlacesComplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboxboxList,
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

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <div>
      <h1>Betwixt</h1>
    <Search />
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={12}
      center={center}
      options={options}
      onLoad={onMapLoad}
      ></GoogleMap>
  </div>
  );
}

function Search() {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestion
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 51.5084, lng: () => -0.2744 },
      radius: 200000,
    },
  });


  return (
    <div className="search">
    <Combobox
      onSelect={(address) => {
        console.log(address);
      }}
    >
      <ComboboxInput
      value={value}
      onChange={(e) => {
        setValue=(e.target.value);
      }}
      disabled={!ready}
      placeholder="Where does your mate live?"
    />

    </Combobox></div>
  );
}