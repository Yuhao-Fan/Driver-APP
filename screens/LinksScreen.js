import React, {Component} from 'react';
import {StyleSheet, Alert, View} from 'react-native';
// import * as Animatable from 'react-native-animatable';
import {AnimatableManager, ThemeManager, Colors, BorderRadiuses, ListItem, Text} from 'react-native-ui-lib'; //eslint-disable-line
import { SocialIcon ,PricingCard} from 'react-native-elements'


export default class LinksScreen extends Component {
  static navigationOptions = {
    header:null,

  };
  constructor(props) {
    super(props);

    this.state = {

      token:this.props.navigation.getParam('token'),
    };
  }

  componentDidMount() {


  }

  render() {
    return (
      <View>
        <PricingCard
    color="#4f9deb"
    title="Free"
    price="$0"
    info={['1 User', 'Basic Support', 'All Core Features']}
    button={{ title: 'GET STARTED', icon: 'flight-takeoff' }}
    />


        <SocialIcon
    title='gitlab'
    button
    type='gitlab'
        />





        <SocialIcon
    title='Facebook'
    button
    type='facebook'
        />

        <SocialIcon
    title='Twitter'
    button
    type='twitter'
        />



        <SocialIcon
    button
    title='instagram'
    type='instagram'
        />
        </View>

    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 54,
    height: 54,
    borderRadius: BorderRadiuses.br20,
    marginHorizontal: 14,
  },
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: ThemeManager.dividerColor,
  },
});
//import React, { Component } from "react";

// import { Image, FlatList, StyleSheet, Text, View } from "react-native";
//
// const REQUEST_URL =
//   "https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json";
//
// export default class LinksScreen extends Component {
//   static navigationOptions = {
//     header:null,
//
//   };
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: [],
//       loaded: false
//     };
//     // 在ES6中，如果在自定义的函数里使用了this关键字，则需要对其进行“绑定”操作，否则this的指向会变为空
//     // 像下面这行代码一样，在constructor中使用bind是其中一种做法（还有一些其他做法，如使用箭头函数等）
//     this.fetchData = this.fetchData.bind(this);
//   }
//
//   componentDidMount() {
//     this.fetchData();
//   }
//
//   fetchData() {
//     fetch(REQUEST_URL)
//       .then(response => response.json())
//       .then(responseData => {
//         // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
//         this.setState({
//           data: this.state.data.concat(responseData.movies),
//           loaded: true
//         });
//       });
//   }
//
//   render() {
//     if (!this.state.loaded) {
//       return this.renderLoadingView();
//     }
//
//     return (
//       <FlatList
//         data={this.state.data}
//         renderItem={this.renderMovie}
//         style={styles.list}
//         keyExtractor={item => item.id}
//       />
//     );
//
//   }
//
//   renderLoadingView() {
//     return (
//       <View style={styles.container}>
//         <Text>Loading movies...</Text>
//       </View>
//     );
//   }
//
//   renderMovie({ item }) {
//     // { item }是一种“解构”写法，请阅读ES2015语法的相关文档
//     // item也是FlatList中固定的参数名，请阅读FlatList的相关文档
//     return (
//       <View style={styles.container}>
//         <Image
//           source={{ uri: item.posters.thumbnail }}
//           style={styles.thumbnail}
//         />
//         <View style={styles.rightContainer}>
//           <Text style={styles.title}>{item.title}</Text>
//           <Text style={styles.year}>{item.year}</Text>
//         </View>
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#F5FCFF"
//   },
//   rightContainer: {
//     flex: 1
//   },
//   title: {
//     fontSize: 20,
//     marginBottom: 8,
//     textAlign: "center"
//   },
//   year: {
//     textAlign: "center"
//   },
//   thumbnail: {
//     width: 53,
//     height: 81
//   },
//   list: {
//     paddingTop: 20,
//     backgroundColor: "#F5FCFF"
//   }
// });
