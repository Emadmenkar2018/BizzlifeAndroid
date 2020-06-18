import React, { memo } from 'react'; 
import { View , Image ,TouchableOpacity ,StyleSheet } from 'react-native';
import { theme } from '../../utils/theme';
import { Icon } from 'react-native-elements' 
import {
    responsiveHeight,
    responsiveWidth, 
  } from "react-native-responsive-dimensions";

const Footer = ({  ...props }) => {

    
    return (
            <View style={{ position:'absolute', width:'100%',  flexDirection:'row',justifyContent:'space-between',bottom: responsiveHeight(0.6) , paddingHorizontal:15}}>
                
                <Icon
                  reverse
                  containerStyle={{borderRadius : 50 }} 
                  name='redo'
                  type='material' 
                  color = '#2269A6'
                  size={responsiveWidth(4)}
                  onPress={props.redoBtn  }
                />

                <TouchableOpacity onPress={props.swipeleft }>

                  <Image 
                    style ={{   height : responsiveHeight(5),width : responsiveWidth(22), }}
                    source={require('../../assets/false.png')} 
                  />  

                </TouchableOpacity>

                <TouchableOpacity   onPress={props.swiperight }   >

                    <Image 
                    style ={{  height : responsiveHeight(5),width : responsiveWidth(22)  }}
                    source={require('../../assets/true.png')} 
                    />  

                </TouchableOpacity> 

                <Icon
                reverse
                containerStyle={{ borderRadius : 40, width:50}} 
                name='star'
                type='font-awesome' 
                color = '#F16731'
                size={responsiveWidth(4)}
                onPress={props.swipetop  }
                />  
            </View> 
    )
}
export default memo(Footer);

const styles = StyleSheet.create({ 
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 26,
  },
  srchbtn : { 
    flexDirection : "row",
    alignItems: 'center',  
    backgroundColor: '#fff',
    borderWidth : 1,
    borderColor:theme.colors.surface,
    height:30, 
    borderRadius : 30, 
    paddingLeft : 3,
    paddingRight : 3
  } ,
  txt :{
    color : "#2e2e2e",
    marginEnd : 5,
    marginStart:-5,
    fontWeight:'bold'
  },
})
