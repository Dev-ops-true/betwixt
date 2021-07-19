import Card from './card';
import styles from './venues.module.css';

export default function Venues({ places }) {
  return (
    <div className={styles.places}>
      <h2>Your places.</h2>
      <select name="sortby">
        <option value="Recommended">Recommended</option>
        <option value="Closest">Closest</option>
        <option value="Rating">Rating</option>
      </select>
      <ul>
        {
          places.map((place) => (
            <Card key={place.name} name={place.name} rating={place.rating} address={place.vicinity} ratings_num={place.user_ratings_total} photo_link={place.icon}></Card>
          ))
        }
      </ul>
    </div>
  )
}