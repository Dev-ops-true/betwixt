export default function SearchBox({ handleSubmit }) {
  return (
    <form className="search" onSubmit={(e) => handleSubmit(e)}>
      <input type="text" name="origin" placeholder="Your post code" />
      <input type="text" name="destination" placeholder="Your friend's post code" />
      <select name="travelMode">
        <option value="DRIVING">Driving</option>
        <option value="WALKING">Walking</option>
        <option value="BICYCLING">Bicycling</option>
        <option value="TRANSIT">Transit</option>
      </select>
      <select name="category">
        <option value="RESTAURANT">Restaurant</option>
        <option value="BAR">Bar</option>
        <option value="CAFE">Cafe</option>
      </select>
      <button type="submit">Search</button>
    </form>
  )
}