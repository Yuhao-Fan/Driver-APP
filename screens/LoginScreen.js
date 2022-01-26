import  React,{Component} from 'react'
import {TextInput,StyleSheet} from 'react-native';
import {Text,Button,View} from 'react-native-ui-lib';

export default class LoginScreen extends Component{
    static navigationOptions = {
        title: '登录',
        /* No more header config here! */
      };
    constructor(props){
        super(props)
        this.state={
            isLoading: true,
            username:'猪头',//最后改为空
            password:'123',
            // username:'范老板',//最后改为空
            // password:'12345',
            token:'',

        }
    }

    Test(){


        // fetch("https://www.kingdom174.work",{method:'GET',body:JSON.stringify(data)})   
        // .then(response => response.json()) // parses response to JSON
        const{username,password}=this.state

        fetch("https://www.kingdom174.work/Login?username="+username+"&password="+password+"&location=",{method:'GET'})   
        .then(response=>response.json())
        .then(responseJson=>{
          
            this.setState({
              isLoading: false,
              token:responseJson.token
            
            })
            if(responseJson.code==300||responseJson.code==404)alert(responseJson.message)
            else{
                this.props.navigation.navigate('Mine', {
                    'token': responseJson.token,
                    'username':this.state.username,
                });
                // this.props.navigation.navigate('NoticeList', {
                //     'token': responseJson.token,
                //     'username':this.state.username,
                // });

                this.props.navigation.navigate('Home', {
                    'token': responseJson.token,
                    'username':this.state.username,
                  });
                
            }
        })
        .catch(error => console.error('Error:', error));
        
    }
    render(){

        return(
           <View flex paddingH-60 paddingT-80 paddingV-40>
                <Text blue50 text20 center>登陆</Text>
                <View center paddingH-100>
                <TextInput style={styles.input} 
                onChangeText={(username)=>this.setState({username})}
                value={this.state.username}
                
                placeholder={'请输入用户名'}/>
                <TextInput style={styles.input} 
                onChangeText={(password)=>this.setState({password})}
                value={this.state.password}
                secureTextEntry={true}//文本框会遮住之前输入的文字
                placeholder={'请输入密码'}/>
                </View>
                <View center paddingT-80>
                    <Button label="Login" text70 white bg-orange30 onPress={()=>{this.Test()}} />
                </View>
            </View>
            
        );
    }
}

const styles=StyleSheet.create(
    {
        container:{
            flex:1,
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:'white'
        },
        title:{
            fontSize:40,
            fontWeight:'bold',
            marginBottom:20
        },
        input:{
            fontSize: 20,
            width: 300,
            margin: 10,
            borderBottomWidth: 1,
            borderStyle: 'solid',
            borderColor: '#841584',
            padding: 5,
            marginBottom:20
        },
        login:{
            fontSize:24,
            fontWeight:'bold',
            color: 'white',
            margin: 20,
            backgroundColor: 'green',
            width: 150,
            height: 50,
            lineHeight: 50,
            textAlign: 'center',
   
        }
    }
);
