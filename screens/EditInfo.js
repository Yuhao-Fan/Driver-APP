import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View ,StyleSheet} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
// import { ListItem } from 'react-native-elements'
export default class EditInfo extends Component {
  static navigationOptions = {
    title:'编辑资料'

  };
  constructor(props){
    super(props);
    this.state = {
      token:this.props.navigation.getParam('token'),
      modalVisible: false,
      isLoading: true,
      UserID: '默认',
      Sex: '',
      Balance: '',
      Status: '',
      PhoneNumber: '',
    };
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
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
        Sex: responseJson.Sex,
        Balance: responseJson.Balance,
        Status: responseJson.Status,
        PhoneNumber: responseJson.PhoneNumber,
        isRefreshing:false
        }
          );

    })
  .catch(error => console.error('Error:', error));

}
renderLoadingView() {
  return (
    <View style={styles.container}>
      <Text>Loading...</Text>
    </View>
  );
}
componentDidMount() {
  this.RequestInfo();
  
}
  render() {
    // if (!this.state.loaded) {
    //   return this.renderLoadingView();
    // }
    //const animationProps = AnimatableManager.presets.fadeInRight;
    //const imageAnimationProps = AnimatableManager.getRandomDelay();
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        
            
        <View style={{flex: 1, backgroundColor: 'powderblue'}} >
            <View style={{ height: 50,justifyContent: "center",alignItems: "center",}}>
              <Text>年龄</Text>
            </View>
            <View style={{ height: 50,justifyContent: "center",alignItems: "center",}}>
              <Text>性别</Text>
            </View>
            <View style={{ height: 50,justifyContent: "center",alignItems: "center",}}>
              <Text>余额</Text>
            </View>
            <View style={{ height: 50,justifyContent: "center",alignItems: "center",}}>
              <Text>状态</Text>
            </View>
            <View style={{ height: 50,justifyContent: "center",alignItems: "center",}}>
              <Text>电话号码</Text>
            </View>
              
        </View>
          


        <View style={{flex: 4,  backgroundColor: 'skyblue'}} >
            <View style={{ height: 50,justifyContent: "center",alignItems: "center",}}>
              <Text>{this.state.UserID}</Text>
            </View>
            <View style={{ height: 50,justifyContent: "center",alignItems: "center",}}>
              <Text>{this.state.Sex}</Text>
            </View>
            <View style={{ height: 50,justifyContent: "center",alignItems: "center",}}>
              <Text>{this.state.Balance}</Text>
            </View>
            <View style={{ height: 50,justifyContent: "center",alignItems: "center",}}>
              <Text>{this.state.Status}</Text>
            </View>
            <View style={{ height: 50,justifyContent: "center",alignItems: "center",}}>
              <Text>{this.state.PhoneNumber}</Text>
            </View>
        </View>
        
      
          
        
      </View>
    );
  }
}
const styles = StyleSheet.create({
  Data:{
      fontWeight: 'bold',fontSize: 15,

      paddingLeft:30,

  },
  separatorStyle: {
      borderColor: '#A4A4A4',
      borderBottomWidth: 2,
      marginTop: 5
  },
container: {
  flex: 1,
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#F5FCFF"
},
rightContainer: {
  flex: 1
},
title: {
  fontSize: 20,
  marginBottom: 8,
  textAlign: "center"
},
year: {
  textAlign: "center"
},
thumbnail: {
  width: 53,
  height: 81
},
list: {
  paddingTop: 20,
  backgroundColor: "#F5FCFF"
}
});