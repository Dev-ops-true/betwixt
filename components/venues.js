import { useState } from 'react';
import Card from './card';
import DetailedCard from './detailedCard';
import styles from './venues.module.css';
import Modal from 'react-modal';
import { Autocomplete } from '@react-google-maps/api';


// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#__next');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    paddingLeft: '-50%',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 10000
  },
};

export default function Venues({ places, midpoint, onMouseOver }) {

  const [modalIsOpen, setIsOpen] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [sortBy, setSortBy] = useState('Rating');

  const openModal = (place) => {
    setIsOpen(true);
    setActiveCard(place)
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const rad = (x) => {
    return x * Math.PI / 180;
  };
  
  const getDistance = (p1, p2) => {
    const R = 6378137; // Earth’s mean radius in meter
    const dLat = rad(p2.lat() - p1.lat);
    const dLong = rad(p2.lng() - p1.lng);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat())) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d; // returns the distance in meter
  };

  return (
    <div className={styles.places}>
      <h2>Your places.</h2>
      <select name="sortby" onChange={(e) => setSortBy(e.target.value)}>
        <option value="Rating">Rating</option>
        <option value="Closest">Closest</option>
      </select>
      <ul>
        {
          places && places.sort((place, nextPlace) => {
            if (sortBy === 'Rating') {
              return nextPlace.rating - place.rating;
            } else if (sortBy === 'Closest') {
              return getDistance(place.geometry.location, midpoint) - getDistance(nextPlace.geometry.location, midpoint);
            }
          }).map((place) => (
            <Card key={place.name}
              name={place.name}
              rating={place.rating}
              address={place.vicinity}
              ratings_num={place.user_ratings_total}
              distance={getDistance(place.geometry.location, midpoint)}
              photo_reference={place.photos && place.photos[0].photo_reference}
              onClick={() => openModal(place)}
              onMouseOver={onMouseOver}>
            </Card>
          ))
        }
      </ul>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal">
        {
          activeCard && <DetailedCard
            place_id={activeCard.place_id}
            photo_reference={activeCard.photos && activeCard.photos[0].photo_reference}>
          </DetailedCard>
        }
        <button className="button" onClick={closeModal}>close</button>
      </Modal>
    </div>
  )
}