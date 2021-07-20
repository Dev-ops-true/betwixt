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

export default function Venues({ places, onMouseOver }) {

  const [modalIsOpen, setIsOpen] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

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
          places && places.map((place) => (
            <Card key={place.name}
              name={place.name}
              rating={place.rating}
              address={place.vicinity}
              ratings_num={place.user_ratings_total}
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