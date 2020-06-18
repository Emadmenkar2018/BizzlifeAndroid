import React, { memo} from 'react'; 
import { View , Text ,Dimensions ,StyleSheet   ,ScrollView} from 'react-native';
import { theme } from '../../utils/theme';
import { Icon } from 'react-native-elements' 
import {
    responsiveHeight, 
    responsiveScreenFontSize
  } from "react-native-responsive-dimensions"; 
import { useHistory } from 'react-router-native'; 
import SelectableChips from 'react-native-chip/SelectableChips'; 
 

const BodySection = ({...props}) => {  


    let history = useHistory();
    let ProfileData = props.ProfileData  


    const _changeGoals =() =>{ 
        history.push({pathname : '/Main/Profile/Goals',
        state: {ProfileData}
        })    
      }

    const _changeInterests=()=>{ 
        history.push({pathname : '/Main/Profile/Interests',
        state: {ProfileData}
        })    
      }

    const _changeBio = () => {
      history.push({pathname : '/Main/Profile/Bio',
      state: {ProfileData}
      })   
    }  

    const _changeMeetings =() =>{  
        history.push({pathname : '/Main/Profile/Meeting',
          state: {ProfileData}
        })     
      }
  
    return (   
                <View style={styles.body}>   

                    <View style={styles.explineEdit}>
                        <Text style={{ alignSelf: 'center',fontSize:responsiveScreenFontSize(1.85) ,color: "#fff",textAlign: 'center',fontFamily:'EBGaramond-Bold'}}>Interests</Text>
                        <Icon
                            name='edit'
                            type='font-awesome'
                            color='#F16731'
                            containerStyle={{marginStart : 3, alignSelf: 'flex-end'}} 
                            onPress = { _changeInterests}
                            size={responsiveScreenFontSize(2)}
                        /> 
                    </View>


                    <ScrollView style={styles.scroller} showsHorizontalScrollIndicator={false} horizontal={true}>
                        <SelectableChips  chipStyle={styles.chip}  valueStyle={styles.chipLabel}  initialChips={ProfileData.interestings_text? ProfileData.interestings_text.split(','): ['No Value']} alertRequired={false}/>
                    </ScrollView>


                    <View style={styles.divider} /> 


                    <View style={styles.explineEdit}>
                        <Text style={ { alignSelf: 'center',fontSize:responsiveScreenFontSize(1.85),color: "#fff",textAlign: 'center',fontFamily:'EBGaramond-Bold'}}>Current Goals</Text>
                        <Icon
                            name='edit'
                            type='font-awesome'
                            color='#F16731'
                            containerStyle={{ marginStart : 3,alignSelf: 'flex-end'}} 
                            onPress = { _changeGoals}
                            size={responsiveScreenFontSize(2)}
                        /> 
                    </View>


                    <ScrollView style={styles.scroller} showsHorizontalScrollIndicator={false} horizontal={true}>
                        <SelectableChips  chipStyle={styles.chip}   valueStyle={styles.chipLabel} initialChips={ProfileData.goals_text? ProfileData.goals_text.split(','): ['No Value']}  alertRequired={false}/>
                    </ScrollView>

                    <View style={styles.divider} /> 

                    <View style={styles.explineEdit}>
                        <Text style={{alignSelf: 'center',fontSize:responsiveScreenFontSize(1.85),color: "#fff",textAlign: 'center',fontFamily:'EBGaramond-Bold'}}>Bio</Text>
                        <Icon
                            name='edit'
                            type='font-awesome'
                            color='#F16731'
                            containerStyle={{marginStart : 3, alignSelf: 'flex-end'}} 
                            onPress ={_changeBio}
                            size={responsiveScreenFontSize(2)}
                        />  
                    </View>

                    <Text style={styles.infoBio}>{ProfileData.bio_text? ProfileData.bio_text : "Unknown"}</Text>

                    <View style={styles.divider} /> 

                    <View style={styles.explineEdit}>
                        <Text style={styles.longexoText}>Favourite Ways To Meet</Text>
                        <Icon
                            name='edit'
                            type='font-awesome'
                            color='#F16731'
                            containerStyle={{marginStart : 3, alignSelf: 'flex-end'}} 
                            onPress ={ _changeMeetings}
                            size={responsiveScreenFontSize(2)}
                        />
                    </View>

                    <ScrollView style={styles.scrollerlast} showsHorizontalScrollIndicator={false} horizontal={true}>
                        <SelectableChips  chipStyle={styles.chip} valueStyle={styles.chipLabel}  initialChips={ProfileData.meeting_text? ProfileData.meeting_text.split(','): ['No Value']} alertRequired={false}/>
                    </ScrollView> 

                </View> 

                
        )
} 

export default memo(BodySection);

const styles = StyleSheet.create({    
    body:{
        marginTop:-responsiveHeight(2.4),
      backgroundColor: theme.colors.surface,
      borderTopRightRadius:30,
      alignItems:'center', 
      padding : 5, 
    },  
    explineEdit :{
        flexDirection: 'row',
        justifyContent : 'center',
        width : '100%'
      },
      scroller:{  
      },
      scrollerlast:{  
        marginBottom :20
      }, 
      divider:{
       alignSelf: 'stretch',
       borderBottomColor: 'rgba(239, 239, 239,.2)',
       borderBottomWidth: 1,
       margin : 10
     },
     longexoText:{ 
       alignSelf: 'center',
       fontSize:responsiveScreenFontSize(1.85) ,
       color: "#fff",
       textAlign: 'center', 
       fontFamily:'EBGaramond-Bold'
     } ,
     infoBio:{
        marginTop: 5,
        fontSize : responsiveScreenFontSize(2),  
        color:"#999999"  , 
        fontFamily:'EBGaramond-BoldItalic'
     },
     chip: {
       backgroundColor: "rgba(235, 235, 235, .5)",   
     },
     chipLabel:{
         fontSize:responsiveScreenFontSize(1.4),
         color: "#fff", 
         fontFamily:'EBGaramond-Medium'
     },
})
