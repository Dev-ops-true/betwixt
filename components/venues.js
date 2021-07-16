export default function Venue(props) {
  return (
    <div className={'places'}>
      <h2>Places</h2>
      <ul>
        {
          props.items.map((place) => (
            <li key={place.name}>{place.name}</li>
          ))
        }
      </ul>
    </div>
  )
}