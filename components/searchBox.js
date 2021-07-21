import PlacesAutocomplete from "./placesAutocomplete";
import styles from './searchbox.module.css';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import React from 'react';
import Slider, { SliderTooltip } from 'rc-slider';

const wrapperStyle = {
  width: 400,
  margin: 50,
  color: '#000000',
};

const marks = {
  500: '500m',
  1000: '1000m',
  1500: '1500m',
  2000: '2000m',
  2500: '2500m',
  3000: {
    style: {
      color: 'red',
    },
    label: <strong>3000m</strong>,
  },
};
 
export default function SearchBox({setOrigin, setDestination, setRadius, handleSubmit}) {
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
    <form className={styles.search} onSubmit={(e) => handleSubmit(e)}>
      <div className={styles.mainauto}>
        <p>Your location:</p>
        <PlacesAutocomplete 
          setPlace={setOrigin} 
        />
      </div>
      <div className={styles.mainauto}>
        <p>Their location:</p>
        <PlacesAutocomplete
          setPlace={setDestination} 
        />
      </div>
      <div style={wrapperStyle}>
        <p>Select your midpoint radius</p>
        <Slider min={500} max={3000} marks={marks} defaultValue={1500} handle={handle} trackStyle={[{ backgroundColor: 'black' }, { backgroundColor: '#9FE2BF' }]}
          handleStyle={[{ backgroundColor: '#9FE2BF' }, { backgroundColor: '#9FE2BF' }]}
          railStyle={{ backgroundColor: 'black' }}/>
      </div>
      
      <select className={styles.travelmode} name="travelMode">
        <option value="DRIVING">Driving</option>
        <option value="WALKING">Walking</option>
        <option value="BICYCLING">Cycling</option>
        <option value="TRANSIT">Transit</option>
      </select>
      
      <select name="category" className={styles.travelmode}>
        <option value="restaurant">Restaurant</option>
        <option value="bar">Bar</option>
        <option value="cafe">Cafe</option>
      </select>

      <button className={styles.searchbutton} type="submit">Search</button>
    </form>
  )
}