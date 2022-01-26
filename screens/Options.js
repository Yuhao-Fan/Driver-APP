import {Image,View,Button} from 'react-native';
import  React,{Component} from 'react'
export default class Options extends Component {
    static navigationOptions = {
      title:'设置'

    };
    constructor(props){
      super(props);
      this.state = {
        token:this.props.navigation.getParam('token'),
      };
    }
    render() {
      return (
        <View>
        <Button
          onPress={() => this.props.navigation.navigate('Home')}
          title="Go back home"
        />
        <Button
          title="EditInfo"
          onPress={() => {this.props.navigation.navigate('EditInfo',{token:this.state.token});
          }}
        />
        </View>
      );
    }
  }