import { Marker } from "@react-google-maps/api";

export default function Markers({ places }) {
  return (
    places.map(place => {
      <Marker key={place.place_id} position={place.geometry} title={place.name} />
    })
  )
};

