import React  from 'react';
import { View ,StyleSheet  } from 'react-native'  
import { theme } from '../../utils/theme'
import CardHeader from './CardHeader'
import BlueSection from './BlueSection'  
import WhiteSection from './WhiteSection'   
import SocialSection from './SocialSection'     
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler'   


export const NewCard = ({ ...arg}) => {  
 
    return (   
      <TouchableWithoutFeedback style={{width:'100%',height:'100%'}} onPress={() => {}} > 

        <View style={styles.container} onStartShouldSetResponder={() => true}>

          <ScrollView  showsVerticalScrollIndicator={false}  overScrollMode={'always'} style ={styles.scroller}>

             <CardHeader
              arg = {arg}
              />  

            <TouchableWithoutFeedback style={{width:'100%',height:'100%'}} onPress={() => {}} > 

              <View style ={styles.body} onStartShouldSetResponder={() => true}>  

                  <BlueSection
                    arg = {arg}
                  />  

                  <WhiteSection
                    arg = {arg}
                  />

                  <SocialSection
                    arg = {arg}
                  />

              </View> 

            </TouchableWithoutFeedback>

          </ScrollView>  
            
        </View>

      </TouchableWithoutFeedback>
      
    ) 
  }

const styles = StyleSheet.create({ 
    container: { 
      flex: 1,
      backgroundColor:theme.colors.surface,   
      borderWidth : 1 ,
      borderRadius : 10,
      borderColor : '#999999'
    },  
   
    body:{
      flex :1
    }, 
    scroller:{  
      flex: 1,
      height: '100%',
      width:'100%',
    },  
  })