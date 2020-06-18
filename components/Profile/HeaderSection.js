import React, { memo} from 'react'; 
import { View , Text   ,StyleSheet  } from 'react-native'; 
import { Icon } from 'react-native-elements' 
import {  responsiveScreenFontSize } from "react-native-responsive-dimensions"; 
// import { ProgressBar, Colors } from 'react-native-paper'; 
 

const HeaderSection = ({...props}) => {  

 
    return (  
        <View style={{width:'100%' ,padding  : 10,backgroundColor:'rgba(0, 15, 54 , 0.3)'}}> 
            <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                <Text style={{fontSize:responsiveScreenFontSize(1.9),color:'rgba(255,255,255,.9)',marginTop:0,paddingLeft:20,paddingRight:20,fontFamily:'EBGaramond-Bold'}}>Profile Completation : </Text> 
                <Text style={{ fontSize:responsiveScreenFontSize(1.9),color:'rgba(255,255,255,.9)',marginTop:0,marginStart:-10,marginEnd:10,fontFamily:'EBGaramond-Bold'}}> {100*props.completetion} %</Text>
                <Icon name="tags" size ={responsiveScreenFontSize(2)} type ={'font-awesome'}  color='#2a2a2b' iconStyle={{color:'#F16731'}}     />
            </View> 
        </View>  
        )
} 

export default memo(HeaderSection);

const styles = StyleSheet.create({   

})
