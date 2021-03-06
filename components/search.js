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
import usePlacesAutocomplete from 'use-places-autocomplete';

export default function Search(props) {
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
    <Combobox
      onSelect={(address) => {
        console.log(address);
      }}
    >
      <ComboboxInput
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        disabled={!ready}
        placeholder={props.placeholder}
      />
      <ComboboxPopover>
        {status === "OK" && data.map(({ id, description }) => (
          <ComboboxOption key={id} value={description} />
        ))}
      </ComboboxPopover>
    </Combobox>
  );
}