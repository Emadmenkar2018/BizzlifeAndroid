// import {SettingsDividerShort,  SettingsEditText, SettingsCategoryHeader, SettingsSwitch, SettingsPicker} from 'react-native-settings-components';
import React, { Component } from 'react';
import {  StyleSheet ,ScrollView, View ,Text, Image, BackHandler ,ToastAndroid} from 'react-native' 
import ReactNativeSettingsPage, { 
	SectionRow, 
    NavigateRow,
    SwitchRow, 
} from 'react-native-settings-page';
import { theme } from '../../../utils/theme.js';  
import {DeviceEventEmitter} from 'react-native'
import '../../../utils/global.js';
import {UpdateProfileApi ,ChangePasswordApi ,LogOutApi,DeleteAccountApi} from '../../../services/api';
import {MaterialDialog  } from 'react-native-material-dialog';
import { Button,Icon } from 'react-native-elements'; 
import EditHeader from '../../../components/Profile/EditHeader'
import {
    responsiveHeight,
    responsiveWidth,
    responsiveScreenFontSize
  } from "react-native-responsive-dimensions";

class SettingsScreen extends Component {

    constructor(props) {
        super(props); 
    }
    state = {
        username: '',
        email: '',
        allowPushNotifications: false,
        emailnotifications: true,
        monthlynewsletter: true,
        emailcheck: false,
        newslettercheck: false,
        switch: false,
        value: 40,
        gender: '',
        loggoutVisible : false,
        deleteVisible : false
    }; 


    componentDidMount() { 
        BackHandler.addEventListener("hardwareBackPress", this.backButtonHandler);
        
      }
  
      componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backButtonHandler);
      }
  
    backButtonHandler = () => {
        this.props.history.goBack();
        return true;
      } 


    _logout = ()=>{
        this.setState({ loggoutVisible: true }) 
    } 

    _Delete = ()=>{
        this.setState({ deleteVisible: true }) 
    } 


    _navigateToFaqScreen = () =>{
        this.props.history.push( '/Main/Profile/Settings/Faq')  
    }

    _navigateToContactScreen = () =>{
        this.props.history.push( '/Main/Profile/Settings/ContactUs')  
    }
  
    _LogoutApi = () =>{
        const { navigation } = this.props 
        LogOutApi().then(() => {
            ToastAndroid.show('Logged Out Successfully!', ToastAndroid.SHORT); 
            global.AccesToken=""
            global.is_pro=0
            global.user_id=""
            global.avater=""
            global.totalSwipes= 6
            global.UserSwipes= 0
            global.userSuperMatch =0
            BackHandler.exitApp();
            // navigation.navigate('LoginScreen')
        })
        .catch(err => {
            
            return;
        }); 
    } 

    _DeleteNavigation= ()=>{ 
        // navigation.navigate('deleteAccountScreen'); 
    }
    

    _navigateToPasswordScreen = () => { 
        this.props.history.push({pathname : '/Main/Profile/Settings/Password',
        state: { 
            onupdatewebsite : this._updatepasswordProfile
         }
        })     
    } 
 
    _updatepasswordProfile = (c_pass,n_pass,cn_pass)=>{ 
        let bodyFormData = new FormData();  
        bodyFormData.append('access_token',global.AccesToken),
        bodyFormData.append('c_pass', c_pass);   
        bodyFormData.append('n_pass', n_pass);  
        bodyFormData.append('cn_pass', cn_pass);    
        ChangePasswordApi(bodyFormData).then(() => {
          ToastAndroid.show('Password Has been Changed!', ToastAndroid.SHORT); 
          this.props.history.goBack()
        //   this.setState({ProfileData: profiledata}) 
        })
        .catch(err => {
          
          return;
        }); 
     } 
      
    
  render()  {
    
      return( 
        <View style={{ flex: 1 ,backgroundColor:'#2d2d2d' }} > 
 
            <EditHeader
                _updateProfile={this.props.history.goBack}
                showSaveBtn = {true}
            />  
 
        <ScrollView style={{ paddingRight : 20,paddingBottom:20,paddingLeft:20 ,backgroundColor:'#fff' ,height:'100%' }}> 
            <SectionRow style={{color: theme.colors.myBackground}} text='Notification'  textStyle={{color: theme.colors.myBackground}}>
                    <SwitchRow 
                    text='Enable Email Notifications'
                    textStyle={{ fontFamily :'EBGaramond-Medium',color:'#efefef'}} 
                    iconName='bell'
                    _color='#000'
                    _value={this.state.emailcheck}
                    _onValueChange={() => { this.setState({ emailcheck: !this.state.emailcheck }) }} />
                    <SwitchRow 
                    text='Recieve Monthly Newsletter'
                    textStyle={{ fontFamily :'EBGaramond-Medium'}}
                    iconName='envelope-open'
                    _color='#000'
                    _value={this.state.newslettercheck}
                    _onValueChange={() => { this.setState({ newslettercheck: !this.state.newslettercheck }) }} />
                </SectionRow>
                <SectionRow style={{color: theme.colors.myBackground}} text='Account'  textStyle={{color: theme.colors.myBackground}}>
                    <NavigateRow
                        text='Change Password'
                        iconName='lock'
                        textStyle={{ fontFamily :'EBGaramond-Medium'}} 
                        onPressCallback={this._navigateToPasswordScreen} />
                    <NavigateRow
                        text='FAQ'
                        iconName='question'
                        textStyle={{ fontFamily :'EBGaramond-Medium'}} 
                        onPressCallback={this._navigateToFaqScreen} /> 
                    <NavigateRow 
                        text='Contact US' 
                        iconName='phone'
                        textStyle={{ fontFamily :'EBGaramond-Medium'}} 
                        _value={this.state.switch}
                        onPressCallback={ this._navigateToContactScreen} />
                </SectionRow>
                <SectionRow style={{color: theme.colors.myBackground}} text='Account'  textStyle={{color: theme.colors.myBackground}}> 
                    {/* <NavigateRow
                        text='Delete Account'
                        iconName='trash'
                        textStyle={{ fontFamily :'EBGaramond-Medium'}} 
                        onPressCallback={this._Delete} /> */}
                    <NavigateRow
                        text='Logout'
                        iconName='sign-out'
                        textStyle={{ fontFamily :'EBGaramond-Medium'}} 
                        onPressCallback={this._logout} />
                </SectionRow>
               
                {/* <MaterialDialog
                    title="Deleting ?"
                    visible={this.state.deleteVisible}
                    onOk={() => {
                    this._DeleteNavigation()
                    this.setState({ deleteVisible: false })}
                    } 
                    onCancel={() => this.setState({ deleteVisible: false })}>
                    <Text style={styles.dialogText}>
                    Are You Sure? DELETING YOURSELF WHY!
                    </Text>
                </MaterialDialog> */}

                <MaterialDialog
                    title="Loging Out?"
                    visible={this.state.loggoutVisible}
                    onOk={() => {
                    this._LogoutApi()
                    this.setState({ loggoutVisible: false })}
                    } 
                    onCancel={() => this.setState({ loggoutVisible: false })}>
                    <Text style={styles.dialogText}>
                    Are You Sure? Log out Why !
                    </Text>
                </MaterialDialog>
        </ScrollView> 
      </View > )

    
  } 
}

export default SettingsScreen