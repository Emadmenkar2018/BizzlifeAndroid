import React, {useState,  useRef , memo} from 'react'; 
import { View , Text ,ScrollView ,StyleSheet ,ToastAndroid ,Alert ,Platform} from 'react-native';
import { theme } from '../../utils/theme';
import { Input } from 'react-native-elements' 
import {
    responsiveHeight,
    responsiveWidth,
    responsiveScreenFontSize
  } from "react-native-responsive-dimensions"; 
import SelectableChips from 'react-native-chip/SelectableChips';  

const InterestsSection = ({...props}) => { 
    const InterestsInput = useRef(null); 
    const refFavInterests = useRef(null);  
    const [favInterests, setFavInterests] = useState([]);

    const _deletingfromIntersts = (Interest)=>{  
        if (Interest[0]){  
            if (props.favInterests.includes(Interest[0])){
                let deleted = props.favInterests.filter(text => text !== Interest[0]) 
                props.setFavInterests(deleted)  
            } 
        }    
    }

    const _onSubmitInterests = (interests)=>{
        var letterNumber = /^[0-9a-zA-Z]+$/;  
        if (interests.nativeEvent.text && interests.nativeEvent.text.match(letterNumber) ){ 
            if (!props.favInterests.includes(interests.nativeEvent.text)){
                let joined = props.favInterests.concat(interests.nativeEvent.text); 
                props.setFavInterests(joined)     
            }
            else{ 
                if (Platform.OS === 'android') {
                    ToastAndroid.show('Title Exists!', ToastAndroid.SHORT)
                } else {
                    Alert.alert('Title Exists!');
                }   
                InterestsInput.current.clear()  
            }
        }   
        else{ 
            if (Platform.OS === 'android') {
                ToastAndroid.show('Enter Valid Data!', ToastAndroid.SHORT)
            } else {
                Alert.alert('Enter Valid Data!');
            }    
            InterestsInput.current.clear()  
        }
    }

    const _pushingToInterests=(chips) =>{ 

        let item = chips[0]
        if (item){   
            if (!props.favInterests.includes(item)){
                let joined = props.favInterests.concat(item); 
                props.setFavInterests(joined)  
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

    const onChangeChipsAlternative = (item) => {
        if (item){   
            if (!props.favInterests.includes(item)){
                let joined = props.favInterests.concat(item); 
                props.setFavInterests(joined)  
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
            <Text style = {styles.titles}>Their Interests</Text>
            <Input
                    label="Interests"
                    returnKeyType="send"  
                    autoCapitalize="none" 
                    placeholder = "Enter Their Interests"
                    placeholderTextColor = "#999"
                    ref={InterestsInput}
                    style={{borderColor: 'gray',backgroundColor:'#efefef'  ,marginBottom : 25  ,marginLeft : 10,marginRight : 10, padding : 15, borderRadius:10,height:responsiveHeight(6),borderBottomColor:theme.colors.surface,borderBottomWidth:1,fontFamily:'EBGaramond-Medium'}}
                    onSubmitEditing={(interests )=>_onSubmitInterests(interests)}
                /> 
            <ScrollView style={styles.scrollerSel} showsHorizontalScrollIndicator={false} horizontal={true}>
                <SelectableChips  chipStyle={styles.chip}  valueStyle={styles.chipLabel}  
                // onChangeChips={ (chips) => _pushingToInterests(chips)  }
                onChangeChipsAlternative = {(item)=> onChangeChipsAlternative(item)}
                 initialChips={["Entrepreunership ", "Art","Social Media","NonProfit","FreeLancer","BasketBall","FootBall"]}   alertRequired={false}/>
            </ScrollView> 
            <ScrollView style={styles.scrollerSel} showsHorizontalScrollIndicator={false} horizontal={true}>
                <SelectableChips  chipStyle={styles.Choosenchip}  valueStyle={styles.ChoosenchipLabel}  ref={refFavInterests} 
                onChangeChips={(chips) => _deletingfromIntersts(chips)} 
                initialChips={  props.favInterests.length>0   ? props.favInterests  :['NO Selected Interests']}   alertRequired={false}/>
            </ScrollView> 
        </View>  
        )
} 

export default memo(InterestsSection);

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
        backgroundColor:'#efefef',
        borderRadius:20,
        padding:7
        ,marginVertical:3
    }
    
})
