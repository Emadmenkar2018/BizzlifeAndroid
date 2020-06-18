import React, {useState, useEffect,Component}  from 'react';
import { Text, StyleSheet , View ,ScrollView ,TextInput ,Button ,ToastAndroid, TouchableOpacity} from 'react-native';  
import axios from 'axios';  
import '../../../utils/global.js'
import { theme } from '../../../utils/theme.js'; 
import {Label } from 'native-base';
import {Icon } from 'react-native-elements'; 
import EditHeader from '../../../components/Profile/EditHeader'
import {
    responsiveHeight,
    responsiveWidth,
    responsiveScreenFontSize
  } from "react-native-responsive-dimensions";
 
export default class ChangepasswordScreen extends Component { 
    constructor(props) {
        super(props);    
    } 
    state = { 
        current : '',
        newpassword :'',
        repassword :''
    };
 
    fetchdata =()=>{

    }
    _check = ()=>{ 
        if (this.state.current && this.state.newpassword && this.state.repassword ){
            if (this.state.newpassword == this.state.repassword){ 
                this.props.location.state.onupdatewebsite(this.state.current , this.state.newpassword  , this.state.repassword )
            }
            else{
                ToastAndroid.show('Passwords are not matched', ToastAndroid.SHORT);
            }
        } 
    }
    render() {     
        return (
            <View style={{ flex: 1 ,backgroundColor:'#2d2d2d' }} > 

               <EditHeader
                _updateProfile={this._check}
                showSaveBtn = {true}
                title={'Change Your Password'}

                />  
 
                <View style={{  paddingRight : 20,paddingBottom:20,paddingLeft:20 ,backgroundColor:'#fff',height:'100%' }}>  
                    <Label style={{color: theme.colors.surface,paddingLeft: 4, opacity: 0.8,marginBottom:responsiveHeight(1.8),fontSize:responsiveScreenFontSize(2),fontFamily:'EBGaramond-Regular'}}>Your Current Password</Label>
                    <TextInput
                        style={{  borderColor: 'gray',backgroundColor:'#efefef'  ,marginBottom : 25  ,marginLeft : 10,marginRight : 10, padding : 15, borderRadius:10,height:responsiveHeight(6),borderBottomColor:theme.colors.surface,borderBottomWidth:1,fontFamily:'EBGaramond-Medium'}} 
                        onChangeText={(current) => {
                            this.setState({
                                current : current
                            }) 
                        }}
                        value={this.state.current}
                        defaultValue={this.state.current }
                    /> 
                    <Label style={{color: theme.colors.surface,paddingLeft: 4, opacity: 0.8,marginBottom:responsiveHeight(1.8),fontSize:responsiveScreenFontSize(2),fontFamily:'EBGaramond-Regular'}}>Your New Password</Label>
                    <TextInput
                        style={{  borderColor: 'gray',backgroundColor:'#efefef'  ,marginBottom : 25  ,marginLeft : 10,marginRight : 10, padding : 15, borderRadius:10,height:responsiveHeight(6),borderBottomColor:theme.colors.surface,borderBottomWidth:1,fontFamily:'EBGaramond-Medium'}} 
                        onChangeText={(newpassword) => {
                            this.setState({ 
                                newpassword : newpassword 
                            }) 
                        }}
                        value={this.state.newpassword}
                        defaultValue={this.state.newpassword }
                    /> 
                    <Label style={{color: theme.colors.surface,paddingLeft: 4, opacity: 0.8,marginBottom:responsiveHeight(1.8),fontSize:responsiveScreenFontSize(2),fontFamily:'EBGaramond-Regular'}}>Rewrite New Password</Label>
                    <TextInput
                        style={{  borderColor: 'gray',backgroundColor:'#efefef'  ,marginBottom : 25  ,marginLeft : 10,marginRight : 10, padding : 15, borderRadius:10,height:responsiveHeight(6),borderBottomColor:theme.colors.surface,borderBottomWidth:1,fontFamily:'EBGaramond-Medium'}} 
                        onChangeText={(repassword) => {
                            this.setState({ 
                                repassword : repassword 
                            }) 
                        }}
                        value={this.state.repassword}
                        defaultValue={this.state.repassword }
                    />  
            </View>
            </View> 
        );
    }  
}