import React, { memo } from 'react'; 
import { View , TouchableOpacity ,Image ,StyleSheet } from 'react-native';
import { theme } from '../../utils/theme';
import { Icon } from 'react-native-elements' 
import {
    responsiveHeight,
    responsiveWidth,
    responsiveScreenFontSize
  } from "react-native-responsive-dimensions";
import { useHistory } from 'react-router-native'; 
import { Button } from 'react-native-elements';

const Header = ({ bordered, style, title, ...props }) => {
  let history = useHistory();
    
  const _gotoSearch=() =>{  
      history.push('Main/Search')   
  }
 
  const _gotoProfile=() =>{
    history.push('Main/Profile')
  }

  const _gotoChat=() =>{
    history.push('Main/Chat')
  }
 
    return (
        <View style={{ paddingHorizontal:10, flexDirection:'row',justifyContent:'space-evenly',zIndex:1,width:'100%' ,alignItems:'center'}}> 

          <TouchableOpacity onPress={_gotoProfile}>
            <Image
              resizeMode={'contain'}
              source={global.avater.startsWith('http://app.tech-solt.com/') ? { uri:global.avater} :{ uri:'http://app.tech-solt.com/' + global.avater} }
              style={{width : responsiveHeight(6),height : responsiveHeight(6), borderRadius:responsiveHeight(13) , borderWidth:1   }}       
            />
          </TouchableOpacity> 
 
            <Button
                icon={
                    <Icon
                    name="search"
                    size={responsiveWidth(5)}
                    type='material'  
                    color="#000"
                    containerStyle={{marginLeft:4}}
                    />
                }
                onPress={_gotoSearch}
                titleStyle={styles.txt}
                title="Search"
                buttonStyle={styles.srchbtn }
            />


            <Icon
                reverse
                containerStyle={{ borderRadius : 40  }} 
                name='chat'
                type='material' 
                color = '#2d2d2d'
                size ={responsiveWidth(5)}
                iconStyle={{color:'#fff' }}
                onPress={ _gotoChat} 
              />
          </View>
    )
}
export default memo(Header);

const styles = StyleSheet.create({ 
  text: {
    fontWeight: 'bold',
    fontSize: responsiveScreenFontSize(3),
    lineHeight: 26,
  },
  srchbtn : { 
    flexDirection : "row",
    alignItems: 'center',  
    justifyContent:'center',
    backgroundColor: '#fff',
    borderWidth : 1,
    borderColor:theme.colors.surface,
    height: responsiveHeight(4.5), 
    borderRadius : 30, 
    paddingHorizontal: 5,  
  } ,
  txt :{
    color : "#2e2e2e", 
    fontWeight:'200',
    fontSize:responsiveScreenFontSize(1.3),
    marginHorizontal:4
  },
})
