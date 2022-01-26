// import * as WebBrowser from 'expo-web-browser';

import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button} from 'react-native-ui-lib'
import React, { Component } from "react";
import { MonoText } from '../components/StyledText';
//import test from '../screens/test';
import { createAppContainer } from 'react-navigation';
//import { createStackNavigator } from 'react-navigation-stack';
//import StackViewStyleInterpolator from 'react-navigation-stack/lib/module/views/StackView/StackViewStyleInterpolator.js'
import Icon from 'react-native-vector-icons/Ionicons';
export default class HomeScreen extends Component{
  static navigationOptions = {
    header:null,
    /* No more header config here! */

      // transitionConfig:()=>({
      //     // 只要修改最后的forVertical就可以实现不同的动画了。
      //     screenInterpolator:StackViewStyleInterpolator.forHorizontal,
      // })
  };
  constructor(props){
    super(props);
    this.state = {
      token:this.props.navigation.getParam('token'),
      username:this.props.navigation.getParam('username'),
      latitude:23,//纬度
      longitude:113,//经度
      altitude:100//海拔
    };
    // 在ES6中，如果在自定义的函数里使用了this关键字，则需要对其进行“绑定”操作，否则this的指向会变为空
    // 像下面这行代码一样，在constructor中使用bind是其中一种做法（还有一些其他做法，如使用箭头函数等）
    this.props.navigation = this.props.navigation.navigate.bind(this);
  }
  PositionSend(){
      
    const{token,latitude,longitude,altitude}=this.state
    

    alert(token)
    fetch("https://www.kingdom174.work/position?token="+this.props.navigation.getParam('token', 'default')+"&latitude="+latitude+"&longitude="+longitude+"&altitude="+altitude,{method:'POST'});  //发送就完事
    
  }

  
  
  render(){
  
  return (
    
    <View style={styles.container}>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <View>

        <TouchableOpacity
          style={{
         
          alignItems: 'center',
          width: 50,
          height:50 ,

          }}

          onPress={()=>{this.props.navigation.openDrawer();  }}
        >
        <Icon
        name={Platform.OS === 'ios' ? 'ios-more' : 'add'}
        color={'black'} 
        size={40} />
        </TouchableOpacity>
      

        <Button
          label="Send position to server"
          bg-orange30 h1
          onPress={()=>{this.PositionSend();  }}
        />
        <Button
          label="Sign out"
          bg-orange30 h1
          onPress={() => {this.props.navigation.navigate('Auth');
          }}
        />
        <Button
          label="Options"
          bg-orange30 h1
          onPress={() => {this.props.navigation.navigate('Options',{token:this.state.token});
          }}
        />
        <Button
          label="反馈"
          bg-orange30 h1
          onPress={() => {this.props.navigation.navigate('Feedback', 
          {username: this.state.username,
            token:this.state.token,
          });
          }}
        />
        <Button
          label="历史反馈"
          bg-orange30 h1
          onPress={() => {this.props.navigation.navigate('HistoricalFeedback', 
          {
            token:this.state.token,
          });
          }}
        />




        </View>

        <View style={styles.welcomeContainer}>
          <Image
            source={
              __DEV__
                ? require('../assets/images/robot-dev.png')
                : require('../assets/images/robot-prod.png')
            }
            style={styles.welcomeImage}
          />
        </View>

        <View style={styles.getStartedContainer}>
          <DevelopmentModeNotice />

          <Text style={styles.getStartedText}>Get started by opening</Text>

          <View
            style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
            <MonoText>screens/HomeScreen.js</MonoText>
          </View>

          <Text style={styles.getStartedText}>
            Change this text and your app will automatically reload.?四
          </Text>
        </View>

        <View style={styles.helpContainer}>
          <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
            <Text style={styles.helpLinkText}>
              Help, it didn’t automatically reload!
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.tabBarInfoContainer}>
        <Text style={styles.tabBarInfoText}>
          This is a tab bar. You can edit it in:
        </Text>

        <View
          style={[styles.codeHighlightContainer, styles.navigationFilename]}>
          <MonoText style={styles.codeHighlightText}>
            navigation/MainTabNavigator.js
          </MonoText>
        </View>
      </View>
    </View>
  );
          }
}


function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn moredd
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
