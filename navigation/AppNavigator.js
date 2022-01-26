import React from 'react';
import { createAppContainer,createDrawerNavigator,createStackNavigator } from 'react-navigation';
// import { createDrawerNavigator } from 'react-navigation-drawer';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import DrawerNavigator from './DrawerNavigator';
import LoginScreen from '../screens/LoginScreen';


import { Transition } from 'react-native-reanimated';
const LoginStack = createStackNavigator({ SignIn: LoginScreen });

export default createAppContainer(
  createAnimatedSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Drawer: DrawerNavigator,

    Login: LoginStack,
    

  },
  {
    initialRouteName: 'Login',
    transition: (
      <Transition.Together>
        <Transition.Out
          type="slide-left"
          durationMs={300}
          interpolation="easeIn"
        />
        <Transition.In
          type="slide-right"
          durationMs={300}
          interpolation="easeIn"
        />
      </Transition.Together>
    ),
  }
  )
);
