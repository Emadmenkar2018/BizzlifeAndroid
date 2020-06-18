import React, { memo} from 'react'; 
import { View , Text ,Image ,StyleSheet , ImageBackground,ActivityIndicator ,PermissionsAndroid ,ToastAndroid} from 'react-native'; 
import { Icon } from 'react-native-elements' 
import {
    responsiveHeight,
    responsiveWidth,
    responsiveScreenFontSize
  } from "react-native-responsive-dimensions"; 
import { useHistory } from 'react-router-native'; 
import ImagePicker from 'react-native-image-picker';    
var RNFS = require('react-native-fs');

const UpperSection = ({...props}) => {  
 
    let history = useHistory();
    let ProfileData = props.ProfileData
    let avater = props.avater

 
    const options = {
      title: 'Select Avatar',
      customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images', 
      },
    };
 
    const trimavater =(avater)=> {
        try{  
            if (avater.startsWith("http://app.tech-solt.com/")) {
              return avater 
            }
            else{
              let Newavater = "http://app.tech-solt.com/"+'/' + avater
              return Newavater
            }
          }
        catch(err){ 
        } 
      } 
     
 
      const _changeName =()=>{ 
        history.push({pathname : '/Main/Profile/Name',
        state: {ProfileData}
        })   
      }
  
      const _changeWork = () => { 
        history.push({pathname : '/Main/Profile/Work',
        state: {ProfileData}
        })    
      } 
 


      const _pickImage = async () =>{ 
        PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.CAMERA , PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE]).then((result) => 
        {

          if (!JSON.stringify(result).toString().includes('denied')){ 
              ImagePicker.showImagePicker(options, (response) => {  
              if (response.didCancel) {
                console.log('User cancelled image picker');
                // props.closeInidcator()
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
                // props.closeInidcator()
              } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                // props.closeInidcator()
              } else { 
                var files = [
                  {
                    name: 'files',
                    filename: response.fileName,
                    filepath:  response.path,
                    filetype:response.type
                  }, 
                ];
                var uploadUrl = 'http://app.tech-solt.com/endpoint/v1/27ce3f02d98d388b9021021f74ffe702/users/update_avater_new';
    
                  RNFS.uploadFiles({
                    toUrl: uploadUrl,
                    files: files,
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                    },
                    fields: {
                      'access_token': global.AccesToken , 
                    },
                    begin: uploadBegin,
                    progress: uploadProgress
                  }).promise.then((response) => { 
                    let avater =  JSON.parse(response.body).avater 
                    props.setAvater(avater)
                      if (response.statusCode == 200) {
                        props.closeInidcator() // response.statusCode, response.headers, response.body
                      } else {
                        console.log('SERVER ERROR');
                      }
                    })
                    .catch((err) => {
                      console.log('SERVER ERROR');
                      if(err.description === "cancelled") {
                        // cancelled by user
                      }
                      // 
                      props.closeInidcator() // response.statusCode, response.headers, response.body

                    });
                      
                    }
                  }); 
          } 
          else {
            ToastAndroid.show('Permissions Not Granted', ToastAndroid.SHORT); 
          }
        }).catch(err =>{
          console.log('err',err)
          ToastAndroid.show('Permissions Not Granted d', ToastAndroid.SHORT); 
        })

          
        }
  

        var uploadBegin = (response) => {
          props.showInidcatorFunction()
          var jobId = response.jobId; 
        };
         
        var uploadProgress = (response) => { 
          var percentage = Math.floor((response.totalBytesSent/response.totalBytesExpectedToSend) * 100); 
        };
         
 
     

    return (  
        <View style={styles.header}>   

        
                <ImageBackground imageStyle={{opacity:0.8 }} source={{uri: trimavater(avater)}} style={{width: '100%', height: responsiveHeight(40) ,justifyContent:'center'}}>
                 
                    <View  style = {{backgroundColor: 'rgba(0, 15, 54 , 0.7)' ,width: '100%', height: '100%' , alignItems: 'center',padding:10 }} >

                      <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between'  }}>

                        <Icon name="arrow-back" type ={'material'} size={responsiveScreenFontSize(3.5)}   iconStyle={{color:'#e6e6e6'}} onPress={ ()=>history.goBack()} />
                        
                        <Icon name="cog" type ={'font-awesome'} size={responsiveScreenFontSize(3.5)}    iconStyle={{color:'#e6e6e6'}}   onPress={()=> history.push('/Main/Profile/Settings')} />
 
                      </View>
                    
                      
                      <View style={styles.headerContent}> 

                          <View  style={{flexDirection:'row'}}>
                              <Image style={styles.avatar} source={{uri: trimavater(avater)}}/> 
                              <Icon
                                      name='edit'
                                      type='font-awesome'
                                      color='#F16731'
                                      containerStyle={{  zIndex:1, alignSelf:'center',marginStart:-5}} 
                                      size={responsiveScreenFontSize(2)}
                                      onPress ={  _pickImage}
                                  />  
                          </View> 

                          <View style={{height:responsiveHeight(0.1)}}>
                             <ActivityIndicator size="large" color="#ff4d00" animating={props.showIndicator} />
                          </View>

                          <View style={styles.lineEdit}>
                            < Text style={styles.nameNew}>{(ProfileData.first_name && ProfileData.last_name)? ProfileData.first_name + " " + ProfileData.last_name : "Unknown"}</Text> 
                              <Icon
                                  name='edit'
                                  type='font-awesome'
                                  color='#F16731'
                                  containerStyle={{ marginStart : 3,marginTop : 3}} 
                                  onPress ={_changeName}
                                  size={responsiveScreenFontSize(2)}
                                 
                              /> 
                          </View>

                          <View style={styles.lineEdit}>

                            <Text style={styles.userInfoNew}>{(ProfileData.worktitle_text && ProfileData.worktitle_address  ) ? ProfileData.worktitle_text + " at " + ProfileData.worktitle_address : "Unknown"}</Text>
                            <Icon
                                name='edit'
                                type='font-awesome'
                                color='#F16731'
                                containerStyle={{ marginStart : 3,marginTop : 1}} 
                                onPress ={_changeWork}
                                size={responsiveScreenFontSize(2)}
                            /> 

                          </View> 

                      </View>

                  </View>

              </ImageBackground>

            </View>
        )
} 

export default memo(UpperSection);

const styles = StyleSheet.create({   

  header:{
    backgroundColor: "#ffffff",
    alignItems: 'center', 
  },
  headerContent:{
    alignItems: 'center', 
  },
  backImage: {
    alignSelf: 'stretch',
    height: responsiveHeight(35),   
   
  },
  userInfoNew:{
    marginStart : 16,
    fontSize:responsiveScreenFontSize(2),
    color:"#ffffff",
    fontWeight:'200',
    fontFamily:'EBGaramond-Medium'
  },
  lineEdit:{
    flexDirection: 'row',
    alignContent : 'center'
  },
  nameNew :{
    marginStart : 14,
    fontSize:responsiveScreenFontSize(2.4),
    color:"#ffffff", 
    fontFamily:'EBGaramond-Bold'
  },
  avatar: {
    marginStart:10,
    width: responsiveWidth(28),
    height:  responsiveWidth(28),
    borderRadius: 63,
    borderWidth: 1,
    borderColor: "#999",
    marginBottom:10,
  }, 
})
