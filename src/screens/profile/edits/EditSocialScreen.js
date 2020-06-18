import React, {useState, useEffect,Component}  from 'react';
import { Text, StyleSheet , View ,ScrollView ,TextInput ,ToastAndroid, TouchableOpacity} from 'react-native';  
import axios from 'axios';  
import '../../../../utils/global.js'
import { theme } from '../../../../utils/theme.js';   
import  EditHeader   from '../../../../components/Profile/EditHeader'; 
import {Label } from 'native-base'; 
import {
    responsiveHeight,
    responsiveWidth,
    responsiveScreenFontSize
  } from "react-native-responsive-dimensions";
import {UpdateProfileApi } from '../../../../services/api';  
import { useHistory } from 'react-router-native';  

const EditSocialScreen =({ ...props}) => {
 
    const [social_link,setSocial_link] =useState( props.location.state.type === 'instagram' ?  props.location.state.ProfileData.instagram : props.location.state.type === 'facebook' ?   props.location.state.ProfileData.facebook : props.location.state.type === 'twitter' ? props.location.state.ProfileData.twitter : props.location.state.type === 'linkedin' ?   props.location.state.ProfileData.linkedin : 'Unknown'  )
    
    let history = useHistory();
 

    const _updateProfile = () => {
        let bodyFormData = new FormData();  
        bodyFormData.append('access_token',global.AccesToken),
        bodyFormData.append(props.location.state.type,social_link);    
        UpdateProfileApi(bodyFormData).then(() => {
            ToastAndroid.show('Data Has been Changed!', ToastAndroid.SHORT);  
            history.goBack()
        })
        .catch(err => { 
            return;
        }); 
    }

    return (

        <View style={{ flex: 1 ,backgroundColor:'#2d2d2d' }} > 
             
             <EditHeader
                _updateProfile={ _updateProfile}
                showSaveBtn = {true}
                title={'Change Your ' + props.location.state.type}
             /> 

            <View style={{   paddingRight : 20,paddingBottom:20,paddingLeft:20 ,backgroundColor:'#fff',height:'100%'  }}>  
                <Label style={{color: theme.colors.surface,paddingLeft: 4, opacity: 0.8,marginBottom:responsiveHeight(1.8),fontSize:responsiveScreenFontSize(2),fontFamily:'EBGaramond-Regular'}}>Your {props.location.state.type} Link</Label>
                <TextInput
                    style={{  borderColor: 'gray',backgroundColor:'#efefef'  ,marginBottom : 25  ,marginLeft : 10,marginRight : 10, padding : 15, borderRadius:10,height:responsiveHeight(6),borderBottomColor:theme.colors.surface,borderBottomWidth:1,fontFamily:'EBGaramond-Medium'}} 
                    onChangeText={(social_link) => setSocial_link(social_link) } 
                    value={social_link}
                    defaultValue={social_link }
                /> 
                
            </View>
        </View>
    );  
}
export default EditSocialScreen;