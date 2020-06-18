import React, {useState, useEffect,Component}  from 'react';
import { Text, StyleSheet , View ,ScrollView ,TextInput   ,ToastAndroid, BackHandler} from 'react-native';  
import axios from 'axios';  
import '../../../../utils/global.js'
import { theme } from '../../../../utils/theme.js'; 
import  EditHeader   from '../../../../components/Profile/EditHeader'; 
import {Label } from 'native-base';
import {Button } from 'react-native-elements';  
import {
    responsiveHeight,
    responsiveWidth,
    responsiveScreenFontSize
  } from "react-native-responsive-dimensions";
import {UpdateProfileApi } from '../../../../services/api'; 
import { useHistory } from 'react-router-native'; 

const EditNameScreen  =({  ...props })  => {  
    
    const [first_name,setFirst_name] =useState( props.location.state.ProfileData.first_name)
    const [last_name,setLast_name] =useState(props.location.state.ProfileData.last_name)
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

    const _updateProfile = () => {
        if (first_name.length>0 && last_name.length>0){
            let bodyFormData = new FormData();  
            bodyFormData.append('access_token',global.AccesToken),
            bodyFormData.append('first_name',first_name);   
            bodyFormData.append('last_name', last_name);   
            UpdateProfileApi(bodyFormData).then(() => {
                ToastAndroid.show('Data Has been Changed!', ToastAndroid.SHORT);  
                history.goBack()
            })
            .catch(err => { 
                return;
            }); 
        }
        else{
            ToastAndroid.show('Enter Both Values', ToastAndroid.SHORT); 
        }
    }

        return (
            <View style={{ flex: 1  ,backgroundColor:'#2d2d2d'}} > 

                <EditHeader
                    title={'Change Your Name'}
                    _updateProfile={_updateProfile}
                    showSaveBtn = {true}
                /> 

                <View style={{   paddingRight : 20,paddingBottom:20,paddingLeft:20 ,backgroundColor:'#fff',height:'100%' }}>  
                    <Label style={{color: theme.colors.surface,paddingLeft: 4, opacity: 0.8,marginBottom:responsiveHeight(1.8),fontSize:responsiveScreenFontSize(2),fontFamily:'EBGaramond-Regular'}}>First Name</Label>
                    <TextInput
                        style={{  borderColor: 'gray',backgroundColor:'#efefef'  ,marginBottom : 25  ,marginLeft : 10,marginRight : 10, padding : 15, borderRadius:10,height:responsiveHeight(6),borderBottomColor:theme.colors.surface,borderBottomWidth:1,fontFamily:'EBGaramond-Medium'}} 
                        onChangeText={(first_name) => { 
                            setFirst_name(first_name.replace(/[^0-9a-z ]/gi, ''))   
                        }}
                        value={first_name}
                        defaultValue={first_name}
                    />
                    <Label style={{color: theme.colors.surface,paddingLeft: 4, opacity: 0.8,marginBottom:responsiveHeight(1.8),fontSize:responsiveScreenFontSize(2),fontFamily:'EBGaramond-Regular'}}>Last Name</Label>
                    <TextInput
                        style={{   borderColor: 'gray',backgroundColor:'#efefef'  ,marginBottom : 25  ,marginLeft : 10,marginRight : 10, padding : 15, borderRadius:10,height:responsiveHeight(6),borderBottomColor:theme.colors.surface,borderBottomWidth:1,fontFamily:'EBGaramond-Medium'}} 
                        onChangeText={(last_name) => setLast_name(last_name.replace(/[^0-9a-z ]/gi, ''))   }
                        value={last_name}
                        defaultValue={last_name}
                    /> 
                 
                </View>
            </View>
    );
}

export default EditNameScreen;