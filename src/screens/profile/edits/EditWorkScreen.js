import React, {useState, useEffect,Component}  from 'react';
import { Text, StyleSheet , View ,ToastAndroid ,TextInput,BackHandler  } from 'react-native';    
import '../../../../utils/global.js'
import { theme } from '../../../../utils/theme.js'; 
import {Label } from 'native-base'; 
import { useHistory } from 'react-router-native';
import  EditHeader   from '../../../../components/Profile/EditHeader'; 
import {Button } from 'react-native-elements'; 
import {
    responsiveHeight,
    responsiveWidth,
    responsiveScreenFontSize
  } from "react-native-responsive-dimensions";
  import {UpdateProfileApi } from '../../../../services/api';

const EditWorkScreen = ({  ...props })  => {  

    const [worktitle_text,setWorktitle_text] =useState(props.location.state.ProfileData.worktitle_text)
    const [worktitle_address,setWorktitle_address] =useState(props.location.state.ProfileData.worktitle_address)



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
        if (worktitle_text.length>0 && worktitle_address.length>0){
            let bodyFormData = new FormData();  
            bodyFormData.append('access_token',global.AccesToken),
            bodyFormData.append('worktitle_text',worktitle_text);   
            bodyFormData.append('worktitle_address', worktitle_address);   
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
        <View style={{ flex: 1 ,backgroundColor:'#2d2d2d' }} > 

            <EditHeader
                title={'Change Your Work'}
                _updateProfile={_updateProfile}
                showSaveBtn = {true}
            /> 

            <View style={{  paddingRight : 20,paddingBottom:20,paddingLeft:20 ,backgroundColor:'#fff',height:'100%' }}>  

                <Label style={{color: theme.colors.surface,paddingLeft: 4, opacity: 0.8,marginBottom:responsiveHeight(1.8),fontSize:responsiveScreenFontSize(2),fontFamily:'EBGaramond-Regular'}}>Job Title</Label>

                <TextInput
                        style={{   borderColor: 'gray',backgroundColor:'#efefef'  ,marginBottom : 25  ,marginLeft : 10,marginRight : 10, padding : 15, borderRadius:10,height:responsiveHeight(6),borderBottomColor:theme.colors.surface,borderBottomWidth:1,fontFamily:'EBGaramond-Medium'}}
                        onChangeText={(worktitle_text) =>  setWorktitle_text(worktitle_text.replace(/[^0-9a-zA-Z ]/gi, ''))}
                        value={worktitle_text}
                        defaultValue={worktitle_text }
                />
                 <Label style={{color: theme.colors.surface,paddingLeft: 4, opacity: 0.8,marginBottom:responsiveHeight(1.8),fontSize:responsiveScreenFontSize(2),fontFamily:'EBGaramond-Regular'}}>Company Name</Label>

                <TextInput
                    style={{   borderColor: 'gray',backgroundColor:'#efefef'  ,marginBottom : 25  ,marginLeft : 10,marginRight : 10, padding : 15, borderRadius:10,height:responsiveHeight(6),borderBottomColor:theme.colors.surface,borderBottomWidth:1,fontFamily:'EBGaramond-Medium'}}
                    onChangeText={(worktitle_address) =>  setWorktitle_address(worktitle_address.replace(/[^0-9a-zA-Z ]/gi, ''))}
                    value={worktitle_address}
                    defaultValue={worktitle_address }
                />

                
            </View>
        </View>
    );  
}

export default EditWorkScreen;