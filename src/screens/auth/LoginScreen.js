import React, { memo, useState ,useEffect } from 'react';
import {  TextInput, TouchableOpacity, ActivityIndicator,StyleSheet, Text, View,ToastAndroid ,Platform ,Alert} from 'react-native'; 
import Background from '../../../components/Login/Background';
import Logo from '../../../components/Login/Logo'; 
import { theme } from '../../../utils/theme'; 
import { Button } from 'react-native-elements';  
import {LoginProfileApi , } from '../../../services/api'
import {
  responsiveHeight,
  responsiveWidth,
  responsiveScreenFontSize
} from "react-native-responsive-dimensions";
import SplashScreen from 'react-native-splash-screen' 

const LoginScreen = ( { history, ...props} ) => {
    const [UserName, setUserName] = useState('');
    const [password, setPassword] = useState('');   
    const [showIndicator , setShowIndicator] = useState(false) ; 
   

    useEffect(() => {
      
      SplashScreen.hide();
      if (global.AccesToken.length> 1 ){
        history.push('/Main')
      }

      return ()=>{
        SplashScreen.hide(); 

      }
    }, []);

    logincheck = ( ) => {  
      if (UserName.length > 0 && password.length > 0 ){
        let bodyFormData = new FormData(); 
        setShowIndicator(true)  
        bodyFormData.append('username',UserName)
        bodyFormData.append('password',password) 
        bodyFormData.append('platform','mobile')
        bodyFormData.append('device_id','sdfgbsdbsdgv sdvgdvsdvsdbsbsdbsdb') ;
        LoginProfileApi(bodyFormData).then(response =>{   
            global.AccesToken = response.data.access_token; 
            global.is_pro = response.data.user_info.is_pro
            global.user_id = response.data.user_id;   
            global.avater = response.data.avater;   
            setShowIndicator(false) 
            history.push('/Main') 
          }) 
          .catch(err => { 
            if (Platform.OS === 'android') {
              ToastAndroid.show(err.message, ToastAndroid.SHORT)
            } else {
              Alert.alert(err.message);
            } 
            setShowIndicator(false) 
            return;
          });
      }
      else { 
        if (Platform.OS === 'android') {
          ToastAndroid.show('Missing Values', ToastAndroid.SHORT)
        } else {
          Alert.alert('Missing Values');
        } 
      }
    }  
       
    return (
      <Background>  
 
        <Logo/> 


        <TextInput
            style={{ width:responsiveWidth(70),   height: responsiveHeight(5), borderColor: 'gray',backgroundColor:'#cacacc'  ,marginBottom : responsiveHeight(3) ,fontFamily:'EBGaramond-SemiBold' ,marginLeft : 10,marginRight : 10, padding : 5,paddingLeft:15,borderRadius:10}} 
            value={UserName}
            onChangeText={UserName =>setUserName(UserName) }
            placeholder='UserName'
        /> 

        <TextInput
            style={{ width:responsiveWidth(70), height: responsiveHeight(5), borderColor: 'gray',backgroundColor:'#cacacc'  ,marginBottom : responsiveHeight(4),fontFamily:'EBGaramond-SemiBold'  ,marginLeft : 10,marginRight : 10, padding : 5,paddingLeft:15,borderRadius:10}} 
            value={password}
            onChangeText={password =>setPassword(password) }
            placeholder='Password'
            secureTextEntry={true}
            password={true}
        /> 
 
        <TouchableOpacity onPress={() =>  history.push('/Forgot')} style={styles.forgotPassword}    >
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity> 
              
        <ActivityIndicator size="large" color="#ff4d00" animating={showIndicator} /> 
  
        <View style={styles.row}>
          <Text style={styles.label2}>Don’t have an account? </Text>
          <TouchableOpacity onPress={() =>  history.push('/Register')}>
            <Text style={styles.link}>Sign up</Text>
          </TouchableOpacity>
        </View>

 
            <Button title = "Login"   buttonStyle={{width :responsiveWidth(70) ,backgroundColor:"#cacacc",borderRadius:10  ,height:responsiveHeight(5)   }}   titleStyle ={{color:"#222",fontFamily:'EBGaramond-Bold'}}     onPress ={ logincheck }  >Start Now</Button>
        
 
      </Background>
    );
  };

  // 
  
  const styles = StyleSheet.create({
    forgotPassword: {  
      width:responsiveWidth(70),
      marginBottom: responsiveHeight(4), 
      marginTop: 4, 
    },
    label: {
      color: theme.colors.secondary,  
      alignSelf:'flex-end' ,
      fontFamily:'EBGaramond-Bold'
    },
    row: {
      flexDirection: 'row',
      marginTop: 4,
      marginBottom:responsiveHeight(3)
    },
    label2:{
      color: theme.colors.secondary,
      fontFamily:'EBGaramond-SemiBold'
    },
    link: {
      // fontWeight: 'bold',
      color: theme.colors.primary,
      fontFamily:'EBGaramond-Bold'
    },
  });
  
  export default memo(LoginScreen);