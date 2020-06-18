import React, { memo} from 'react'; 
import { View , StyleSheet ,TouchableOpacity } from 'react-native'; 
import { Icon } from 'react-native-elements' 
import {  responsiveScreenFontSize } from "react-native-responsive-dimensions"; 
import { useHistory } from 'react-router-native'; 
 
const SocialSection = ({...props}) => {   

    let history = useHistory();
    let ProfileData = props.ProfileData 

    const editSocialFacebook = () =>{
        history.push({pathname : '/Main/Profile/Social',
        state: { 
          ProfileData,
          type : 'facebook'
        }
      })     
    }
  

    const _changeTwitter = () => { 
      history.push({pathname : '/Main/Profile/Social',
      state: {
        ProfileData,
        type : 'twitter'
      }
      })     
    } 

    const _changeLinkedIn = () => { 
      history.push({pathname : '/Main/Profile/Social',
      state: {ProfileData,
        type : 'linkedin'
      }
      })     

    }  

      const _changeInstagram = () => { 
        history.push({pathname : '/Main/Profile/Social',
        state: {ProfileData,
          type : 'instagram'
        }
        })     
      }   

    return (    

                    <View style={styles.bottom} > 
                      <TouchableOpacity onPress={ editSocialFacebook}>
                        <Icon
                            name='facebook'
                            type='font-awesome'
                            color='#517fa4'
                            containerStyle={{margin :25}}
                            size ={responsiveScreenFontSize(3.2)} 
                          />  
                      </TouchableOpacity>

                      <TouchableOpacity onPress={ _changeLinkedIn}>
                        <Icon
                          name='linkedin'
                          type='font-awesome'
                          color='#517fa4'
                          size ={responsiveScreenFontSize(3.2)}
                          containerStyle={{margin :25}}
                          // onPress={this.editSocial('facebook')  }
                        />   
                      </TouchableOpacity>

                      <TouchableOpacity onPress={  _changeTwitter}>
                        <Icon
                            name='twitter'
                            type='font-awesome'
                            color='#517fa4'
                            size ={responsiveScreenFontSize(3.2)}
                            containerStyle={{margin :25}}
                            // onPress={this.editSocial('facebook')  }
                          />  
                      </TouchableOpacity>

                      <TouchableOpacity onPress={ _changeInstagram}>
                        <Icon
                          name='instagram'
                          type='font-awesome'
                          color='#517fa4'
                          size ={responsiveScreenFontSize(3.2)}
                          containerStyle={{margin :25}}
                          // onPress={this.editSocial('facebook')  }
                        />   
                      </TouchableOpacity>
                     
                 </View>  
                   

 
        )
} 

export default memo(SocialSection);

const styles = StyleSheet.create({   
 
  bottom:{
    flex : 1,
    height:'100%', 
    width:'100%', 
    backgroundColor : "#efefef", 
    flexDirection : 'row',
    justifyContent: 'space-between', 
    flexWrap : 'wrap',
    padding : 5 
  }, 
})
