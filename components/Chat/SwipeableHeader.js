import React, { memo ,useState,useEffect} from 'react'; 
import {FlatList, View , TouchableOpacity ,StyleSheet ,Image ,Text,ToastAndroid} from 'react-native';
import { theme } from '../../utils/theme';
import { Icon ,Button  } from 'react-native-elements' 
import {
    responsiveHeight,
    responsiveWidth,
    responsiveScreenFontSize
  } from "react-native-responsive-dimensions";
import {fetchSwippedMeApi} from '../../services/api'
import { useHistory } from 'react-router-native'; 


const SwipeableHeader = ({  ...props }) => {

    const [swipedmeList, setSwipedmeList] = useState('');  
    let history = useHistory();
    useEffect(() => {
        fetchProUsers() 
    }, [])

 
    const  fetchProUsers = () =>{
        let bodyFormData = new FormData(); 
        bodyFormData.append('access_token',global.AccesToken); 
        fetchSwippedMeApi(bodyFormData).then((response) => {
            ToastAndroid.show('Pro USers Fetched!', ToastAndroid.SHORT);
            setSwipedmeList(response.data)  
        })
        .catch(err => {
            // 
            ToastAndroid.show(err, ToastAndroid.SHORT);
            return;
        });   
      }


    if(global.is_pro == 0){
        return( 
            <View style={styles.container}>  

                    <View style={{  flexDirection: 'row', alignItems: 'center',paddingStart:10 , width:'100%',justifyContent:'space-between'  }}>
                        <Icon name="arrow-back" type ={'material'} size={responsiveScreenFontSize(4)} color={theme.colors.surface} onPress={()=> history.goBack() }  />
                        <Text style={{   fontSize : responsiveScreenFontSize(2) , color : '#fff',marginLeft:- responsiveScreenFontSize(5), fontFamily:'EBGaramond-Bold'} }>Your Matches</Text>
                        <Image  source= {{uri: null}} /> 
                    </View> 


                    <Text style={styles.text} >They Swiped You Right</Text> 
                    
                    <View  style={styles.scroller} showsHorizontalScrollIndicator={false} horizontal={true}>
                        <Image style={styles.logo} source= {{uri: 'https://i.redd.it/p9pzl5dtxuey.jpg'}} /> 
                        <Image style={styles.logo} source= {{uri: 'https://cacm.acm.org/system/assets/0003/5533/091119_cloudinary.com_blur.large.jpg?1568219983&1568219982'}} /> 
                        <Image style={styles.logo} source= {{uri: 'https://mayramachuca.files.wordpress.com/2019/01/mayramachuca-blurred-face-motion.jpg'}} /> 
                        <Button title ='GO PRO' onPress={()=>history.push('/Main/GoPro')} titleStyle={{fontSize :responsiveScreenFontSize(1.5),fontFamily:'EBGaramond-SemiBold'}} buttonStyle={{height:responsiveHeight(4),width:responsiveWidth(20),borderRadius:responsiveWidth(20),marginStart:responsiveWidth(20),alignSelf:'flex-end',backgroundColor:'#F16731'}} />
                    </View>


                    <Text  style={styles.text}>Your Matches</Text> 

                    <View  style={{height:responsiveHeight(7)}}> 
                    </View>  
                </View> 
            ) 
        }
    else{
        return(
                <View style={styles.container}>  
                    <View style={{  flexDirection: 'row', alignItems: 'center',paddingStart:10 , width:'100%',justifyContent:'space-between'  }}>
                        <Icon name="arrow-back" type ={'material'} size={responsiveScreenFontSize(4)} color={theme.colors.surface} onPress={()=> props.histoy.goBack() }  />
                        <Text style={{   fontSize : responsiveScreenFontSize(2),   color : '#fff',marginLeft:- responsiveScreenFontSize(5), } }>Your Matches</Text>
                        <Image  source= {{uri: null}} /> 
                    </View> 

                    <Text style={styles.text} >They Swiped You Right</Text> 

                    <View  style={styles.flatView}  >
                        <FlatList
                            horizontal={true}
                            data = {swipedmeList} 
                            keyExtractor={(item) => item.username}
                            renderItem={({ item }) => ( 
                                <TouchableOpacity onPress={ ()=>this.props.screenProps.rootNavigation.navigation.navigate('UserProfile' , { touserid : item.id })   }>
                                    <Image style={styles.logo} source= {{uri: item.avater.startsWith("http://app.tech-solt.com/")? item.avater.replace('http://app.tech-solt.com/','') : item.avater}} />
                                </TouchableOpacity> 
                            )}
                        />
                    </View>
                    
                    <Text  style={styles.text}>Your Matches</Text> 
                 
                    <View  style={{height:responsiveHeight(1)}}> 
                    </View>  

                </View>   
        )
    }   
}
export default memo(SwipeableHeader);

const styles = StyleSheet.create({  
    container:{
        backgroundColor:"#2d2d2d", 
        marginBottom : 50 , 
        paddingTop:20
    },
    text: {
        marginHorizontal:10,
        marginTop:10,
        fontSize: responsiveScreenFontSize(1.6),
        color:'#fff',
        fontFamily:'EBGaramond-SemiBold'
    },
    scroller:{ 
        backgroundColor:"#2d2d2d", 
        padding : 10, 
        flexDirection:'row',
        width:'100%',
        alignItems:'center'
    },
    flatView:{ 
      backgroundColor:"#2d2d2d", 
      padding : 10, 
    //   height: responsiveHeight(9)
    } ,
    logo:{
        borderRadius:25, 
        height:responsiveWidth(10),
        width:responsiveWidth(10),
        marginStart : responsiveWidth(3),
        borderWidth:1,
        borderColor:'#fff'
    }
})
