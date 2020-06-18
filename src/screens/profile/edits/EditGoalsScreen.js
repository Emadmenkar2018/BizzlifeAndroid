import React, {useState,  useRef , useEffect,Component}  from 'react';
import { Text, StyleSheet , View ,ScrollView ,TextInput ,BackHandler ,ToastAndroid, TouchableOpacity} from 'react-native';  
import axios from 'axios';  
import '../../../../utils/global.js'
import SelectableChips from 'react-native-chip/SelectableChips';  
import {interests} from '../../../../constants/arrays'
import { theme } from '../../../../utils/theme.js'; 
import {Label } from 'native-base'; 
import {
    responsiveHeight,
    responsiveWidth,
    responsiveScreenFontSize
  } from "react-native-responsive-dimensions";
import {UpdateProfileApi } from '../../../../services/api';
import { useHistory } from 'react-router-native';
import  EditHeader   from '../../../../components/Profile/EditHeader';


export default class EditGoalsScreen extends Component { 
    // constructor(props) {
    //     super(props);    
        
    // } 
     refFav1 = React.createRef();
    goals_text = this.props.location.state.ProfileData.goals_text
    state = {
        profiledata : this.props.location.state.ProfileData , 
        list : [
            {key : "Hire Employees",value : false},
            {key :"Find New job", value : false},
            {key :"Find CoFounders",value : false},
            {key :"Hire Freelancers", value : false},
            {key :  "Find Freelance Gigs",value : false},
            {key :"Find Investors",value : false},
            {key : "Grow My Business",value : false},
            {key :  "Invest In Projects",value : false},
            {key :  "Find mentor", value : false},
            {key :  "Mentor Others",value : false},
            {key :  "Explore Career Change",value : false},
            {key : "Find Get Inspired",value : false},
            {key :"Make New Friends",value : false} 
           ] ,
           initList:[]
    };
  
    componentDidMount (){
      // let array = this.state.list.map(x => x.key); 
      this.getData()
      BackHandler.addEventListener("hardwareBackPress", this.backButtonHandler);
      
    } 
  
      componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backButtonHandler);
      }
  
    backButtonHandler = () => {
        this.props.history.goBack();
        return true;
      } 

  
    getData = () => {  
        if (this.state.profiledata.goals_text.length >0){
            let newList = this.state.profiledata.goals_text.split(',') 
            let i 
              if (newList){
                for (i =0 ; i <newList.length ;i++){
                  this.state.initList.push(newList[i])
                }
              } 
              this.refFav1.current.state.selectedChips = [...this.state.initList]
              this.refFav1.current.selectChip(this.refFav1.current.state.selectedChips)  
        }
    //   let newList = this.state.profiledata.goals_text.toString();
    //   let i 
    //   if (newList){
    //     for (i =0 ; i <newList.length ;i++){
    //       this.state.initList.push(newList[i])
    //     }
    //   } 
    //   this.refFav1.current.state.selectedChips = [...this.state.initList]
    //   this.refFav1.current.selectChip(this.refFav1.current.state.selectedChips)  
    };
    
  
    _updateProfile = () => {  
        let final =""
        let selected = this.refFav1.current.state.selectedChips
        let i 
        for (i =0 ;i < this.refFav1.current.state.selectedChips.length ; i++){
            if (!Array.isArray(selected[i])){
                final=final + ","+selected[i]
            }
        }
        if (final.startsWith(",")){
            final = final.substring(1, final.length);
        }
        if (final.length > 0) {
            let bodyFormData = new FormData();  
            bodyFormData.append('access_token',global.AccesToken),
            bodyFormData.append('goals_text',final);      
            UpdateProfileApi(bodyFormData).then(() => {
                ToastAndroid.show('Data Has been Changed!', ToastAndroid.SHORT);  
                this.props.history.goBack()
            })
            .catch(err => { 
                return;
            }); 
        }

    };

    render() {  
 
        return (
            <View style={{ flex: 1 ,backgroundColor:'#2d2d2d' }} > 

                <EditHeader
                    _updateProfile={this._updateProfile}
                    showSaveBtn = {true}
                    title={'Change Your Goals'}
                /> 

                <View style={{   paddingRight : 20,paddingBottom:20,paddingLeft:20 ,backgroundColor:'#fff',height:responsiveHeight(85) }}>
                    <Label style={{color: theme.colors.surface,paddingLeft: 4, opacity: 0.8,marginBottom:responsiveHeight(1.8),fontSize:responsiveScreenFontSize(2.3),fontFamily:'EBGaramond-Medium'}}>Your Goals</Label>  
                    <ScrollView>
                        <SelectableChips   ref={this.refFav1}  chipStyle={styles.chip} valueStyleSelected={styles.choosentext} chipStyleSelected={styles.choosen} valueStyle={styles.chipLabel}  
                        // onChangeChips={(chips) => console.log("dasd",chips) }
                         initialChips={ this.state.list.map(x => x.key)}       alertRequired={false}/>      
                    </ScrollView> 
                </View>
            </View> 

     );
    };
}   
const styles = StyleSheet.create({
    container: { 
        flex: 0.7,
        backgroundColor:'#fff',  
        padding :10
    }, 
    top : {
        marginTop:10
    },
        scroller:{ 
            margin : 10,
            height : 50
        },  
        lineAdd:{
            flexDirection: 'row',
            flex : 5
        },
        chipPrefered:{
            backgroundColor:  "#bf4f22", 
            borderRadius:0,
            borderColor:'#bf4f22'
        },
        chipPreferedLabel:{
            fontSize:14,
            color: "#fff", 
            fontSize:responsiveScreenFontSize(1.4),
            fontFamily:'EBGaramond-Medium'
        },
        choosen:{
            backgroundColor: "#bf4f22",  
        },
        choosentext:{
            color:"#fff",
            fontSize:responsiveScreenFontSize(1.4),
            backgroundColor: "#bf4f22",  
            fontFamily:'EBGaramond-Medium'
        }, 
        chip: {
            backgroundColor:  theme.colors.surface,   
            borderRadius:0
        }, 
        chipLabel:{
            fontSize:14,
            color: "#fff", 
            fontSize:responsiveScreenFontSize(1.4),
            fontFamily:'EBGaramond-Medium'
        }, 
        close :{
            color: "#000"
            }
    })  