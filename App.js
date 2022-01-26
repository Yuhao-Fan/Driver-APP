

import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View ,Text} from 'react-native';
import {MapView} from 'react-native-amap3d'
// import theme from './ui/Theme'//react-native-ui-lib
import AppNavigator from './navigation/AppNavigator';

export default function App(props) {
  // const [isLoadingComplete, setLoadingComplete] = useState(false);

  // if (!isLoadingComplete && !props.skipLoadingScreen) {
  //   return (
  //     <View>
  //       <Text>isLoading</Text>
  //     </View>
  //   );
  // } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
         <AppNavigator />
  {/*      <MapView style={StyleSheet.absoluteFill}>*/}
  {/*<MapView.Marker*/}
  {/*  draggable*/}
  {/*  title='这是一个可拖拽的标记'*/}
  {/*  // onDragEnd={({ nativeEvent }) =>*/}
  {/*  //   console.log(`${nativeEvent.latitude}, ${nativeEvent.longitude}`)}*/}
  {/*  coordinate={{*/}
  {/*    latitude: 39.91095,*/}
  {/*    longitude: 116.37296,*/}
  {/*      }}*/}
  {/*      />*/}
  {/*      </MapView>*/}
      </View>
//<MapView style={StyleSheet.absoluteFill}
//        coordinate={{
//          latitude: 39.91095,
//          longitude: 116.37296
//          }}
//          />
    );
  }



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
