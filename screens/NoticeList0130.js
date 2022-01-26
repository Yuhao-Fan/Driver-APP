import React, { Component,useState } from 'react';
import {Platform, Alert,ScrollView, View,FlatList, StyleSheet, RefreshControl, TouchableOpacity} from 'react-native';

import { ListItem,Overlay } from 'react-native-elements';
import {Text} from 'react-native-ui-lib';
import ActionButton from 'react-native-action-button'
import Ionicons from 'react-native-vector-icons/Ionicons';
class ItemDivideComponent extends Component {
  render() {
    return (
        <View style={{height: 1, backgroundColor: 'skyblue'}}/>
  );
  }
};
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
      loaded: false,
      noticeID:0,
      data:[],
      noticeContent:'',
      isRefreshing:false
    }
    this.RequestInfo = this.RequestInfo.bind(this);
  }

  handleRefresh = () => {
    this.setState({
        isRefreshing:true,//tag,下拉刷新中，加载完全，就设置成flase
        data:[]
    });
    this.RequestInfo()
}
  componentDidMount() {
    this.RequestInfo();

  }
RequestInfo(){
        

        
  // fetch("https://www.kingdom174.work",{method:'GET',body:JSON.stringify(data)})   
  // .then(response => response.json()) // parses response to JSON
  const{token}=this.state
  //alert(token);

  fetch("https://www.kingdom174.work/noticeList?token="+token,{method:'GET'})   
  .then(response=>response.json())
  .then((responseJson) => {
      console.log(this.state.token,responseJson)
      this.setState({
        data:responseJson,
            loaded: true,
        isRefreshing:false
        }
          );

    })
  .catch(error => console.error('Error:', error));

}
  componentDidMount() {
    this.RequestInfo();

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
  <FlatList


    ItemSeparatorComponent={ItemDivideComponent}//分割线组件
    data={this.state.data}
    renderItem={this.renderNoticeList}
    // style={styles.list}
    keyExtractor={item => (item.noticeID).toString()}

    //getItemLayout={(param, index) => ({ length: 64, offset: 64 * index, index })} //设置优化滚轮滑动效率  64为每个item高度
    />
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
    <ActionButton styles={{maginBottom:50,}}  onPress={() => this.myScrollView.scrollTo({ x: 0, y: 0, animated: true})}


                renderIcon={() => (<View >
                        <Ionicons
                        name={Platform.OS === 'ios' ? 'ios-arrow-up' : 'md-arrow-up'}
                        color={'white'}
                        size={30} />
                    </View>)}
            />
    </ScrollView>
    );
  }

  renderNoticeList({ item }) {
    // { item }是一种“解构”写法，请阅读ES2015语法的相关文档
    // item也是FlatList中固定的参数名，请阅读FlatList的相关文档
    //   const toggleOverlay = () => {
    //     this.setState({modalVisible:true});
    //   };
      //()=>alert(item.noticeContent)
      //const [visible, setVisible] = useState(false);
      // const toggleOverlay = () => {
      //   setVisible(!visible);
      // };
      return (

        <View  >


        <TouchableOpacity onPress={()=>alert(item.noticeContent)}>
  <Text style={styles.Data}>日期：{item.startTime}</Text>
    <Text style={styles.Data}>标题：{item.noticeTitle}</Text>
    <Text style={styles.Data}>内容：{item.noticeContent}</Text>
    </TouchableOpacity>

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