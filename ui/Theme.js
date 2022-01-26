import {Colors, Typography, Spacings,ThemeManager} from 'react-native-ui-lib';

Colors.loadColors({
  primaryColor: '#2364AA',
  secondaryColor: '#81C3D7',
  textColor: '##221D23',
  errorColor: '#E63B2E',
  successColor: '#ADC76F',
  warnColor: '##FF963C',
  pink: '#FF69B4',
  gold: '#FFD700',

  primary: '#4C6FB0',
  secondary: '#7DC8FF',

  border: '#bbbbbb',
  line: '#c5c5c5',
  paper: '#f3f3f3',
  highlighted: '#f9f9f9',

  lightGray: '#bbbbbb',
  gray: '#888888',
  darkGray: '#444444',

  green: '#176500',
  red: '#FF0032',
  blue: '#02008E',
  yellow: '#FFB400',
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',

  defaultText: '#666666',
  lightText: '#aeaeae',
  darkText: '#444444',
});

Typography.loadTypographies({
  heading: {fontSize: 36, fontWeight: '600'},
  subheading: {fontSize: 28, fontWeight: '500'},
  body: {fontSize: 18, fontWeight: '400'},
  h1: {fontSize: 58, fontWeight: '300', lineHeight: 80},
  h2: {fontSize: 46, fontWeight: '300', lineHeight: 64},
  h3: {fontSize: 15, color: Colors.darkText},
  h4: {fontSize: 14, color: Colors.defaultText},
  h5: {fontSize: 12, color: Colors.lightText},
});

Spacings.loadSpacings({
  page: 20,
  card: 12,
  gridGutter: 16
});


// with plain object
ThemeManager.setComponentTheme('Card', {
  borderRadius: 8
});

// with a dynamic function
ThemeManager.setComponentTheme('Button', (props, context) => {
  // 'square' is not an original Button prop, but a custom prop that can
  // be used to create different variations of buttons in your app
  if (props.square) {
    return {
      borderRadius: 0
    };
  }
});