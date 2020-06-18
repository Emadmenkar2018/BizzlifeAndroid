import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,ToastAndroid, ActivityIndicator ,TextInput,Alert ,Platform} from 'react-native'; 
import Header from '../../../components/Login/Header';  
import { theme } from '../../../utils/theme'; 
import { RegisterProfileApi } from '../../../services/api';
import {  responsiveHeight,  responsiveWidth, } from "react-native-responsive-dimensions";
import { Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

const RegisterScreen = ({ history }) => {
    const [username, setUsername] = useState({ value: '', error: '' });
    const [firstname, setFirstName] = useState({ value: '', error: '' });
    const [lastname, setLastName] = useState({ value: '', error: '' });
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
   
    const [showIndicator , setShowIndicator] = useState(false) ; 
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

     const  registercheck = ( ) => { 
        if (username.value && firstname.value && lastname.value && email.value  && password.value ){ 
            if(username.value.length < 5  ||  username.value.length > 32){  
              if (Platform.OS === 'android') {
                ToastAndroid.show('username Is Not Valid', ToastAndroid.SHORT)
              } else {
                Alert.alert('username Is Not Valid');
              } 
            }
            else if (password.value.length < 6){
              if (Platform.OS === 'android') {
                ToastAndroid.show('Password is too short', ToastAndroid.SHORT)
              } else {
                Alert.alert('Password is too short');
              } 
            }
            else if (!re.test(email.value)){
              if (Platform.OS === 'android') {
                ToastAndroid.show('Email  is not valid', ToastAndroid.SHORT)
              } else {
                Alert.alert('Email  is not valid');
              } 
            }
            else{
              setShowIndicator(true)
              let bodyFormData = new FormData(); 
              bodyFormData.append('username',username.value)
              bodyFormData.append('first_name',firstname.value)
              bodyFormData.append('last_name',lastname.value)
              bodyFormData.append('email',email.value)
              bodyFormData.append('mobile_device_id','sdfgbsdbsdgv sdvgdvsdvsdbsbsdbsdb')
              bodyFormData.append('password',password.value); 
              RegisterProfileApi(bodyFormData).then(response => {   
                global.AccesToken = response.data.access_token; 
                global.is_pro = response.data.user_info.is_pro
                global.user_id = response.data.user_id;   
                global.avater = response.data.user_info.avater; 
                history.push('/Main')
                setShowIndicator(false)
              }).catch(err => { 
                setShowIndicator(false)
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
       
    <View style={{flex :1,justifyContent:'center'}}>
      <ScrollView style={{flex :1,width :'100%'   ,backgroundColor: theme.colors.surface,padding :20}}>

            <Header>
              Create Account
            </Header>
             
            <TextInput
              style={styles.textInput} 
              label="UserName"
              returnKeyType="next"
              value={username.value}
              onChangeText={text => setUsername({ value: text, error: '' })}
              error={!!username.error}
              errorText={username.error}
              placeholder='Username'
            />

            <TextInput
               style={styles.textInput} 
              label="First Name"
              returnKeyType="next"
              value={firstname.value}
              onChangeText={text => setFirstName({ value: text, error: '' })}
              error={!!firstname.error}
              errorText={firstname.error}
              placeholder='First Name'
            />

            <TextInput
             style={styles.textInput} 
              label="Last Name"
              returnKeyType="next"
              value={lastname.value}
              onChangeText={text => setLastName({ value: text, error: '' })}
              error={!!lastname.error}
              errorText={lastname.error}
              placeholder='Last Name'
            />
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

            <TextInput
              style={styles.textInput} 
              label="Password"
              returnKeyType="done"
              value={password.value}
              onChangeText={text => setPassword({ value: text, error: '' })}
              error={!!password.error}
              errorText={password.error}
              secureTextEntry
              placeholder='Password'
            />
            <ActivityIndicator size="large" color="#ff4d00" animating={showIndicator} />
 
            <Button title = "Register Now" buttonStyle={{alignSelf:'center', width :responsiveWidth(70) ,backgroundColor:"#cacacc",borderRadius:10  ,height:responsiveHeight(5)   }}   titleStyle ={{color:"#222",fontFamily:'EBGaramond-Bold'}} titleStyle ={{color:"#000"}}      onPress ={registercheck} >Register</Button>
            

            <View style={styles.row}>
              <Text style={styles.label}>Already have an account? </Text>
              <TouchableOpacity onPress={() => history.push('/')}>
                <Text style={styles.link}>Login</Text>
              </TouchableOpacity>
            </View>
      </ScrollView>
 
    </View>
  );  
}; 


const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
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
    marginBottom : responsiveHeight(4),
    fontFamily:'EBGaramond-SemiBold'  ,
    marginLeft : 10,
    marginRight : 10,
     padding : 5,
     paddingLeft:15,
     borderRadius:10
  }
});

export default memo(RegisterScreen)