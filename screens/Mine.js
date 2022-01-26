import React, { PureComponent } from 'react' 
import {
    Platform,
    Dimensions,
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    ScrollView,
    TouchableOpacity,
    Animated,
    Easing
}from 'react-native'
import ModalExample from './EditInfo';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window')

export default class Mine extends PureComponent {
  static navigationOptions = {
    header:null,

  };
    constructor(props) {
        super(props);

        this.state = {
            VIPlevel:'黄金',
            token:this.props.navigation.getParam('token'),
            username:this.props.navigation.getParam('username'),
            rotation: new Animated.Value(0),
            scale: new Animated.Value(1),
            translateY: new Animated.Value(10),
            opacity: new Animated.Value(0),
        }
        // this.props.navigation = this.props.navigation.navigate.bind(this);
    }

    settingData = [
        {
            leftText: '订单详情',
            rightText: '进入订单详情页面',
            onPress(){
                alert("订单详情");
            }
        },
        {
            leftText: '评价详情',
            rightText: '进入评价详情页面',
            onPress(){
                alert("评价详情");

            }
        },
        {
            leftText: '反馈',
            rightText: '进入反馈页面',
            onPress(){
                //alert("dian");
                this.props.navigation.navigate('Feedback',
                    {username: this.state.username,
                        token:this.state.token,
                    });
                console.log('进入反馈页面:');
            }
        },
        {
            leftText: '历史反馈',
            rightText:'进入历史反馈页面',
            onPress(){this.props.navigation.navigate('HistoricalFeedback',
            {
                token:this.state.token,
            });
                console.log('进入历史反馈页面:');

            }
        },
        {
            leftText: '退出',
            rightText: '退出当前账号',
            onPress(){
                this.props.navigation.navigate('Login');
                console.log('退出:');
            }

        },

    ]

    componentDidMount() {
        //顺序执行
        Animated.sequence([
            //随着时间发展执行
            Animated.timing(
                this.state.rotation,{
                    toValue: 1,
                    duration: 500,
                    easing: Easing.linear,
                }
            ),
            Animated.timing(
                this.state.scale,{
                    toValue: 1.3,
                    duration: 600,
                }
            ),
            //同时执行
            Animated.parallel([
                Animated.timing(
                    this.state.scale,{
                        toValue: 1,
                        duration: 500,
                    }
                ),
                Animated.timing(
                    this.state.opacity,{
                        toValue: 1,
                        duration: 1000,
                    }
                ),
                Animated.timing(
                    this.state.translateY,{
                        toValue: 0,
                        duration: 600,
                    }
                )
            ])
        ])
    }
    

    render(){
        return(
            <ScrollView style={styles.container}>
                

                {/* 头部 */}
                <View style={styles.headContainer}>
                    {/* 夜间/签到 */}
                    
                    <View style={styles.headTopContainer}>

                    
                        <TouchableOpacity onPress={() => {this.props.navigation.navigate('EditInfo',{token:this.state.token})}} style={styles.topBtnStyle} activeOpacity={1} >
                            <Image source={require('../assets/images/i_mine.png')} style={styles.headTopImg} resizeMode={'contain'} />
                            <Text style={styles.headTopText}>编辑资料</Text>
                        </TouchableOpacity>
                        

                    </View>

                    {/* 头像、昵称、标签 */}
                    <View style={styles.headCenterContainer}>
                        <Animated.Image style={[styles.userImg, 
                        {
                            transForm:[
                                {
                                    rotateY: this.state.rotation.interpolate({
                                        inputRange: [0,1],
                                        outputRange: ['0deg', '360deg']
                                    }),
                                },
                                {
                                    scale: this.state.scale
                                }
                            ]
                        }
                        ]} source={require('../assets/images/i_user.jpg')} resizeMode={'contain'} />

                        {/*<Animated.Text style={[styles.userNickname, {opacity: this.state.opacity, */}
                        {/*// transForm: [*/}
                        {/*//     {*/}
                        {/*//         translateY: this.state.translateY*/}
                        {/*//     }*/}
                        {/*// ]*/}
                        {/*}]}>{this.state.username}</Animated.Text>*/}
                        {/*<Text>{this.state.username}</Text>*/}
                        <Text>{this.state.username}</Text>
                        <View style={styles.positionContainer}>
                            <Image style={styles.positionImg} source={require('../assets/images/i_bookmark.png')} />
                            <Text style={styles.positionText}>金牌司机</Text>
                        </View>
                    </View>

                    {/* 收藏、历史、更贴 */}
                    <View style={styles.headBottomContainer}>
                        <TouchableOpacity style={styles.bottomBtn} activeOpacity={1} onPress={() => {this.props.navigation.navigate('NoticeList',{token:this.state.token})}}>
                            <Text style={styles.bottomNum}>2</Text>
                            <Text style={styles.bottomText}>公告</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.bottomBtn} activeOpacity={1} onPress={() => {this.props.navigation.navigate('OrderList',{token:this.state.token})}}>
                            <Text style={styles.bottomNum}>979</Text>
                            <Text style={styles.bottomText}>订单历史</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.bottomBtn} activeOpacity={1} onPress={() => {alert(this.state.token)}}>
                            <Text style={styles.bottomNum}>170</Text>
                            <Text style={styles.bottomText}>信誉分</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* 过渡条 */}
                <View style={styles.transitionView}></View>

                {/* 设置列表 */}
                <View style={styles.settingListContainer}>
                    {
                        this.settingData.map((item, index) => {
                            return(
                                <ListItem
                                    key={index}
                                    leftText={item.leftText}
                                    rightText={item.rightText}
                                    rightComponent={item.rightComponent}
                                    isShowArrow={item.isShowUnderline}
                                    onPress={item.onPress.bind(this)}
                                />
                            )
                        })
                    }
                </View>
            </ScrollView>
        )
    }
}

class ListItem extends React.PureComponent {
    static defaultProps = {
        leftText: '',
        rightText: '',
        isShowUnderline: true,
        isShowArrow: true,
    }

    _renderRight = () => {
        if (!this.props.rightText && !this.props.rightComponent) {
            return <Text />
        }

        if (this.props.rightText) {
            return(
                <Text style={styles.itemRightText}>
                    {this.props.rightText}
                </Text>
            )
        }

        if (this.props.rightComponent) {
            return(
                <this.props.rightComponent />
            )
        }
    }

    render(){
        return(
            <TouchableOpacity activeOpacity={0.9} style={[styles.itemContainer, this.props.isShowUnderline && styles.itemBorderBottom]} onPress={this.props.onPress}>
                <Text style={styles.itemLeftText}>{this.props.leftText}</Text>

                <View style={styles.itemRightContainer}>
                    {
                        this._renderRight()
                    }
                    {
                        !this.props.rightComponent && this.props.isShowArrow && <Image style={styles.itemRightImg} source={require('../assets/images/i_right.png')}/>
                    }
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        backgroundColor: '#f8f8f8',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
    },
    itemBorderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: '#e6e6e6',
    },
    itemLeftText: {
        fontSize: 14,
        color: '#000',
    },
    itemRightContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    itemRightText: {
        color: '#bfbfbf',
        fontSize: 12,
    },
    itemRightImg: {
        width: 20,
        height: 20,
        marginHorizontal: 7,
    },
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8'
    },
    headContainer: {
        paddingHorizontal: 15,
        paddingBottom: 10,
        paddingTop: 30,
    },
    headTopContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    topBtnStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 30,
        borderColor: '#e6e6e6',
        borderWidth: 1,
        borderRadius: 20,
    },
    headTopImg: {
        width: 15,
        height: 15,
        marginRight: 5
    },
    headTopText: {
        fontSize: 12,
        color: '#515151'
    },
    headCenterContainer: {
        alignItems: 'center',
        marginBottom: 15
    },
    userImg: {
        width: 80,
        height: 80,
        borderRadius: 40
    },
    userNickname: {
        marginVertical: 5,
        fontSize: 20,
        color: '#000'
    },
    positionContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    positionImg: {
        width: 10,
        height: 10,
        marginRight: 2
    },
    positionText: {
        color: '#bfbfbf',
        fontSize: 10
    },
    headBottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    bottomBtn: {
      alignItems: 'center'
    },
    bottomNum: {
        fontSize: 20,
        color: '#000'
    },
    bottomText: {
        color: '#bfbfbf',
        fontSize: 12
    },
    transitionView: {
        height: 5,
        backgroundColor: 'rgba(230,230,230, .5)'
    },
    settingListContainer: {
        paddingLeft: 20,
    }
})