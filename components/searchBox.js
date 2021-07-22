import PlacesAutocomplete from "./placesAutocomplete";
import styles from './searchbox.module.css';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import React from 'react';
import Slider, { SliderTooltip } from 'rc-slider';
import { RiSearchLine, RiPinDistanceFill } from "react-icons/ri";

const wrapperStyle = {
  width: 320,
  margin: 0,
  color: '#000000',
  bottom: 200,
};

const marks = {
  250: '250m',
  500: '500m',
  750: '750m',
  1000: '1000m',
  1250: '1250m',
  1500: '1500m',
};

export default function SearchBox({ isOpen, setIsOpen, setOrigin, setDestination, setCategory, setTravelMode, radius, setRadius, handleSubmit }) {
  const { Handle } = Slider;

  const handle = props => {
    const { value, dragging, index, ...restProps } = props;
    setRadius(value)
    return (
      <SliderTooltip
        prefixCls="rc-slider-tooltip"
        overlay={`${value}m`}
        visible={dragging}
        placement="top"
        key={index}
      >
        <Handle value={value} {...restProps} />
      </SliderTooltip>
    );
  };

  return (
    <>
      {isOpen ? (
        <form className={styles.search} onSubmit={(e) => handleSubmit(e)}>
          <p className={styles.searchtitle}>Your location</p>
          <PlacesAutocomplete
            setPlace={setOrigin}
          />

          <p className={styles.searchtitle}>Their location</p>
          <PlacesAutocomplete
            setPlace={setDestination}
          />

          <span className={styles.row2search}>
            <select className={styles.travelmode} name="travelMode" onChange={(e) => setTravelMode(e.target.value)}>
              <option value="DRIVING">Driving</option>
              <option value="WALKING">Walking</option>
              <option value="BICYCLING">Cycling</option>
              <option value="TRANSIT">Transit</option>
            </select>

            <select name="category" className={styles.category} onChange={(e) => setCategory(e.target.value)}>
              <option value="restaurant">Restaurant</option>
              <option value="bar">Bar</option>
              <option value="cafe">Cafe</option>
            </select>
          </span>

          <div className={styles.slider}>
            <p className={styles.searchtitle2}>Choose your search distance from midpoint</p>
            <Slider min={250} max={1500} marks={marks} step={null} defaultValue={radius} handle={handle} trackStyle={[{ backgroundColor: '#3CB371' }, { backgroundColor: 'red' }]}
              handleStyle={[{ borderColor: '#3CB371' }, { borderColor: 'black' }]}
              railStyle={{ backgroundColor: 'white' }}
              dotStyle={{ borderColor: 'white' }}
              activeDotStyle={{ backgroundColor: '#3CB371' }}
            />
          </div>

          <button className={styles.searchbutton} type="submit"><RiSearchLine />&nbsp;&nbsp;Find your midpoint</button>
        </form>
      ) : (
        <form className={styles.search2}>
          <span>
            <button className={styles.searchbutton2} onClick={() => setIsOpen(true)}><RiPinDistanceFill />&nbsp;New journey</button>

            <span className={styles.slider2}>
              <p className={styles.searchtitle2}>Edit your current search radius</p>
              <Slider min={250} max={1500} marks={marks} step={null} defaultValue={radius} handle={handle} trackStyle={[{ backgroundColor: '#3CB371' }, { backgroundColor: 'red' }]}
                handleStyle={[{ borderColor: '#3CB371' }, { borderColor: 'black' }]}
                railStyle={{ backgroundColor: 'white' }}
                dotStyle={{ borderColor: 'white' }}
                activeDotStyle={{ backgroundColor: '#3CB371' }}
              />
            </span>
          </span>

        </form>
      )}
    </>
  )
}