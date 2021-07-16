import PlacesAutocomplete from "./placesAutocomplete"

export default function SearchBox({handleSubmit}) {
  return (
    <form className="search" onSubmit={(e) => handleSubmit(e)}>
      {/* <input type="text" name="origin" placeholder="Your post code"/>
      <input type="text" name="destination" placeholder="Your friend's post code"/> */}

      <PlacesAutocomplete />
      <PlacesAutocomplete />
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