import React from 'react';
import {useUIDSeed} from 'react-uid';

import {SliderProps} from './types';

const Slider: React.FC<SliderProps> = ({
  label,
  min,
  max,
  step,
  value,
  handleChange,
}) => {
  const seed = useUIDSeed();

  return (
    <>
      <label htmlFor={seed('range-slider')}>{label}</label>
      <input
        type="range"
        className="custom-range mb-1"
        id={seed('range-slider')}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
      />
    </>
  );
};

export default Slider;
