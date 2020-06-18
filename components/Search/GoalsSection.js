import React, { useRef  ,memo} from 'react'; 
import { View , Text ,ScrollView ,StyleSheet ,ToastAndroid ,Alert  ,Platform} from 'react-native';
import { theme } from '../../utils/theme'; 
import {  responsiveHeight, responsiveScreenFontSize  } from "react-native-responsive-dimensions"; 
import SelectableChips from 'react-native-chip/SelectableChips'; 

const GoalsSection = ({...props}) => { 

    const refGoals = useRef(null);   


    const _pushingToGoals = (chips) => {
        let item = chips[0]
        if (item){   
            if (!props.favGoals.includes(item)){
                let joined = props.favGoals.concat(item); 
                props.setFavGoals(joined)  
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
        <View style = {{ width :'100%',  backgroundColor:'#efefef', borderRadius:20,padding:7,marginVertical:3}}>  
            <Text style = {styles.titles}>Their Goals</Text>
            <ScrollView style={styles.scrollerSel} showsHorizontalScrollIndicator={false} horizontal={true}>
                <SelectableChips ref={refGoals} onChangeChips={(chips) => _pushingToGoals(chips)}  chipStyle={styles.chip} valueStyleSelected={styles.choosentext} chipStyleSelected={styles.choosen} valueStyle={styles.chipLabel}
                initialChips={["Hire Employee ", "Find Mentor","Investing in Projects","Find Investors","FreeLance Jobs","Make New Friends","Planning New Project"]}   alertRequired={false}/>
            </ScrollView> 
        </View> 
        )
} 

export default memo(GoalsSection);

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
    
})
