import React, {useState, useEffect,Component}  from 'react';
import { Text, StyleSheet , View ,ScrollView ,TextInput , ToastAndroid, BackHandler} from 'react-native';  
import axios from 'axios';   
import '../../../../utils/global.js'
import { theme } from '../../../../utils/theme.js'; 
import {Label } from 'native-base';
import {Icon } from 'react-native-elements'; 
import {StatusBar} from 'react-native'
import  EditHeader   from '../../../../components/Profile/EditHeader'; 
import {Button } from 'react-native-elements'; 
import {
    responsiveHeight,
    responsiveWidth,
    responsiveScreenFontSize
  } from "react-native-responsive-dimensions";
  import {UpdateProfileApi } from '../../../../services/api';


export default class EditBioScreen extends Component { 
    constructor(props) {
        super(props);    
    } 
    state = {
      bio_text : this.props.location.state.ProfileData.bio_text 
    };

    componentDidMount (){ 
      BackHandler.addEventListener("hardwareBackPress", this.backButtonHandler);
      
    } 

    componentWillUnmount() {
      BackHandler.removeEventListener("hardwareBackPress", this.backButtonHandler);
    }

    backButtonHandler = () => {
      this.props.history.goBack();
      return true;
    } 

    _updateProfile = () => {
      if(this.state.bio_text.length>0){
        let bodyFormData = new FormData();  
        bodyFormData.append('access_token',global.AccesToken),
        bodyFormData.append('bio_text',this.state.bio_text);      
        UpdateProfileApi(bodyFormData).then(() => {
            ToastAndroid.show('Data Has been Changed!', ToastAndroid.SHORT);  
            this.props.history.goBack()
        })
        .catch(err => { 
            return;
        }); 
      }
      else{
        ToastAndroid.show('Enter Values', ToastAndroid.SHORT); 
      }
    }

  render() {    
      return (
        <View style={{ flex: 1 ,backgroundColor:'#2d2d2d' }} > 

            <EditHeader 
              _updateProfile={this._updateProfile}
              showSaveBtn = {true}
              title={'Change Your Bio'}
            /> 

            <View style={{height:'100%',backgroundColor:'#fff',justifyContent:'flex-start',paddingRight : 20,paddingLeft:20 ,alignItems:'center' }}>
                <View style={{    backgroundColor:'#fff' ,width:'100%'}}> 
                    {/* <Text  style={{marginStart : 10,fontSize :responsiveScreenFontSize(3.5), fontWeight:'bold', color : '#000',marginBottom :15} } >Change Your Bio </Text> */}
                    <Label style={{color: theme.colors.surface,paddingLeft: 4, opacity: 0.8,marginBottom:responsiveHeight(1.8),fontSize:responsiveScreenFontSize(2)}}>Your Bio :</Label>
                    <TextInput
                        style={{  borderColor: 'gray',backgroundColor:'#efefef'  ,marginBottom : 25  ,marginLeft : 10,marginRight : 10, padding : 15, borderRadius:10,height:responsiveHeight(6),borderBottomColor:theme.colors.surface,borderBottomWidth:1}} 
                        onChangeText={(bio_text) =>  this.setState({  
                           bio_text: bio_text.replace(/[^0-9a-z ]/gi, '')
                           }) }
                        value={this.state.bio_text}
                        defaultValue={this.state.bio_text }
                    /> 
                    
                </View> 
            </View>

        </View> ); 
     
  }  
}