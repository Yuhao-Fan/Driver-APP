import React, {Component} from 'react';
import {StyleSheet, Alert, FlatList} from 'react-native';
// import * as Animatable from 'react-native-animatable';
import {AnimatableManager, ThemeManager, Colors, BorderRadiuses, ListItem, Text} from 'react-native-ui-lib'; //eslint-disable-line



export default class LinksScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      onEdit: false,
      updating: false,
      data: [],
      token:this.props.navigation.getParam('token'),
    };
  }

  keyExtractor = item => item.name;
  componentDidMount() {
    this.fetchData();

  }
  fetchData(){



    // fetch("https://www.kingdom174.work",{method:'GET',body:JSON.stringify(data)})
    // .then(response => response.json()) // parses response to JSON
    const{token}=this.state
    //alert(token);
    fetch("https://www.kingdom174.work/OrderList?token="+token,{method:'GET'})
    .then(response=>response.json())
    .then((string) => {
        this.setState({
            data: string,

          }
        //   ,()=> {
        //     alert(string[0].OrderID);}
            );

      })
    .catch(error => console.error('Error:', error));
    console.log("fetchdata")
    console.log(this.state.data)

}
  renderRow(row, id) {
    const statusColor = row.inventory.status === 'Paid' ? Colors.green30 : Colors.red30;
    // const animationProps = AnimatableManager.presets.fadeInRight;
    // const imageAnimationProps = AnimatableManager.getRandomDelay();

    return (

     <View >
       <ListItem
         activeBackgroundColor={Colors.dark60}
         activeOpacity={0.3}
         height={77.5}
         onPress={() => Alert.alert(`pressed on order #${id + 1}`)}
       >
         <ListItem.Part left>
           {/* <Animatable.Image
             source={{uri: row.mediaUrl}}
             style={styles.image}
             {...imageAnimationProps}
           /> */}
         </ListItem.Part>
         <ListItem.Part middle column containerStyle={[styles.border, {paddingRight: 17}]}>
           <ListItem.Part containerStyle={{marginBottom: 3}}>
             <Text dark10 text70 style={{flex: 1, marginRight: 10}} numberOfLines={1}>{row.name}</Text>
             <Text dark10 text70 style={{marginTop: 2}}>{row.formattedPrice}</Text>
           </ListItem.Part>
           <ListItem.Part>
             <Text style={{flex: 1, marginRight: 10}} text90 dark40 numberOfLines={1}>{`${row.inventory.quantity} item`}</Text>
             <Text text90 color={statusColor} numberOfLines={1}>{row.inventory.status}</Text>
           </ListItem.Part>
         </ListItem.Part>
       </ListItem>
     </View>
    );
  }

  render() {
    return (
      <FlatList
      data={this.state.data}
        renderItem={({item, index}) => this.renderRow(item, index)}
        keyExtractor={this.keyExtractor}
      />
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
//     // ???ES6?????????????????????????????????????????????this????????????????????????????????????????????????????????????this?????????????????????
//     // ?????????????????????????????????constructor?????????bind??????????????????????????????????????????????????????????????????????????????
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
//         // ????????????????????????this????????????????????????this?????????????????????????????????????????????????????????????????????????????????
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
//     // { item }???????????????????????????????????????ES2015?????????????????????
//     // item??????FlatList?????????????????????????????????FlatList???????????????
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
