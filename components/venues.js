import Card from '../components/Card';
import styles from './venues.module.css';

export default function Venues(props) {
  return (
    <div className={styles.places}>
      <h2>Places</h2>
      <ul>
        {
          props.places.map((place) => (
            <Card key={place.name} name={place.name} rating={place.rating}></Card>
          ))
        }
      </ul>
    </div>
  )
}