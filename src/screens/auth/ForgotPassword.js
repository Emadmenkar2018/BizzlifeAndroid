import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,ToastAndroid, ActivityIndicator ,TextInput,Alert,Platform} from 'react-native'; 
import Header from '../../../components/Login/Header';  
import { theme } from '../../../utils/theme'; 
import { ResetPasswordApi } from '../../../services/api';
import {  responsiveHeight,  responsiveWidth, } from "react-native-responsive-dimensions";
import { Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

const ForgotPassword = ({ history }) => {
    const [email, setEmail] = useState({ value: '', error: '' }); 
   
    const [showIndicator , setShowIndicator] = useState(false) ; 
  
     const  resetCheck = ( ) => { 
        if (email.value){ 
            if(email.value.length < 5  ||  email.value.length > 32){  
              if (Platform.OS === 'android') {
                ToastAndroid.show('Email Is Not Valid', ToastAndroid.SHORT)
              } else {
                Alert.alert('Email Is Not Valid');
              } 
            }
            else{
              setShowIndicator(true)
              let bodyFormData = new FormData();  
              bodyFormData.append('email',email.value)  
              ResetPasswordApi(bodyFormData).then(response => {    
                history.push('/')
                setShowIndicator(false)
                if (Platform.OS === 'android') {
                    ToastAndroid.show('Sent Reset Email Successfully', ToastAndroid.SHORT)
                } else {
                    Alert.alert('Sent Reset Email Successfully');
                } 
              }).catch(err => { 
                if (Platform.OS === 'android') {
                    ToastAndroid.show('Cant Send Reset Email', ToastAndroid.SHORT)
                } else {
                    Alert.alert('Cant Send Reset Email');
                } 
                  return;
                })
              }  
        }
        else 
        { 
          if (Platform.OS === 'android') {
            ToastAndroid.show('New Error Missing Values', ToastAndroid.SHORT)
          } else {
            Alert.alert('New Error Missing Values');
          } 
        }
      } 
 

  return ( 
       
    <View style={{flex :1,justifyContent:'center',justifyContent:'center',alignItems:'center',alignContent:'center' ,height:'100%'  ,backgroundColor: theme.colors.surface}}>
      {/* <ScrollView style={{flex :1,width :'100%'  ,backgroundColor: theme.colors.surface,padding :20}}> */}

            <Header>
              Reset Your Password
            </Header>
              
            <TextInput
              style={styles.textInput} 
              label="Email"
              returnKeyType="next"
              value={email.value}
              onChangeText={text => setEmail({ value: text, error: '' })}
              error={!!email.error}
              errorText={email.error}
              autoCapitalize="none"
              autoCompleteType="email"
              textContentType="emailAddress"
              keyboardType="email-address"
              placeholder='Email'
            />
 
            <ActivityIndicator size="large" color="#ff4d00" animating={showIndicator} />
 
            <Button title = "Reset Now" buttonStyle={{alignSelf:'center', width :responsiveWidth(70) ,backgroundColor:"transparent",borderRadius:10  ,height:responsiveHeight(5)   }}   titleStyle ={{ color:theme.colors.primary ,  fontFamily:'EBGaramond-Bold'}}       onPress ={resetCheck} >Register</Button>
            
            <TouchableOpacity onPress={() =>  history.push('/')} style={styles.forgotPassword}    >
                <Text style={styles.label}>Back To Login?</Text>
            </TouchableOpacity> 
 
      {/* </ScrollView> */}
 
    </View>
  );  
}; 


const styles = StyleSheet.create({
    forgotPassword: {   
      
      marginTop: 4
    },
  label: {
    marginTop: responsiveHeight(2), 
    color: theme.colors.secondary, 
    alignSelf:'center' ,  
    fontFamily:'EBGaramond-Bold'
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
    alignSelf:'center'
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  textInput:{
    alignSelf:'center',
    width:responsiveWidth(70),
     height: responsiveHeight(5),
      borderColor: 'gray',
      backgroundColor:'#cacacc'  ,
    marginBottom : responsiveHeight(2),
    fontFamily:'EBGaramond-SemiBold'  ,
    marginLeft : 10,
    marginRight : 10,
     padding : 5,
     paddingLeft:15,
     borderRadius:10
  }
});

export default memo(ForgotPassword)