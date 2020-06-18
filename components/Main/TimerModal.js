import React, { memo } from 'react';
import { StyleSheet, Text , Modal  , View ,Dimensions } from 'react-native';
import { theme } from '../../utils/theme';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveScreenFontSize
} from "react-native-responsive-dimensions";
import { Icon ,Button} from 'react-native-elements' 
import CountDown from 'react-native-countdown-component';
import { useHistory } from 'react-router-native'; 
 
const halfLength = Dimensions.get('window').height /2 

const TimerModal = ({ ...props }) => {
  let history = useHistory();
    let d = new Date();
    let h = d.getHours();
    let m = d.getMinutes();
    let s = d.getSeconds();
    let secondsUntilEndOfDate = (24*60*60) - (h*60*60) - (m*60) - s; 

    return (
        <Modal 
        visible={props.showTimer  } 
        transparent={true} 
        >
        <View  style={{   height:'100%' , width:'100%' , alignContent:'center', alignSelf:'center', backgroundColor : 'rgba(0,0,0,.5)', padding :5 , borderWidth:1, borderColor:'rgba(0,0,0,.3)' ,shadowRadius: 1, shadowColor: 'rgba(0,0,0,.8)', shadowOpacity: 0.8,}}>
            <Icon 
                name='close'
                type='material'
                color='#fff' 
                size={40}
                iconStyle={{fontWeight:'bold'}}
                containerStyle={{position:'absolute',top :20,right :20}}
                onPress={props.closeTimer}  
            /> 
          <View style={{ position:'absolute',top:halfLength-130, alignSelf:'center'}}>
            
            <Icon 
              name='alarm'
              type='material'
              color='#fff'
              size={60}
            /> 
            <Text style={{fontSize:20,color:'#fff',fontWeight:'200', alignSelf:'center',marginBottom:20}}>Wait Or Go Pro</Text>
            <CountDown
              size={35}
              until={secondsUntilEndOfDate} 
              onFinish={props.finishTimer}
              digitStyle={{backgroundColor: 'transparent', borderWidth: 2, borderColor: 'transparent'}}
              digitTxtStyle={{color: '#fff'}}
              timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
              separatorStyle={{color: '#fff',borderRadius:10}}
              timeToShow={['H', 'M', 'S']}
              timeLabels={{m: null, s: null}}
              showSeparator
            />

            <Button 
                title = "Go Pro"   buttonStyle={{width :responsiveWidth(70) ,backgroundColor:"#fff",borderRadius:20     }}  
                titleStyle ={{color:"#000"}}     
                onPress ={ ()=>history.push('/Main/GoPro') }  >Go Pro
            </Button> 

          </View>
          
        </View> 
          
      </Modal> 
    )
}

const styles = StyleSheet.create({
  header: {
    fontSize: responsiveScreenFontSize(3),
    color: theme.colors.white,
    fontWeight: 'bold', 
    alignSelf:'center',
    marginBottom:responsiveHeight(4)
  },
});

export default memo(TimerModal);