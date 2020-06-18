import React, { memo } from 'react'; 
import { View , Text , StyleSheet } from 'react-native'; 
import { Icon } from 'react-native-elements' 
import { ScrollView  } from 'react-native-gesture-handler'
import SelectableChips from 'react-native-chip/SelectableChips';  
import { 
    responsiveScreenFontSize
  } from "react-native-responsive-dimensions"; 

const WhiteSection = ({ arg}) => {


    let organizationsList = arg.organizations_list.map(org => (
        <View key={org.org_id}> 
          <Text style={styles.headname}>{org.org_name}</Text>
          <Text style={styles.greylist}>{org.org_title}</Text>
          <Text style={styles.greylist}>{org.from_date} - {org.till_date}</Text> 
        </View>
      ));


    let EducationsList = arg.education_list.map(org => (
    <View key={org.edu_id}> 
        <Text style={styles.headname}>{org.uniname}</Text>
        <Text style={styles.greylist}>{org.gano}</Text>
    <Text style={styles.greylist}>{org.from_tarih} - {org.till_tarih}</Text> 
    </View>
    ));
     
    return (
        <View style ={styles.whiteSection}>
            <View style={{height : 70, width:'100%'}}>
                <Text style={styles.longexoText}>Favourite Ways To Meet</Text>
                <ScrollView style={styles.Chipscroller} showsHorizontalScrollIndicator={false} horizontal={true}>
                        <SelectableChips  chipStyle={styles.chipDark}   valueStyle={styles.chipLabelDark} initialChips={arg.meeting_text? arg.meeting_text.split(','): ['No Value']}  alertRequired={false}/>
                </ScrollView>
            </View>
            <View style={styles.dividerDark} /> 
             <Text style={styles.longexoText}>Experiences</Text> 
            <View style={{alignItems :'flex-start' , width:'100%'}}> 
            <View  style={styles.exper} >
                <Icon
                name='calendar'
                type='font-awesome'
                color='#2269A7' 
                />
                <Text style={styles.info}>Experience : </Text>
                <Text style={styles.userinfo}>{arg.experience_text? arg.experience_text: 'Unknown'}</Text>
            </View>
            <View style={styles.exper}>
                <Icon
                name='business'
                type='material'
                color='#2269A7'
                />
                <Text style={styles.info}>My Industry : </Text>
                <Text style={styles.userinfo}>{arg.industry_text? arg.industry_text : 'Unknown'}</Text> 
            </View>
            <View style={styles.exper}>
                <Icon
                name='briefcase'
                type='font-awesome'
                color='#2269A7'
                />
                <Text style={styles.info}>Previous Organizations : </Text>   
            </View>
            <View style={styles.list}>
                {organizationsList} 
            </View>
            <View style={styles.exper}>
                <Icon
                name='receipt'
                type='material'
                color='#2269A7'
                
                />
                <Text style={styles.info}>Academic Level : </Text> 
                <Text style={styles.userinfo}>{arg.academic_text? arg.academic_text : 'Unknown'}</Text> 
            </View> 
            <View style={styles.exper}>
                <Icon
                name='school'
                type='material'
                color='#2269A7'
                />
                <Text style={styles.info}>Education : </Text>  
            </View>
            <View style={styles.list}>
                {EducationsList} 
            </View> 
 
            </View>
        </View>
        
    )
}
export default memo(WhiteSection);

const styles = StyleSheet.create({     
    whiteSection:{
        paddingHorizontal:10,
        alignItems: 'center',
        borderTopRightRadius:20, 
        backgroundColor:'#fff',  
        width:'100%'
      }, 
    dividerDark:{
        alignSelf: 'stretch',
        borderBottomColor: 'rgba(0,0,0,0.2)',
        borderBottomWidth: 1,
        marginTop : 10,
        marginStart:20,
        marginEnd:20,
        marginBottom : 2
      },
      longexoText:{
        marginTop : 5,
        alignSelf: 'center',
        fontSize:responsiveScreenFontSize(2.3),
        fontFamily:'EBGaramond-Medium',
        color: 'rgba(0, 113, 189, 0.5)' ,
        textAlign: 'center'
      } ,
      Chipscroller:{
        height : 40, 
        marginBottom :10,
        marginEnd : 'auto'
      },
      chip: { 
        backgroundColor: "rgba(235, 235, 235, .5)",  
        height: 24,  
        borderColor : '#fff'
      },
      chipLabel:{
          fontSize:12,
          color: "#fff"
      },
      chipDark: { 
        backgroundColor: "rgba(0, 113, 183, .7)",  
        height: 24,   
        borderColor : '#666'
      },
      chipLabelDark:{
        fontSize:responsiveScreenFontSize(1.4),
          color: "#fff", 
          fontFamily:'EBGaramond-Medium'
      },
      userinfo:{
        fontSize:responsiveScreenFontSize(1.8), 
        color: "#666", 
        textAlign: 'center',
        marginTop: 4 ,
        fontFamily:'EBGaramond-SemiBold'
      },
      info:{
        fontSize:responsiveScreenFontSize(1.8), 
        marginTop: 4,
        marginStart: 4 ,
        color: "#2268A9",  
        marginBottom : 0 ,
        fontFamily:'EBGaramond-Medium'
      },
      list :{
        marginStart : 30, 
        marginBottom :3 ,
      },
      exper:{ 
        flexDirection: 'row',
        alignItems: 'flex-start', 
        marginEnd:'auto',
        padding: 10,
        marginBottom : 0
      }, 
      headname :{
        color : "#333", 
        fontSize : responsiveScreenFontSize(1.8)  , 
        fontFamily :'EBGaramond-Bold'
      },
      greylist :{
        color : "#666",
        fontSize : responsiveScreenFontSize(1.5)  , 
        marginBottom : 3,
        fontFamily:'EBGaramond-SemiBold'
      },
})
