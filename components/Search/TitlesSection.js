import React, {  useRef , useEffect,memo} from 'react'; 
import { View , Text ,ScrollView ,StyleSheet ,ToastAndroid ,Alert ,Platform} from 'react-native';
import { theme } from '../../utils/theme';
import { Input } from 'react-native-elements' 
import {  responsiveHeight,  responsiveScreenFontSize} from "react-native-responsive-dimensions"; 
import SelectableChips from 'react-native-chip/SelectableChips'; 

const TitlesSection = ({...props}) => { 
    const textInput = useRef(null);  
    const refFavTitles = useRef(null);


    useEffect(() =>{ 
        
     }, [props.favTitles]);


    const _deletingfromTitles = (titles)=>{   

        if (titles[0]){  
            if (props.favTitles.includes(titles[0])){
                let deleted = props.favTitles.filter(text => text !== titles[0]) 
                props.setFavTitles(deleted)  
            } 
        }  
         
    }

    const _pushingToTitles=(chips) =>{  
        let item = chips[0]
        if (item){   
            if (!props.favTitles.includes(item)){
                let joined = props.favTitles.concat(item); 
                props.setFavTitles(joined)  
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

    const _onSubmitEditing = (text)=>{  
        var letterNumber = /^[0-9a-zA-Z]+$/; 
        if (text.nativeEvent.text && text.nativeEvent.text.match(letterNumber)){ 
            if (!props.favTitles.includes(text.nativeEvent.text)){
                let joined = props.favTitles.concat(text.nativeEvent.text); 
                props.setFavTitles(joined)    
            }
            else{
                if (Platform.OS === 'android') {
                    ToastAndroid.show('Title Exists!', ToastAndroid.SHORT)
                } else {
                    Alert.alert('Title Exists!');
                }  
                textInput.current.clear()  
            }
        }   
        else{ 
            if (Platform.OS === 'android') {
                ToastAndroid.show('Enter Valid Data!', ToastAndroid.SHORT)
            } else {
                Alert.alert('Enter Valid Data!');
            }    
            textInput.current.clear()  
        }
    }
 

    const onChangeChipsAlternative = (item) => {
        if (item){   
            if (!props.favTitles.includes(item)){
                let joined = props.favTitles.concat(item); 
                props.setFavTitles(joined)  
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
                <Text style = {styles.titles}>Their Titles</Text>

                <Input 
                    returnKeyType="go"  
                    autoCapitalize="none" 
                    placeholder = "Enter Their Titles"
                    placeholderTextColor = "#999"
                    ref={textInput}
                    // style={{backgroundColor :'#efefef', borderBottomColor:'transparent',height:responsiveHeight(7)}}
                    style={{borderColor: 'gray',backgroundColor:'#efefef'  ,marginBottom : 25  ,marginLeft : 10,marginRight : 10, padding : 15, borderRadius:10,height:responsiveHeight(6),borderBottomColor:theme.colors.surface,borderBottomWidth:1,fontFamily:'EBGaramond-Medium'}}
                    containerStyle={{borderBottomColor:'transparent'}}
                    onSubmitEditing={(text)=>_onSubmitEditing(text)}
                /> 
                 <ScrollView style={styles.scrollerSel} showsHorizontalScrollIndicator={false} horizontal={true}>
                    <SelectableChips  chipStyle={styles.chip} valueStyleSelected={styles.selected} chipStyleSelected={styles.selected}	   valueStyle={styles.chipLabel}   
                        // onChangeChips={(chips) => _pushingToTitles(chips)}
                        onChangeChipsAlternative = {(item)=> onChangeChipsAlternative(item)}
                        initialChips={["Ceo", "Photographer","Counsalnts","Project Manager","Co Founder","Investors","Programmer"]}   alertRequired={false}/>
                </ScrollView>  
  
                
                <ScrollView style={styles.scrollerSel} showsHorizontalScrollIndicator={false} horizontal={true}>
                    <SelectableChips   chipStyle={styles.Choosenchip}  valueStyle={styles.ChoosenchipLabel}  ref={refFavTitles} 
                        onChangeChips={(chips) => _deletingfromTitles(chips)} 
                        initialChips={props.favTitles.length>0   ? props.favTitles  :['NO Selected Titles']}   alertRequired={false}/>
                </ScrollView> 
            </View>   
        )
} 

export default memo(TitlesSection);

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
      section:{  
        width :'100%',
        backgroundColor:'#efefef',
        borderRadius:20,
        padding:7
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
