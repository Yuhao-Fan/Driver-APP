import React, { Component } from "react";

import { Image, FlatList, StyleSheet, Text, View } from "react-native";

const REQUEST_URL =
  "https://www.kingdom174.work/HistoricalFeedback?token=";

export default class HistoricalFeedback extends Component {
  static navigationOptions = {
    header:null,

  };
  constructor(props) {
    super(props);
    this.state = {
      token:this.props.navigation.getParam('token'),
      username:this.props.navigation.getParam('username'),
      data: [],
      loaded: false
    };
    // 在ES6中，如果在自定义的函数里使用了this关键字，则需要对其进行“绑定”操作，否则this的指向会变为空
    // 像下面这行代码一样，在constructor中使用bind是其中一种做法（还有一些其他做法，如使用箭头函数等）
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const{token,username}=this.state

    fetch(REQUEST_URL+token+'&username'+username)
      .then(response => response.json())
      .then(responseData => {
        // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
        this.setState({
          data: this.state.data.concat(responseData.feedback),
          loaded: true
        });
      });
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
   
    return (
      <FlatList
        data={this.state.data}
        renderItem={this.renderFeedback}
        style={styles.list}
        keyExtractor={this._keyExtractor}
      />
    );

  }
  _keyExtractor=(item, index)=> index;
  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  renderFeedback({ item }) {
    // { item }是一种“解构”写法，请阅读ES2015语法的相关文档
    // item也是FlatList中固定的参数名，请阅读FlatList的相关文档
    return (
      <View style={styles.container}>
        
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{item.Title}</Text>
          <Text style={styles.content}>{item.Content}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  content: {
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