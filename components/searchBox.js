import PlacesAutocomplete from "./placesAutocomplete"

export default function SearchBox({setOrigin, setDestination, handleSubmit}) {
  return (
    <form className="search" onSubmit={(e) => handleSubmit(e)}>

      <PlacesAutocomplete setPlace={setOrigin} />
      <PlacesAutocomplete setPlace={setDestination} />

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