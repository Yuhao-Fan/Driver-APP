// import * as WebBrowser from 'expo-web-browser';
import {MapView} from 'react-native-amap3d'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,PermissionsAndroid,
  View,
  Switch,
  Linking
} from 'react-native';
import {Button} from 'react-native-ui-lib'
import React, { Component ,useCallback } from "react";
import { MonoText } from '../components/StyledText';
//import test from '../screens/test';
import { createAppContainer } from 'react-navigation';
//import { createStackNavigator } from 'react-navigation-stack';
//import StackViewStyleInterpolator from 'react-navigation-stack/lib/module/views/StackView/StackViewStyleInterpolator.js'
import Icon from 'react-native-vector-icons/Ionicons';
// import { init, Geolocation } from "react-native-amap-geolocation";
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
      latitude:100,//纬度
      longitude:100,//经度
      plat:23.2,
      plon:113,
      dlat:23.3,
      dlon:113,
      //altitude:100,//海拔
      showsCompass: true,
      showsScale: true,
      showsZoomControls: true,
      showsLocationButton: true,

      UserID: '默认',
      Sex: '',
      Balance: '',
      Status: '',
      PhoneNumber: '',

      showMarker:false,
      passengers:[{lat:23.1,lon:113},],
    };
    //this._mapView=this._mapView.bind(this)

    // 在ES6中，如果在自定义的函数里使用了this关键字，则需要对其进行“绑定”操作，否则this的指向会变为空
    // 像下面这行代码一样，在constructor中使用bind是其中一种做法（还有一些其他做法，如使用箭头函数等）

  }

  PositionSend(){
      
    const{token,latitude,longitude,altitude}=this.state
    

    alert(token)
    fetch("https://www.kingdom174.work/position?token="+this.props.navigation.getParam('token', 'default')+"&latitude="+latitude+"&longitude="+longitude+"&altitude="+altitude,{method:'POST'});  //发送就完事
    
  }

  RequestInfo(){



    // fetch("https://www.kingdom174.work",{method:'GET',body:JSON.stringify(data)})
    // .then(response => response.json()) // parses response to JSON
    const{token}=this.state
    //alert(token);
    fetch("https://www.kingdom174.work/Per_Information?token="+token,{method:'GET'})
        .then(response=>response.json())
        .then((responseJson) => {
          this.setState({
                UserID: responseJson.UserID,

              }
          );

        })
        .catch(error => console.error('Errorrequest:', error));

  }
  componentDidMount() {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
    // this.state.passengers.push({
    //   lat:23.1,
    //   lon:113
    // })
    this.RequestInfo();


  }

    find_order(){


    const{token,latitude,longitude,passengers}=this.state;


    fetch("https://www.kingdom174.work/find_order?token="+
        token+"&latitude="+latitude+"&longitude="+longitude,{method:'POST'})  //发送就完事
    .then(function(response) {
      return response.json();
    })
        .then(function(myJson) {
          console.log(myJson);
        }).catch((err) => {
      // handle error
      alert("叫单失败")
    });
  }
  start_order(){
    const{latitude,longitude,dlat,dlon}=this.state;

    if(dlat===0){
      alert("没有获得乘客")
      return

    }

    const url="amapuri://route/plan/?sid=&slat=" + latitude + "&slon=" + longitude +
        "&sname=我&did=&dlat=" + dlat + "&dlon=" + dlon + "&dname=乘客&dev=0&t=0"
    console.log("执行start_order")
    if(Linking.canOpenURL(url))
        Linking.openURL(url);
    else{
      alert("打不开")
    }


  }
  render(){


  return (
    
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
        <TouchableOpacity
          style={{
          marginTop:5,
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
          </View>
        <Text style={{textAlign: 'center',textAlignVertical: 'center',   }}>{this.state.username}</Text>

         </View>

        <View style={{flex: 11}}>

          <MapView ref={ref => (this.mapView = ref)}
                   style={StyleSheet.absoluteFill}
                   locationEnabled={this.state.showsLocationButton}
                   showsCompass={this.state.showsCompass}
                   showsScale={this.state.showsScale}
                   showsLocationButton={this.state.showsLocationButton}
                   showsZoomControls={this.state.showsZoomControls}
                   // locationStyle={{
                   //
                   //   fillColor: "red",
                   //   strokeColor: "red",
                   //   strokeWidth: 2
                   // }}


                   coordinate={{
                     latitude: this.state.latitude,
                     longitude: this.state.longitude,
                   }}
                   locationInterval={10000}
                   distanceFilter={10}
                   onLocation={(nativeEvent) => {
                     console.log(`${nativeEvent.latitude}, ${nativeEvent.longitude}`)
                     // console.log(`${this.state.latitude}, ${this.state.longitude}`)
                     this.mapView.setStatus(
                         {
                           // tilt: 45,
                           // rotation: 90,
                           // zoomLevel: 18,
                           center: {
                             latitude: nativeEvent.latitude,
                             longitude: nativeEvent.longitude
                           }
                         },
                         1000
                     );
                     this.setState({latitude:nativeEvent.latitude,longitude:nativeEvent.longitude})

                    }
                   }
          >


            <MapView.Marker

                title='这是一个可拖拽的标记'
                // onDragEnd={({ nativeEvent }) =>
                //   console.log(`${nativeEvent.latitude}, ${nativeEvent.longitude}`)}
                coordinate={{
                  latitude: this.state.passengers[0].lat,
                  longitude: this.state.passengers[0].lon,
                }}
            />
          </MapView>
          <View style={styles.Op_container}>
            <TouchableOpacity style={styles.Bottom1} onPress={ ()=>{this.find_order() }}><Text style={styles.fontSize}>叫单</Text></TouchableOpacity>

            <TouchableOpacity style={styles.Bottom1} onPress={ ()=>{this.start_order() }}><Text style={styles.fontSize}>导航到乘客</Text></TouchableOpacity>
            <TouchableOpacity style={styles.Bottom1} onPress={ ()=>{this.start_order() }}><Text style={styles.fontSize}>从乘客到目的地</Text></TouchableOpacity>

          {/*<Switch*/}
          {/*    style={styles.switch}*/}
          {/*    onValueChange={showsLocationButton => this.setState({ showsLocationButton })}*/}
          {/*    value={this.state.showsLocationButton}*/}
          {/*/>*/}
          {/*  <Switch*/}
          {/*      style={styles.switch}*/}
          {/*      onValueChange={showsCompass => this.setState({ showsCompass })}*/}
          {/*      value={this.state.showsCompass}*/}
          {/*  />*/}

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

  Op_container:{
    marginTop:500,
    marginHorizontal: 100,
    marginBottom: 100,
  },
  Bottom1: {
    flex: 2,
    padding:15,
    marginBottom:10,
    borderWidth: 3,
    borderRadius: 10,
    borderColor: 'rgb(41,130,25)',
  },

  fontSize: {
    textAlign: 'center',
    marginVertical:-12,
    fontWeight: 'bold',
    color: 'black'
  },
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
