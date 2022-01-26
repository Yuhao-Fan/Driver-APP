import  React,{Component} from 'react'
import {Platform,ScrollView,TouchableOpacity,RefreshControl, FlatList, StyleSheet, Text, View ,Button} from 'react-native';
import ActionButton from 'react-native-action-button'
import Ionicons from 'react-native-vector-icons/Ionicons';
class ItemDivideComponent extends Component {
    render() {
      return (
        <View style={{height: 1, backgroundColor: 'skyblue'}}/>
      );
    }
  };
export default class OrderList extends Component{
    static navigationOptions = {
        title: '订单列表',
        /* No more header config here! */
      };
    constructor(props){
        super(props)
        this.state={
            isLoading: true,
            token:this.props.navigation.getParam('token'),
            data: [],
            loaded: false,
            isRefreshing:false

        }
        this.fetchData = this.fetchData.bind(this);
    }
    handleRefresh = () => {
        this.setState({
            isRefreshing:true,//tag,下拉刷新中，加载完全，就设置成flase
            data:[]
        });
        this.fetchData()

    }
    componentDidMount() {
        this.fetchData();
        
      }
    fetchData(){
        

        
        // fetch("https://www.kingdom174.work",{method:'GET',body:JSON.stringify(data)})   
        // .then(response => response.json()) // parses response to JSON
        const{token}=this.state

        //alert(token);
        fetch("https://www.kingdom174.work/orderListDriver?token="+token,{method:'GET'})
        .then(response=>response.json())
        .then((string) => {
            console.log(string)
            this.setState({
                data: string,
                loaded: true,
                isRefreshing:false
              }
            //   ,()=> {
            //     alert(string[0].OrderID);}
                );

          })
        .catch(error => console.error('Error:', error));


    }
    


      _getRef = (flatList) => {

        this._flatList = flatList; const reObj = this._flatList; return reObj; } 

      render() {
        if (!this.state.loaded) {
          return this.renderLoadingView();
        }
    
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
            renderItem={this.renderOrderList}
            // style={styles.list}
            keyExtractor={item => (item.OrderID).toString()}
            
            //getItemLayout={(param, index) => ({ length: 64, offset: 64 * index, index })} //设置优化滚轮滑动效率  64为每个item高度
            />
            <ActionButton styles={{maginBottom:50,}}  onPress={() => this.myScrollView.scrollTo({ x: 0, y: 0, animated: true})}
            
            
                renderIcon={() => (<View >
                        <Ionicons 
                        name={Platform.OS === 'ios' ? 'ios-arrow-up' : 'md-arrow-up'} 
                        color={'white'} 
                        size={30} />
                    </View>)}
            />
            {/* <Text>123</Text> */}
            </ScrollView >
          
        //   <FlatList
        //   data={[{key: 'a'}, {key: 'b'}]}
        //   renderItem={({item}) => <Text>{item.key}</Text>}
        // />
        );
    
      }
    
      renderLoadingView() {
        return (
          <View style={styles.container}>
            <Text>Loading...</Text>
          </View>
        );
      }
    
      renderOrderList({ item }) {
        // { item }是一种“解构”写法，请阅读ES2015语法的相关文档
        // item也是FlatList中固定的参数名，请阅读FlatList的相关文档
        return (

            <View  >


            <TouchableOpacity onPress={() => alert('1st')}>
            <Text style={styles.Data}>费用：{item.Fare}</Text>
          <Text style={styles.Data}>起点：{item.StartPlace}</Text>
          <Text style={styles.Data}>终点：{item.Destination}</Text>
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