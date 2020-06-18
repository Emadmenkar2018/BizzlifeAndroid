import React,{useEffect }   from 'react';
import {    View ,StyleSheet ,BackHandler } from 'react-native'  
import SwipeableHeader from '../../../components/Chat/SwipeableHeader' 
import TabMenuChat from '../../../components/Chat/TabMenuChat' 
import { responsiveHeight,  } from "react-native-responsive-dimensions";
import { useHistory } from 'react-router-native'; 

const ChatScreen = ({ ...props}) => {  
 
  let history = useHistory();  
  useEffect(() =>{ 
    BackHandler.addEventListener("hardwareBackPress", backButtonHandler);

    return () => {
    BackHandler.removeEventListener("hardwareBackPress", backButtonHandler);
    };
}, [backButtonHandler]);

  const backButtonHandler = () => {
    history.goBack()
    return true;
  }  

    return (    
        <View style={{width:'100%',height:'100%',backgroundColor:"#2d2d2d"}}>

            <SwipeableHeader
               props={props}
            />

            <View style={{ flex: 1 ,marginTop : -responsiveHeight(12),borderTopRightRadius:30, overflow: 'hidden'} }>    
              <TabMenuChat 
                arg={props}
              />
            </View>   
            
        </View> 
      
    ) 
  }

export default ChatScreen;

const styles = StyleSheet.create({ 

  })