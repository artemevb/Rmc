"use cleint"
import React from 'react';
import  Slider from 'react-slick';
import type SliderType from 'react-slick';
import type { Settings as SlickSettings } from 'react-slick';

type SlickSliderProps = SlickSettings;

// Компонент-обёртка с forwardRef
const SlickSlider = React.forwardRef<SliderType, SlickSliderProps>((props, ref) => (
  <Slider ref={ref} {...props} />
));

SlickSlider.displayName = "SlickSlider";

export default SlickSlider;