import React, {useState,  useRef ,memo} from 'react'; 
import { View , Text ,ScrollView ,StyleSheet ,ToastAndroid ,Alert ,Platform} from 'react-native';
import { theme } from '../../utils/theme';
import { Input } from 'react-native-elements' 
import {
    responsiveHeight,
    responsiveWidth,
    responsiveScreenFontSize
  } from "react-native-responsive-dimensions"; 
import SelectableChips from 'react-native-chip/SelectableChips';  

const LocationsSection = ({...props}) => { 
    const LocationInput = useRef(null); 
    const refFavLocations = useRef(null);    

    const _pushingToLocation=(chips) =>{ 
        let item = chips[0]
        if (item){   
            if (!props.favlocation.includes(item)){
                let joined = props.favlocation.concat(item); 
                props.setFavLocation(joined)  
            }
            else{
                if (Platform.OS === 'android') {
                    ToastAndroid.show('Title Exists!', ToastAndroid.SHORT)
                } else {
                    Alert.alert('Title Exists!');
                }   
            }
        } 
        else{  
        }
         
  
    }    

    const _deletingfromLocations = (locations)=>{  
        if (locations[0]){  
            if (props.favlocation.includes(locations[0])){
                let deleted = props.favlocation.filter(text => text !== locations[0]) 
                props.setFavLocation(deleted)  
            } 
        }   
    }
       

        const _onSubmitLocations = (locations)=>{ 
            var letterNumber = /^[0-9a-zA-Z]+$/;  
            if (locations.nativeEvent.text && locations.nativeEvent.text.match(letterNumber) ){ 
                if (!props.favlocation.includes(locations.nativeEvent.text)){
                    let joined = props.favlocation.concat(locations.nativeEvent.text); 
                    props.setFavLocation(joined)     
                }
                else{ 
                    if (Platform.OS === 'android') {
                        ToastAndroid.show('Title Exists!', ToastAndroid.SHORT)
                    } else {
                        Alert.alert('Title Exists!');
                    } 
                    LocationInput.current.clear()  
                }
            }   
            else{
                if (Platform.OS === 'android') {
                    ToastAndroid.show('Enter Valid Data!', ToastAndroid.SHORT)
                } else {
                    Alert.alert('Enter Valid Data!');
                }    
                LocationInput.current.clear()  
            }
        }

        const onChangeChipsAlternative = (item) => {
            if (item){   
                if (!props.favlocation.includes(item)){
                    let joined = props.favlocation.concat(item); 
                    props.setFavLocation(joined)  
                }
                else{
                    if (Platform.OS === 'android') {
                        ToastAndroid.show('Title Exists!', ToastAndroid.SHORT)
                    } else {
                        Alert.alert('Title Exists!');
                    }    
                }
            } 
            else{  
            }
             
        }
    
 
    return ( 
        <View style = {styles.section}>  
            <Text style = {styles.titles}>Their Locations</Text>
            <Input
                label="Locations"
                returnKeyType="send"  
                autoCapitalize="none" 
                placeholder = "Enter Their Locations"
                placeholderTextColor = "#999"
                ref={LocationInput}
                style={{borderColor: 'gray',backgroundColor:'#efefef'  ,marginBottom : 25  ,marginLeft : 10,marginRight : 10, padding : 15, borderRadius:10,height:responsiveHeight(6),borderBottomColor:theme.colors.surface,borderBottomWidth:1,fontFamily:'EBGaramond-Medium'}}
                onSubmitEditing={(locations )=>_onSubmitLocations(locations)}
            /> 
            <ScrollView style={styles.scrollerSel} showsHorizontalScrollIndicator={false} horizontal={true}>
                <SelectableChips  chipStyle={styles.chip}  valueStyle={styles.chipLabel}  
                // onChangeChips={ (chips) => _pushingToLocation(chips)} 
                onChangeChipsAlternative = {(item)=> onChangeChipsAlternative(item)}
                initialChips={["New York ", "Istanbul","London","Riyadh","Beirut","Hamburg","Paris"]}   alertRequired={false}/>
            </ScrollView> 
            <ScrollView style={styles.scrollerSel} showsHorizontalScrollIndicator={false} horizontal={true}>
                <SelectableChips  chipStyle={styles.Choosenchip}  valueStyle={styles.ChoosenchipLabel}  ref={refFavLocations} 
                onChangeChips={(chips) => _deletingfromLocations(chips)}  
                    initialChips={ props.favlocation.length>0   ? props.favlocation  :['NO Selected Locations']}   alertRequired={false}
                    /> 
            </ScrollView> 
        </View> 
        )
} 

export default memo(LocationsSection);

const styles = StyleSheet.create({  
    Choosenchip: {
        backgroundColor:  "#bf4f22",   
        borderRadius:0,
        borderColor : "#bf4f22", 
        height : responsiveHeight(5)
      }, 
      ChoosenchipLabel:{
        fontSize:responsiveScreenFontSize(1.5),
        color: "#fff", 
        backgroundColor:  "#bf4f22",  
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
      },
      choosen:{
          backgroundColor: "#bf4f22",  
      },
      titles:{
        fontWeight:'bold',
        marginVertical:15,
        color: "#2269A7",
        marginStart : 10
      },  
      choosentext:{
        color:"#fff",
        backgroundColor: "#bf4f22",  
    }, 
    section:{
        width :'100%', 
         backgroundColor:'#efefef',
        borderRadius:20,
        padding:7,
        marginBottom:10
        ,marginVertical:3,
        
    }
    
})
