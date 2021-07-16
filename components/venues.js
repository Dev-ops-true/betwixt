import Card from '../components/Card';
import styles from './venues.module.css';

export default function Venues({ places }) {
  return (
    <div className={styles.places}>
      <h2>Places</h2>
      <ul>
        {
          places.map((place) => (
            <Card key={place.name} name={place.name} rating={place.rating} address={place.vicinity}></Card>
          ))
        }
      </ul>
    </div>
  )
}