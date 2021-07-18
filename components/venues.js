import Card from './card';
import styles from './venues.module.css';

export default function Venues({ places }) {
  return (
    <div className={styles.places}>
      <h2>Places</h2>
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