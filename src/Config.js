import Color from 'color';

const Config = {
  name: 'Pomodoro',
};

const Colors = {
  primary: '#FF4136',
  primaryDarker: Color('#FF4136')
    .darken(0.25)
    .string(),
  grey: '#f1f1f1',
};

export default Config;
export { Colors };
