import React, { memo } from 'react'; 
import { View , Text ,StyleSheet  ,Image} from 'react-native';
import { theme } from '../../utils/theme'; 
import { ScrollView,  } from 'react-native-gesture-handler'
import SelectableChips from 'react-native-chip/SelectableChips';  
import {
    responsiveHeight,
    responsiveWidth,
    responsiveScreenFontSize
  } from "react-native-responsive-dimensions"; 

const BlueSection = ({ arg}) => {
  
    return (
        <View style ={styles.blueSection}> 
        
                <View  style={styles.BioView}>
                    <Image 
                        style ={styles.fitimage}
                        source={require('../../assets/comma.png')} > 
                    </Image>
                    <Text style={styles.infoBio}>{arg.bio_text? arg.bio_text : "Unknown"}</Text>   
                    <Image 
                        style ={styles.fitimageReverse}
                        source={require('../../assets/comma.png')} > 
                    </Image>
                </View>


                <View style={styles.divider} /> 
                <Text style={ {marginStart : responsiveWidth(2),marginEnd : 'auto',fontSize:responsiveScreenFontSize(2),color: "#fff",fontFamily:'EBGaramond-Medium'}}>Current Goals</Text>  


                <ScrollView style={styles.Chipscroller} showsHorizontalScrollIndicator={false} horizontal={true}>
                    <SelectableChips  chipStyle={styles.chip}   valueStyle={styles.chipLabel} initialChips={arg.goals_text? arg.goals_text.split(','): ['No Value']}  alertRequired={false}/>
                </ScrollView>
                
            
         </View> 
    )
}
export default memo(BlueSection);

const styles = StyleSheet.create({   
    blueSection:{
        paddingStart:10,
        alignItems: 'center',
        borderTopRightRadius:20,  
        paddingVertical:responsiveHeight(2.3), 
        overflow :'hidden', 
        marginBottom :-responsiveHeight(3),
        backgroundColor:theme.colors.surface,  
        // marginVertical:-20
      },
      BioView:{ 
        flexDirection: 'row',
        alignItems: 'flex-start', 
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom : 0,
        alignSelf:'center'
      },
      fitimage:{
        width : responsiveScreenFontSize(2),
        height : responsiveScreenFontSize(2), 
        tintColor : 'white',
        alignSelf:'flex-start',
      },
      fitimageReverse:{
        width : responsiveScreenFontSize(2),
        height : responsiveScreenFontSize(2),
        tintColor : 'white',
        transform: [{ rotate: '180deg' }], /* change the deg (degree of rotation) between 0deg, 360deg*/
        alignSelf:'flex-end',
        marginLeft:4
      },
      divider:{
        alignSelf: 'stretch',
        borderBottomColor: 'rgba(255,255,255,0.2)',
        borderBottomWidth: 1,
        marginTop : 10,
        marginBottom : 2,
        marginVertical:responsiveHeight(2), 
      },
      Chipscroller:{ 
        marginBottom :responsiveHeight(2), 
        marginEnd : 'auto',
        paddingHorizontal:responsiveWidth(3)
      },
      chip: { 
        backgroundColor: "rgba(235, 235, 235, .5)",   
        borderColor : '#fff', 
        marginBottom :responsiveHeight(2), 
      },
      chipLabel:{
          fontSize:responsiveScreenFontSize(1.4),
          color: "#fff", 
          fontFamily:'EBGaramond-Medium'
      },
      infoBio:{
        marginTop: responsiveHeight(2), 
        fontSize : responsiveScreenFontSize(2.3), 
        color:"#999999",
        fontFamily:'EBGaramond-BoldItalic'
      },
})
