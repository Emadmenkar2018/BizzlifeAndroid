import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, Switch , ToastAndroid ,BackHandler} from 'react-native';  
import '../../../../utils/global.js' 
import { theme } from '../../../../utils/theme.js'; 
import {Label } from 'native-base'; 
import  EditHeader   from '../../../../components/Profile/EditHeader'; 
import {Button } from 'react-native-elements'; 
import {
    responsiveHeight,
    responsiveWidth,
    responsiveScreenFontSize
  } from "react-native-responsive-dimensions";
import {UpdateProfileApi } from '../../../../services/api';
import {Icon } from 'react-native-elements';  


let _ = require('lodash')
 
export default class EditMeetingScreen extends Component {
  constructor(props) {
    super(props);
    let meeting_text = this.props.location.state.ProfileData.meeting_text 
    this.state = {
      profiledata : this.props.location.state.ProfileData.profiledata  ,
       listKeys: [
      {key: 'Dinner',icon : 'local-pizza', switch : meeting_text.includes('Dinner')? true : false},
      {key: 'Walking', icon : 'directions-walk',switch : meeting_text.includes('Walking')? true : false},
      {key: 'Coffee', icon : 'local-cafe',switch : meeting_text.includes('Coffee')? true : false},
      {key: 'VideoCall', icon : 'video-call',switch : meeting_text.includes('VideoCall')? true : false},
      {key: 'VoiceCall', icon : 'record-voice-over',switch : meeting_text.includes('VoiceCall')? true : false},
      {key: 'WeekEnds', icon : 'beach-access',switch : meeting_text.includes('WeekEnds')? true : false},
      {key: 'AfterWork',icon : 'accessibility', switch : meeting_text.includes('AfterWork')? true : false},
      {key: 'BreakFast', icon : 'alarm-on',switch : meeting_text.includes('BreakFast')? true : false},
      {key: 'Lunch',icon : 'local-dining',switch : meeting_text.includes('Lunch')? true : false},
    ],
    first_name: undefined,
    }
  }
 
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


    _updateProfile = () =>{ 
        let meetingText = ""
        let i
        for (i=0 ; this.state.listKeys[i] ; i++){
            if (this.state.listKeys[i].switch){
                meetingText = meetingText + "," + this.state.listKeys[i].key
            }    
        } 
        if (meetingText.startsWith(",")){
            meetingText = meetingText.substring(1, meetingText.length );
        } 

        if (meetingText.length> 0){
          let bodyFormData = new FormData();  
          bodyFormData.append('access_token',global.AccesToken),
          bodyFormData.append('meeting_text',meetingText);      
          UpdateProfileApi(bodyFormData).then(() => {
              ToastAndroid.show('Data Has been Changed!', ToastAndroid.SHORT);  
              this.props.history.goBack()
          })
          .catch(err => { 
              return;
          }); 
        }
        else {
          ToastAndroid.show('Enter Values', ToastAndroid.SHORT); 
        }
    } 

    setSwitchValue = (val, ind) => {
        const tempData = _.cloneDeep(this.state.listKeys);
        tempData[ind].switch = val;
        this.setState({ listKeys: tempData });
    }

    listItem = ({item, index}) => (
        <View style={{flex: 1, flexDirection: 'row' ,alignItems:'center',justifyContent:'flex-start'}}>
          <Icon
            name={item.icon}
            type={'material'}
            size={responsiveWidth(5)}
            color={'#2d2d2d'}
          />
          <Text style={styles.item}>{item.key}</Text>
          
          <Switch 
              style={{marginStart:'auto'}}
              onValueChange={(value) => this.setSwitchValue(value, index)}
              value={item.switch}
          />
        </View>
    );

  render(){
      
    return (
        <View style={{ flex: 1  ,backgroundColor:'#2d2d2d'}} > 
            
            <EditHeader
                _updateProfile={this._updateProfile}
                showSaveBtn = {true}
                title={'Change Meeting Ways'}
            /> 


            <View style={{   paddingRight : 20,paddingBottom:20,paddingLeft:20 ,backgroundColor:'#fff' ,height:'100%' }}> 
                <Label style={{color: theme.colors.surface,paddingLeft: 4, opacity: 0.8,marginBottom:responsiveHeight(1.8),fontSize:responsiveScreenFontSize(2.3),fontFamily:'EBGaramond-Medium'}}>Your Meeting Ways</Label>
                <FlatList
                  data={this.state.listKeys}
                  renderItem={this.listItem}  
                  style={{width:'100%',alignSelf:'flex-start'}}
                /> 
                
            </View>
        </View> 
    ); 
  }
} 
      
styles = StyleSheet.create({
    container: { 
        paddingTop: 22,
        flex: 0.8,
        backgroundColor:'#fff',   
      },
      item: {
        padding: 10,
        fontSize: responsiveScreenFontSize(2),
        color : "#2d2d2d", 
        fontFamily:'EBGaramond-Medium'
      },
       
}) 