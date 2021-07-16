import Card from '../components/Card';

export default function Venues(props) {
  return (
    <div className={'places'}>
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