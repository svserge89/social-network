import {ChangeEvent} from 'react';

export type SliderProps = {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
};
