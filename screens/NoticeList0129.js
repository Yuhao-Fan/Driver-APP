import React, { Component } from 'react';
import { Platform, ScrollView, View ,StyleSheet,RefreshControl} from 'react-native';

import { ListItem,Overlay } from 'react-native-elements';
import {Text} from 'react-native-ui-lib';
//import ActionButton from 'react-native-action-button'
//import Ionicons from 'react-native-vector-icons/Ionicons';
export default class NoticeList extends Component {
  static navigationOptions = {
    title:'公告列表'

  };
  constructor(props){
    super(props);
    this.state = {
      token:this.props.navigation.getParam('token'),
      modalVisible: false,
      isLoading: true,
      noticeID:0,
      data:[],
      noticeContent:''
    };
  }

  handleRefresh = () => {
    this.setState({
        isRefreshing:true,//tag,下拉刷新中，加载完全，就设置成flase
        data:[]
    });
    this.RequestInfo()
}
RequestInfo(){
        

        
  // fetch("https://www.kingdom174.work",{method:'GET',body:JSON.stringify(data)})   
  // .then(response => response.json()) // parses response to JSON
  const{token}=this.state
  //alert(token);

  fetch("https://www.kingdom174.work/noticeList?token="+token,{method:'GET'})   
  .then(response=>response.json())
  .then((responseJson) => {
      console.log(responseJson)
      this.setState({
        data:responseJson,
        isRefreshing:false
        }
          );

    })
  .catch(error => console.error('Error:', error));

}
RequestDetail(){
  const{token,noticeID}=this.state
  //alert(token);
  fetch("https://www.kingdom174.work/noticeDetail?token="+token+"&noticeID="+noticeID,{method:'GET'})   
  .then(response=>response.json())
  .then((responseJson) => {
      this.setState({
        noticeContent:responseJson[0].noticeContent,
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
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    //const animationProps = AnimatableManager.presets.fadeInRight;
    //const imageAnimationProps = AnimatableManager.getRandomDelay();
    return (
      <ScrollView 
            ref={(view) => { this.myScrollView = view; }}
            refreshControl={
                <RefreshControl
                    refreshing={this.state.isRefreshing}
                    onRefresh={this.handleRefresh.bind(this)}//因为涉及到this.state
                    colors={['#ff0000', '#00ff00','#0000ff','#3ad564']}
                    progressBackgroundColor="#ffffff"
                />
            }>
          <View>
      {
        ()=>this.state.data.map((item, i) => (
          <ListItem
            key={i}
            title={item.noticeTitle}
            subtitle={item.startTime }
            bottomDivider
            chevron
            onPress={()=>this.setState({ noticeID:item.noticeID,modalVisible: true },()=>this.RequestDetail()) }


            friction={90} //
            tension={100} // These props are passed to the parent component (here TouchableScale)
            activeScale={0.95} //
            linearGradientProps={{
              colors: ['#FF9800', '#F44336'],
              start: [1, 0],
              end: [0.2, 0],
            }}

          />
        ))
      }
    </View>
        <Overlay
      isVisible={this.state.modalVisible}
      //windowBackgroundColor="rgba(255, 255, 255, .5)"
      //overlayBackgroundColor="red"
      // width="auto"
      // height="auto"
      //borderRadius='3'
      onBackdropPress={() => this.setState({ modalVisible: false })}
      >
        <View>
        <Text red50 text30 center>公告内容：</Text>

      <Text text70>{this.state.noticeContent}</Text>
      </View>
    </Overlay>
    {/* <ActionButton styles={{maginBottom:50,}}  onPress={() => this.myScrollView.scrollTo({ x: 0, y: 0, animated: true})}
            
            
                renderIcon={() => (<View >
                        <Ionicons 
                        name={Platform.OS === 'ios' ? 'ios-arrow-up' : 'md-arrow-up'} 
                        color={'white'} 
                        size={30} />
                    </View>)}
            /> */}
    </ScrollView>
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