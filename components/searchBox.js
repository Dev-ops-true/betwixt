import PlacesAutocomplete from "./placesAutocomplete";
import styles from './searchbox.module.css';

export default function SearchBox({setOrigin, setDestination, handleSubmit}) {
  return (
    <form className={styles.search} onSubmit={(e) => handleSubmit(e)}>
      <div className={styles.mainauto}>
      <PlacesAutocomplete 
        setPlace={setOrigin} 
        />
      <PlacesAutocomplete
        setPlace={setDestination} 
        />
      </div>
      
      <select className={styles.travelmode} name="travelMode">
        <option value="DRIVING">Driving</option>
        <option value="WALKING">Walking</option>
        <option value="BICYCLING">Cycling</option>
        <option value="TRANSIT">Transit</option>
      </select>
      
      <select name="category" className={styles.travelmode}>
        <option value="restaurant">Restaurant</option>
        <option value="bar">Bar</option>
        <option value="cafe">Cafe</option>
      </select>

      <button className={styles.searchbutton} type="submit">Search</button>
      
    </form>
  )
}