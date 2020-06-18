import React, { Component } from 'react';
import {  StyleSheet ,ScrollView, View ,Text, BackHandler } from 'react-native'  
import { SinglePickerMaterialDialog ,MaterialDialog} from 'react-native-material-dialog';
import axios from 'axios'; 
import '../../../utils/global.js';
import {DeviceEventEmitter} from 'react-native'
import {UpdateProfileApi, ApiUpdateAvatar,profileApi} from '../../../services/api'; 
import { theme } from '../../../utils/theme.js'; 
// import * as ImagePicker from 'expo-image-picker'; 

import {completetionValidator} from '../../../utils/utils.js';
import {StatusBar} from 'react-native'
import HeaderSection from '../../../components/Profile/HeaderSection'
import UpperSection from '../../../components/Profile/UpperSection'
import BodySection from '../../../components/Profile/BodySection' 
import MiddleSection from '../../../components/Profile/MiddleSection' 
import SocialSection from '../../../components/Profile/SocialSection' 
import ChangeExperienceModal from '../../../components/Profile/ChangeExperienceModal'
import ChangeIndustryModal from '../../../components/Profile/ChangeIndustryModal'
import ChangeAcademicModal from '../../../components/Profile/ChangeAcademicModal'

export default class ProfileScreen extends Component {  
    state = { 
      ProfileData :  '',
      dialogVisible: false,
      IndDialogVisible : false,
      AcaDialogVisible : false,
      loggoutVisible : false, 
      singlePickerSelectedItem : '',
      singlePickerExperienceSelectedItem:{label : '',value : ''},
      singlePickerAcademicSelectedItem:{label : '',value : ''},
      singlePickerIndustrySelectedItem:'',
      image: null,
      completetion: 0.5,
      progressColor:'#efefef', 
     

      experienceText : '',
      industryText:'',
      academicText:'',
      avater:'',
      showIndicator: false,
    };
      

    shouldComponentUpdate(nextProps, nextState) {
      return this.state.ProfileData !== nextState.ProfileData;
    }


    componentDidMount() { 
      BackHandler.addEventListener("hardwareBackPress", this.backButtonHandler);
      this.setState({showIndicator : true})
      this.fetchProfileData()
      
    }

    componentWillUnmount() {
      BackHandler.removeEventListener("hardwareBackPress", this.backButtonHandler);
    }

      backButtonHandler = () => {
      this.props.history.goBack();
      return true;
    } 

    fetchProfileData =()=>{
      let bodyFormData = new FormData();  
      bodyFormData.append('access_token',global.AccesToken) 
      bodyFormData.append('user_id',global.user_id),
      bodyFormData.append('fetch','data,organizations,educations'),
      bodyFormData.append('device_id','sdfgbsdbsdgv sdvgdvsdvsdbsbsdbsdb'); 
      profileApi(bodyFormData).then( response => {
        this.setState({
          ProfileData : response.data  ,
          avater:response.data.avater ,
          organizations : response.data.organizations ,
          experienceText : response.data.experience_text , 
          industryText :response.data.industry_text,
          academicText :response.data.academic_text,
          singlePickerSelectedItem :  response.data.experience_text ,
          singlePickerAcademicSelectedItem :  {label : response.data.academic_text , value :  response.data.academic_text},
          singlePickerIndustrySelectedItem : response.data.industry_text ,
          singlePickerExperienceSelectedItem : response.data.experience_text,
          showIndicator : false,
        })   
        let precentage = completetionValidator(response.data);
        this.setState({completetion :precentage /100},()=>this._setProgressBar()) 
      })
      .catch(err => {
        this.setState({showIndicator : false})
      }) 
    }
    
    _setProgressBar = () =>{ 
      if (this.state.completetion < 0.3){
        this.setState({progressColor : 'rgba(224, 53, 40,.6)'})
      }
      else if (this.state.completetion >0.3 && this.state.completetion  < 0.7){
        this.setState({progressColor : 'rgb(209, 178, 38)'})
      }
      else if (this.state.completetion >0.7 ){
        this.setState({progressColor : 'rgb(5, 173, 72)'})
      } 
    } 
    
 
    ShowOrCloseExerienceModal = () => { 
      if (this.state.dialogVisible == true){
        this.setState({dialogVisible : false})
      }
      else {
        this.setState({dialogVisible : true})
      }
    }
 
    

    ShowOrCloseExerienceModal = () => { 
      if (this.state.dialogVisible == true){
        this.setState({dialogVisible : false})
      }
      else {
        this.setState({dialogVisible : true})
      }
    }

    ShowOrCloseIndustryModal = () => { 
      if (this.state.IndDialogVisible == true){
        this.setState({IndDialogVisible : false})
      }
      else {
        this.setState({IndDialogVisible : true})
      }
    }

    ShowOrCloseAcademicModal =()=>{
      if (this.state.AcaDialogVisible == true){
        this.setState({AcaDialogVisible : false})
      }
      else {
        this.setState({AcaDialogVisible : true})
      }
    }
 
    setIndustryData = (data) =>{
      this.setState({industryText : data})
    }

    setAcademicData = (data) =>{
      this.setState({academicText : data})
    }

    setExperienceData = (data) =>{
      this.setState({experienceText : data})
    }
 

    setAvater = (data) => {
      this.setState({avater : 'http://app.tech-solt.com/' + data}) 
      global.avater = 'http://app.tech-solt.com/' + data
    } 
 
  
    showInidcatorFunction=()=>{
      
      this.setState({
        showIndicator:true
      }) 
    }

    closeInidcator = ()=>{
      this.setState({
        showIndicator:false
      })
    }
   
  render() {   
  
    return (
      <ScrollView style={styles.verscroller}   > 

         
        <View style={styles.container}> 

            <HeaderSection
                completetion={this.state.completetion}
                progressColor={this.state.progressColor}
            />

            <UpperSection 
                ProfileData={this.state.ProfileData}
                avater={this.state.avater}
                props={this.props}
                setAvater={this.setAvater} 
                showIndicator={this.state.showIndicator}
                closeInidcator={this.closeInidcator}
                showInidcatorFunction={this.showInidcatorFunction}
            />

            <BodySection
                    ProfileData={this.state.ProfileData}
                    props={this.props}
            />

            <MiddleSection
                ProfileData={this.state.ProfileData}
                props={this.props} 

                _changeExperience={this._changeExperience}
                _changeIndustry={this._changeIndustry}
                _changeAcademic={this._changeAcademic}

                experienceText={this.state.experienceText}
                industryText={this.state.industryText}
                academicText={this.state.academicText}

                singlePickerExperienceSelectedItem={this.state.singlePickerExperienceSelectedItem}
                ShowOrCloseExerienceModal = {this.ShowOrCloseExerienceModal} 
                ShowOrCloseIndustryModal = {this.ShowOrCloseIndustryModal} 
                ShowOrCloseAcademicModal= {this.ShowOrCloseAcademicModal}

            />

            <SocialSection
                ProfileData={this.state.ProfileData} 
                props={this.props}
            />
            
            <ChangeExperienceModal
                visiblity = { this.state.dialogVisible}
                ShowOrCloseExerienceModal = {this.ShowOrCloseExerienceModal}
                setExperienceData={this.setExperienceData}
                // closeExperienceModal = { closeExperienceModal}
                singlePickerExperienceSelectedItem = {this.state.singlePickerExperienceSelectedItem}
            />

            <ChangeIndustryModal
                visiblity = {this.state.IndDialogVisible}
                ShowOrCloseIndustryModal = {this.ShowOrCloseIndustryModal}
                setIndustryData={this.setIndustryData} 
                // closeIndustryModal = { closeIndustryModal}
              />

           <ChangeAcademicModal
                visiblity = {this.state.AcaDialogVisible}
                ShowOrCloseAcademicModal = {this.ShowOrCloseAcademicModal}
                setAcademicData={this.setAcademicData} 
                selectedItem = {this.state.singlePickerAcademicSelectedItem}
                // closeIndustryModal = { closeIndustryModal}
              />
              
        </View>  
           
                 <MaterialDialog
                    title="Loging Out?"
                    visible={this.state.loggoutVisible}
                    onOk={() => {
                      _LogoutApi()
                      this.setState({ loggoutVisible: false })}
                    } 
                    onCancel={() => this.setState({ loggoutVisible: false })}>
                    <Text style={styles.dialogText}>
                      Are You Sure? Log out Why !
                    </Text>
                  </MaterialDialog>
    </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor:'transparent',  
    // padding :5
  }, 
  verscroller:{  
    width: '100%', 
    height :'100%',
    flex : 1,
    backgroundColor:'rgba(0, 15, 54 , 0.7)'
  },      
})