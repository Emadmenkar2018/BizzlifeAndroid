import React, { memo} from 'react'; 
import { View , Text   ,StyleSheet   } from 'react-native'; 
import { Icon } from 'react-native-elements' 
import {
    responsiveHeight, 
    responsiveScreenFontSize
  } from "react-native-responsive-dimensions"; 
import { useHistory } from 'react-router-native';   

const MiddleSection = ({...props}) => {  


    let history = useHistory();
    let ProfileData = props.ProfileData   

    let organizationsList=[]
    let EducationsList=[]   

    let experienceText = props.experienceText
    let industryText = props.industryText
    let academicText = props.academicText 

    const _changeEducations =() =>{ 
      history.push({pathname : '/Main/Profile/Edu',
      state: {
        ProfileData,
        organizations : props.organizations,
        setOrganizations : props.setOrganizations
      }
      })     
    }

    const _changeOrganizations =() =>{ 
      history.push({pathname : '/Main/Profile/Org',
       state: { 
         ProfileData: props.ProfileData  ,
        organizations : props.organizations,
        setOrganizations : props.setOrganizations}
      })  
    }

    if(props.ProfileData !== ''){
        organizationsList = props.ProfileData.organizations.map(org => (
        <View key={org.org_id}> 
            <Text style={styles.headname}>{org.org_name}</Text>
            <Text style={styles.greylist}>{org.org_title}</Text>
            <Text style={styles.greylist}>{org.from_date} - {org.till_date}</Text> 
        </View>
        ));

        EducationsList = props.ProfileData.educations.map(org => (
        <View key={org.edu_id}> 
            <Text style={styles.headname}>{org.uniname}</Text>
            <Text style={styles.greylist}>{org.gano}</Text>
            <Text style={styles.greylist}>{org.from_tarih} - {org.till_tarih}</Text> 
        </View>
        )); 
    }


    return (    

                <View style={styles.experBlog}>  
                    <Text style={ { marginTop : 10,alignSelf: 'center',fontSize:responsiveScreenFontSize(2.15) ,color: 'rgba(0, 113, 189, 0.5)' ,textAlign: 'center',fontFamily:'EBGaramond-Bold'}}>Experiences</Text>
                  
                    <View  style={styles.exper} >
                        <Icon
                          name='calendar'
                          type='font-awesome'
                          color='#2269A7'
                          
                        />
                        <Text style={styles.info}>Experience : </Text>
                        <Text style={styles.userinfo}>{experienceText ? experienceText :'Unknown'}</Text>
                        <Icon
                          name='edit'
                          type='font-awesome'
                          color='#F16731'
                          containerStyle={{ marginStart : 3,alignSelf: 'flex-end'}} 
                          onPress ={ props.ShowOrCloseExerienceModal}
                          size={responsiveScreenFontSize(2)}
                        />
                    </View>

                    <View style={styles.exper}>
                        <Icon
                          name='business'
                          type='material'
                          color='#2269A7'
                        />
                        <Text style={styles.info}>My Industry : </Text>
                        <Text style={styles.userinfo}>{industryText ? industryText :'Unknown'}</Text>
                        <Icon
                          name='edit'
                          type='font-awesome'
                          color='#F16731'
                          containerStyle={{ marginStart : 3,alignSelf: 'flex-end'}} 
                          onPress ={ props.ShowOrCloseIndustryModal }
                          size={responsiveScreenFontSize(2)} 
                        />
                    </View>

                    <View style={styles.exper}>
                        <Icon
                          name='briefcase'
                          type='font-awesome'
                          color='#2269A7'
                        />
                        <Text style={styles.info}>Previous Organizations : </Text>  
                        <Icon
                          name='edit'
                          type='font-awesome'
                          color='#F16731'
                          containerStyle={{ marginStart : 3,alignSelf: 'flex-end'}} 
                          onPress ={ _changeOrganizations}
                          size={responsiveScreenFontSize(2)}
                        />
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
                        <Text style={styles.userinfo}>{academicText ? academicText :'Unknown'}</Text>
                        <Icon
                          name='edit'
                          type='font-awesome'
                          color='#F16731'
                          containerStyle={{ marginStart : 3,alignSelf: 'flex-end'}} 
                          onPress ={ props.ShowOrCloseAcademicModal}
                          size={responsiveScreenFontSize(2)}
                        />
                    </View> 

                    <View style={styles.exper}>
                        <Icon
                          name='school'
                          type='material'
                          color='#2269A7'
                        />
                        <Text style={styles.info}>Education : </Text> 
                        <Icon
                          name='edit'
                          type='font-awesome'
                          color='#F16731'
                          containerStyle={{ marginStart : 3,alignSelf: 'flex-end'}} 
                          onPress ={ _changeEducations}
                          size={responsiveScreenFontSize(2)}
                        />
                    </View>

                    <View style={styles.list}>
                          {EducationsList} 
                    </View>  
 
                </View>
 
        )
} 

export default memo(MiddleSection);

const styles = StyleSheet.create({    
    experBlog:{
        alignItems: 'flex-start', 
        width: '100%', 
        borderTopRightRadius:30,
        backgroundColor :'#fff',
        marginTop:-responsiveHeight(2.4),
      }, 
      exper:{ 
        flexDirection: 'row',
        alignItems: 'flex-start', 
        padding: 10,
        marginBottom : 0
      },
      info:{
        fontSize:responsiveScreenFontSize(1.6) ,  
        marginTop: 4,
        marginStart: 4 ,
        color: "#2268A9",  
        marginBottom : 0 ,
        fontFamily :'EBGaramond-Medium'
      },
      userinfo:{
        fontSize:responsiveScreenFontSize(1.6)  , 
        color: "#000000", 
        textAlign: 'center',
        marginTop: 4,
        fontFamily :'EBGaramond-SemiBold'
      },
      list :{
        marginStart : 30, 
        marginBottom :3 ,
      }, 
      headname :{
        color : "#000000", 
        fontSize : responsiveScreenFontSize(1.7)  , 
        fontFamily :'EBGaramond-Bold'
      },
      greylist :{
        color : "#666",
        fontSize : responsiveScreenFontSize(1.5)  , 
        marginBottom : 3,
        fontFamily:'EBGaramond-SemiBold'
      },
})
