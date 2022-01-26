import React from 'react';
import {Platform, TouchableOpacity,View, ScrollView, SafeAreaView, StyleSheet, Image, Text} from 'react-native';
import { DrawerItems,createDrawerNavigator,createStackNavigator } from 'react-navigation';
// import { createDrawerNavigator } from 'react-navigation-drawer';
import tabNavigator from './MainTabNavigator';

//import { Ionicons } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import test from '../screens/test'
import Options from '../screens/Options';
import NoticeList from '../screens/NoticeList'
import LoginScreen from '../screens/LoginScreen';



const LoginStack = createStackNavigator({ SignIn: LoginScreen });

// const OptionsDrawer = createDrawerNavigator({ 
//   Options: Options 

// },
//   {
//     initialRouteName: 'Options',
//     swipeEnabled: true,
//     animationEnabled: true,
//     lazy: false,
//     tabBarPosition:'bottom',

//   }
  
//   );
const CustomDrawerContentComponent = (props) => (
    <View style={{flex: 1}}>

        <ScrollView >

            <SafeAreaView style={{flex: 1, flexDirection: 'row'}}>
                <Image style={{ width: 70, height: 70 ,margin:20}} source={require('../images/taxi.png')} />
                <Text style={{margin:40,marginLeft:20}}>155****2021</Text>
                {/*<View style={{height:100,backgroundColor:'red'}}></View>*/}
                <View style={styles.transitionView}></View>


            </SafeAreaView>
            <DrawerItems {... props} />

            {/*<Text style={{marginTop:250}}>1</Text>*/}
            {/*<Text style={{marginTop:250}}>2</Text>*/}
            {/*<Text style={{marginTop:250}}>3</Text>*/}
        </ScrollView>


        {/*<View style={{margin:1,height:100}}>*/}
        {/*    <TouchableOpacity>*/}
        {/*        <Text style={{alignSelf:"center"}}>平台规则</Text>*/}
        {/*    </TouchableOpacity>*/}
        {/*</View>*/}
    </View>
);
const OptionsStack = createStackNavigator(
    {
        Options: Options,

    }
);
const NoticeListStack = createStackNavigator(
    {
        NoticeList: NoticeList,

    }
);
const DrawerNavigator = createDrawerNavigator(
    {
        // You could add another route here for authentication.
        // Read more at https://reactnavigation.org/docs/en/auth-flow.html
        
        Main: {
          screen: tabNavigator,
          navigationOptions: {
              /**
               * drawer 导航 icon
               */

              drawerIcon: ({ tintColor, focused }) =>
                  <Ionicons
                      name={'rocket'}
                      size={26}
                      style={{ color: tintColor }}
                  />,
              /**
               * drawerLabel或headerTitle 备用标题
               */
              title: '首页',
              /**
               * drawer 标题
               */
              // drawerLabel: '首页label'
          }
      },
        Options: {
            screen: OptionsStack,
            navigationOptions: {
                /**
                 * drawer 导航 icon
                 */
                title: '设置',
                drawerIcon: ({ tintColor, focused }) =>
                    <Ionicons
                        name={'settings-outline'}
                        size={26}
                        style={{ color: tintColor }}
                    />
            }

        },
        Notice: {
            screen: NoticeListStack,
            navigationOptions: {
                /**
                 * drawer 导航 icon
                 */
                title: '钱包',
                drawerIcon: ({ tintColor, focused }) =>
                    <Ionicons
                        name={'wallet-outline'}
                        size={26}
                        style={{ color: tintColor }}
                    />
            }

        },
        Service: {
            screen: NoticeListStack,
            navigationOptions: {
                /**
                 * drawer 导航 icon
                 */
                title: '支持',
                drawerIcon: ({ tintColor, focused }) =>
                    <Ionicons
                        name={'people-circle-outline'}
                        size={26}
                        style={{ color: tintColor }}
                    />
            }

        },
        Security: {
            screen: LoginStack,
            navigationOptions: {
                /**
                 * drawer 导航 icon
                 */
                title: '退出',
                drawerIcon: ({ tintColor, focused }) =>
                    <MaterialCommunityIcons
                        name={'security'}
                        size={26}
                        style={{ color: tintColor }}
                    />
            }

        },




      //   Options: {
      //     screen: OptionsStack,
      //     navigationOptions: {
      //         /**
      //          * drawer 导航 icon
      //          */
      //         title: '设置',
      //         drawerIcon: ({ tintColor, focused }) =>
      //             <Ionicons
      //             name={Platform.OS === 'ios' ? 'settings-outline' : 'settings-outline'}
      //                 size={26}
      //                 style={{ color: tintColor }}
      //             />
      //     }
      //
      // }

      },

      {
        initialRouteName: 'Main',
        overlayColor: 'rgba(0,0,0,0.6)',
        drawerType:'slide',
        contentComponent: CustomDrawerContentComponent,
        contentOptions: {
          activeTintColor: '#e91e63',
          itemsContainerStyle: {
            marginVertical: 0,
          },
          iconContainerStyle: {
            opacity: 1
          }
        }
        

      }
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  transitionView: {
    height: 5,
    backgroundColor: 'rgba(230,230,230, .5)'
},
});
export default DrawerNavigator;
