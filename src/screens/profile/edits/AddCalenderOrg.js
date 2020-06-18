import React, {useState, useEffect,Component}  from 'react';
import { Text, StyleSheet , View ,ScrollView ,TextInput ,BackHandler ,ToastAndroid ,KeyboardAvoidingView} from 'react-native';  
import axios from 'axios';  
import {AddOrganizationApi} from '../../../../services/api'; 
import {    Item, Input , DatePicker } from 'native-base';  
import '../../../../utils/global.js' 
import { theme } from '../../../../utils/theme.js'; 
import {Label } from 'native-base';
import {Icon } from 'react-native-elements';
import {StatusBar} from 'react-native'
 import EditHeader from '../../../../components/Profile/EditHeader'
 import {
    responsiveHeight,
    responsiveWidth,
    responsiveScreenFontSize
  } from "react-native-responsive-dimensions";

export default class AddCalenderOrg extends Component { 
    constructor(props) {
        super(props);   
    } 
    state = {
        date : undefined,
        title: undefined,
        organization_name : undefined,
        from_tarih : undefined,
        till_tarih : undefined,
        date : undefined
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

    _savingBtn = ()=>{   
        if (this.state.organization_name && this.state.title && this.state.from_tarih  && this.state.till_tarih ){ 
            let TarihString =String(String(this.state.from_tarih).split('T')).split(' ') 
            let finalBegin =TarihString[1] + ' '+ TarihString[2] +' '+ TarihString[3] 

            let EndString =String(String(this.state.till_tarih).split('T')).split(' ') 
            let finalEnd =EndString[1] + ' '+ EndString[2] +' '+ EndString[3]

            let bodyFormData = new FormData();    
                bodyFormData.append('access_token',global.AccesToken),
                bodyFormData.append('org_title', this.state.title); 
                bodyFormData.append('org_name', this.state.organization_name );   
                bodyFormData.append('from_date', finalBegin);   
                bodyFormData.append('till_date', finalEnd);  
                AddOrganizationApi(bodyFormData).then((response) => {  
                    ToastAndroid.show('Organization Has been Added!', ToastAndroid.SHORT);    
                    this.props.history.goBack() 

                }).catch((err) => { 
                    return;
                });      
 
        }
        else {
            ToastAndroid.show('Please Enter The Missing Data', ToastAndroid.SHORT);
        }
    }
 
    render() {    
        return (
            <View style={{ flex: 1 ,backgroundColor:'#2d2d2d' }} >  
               
                <EditHeader
                    _updateProfile={this._savingBtn}
                    showSaveBtn = {true}
                />  
 

                 <ScrollView style={{ height:'100%'   ,backgroundColor:'#fff',paddingHorizontal:10 }}> 
                    
                    <View style={{  paddingRight : 20,paddingBottom:20,paddingLeft:20 ,backgroundColor:'#fff' }}> 
                
                        <Text  style={{marginStart : 10,fontSize :responsiveScreenFontSize(2.5), fontWeight:'bold', color : '#000',marginBottom :15} } >Add An Organization</Text>
                         <Label style={{color: theme.colors.surface,paddingLeft: 4, opacity: 0.8,fontSize:responsiveScreenFontSize(1.7)}}>Your Title</Label> 
                        <Input
                            style={{   borderColor: '#999', borderBottomColor: '#999', borderBottomWidth: 1 ,margin : 10 , padding : 5,fontSize:responsiveScreenFontSize(1.5) }} 
                            onChangeText={(title) => {
                                this.setState({title});  
                            }}
                            value={this.state.title} 
                            placeholder = "Your Title"
                        />
                        <Label style={{color: theme.colors.surface,paddingLeft: 4, opacity: 0.8,fontSize:responsiveScreenFontSize(1.7)}}>Organization Name</Label> 
                        <Input
                            style={{   borderColor: '#999', borderBottomColor: '#999', borderBottomWidth: 1 ,margin : 10 , padding : 5,fontSize:responsiveScreenFontSize(1.5) }} 
                            placeholder = "Your Organization Name"
                            onChangeText={(organization_name) => {
                                this.setState({organization_name});  
                            }}
                            value={this.state.organization_name} 
                        />

                        <Label style={{color: theme.colors.surface,paddingLeft: 4, opacity: 0.8,fontSize:responsiveScreenFontSize(1.7)}}>From Date</Label> 

                       <Item style={{borderBottomColor:'#999' , borderBottomWidth:1 , padding : 5,marginTop : 2 ,marginHorizontal : 10,marginBottom:10}}>
                            <DatePicker
                                defaultDate={new Date()}
                                minimumDate={new Date(1990, 12, 31)}
                                maximumDate={new Date()}
                                locale={"en"} 
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={"fade"}
                                androidMode={"spinner"}
                                placeHolderText="Press To Select"
                                placeholderTextColor={'#3A4155'}
                                textStyle={{ color: "green",fontFamily:'EBGaramond-SemiBold',fontSize:responsiveScreenFontSize(1.5) }}
                                placeHolderTextStyle={{ color: "#d3d3d3" ,fontSize:responsiveScreenFontSize(1.5) }}
                                onDateChange={(date) => this.setState( { from_tarih: date} )}
                                disabled={false}
                            />  
                       </Item>
                       
                       <Label style={{color: theme.colors.surface,paddingLeft: 4, opacity: 0.8,fontSize:responsiveScreenFontSize(1.7)}}>Until Date</Label> 

                       <Item style={{borderBottomColor:'#999' , borderBottomWidth:1 , padding : 5,marginTop : 2 ,marginHorizontal : 10}}>
                            <DatePicker
                                defaultDate={new Date()}
                                minimumDate={new Date(1990, 12, 31)}
                                maximumDate={new Date()}
                                locale={"en"} 
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={"fade"}
                                androidMode={"spinner"}
                                placeHolderText="Press To Select"
                                placeholderTextColor={'#3A4155'}
                                textStyle={{ color: "green",fontFamily:'EBGaramond-SemiBold',fontSize:responsiveScreenFontSize(1.5) }}
                                placeHolderTextStyle={{ color: "#d3d3d3",fontSize:responsiveScreenFontSize(1.5)  }}
                                onDateChange={(date) => this.setState( { till_tarih: date} )}
                                disabled={false}
                            />  
                       </Item>
                           
                        </View>  
                </ScrollView>  


                {/* <GradientButton
                style={{ marginVertical: 8 , marginTop:'auto'}}
                textStyle={{ fontSize: 16 }}
                gradientBegin={theme.colors.surface}
                gradientEnd={theme.colors.surface}
                gradientDirection="diagonal"
                height={60}
                width={'95%'}
                radius={25}
                impact
                impactStyle='Light'
                onPressAction={this._savingBtn}  
                >
                    Save
               </GradientButton> */} 
            </View> 
        );
    }  
}