import React, { memo } from 'react'; 
import { View , Text ,Image ,StyleSheet } from 'react-native'; 
import { Icon } from 'react-native-elements' 
import {
    responsiveHeight,
    responsiveWidth,
    responsiveScreenFontSize
  } from "react-native-responsive-dimensions";
import { useHistory } from 'react-router-native'; 

const ChatBoxHeader = ({  ...props }) => {

    let history = useHistory();

    const trimavater =(avater)=> {
        try{ 
            if (avater.startsWith("http://app.tech-solt.com/")) {
              let index = avater.indexOf("m/");
              let res = avater.substr(index+2, avater.length); 
              if (res.startsWith("http")){
                return res
              }
              else{ 
                return avater
              }
            }
          }
        catch(err){
          // 
        } 
      }
    return (
        // <View>
            <View style={{  backgroundColor:'rgba(45, 45, 45,.4)' ,borderBottomRightRadius:50   }}> 
                <View style={{ flexDirection: 'row', alignItems: 'center', height: responsiveHeight(8) ,padding :20,marginTop : 10,alignContent:'center' }}>
                    <Icon name="close" type ={'material'} size={responsiveScreenFontSize(3)} color={'#fff'} onPress={()=>history.goBack()} /> 
                    <Image style={styles.logo} source={{uri: trimavater(props.toavater)}}  /> 
                    <Text style={{marginStart : 10,fontSize : responsiveScreenFontSize(2), fontWeight:'bold', color : '#fff'} }> {props.tofullname}</Text>
                </View>
            </View> 
        // </View>
    )
}
export default memo(ChatBoxHeader);
 
const styles = StyleSheet.create({
    btnSend: { 
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 2,  
      borderRadius: 50,
      paddingTop : 15
    },
    logo:{
        borderRadius:25, 
        height:responsiveWidth(10),
        width:responsiveWidth(10),
        marginStart : 15,
        borderWidth:1,
        borderColor:'#fff'
    }
  });