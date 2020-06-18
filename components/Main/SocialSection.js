import React, { memo } from 'react'; 
import { View , Text ,TouchableOpacity ,StyleSheet,ToastAndroid ,Linking} from 'react-native'; 
import { Icon } from 'react-native-elements'  
import {
    responsiveHeight,
    responsiveWidth,
    responsiveScreenFontSize
  } from "react-native-responsive-dimensions"; 

const SocialSection = ({ arg}) => {
 
    const handleClickfacebook = () => { 
        let str = arg.facebook
        if (str ){
          var n = str.lastIndexOf('/');
          var result = str.substring(n + 1);
          Linking.openURL('https://facebook.com/'+result) 
        }
        else{
          ToastAndroid.show('No Profile Available', ToastAndroid.SHORT);
        }
      };

    const   handleClicktwitter = () => { 
        let str = arg.twitter
        if (str ){
          var n = str.lastIndexOf('/');
          var result = str.substring(n + 1);
          Linking.openURL('https://twitter.com/'+result) 
        }
        else{
          ToastAndroid.show('No Profile Available', ToastAndroid.SHORT);
        }
      };

    const  handleClicklinkedin = () => { 
        let str = arg.linkedin
        if (str ){
          var n = str.lastIndexOf('/');
          var result = str.substring(n + 1);
          Linking.openURL('https://linkedin.com/'+result) 
        }
        else{
          ToastAndroid.show('No Profile Available', ToastAndroid.SHORT);
        }
      };

    const   handleClickwebsite = () => { 
        let str = arg.website
        if (str ){ 
          Linking.openURL(str) 
        }
        else{
          // ToastAndroid.show('No Profile Available', ToastAndroid.SHORT);
        }
      };

    return (
            <View style={styles.bottom}>

                <Icon
                    name='facebook'
                    type='font-awesome'
                    color='#517fa4' 
                    size ={responsiveWidth(9)} 
                    onPress={ handleClickfacebook }
                />  
                <Icon
                    name='linkedin'
                    type='font-awesome'
                    color='#517fa4'
                    size ={responsiveWidth(9)}  
                    onPress={ handleClicktwitter }
                />  
                <Icon
                    name='twitter'
                    type='font-awesome'
                    color='#517fa4'
                    size ={responsiveWidth(9)}  
                    onPress={ handleClicklinkedin}
                />  
                <Icon
                    name='instagram'
                    type='font-awesome'
                    color='#517fa4'
                    size ={responsiveWidth(9)}  
                    onPress={ handleClickwebsite}
                />  

            </View>  
        
    )
}
export default memo(SocialSection);

const styles = StyleSheet.create({     
    
    bottom:{ 
        width:'100%',
        flexDirection:'row',
        alignSelf:'center', 
        // backgroundColor : "#999", 
        // flexWrap : 'wrap',
        justifyContent:'space-evenly',
        alignItems:'center',
        padding : 15 ,  
        backgroundColor:'#999'
  
      }, 
})
