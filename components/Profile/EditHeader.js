import React, { memo } from 'react'; 
import { View , Text  } from 'react-native';
import { theme } from '../../utils/theme';
import { Icon } from 'react-native-elements' 
import {
    responsiveHeight, 
    responsiveScreenFontSize
  } from "react-native-responsive-dimensions";
import { useHistory } from 'react-router-native'; 

const EditHeader = ({  ...props }) => {

    let history = useHistory();
    return (
        <View>
            <View style={{  backgroundColor:'#2d2d2d'}}> 
                <View style={{ flexDirection: 'row', alignItems: 'center', height: responsiveHeight(10) ,padding :20,marginTop : 10 }}>
                    <Icon name="close" type ={'material'} size={responsiveScreenFontSize(3)} color={theme.colors.surface} onPress={()=>history.goBack()} /> 
                    <Text style={{marginStart : 10,fontSize : responsiveScreenFontSize(2) , color : '#fff',fontFamily:'EBGaramond-SemiBold'} }>{ props.title ? props.title : 'Settings'}</Text>
                    { props.showSaveBtn &&
                        <Icon name="save" type ={'material'} containerStyle={{marginStart:'auto'}} size={responsiveScreenFontSize(3.5)} color={theme.colors.surface} onPress={()=>props._updateProfile()} /> 
                    }
                </View>
            </View>
            <View style={{  backgroundColor:'#fff' ,height:responsiveHeight(5), borderTopRightRadius:80}}> 
            </View>
        </View>
    )
}
export default memo(EditHeader);
 