import React, {useState,  useRef , useEffect,Component}  from 'react';
import { Text, StyleSheet , View ,ScrollView ,TextInput   ,ToastAndroid, BackHandler ,Platform} from 'react-native';  
import '../../../../utils/global.js'
import SelectableChips from 'react-native-chip/SelectableChips'; 
import RemovableChips from 'react-native-chip/RemovableChips' 
import {interests} from '../../../../constants/arrays'
import { theme } from '../../../../utils/theme.js'; 
import {Label } from 'native-base';
import {Icon } from 'react-native-elements'; 
import {Button } from 'react-native-elements'; 
import {
    responsiveHeight,
    responsiveWidth,
    responsiveScreenFontSize
  } from "react-native-responsive-dimensions";
import {UpdateProfileApi } from '../../../../services/api';
import { useHistory } from 'react-router-native';
import  EditHeader   from '../../../../components/Profile/EditHeader';

const EditInterestsScreen = ({  ...props }) =>{ 
   
   const InterestsInput = useRef(null); 
   const refContainer = useRef(null);  
   const [favInterests, setFavInterests] = useState(props.location.state.ProfileData.interestings_text ? props.location.state.ProfileData.interestings_text.split(",") : []);

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
     
   
   const _deletingfromIntersts = (Interest)=>{  
    if (Interest[0]){  
        if (favInterests.includes(Interest[0])){
            let deleted = favInterests.filter(text => text !== Interest[0]) 
            setFavInterests(deleted)  
        } 
    }    
  }
 
   const _onSubmitInterests = (interests)=>{
    var letterNumber = /^[0-9a-zA-Z]+$/;  
    if (interests.nativeEvent.text && interests.nativeEvent.text.match(letterNumber) ){ 
        if (! favInterests.includes(interests.nativeEvent.text)){
            let joined =  favInterests.concat(interests.nativeEvent.text); 
             setFavInterests(joined)     
        }
        else{
            ToastAndroid.show('Title Exists!' , ToastAndroid.SHORT);  
            InterestsInput.current.clear()  
        }
    }   
    else{
        ToastAndroid.show('Enter Valid Data!' , ToastAndroid.SHORT);  
        InterestsInput.current.clear()  
    }
}

  const _updateProfile = () => { 
    let finalinterests =   favInterests
    let final =""
    if (finalinterests.length > 0) {
      final = finalinterests.join();
    }  
    if (final.length > 0) {
      let bodyFormData = new FormData();  
      bodyFormData.append('access_token',global.AccesToken),
      bodyFormData.append('interestings_text',final);      
      UpdateProfileApi(bodyFormData).then(() => {
          ToastAndroid.show('Data Has been Changed!', ToastAndroid.SHORT);  
          history.goBack()
      })
      .catch(err => { 
          return;
      }); 
    }
    else {
      ToastAndroid.show('Enter Values', ToastAndroid.SHORT); 
    }
 
  }; 

    const onChangeChipsAlternative = (item) => {
      if (item){   
          if (!favInterests.includes(item)){
              let joined = favInterests.concat(item); 
              setFavInterests(joined)  
          }
          else{
              ToastAndroid.show('Title Exists!' , ToastAndroid.SHORT);    
          }
      } 
      else{  
      } 
    }

      return (

        <View style={{ flex: 1  ,backgroundColor:'#2d2d2d'}} > 
           
           <EditHeader
            _updateProfile={_updateProfile}
            showSaveBtn = {true}
            title={'Change Your Interests'}
           /> 

           <View style={{backgroundColor:'#fff',height:'100%'}}>

                <View style={{  paddingRight : 20,paddingBottom:20,paddingLeft:20 ,backgroundColor:'#fff' , alignContent:'flex-start' }}> 
                
                  <Label style={{color: theme.colors.surface,paddingLeft: 4, opacity: 0.8,marginBottom:responsiveHeight(1.8),fontSize:responsiveScreenFontSize(2),fontFamily:'EBGaramond-Regular'}}>Your Interests</Label>
                  <TextInput
                          label="Interests"
                          returnKeyType="send"  
                          autoCapitalize="none" 
                          placeholder = "Enter Their Interests"
                          placeholderTextColor = "#000"
                          ref={InterestsInput}
                          style={{ borderColor: 'gray',backgroundColor:'#efefef'  ,marginBottom : 25  ,marginLeft : 10,marginRight : 10, padding : 15, borderRadius:10,height:responsiveHeight(6),borderBottomColor:theme.colors.surface,borderBottomWidth:1,fontFamily:'EBGaramond-Medium'}}
                          onSubmitEditing={(interests )=>_onSubmitInterests(interests)}
                      /> 

                  <ScrollView style={styles.scroller} showsHorizontalScrollIndicator={false} horizontal={true}>
                      <SelectableChips  chipStyle={styles.chip}  valueStyle={styles.chipLabel}  
                        // onChangeChips={ (chips) => _pushingToInterests(chips)  }
                        onChangeChipsAlternative = {(item)=> onChangeChipsAlternative(item)}
                        initialChips={interests}    alertRequired={false}/>
                  </ScrollView> 

                  <ScrollView style={styles.scroller} showsHorizontalScrollIndicator={false} horizontal={true}>
                      <SelectableChips  chipStyle={styles.Choosenchip}  valueStyle={styles.ChoosenchipLabel}  ref={refContainer} 
                      onChangeChips={(chips) => _deletingfromIntersts(chips)} 
                      initialChips={   favInterests.length>0   ?  favInterests  :['NO Selected Interests']}   alertRequired={false}/>
                  </ScrollView> 


                </View> 
           </View>

        </View> 
      );
  }   

  export default EditInterestsScreen
const styles = StyleSheet.create({ 
      top : {
          marginTop:10
      },
    scroller:{ 
      marginTop:2,
        marginBottom : 10,  
        backgroundColor:'#fff' , 
        //  height:responsiveHeight(7)
      }, 
      Choosenchip: {
        backgroundColor:  "#bf4f22",   
        borderRadius:0,
        borderColor : "#bf4f22", 
        height : responsiveHeight(5),
        fontFamily:'EBGaramond-Regular'
      }, 
      ChoosenchipLabel:{
        fontSize:responsiveScreenFontSize(1.5),
        color: "#fff", 
        backgroundColor:  "#bf4f22",  
        fontFamily:'EBGaramond-Regular'
      },
      chip: {
        backgroundColor:  theme.colors.surface,   
        borderRadius:0, 
        height : responsiveHeight(5)
      }, 
      chipLabel:{
        fontSize:responsiveScreenFontSize(1.5),
        fontSize:14,
        color: "#fff", 
        backgroundColor: theme.colors.surface,  
        fontFamily:'EBGaramond-Regular'
      },
      section:{  
        width :'100%'
      },
      titles:{
        fontWeight:'bold',
        marginVertical:15,
        color: "#2269A7",
        marginStart : 10
      },
      selected:{
        backgroundColor: theme.colors.surface, 
      }

}) 
 