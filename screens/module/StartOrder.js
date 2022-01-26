import React, { Component } from 'react';
import {
  StyleSheet, View, Image, Text, TouchableOpacity,
  Button,
  ScrollView,
} from 'react-native';
import Radio from './radio';

import {
  Dimensions,Linking
} from 'react-native';
//var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
var screenWidth = width;

export default class StartOrder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentWillMount() {
    console.log(this.props.data)
  }
    callPassenger(){
        Linking.openURL('tel:10086')
    }
  _cancelOrder()
  {

  }
  render() {
    return (
      <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.top}>
          <View style={styles.carMess}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 17, color: '#024212', fontWeight: 'bold' }}>
                {this.props.data.DriverData.carNumber}
              </Text>
              <Text style={{ fontSize: 12 }}>
                {this.props.data.DriverData.Type}
              </Text>
            </View>
            <Image style={{ height: 40, width: 40, borderRadius: 15 }} source={require('../../images/head_icon.png')} />

          </View>
          <View style={styles.DriverMess}>
            <Text>
              {this.props.data.DriverData.name}
            </Text>
            <Text style={{ fontSize: 10 }}>
              {this.props.data.DriverData.passengersType}
                        </Text>
          </View>
        </View>
        <View style={styles.bottom}>

          <View style={styles.button}>

            <TouchableOpacity style={styles.buttonStyle} onPress={()=>this.callPassenger()}>
              <Image style={{ width: 30, height: 30 }} source={require('../../images/phone_icon.png')} />
              <Text style={styles.buttonText}>呼叫乘客</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonStyle} onPress={() => this.props._cancelOrder()}>
              <Image style={{ width: 30, height: 30 }} onProgress={() => this.props._cancelOrder()} source={require('../../images/cancel_icon.png')} />
              <Text style={styles.buttonText}>取消订单</Text>
            </TouchableOpacity>


          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  top: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    marginHorizontal: -20
  },
  bottom: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

  },
  carMess: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  DriverMess: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',

  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonStyle: {
    flexDirection: 'row',
    marginLeft: 7,
    backgroundColor: '#e6e6e6'


  },
  buttonText: {
    marginLeft: 2,
    fontSize: 13,
  }
})