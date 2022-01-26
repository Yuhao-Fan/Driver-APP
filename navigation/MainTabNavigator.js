import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator,createAppContainer } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import Home from '../screens/Home';

import LinksScreen from '../screens/LinksScreen';

import Mine from '../screens/Mine';
import Feedback from '../screens/Feedback';
import HistoricalFeedback from '../screens/HistoricalFeedback';
import OrderList from '../screens/OrderList'
import EditInfo from '../screens/EditInfo';
import Options from '../screens/Options';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';
import NoticeList from '../screens/NoticeList'
const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});


const HomeStack = createStackNavigator(
  {
    Home: Home,

  }
  ,{
    initialRouteName: 'Home'
  }
  // {
  // initialRouteName: 'Home',
  // /* The header config from HomeScreen is now here */
  // defaultNavigationOptions: {
  // headerStyle: {
  // backgroundColor: '#f4511e',
  // },
  // headerTintColor: '#fff',
  // headerTitleStyle: {
  // fontWeight: 'bold',
  // },
  // },
  // }
  
);
HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};
// const FeedbackStack = createStackNavigator(
//   {
//     Feedback: Feedback,
//   }
// );

HomeStack.navigationOptions = {
  tabBarLabel: '主页',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home${focused ? '' : '-outline'}`
          : 'home-outline'
      }
    />
  ),
};

HomeStack.path = '';

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: '列表',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'link-outline'} />
  ),
    header:null
};

LinksStack.path = '';

const MineStack = createStackNavigator(
  {
    Mine: Mine,
  },
  config
);

MineStack.navigationOptions = {
  tabBarLabel: '我的',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-person' : 'person-outline'} />
  ),
};

MineStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  LinksStack,
  MineStack,
} 
);
tabNavigator.navigationOptions={header:null,}
// const OptionsStack = createStackNavigator({ Options: Options });
// const EditInfoStack = createStackNavigator({ EditInfo: EditInfo });
// const AnimatedOptions =createAnimatedSwitchNavigator({
//   // You could add another route here for authentication.
//   // Read more at https://reactnavigation.org/docs/en/auth-flow.html
//   Options: Options,

//   EditInfo: EditInfo,

// },
// {

//   transition: (
//     <Transition.Together>
//       <Transition.Out
//         type="slide-left"
//         durationMs={2000}
//         interpolation="easeIn"
//       />
//       <Transition.In
//         type="slide-right"
//         durationMs={2000}
//         interpolation="easeIn"
//       />
//     </Transition.Together>
//   ),
// })

const stackMain = createStackNavigator(
  {
    tab: tabNavigator,
    Feedback: Feedback,
    HistoricalFeedback:HistoricalFeedback,
    OrderList:OrderList,
    // Options: Options,
    NoticeList:NoticeList,

    EditInfo: EditInfo,
  }
  

);


const Main = createAppContainer(stackMain);
export default Main;
