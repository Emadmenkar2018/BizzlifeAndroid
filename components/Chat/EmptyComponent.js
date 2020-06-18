import React ,{memo} from 'react'
import { Image, StyleSheet,Text } from 'react-native'
import {
    responsiveHeight,
    responsiveWidth,
    responsiveScreenFontSize
  } from "react-native-responsive-dimensions";
import { View } from 'native-base';


const EmptyComponent = ({ props }) => {

    return (
      <View style={{width:'100%',height:'100%',alignItems:'center',alignContent:'center',justifyContent:'center'}}>
        <Text style={{marginTop:-responsiveHeight(10),fontSize:responsiveScreenFontSize(2.5),color:'#999',marginBottom:10}}>No Data Yet</Text>
        <Image tintColor={'#999'} style={styles.image}  source={require('../../assets/serious.png')} /> 
      </View>
    )
}
  
  const styles = StyleSheet.create({ 
    image: {
      width: responsiveWidth(25),
      height: responsiveWidth(25),
    },
  });
  
  export default memo(EmptyComponent);