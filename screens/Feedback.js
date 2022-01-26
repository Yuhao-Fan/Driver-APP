import  React,{Component} from 'react'
import {Text,View,TextInput,Dimensions, Button} from 'react-native';
//const {width: screenWidth, height: screenHeight} = Dimensions.get('window')
//import { SafeAreaView } from 'react-navigation';
export default class Feedback extends Component{
    static navigationOptions = {
        title: '意见反馈',

        headerRight: () => (
            <Button
              onPress={() => alert('This is a button!')}
              title="历史反馈"

            />
          ),//?
      };
    constructor(props){
        super(props)
        this.state={
            token:this.props.navigation.getParam('token'),
            username:this.props.navigation.getParam('username'),
            title:'',
            content:'',
            feedabckID:''
        }
    }

    Feedback_to_server(){
        

        // fetch("https://www.kingdom174.work",{method:'GET',body:JSON.stringify(data)})   
        // .then(response => response.json()) // parses response to JSON
        const{token,username,title,content}=this.state
        
        // fetch("https://www.kingdom174.work/feedback?token="+token+"&username"+username+"&title="+title+"&content="+content,{method:'POST'})   
        // .catch(error => console.error('Error:', error));
        alert(JSON.stringify({
            token: token,
            title: title,
            content:content
          }))
        fetch('https://www.kingdom174.work/feedback', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
       
          body: JSON.stringify({
            token: token,
            title: title,
            content:content
          }),
        })
        .then(response=>response.json())
        .then(responseJson=>{
          
            alert(responseJson.feedabckID)
        })
        
    //     .then(response => response.json())
    //     .then(responseData => {
    //         alert(responseData.feedabckID)
    //     // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
    //     this.setState({
    //       feedabckID: this.state.data.concat(responseData.feedabckID),
    //     });
    //   })
    
    ;
    }
    render(){

        return(
            
            <View style={{flexDirection: 'column',flex: 1,paddingHorizontal:15}}>

                <Text style={{height: 50,fontWeight: 'bold',fontSize: 20,
    marginBottom: 8,
    paddingLeft:30,
    paddingTop:15
            }}>标题</Text>
                <TextInput style={{height: 50,borderColor: '#C0C0C0',
        borderWidth: 1,}}
                placeholder="请输入标题"
                
                onChangeText={(title) => this.setState({title})}
                value={this.state.title}
                keyboardType={'default'}
                />
                <Text style={{height: 50,fontWeight: 'bold',fontSize: 20,
    marginBottom: 8,
    paddingLeft:30,
    paddingTop:15}}>内容</Text>
                <TextInput style={{height: 300,borderColor: '#C0C0C0',
        borderWidth: 1,textAlignVertical: 'top'}}
                placeholder="请输入内容"
                onChangeText={(content) => this.setState({content})}
                value={this.state.content}
                multiline = {true}
                keyboardType={'default'}

                
                />
                <View style={{paddingTop:30}}>
                 <Button 
                title="提交"
                onPress={()=>{this.Feedback_to_server();  }}
                ></Button>
                </View>
            </View>

        );
    }
}
