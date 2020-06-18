import React, { memo } from 'react'; 
import { View , Text , StyleSheet,ImageBackground ,Image} from 'react-native'; 
import { Icon } from 'react-native-elements' 
import { ScrollView  } from 'react-native-gesture-handler'
import SelectableChips from 'react-native-chip/SelectableChips';  
import {
    responsiveHeight,
    responsiveWidth,
    responsiveScreenFontSize
  } from "react-native-responsive-dimensions";
import { RNChipView } from 'react-native-chip-view' 

const CardHeader = ({ arg}) => {
  

    const trimavater =(avater)=> {
        try{ 
            if (avater.startsWith("http://app.tech-solt.com/")) {
              let index = avater.indexOf("m/");
              let res = avater.substr(index+2, avater.length); 
              if (res.startsWith("http")){
                return res
              }
              else{ 
                return avater
              }
            }
          }
        catch(err){
          // 
        } 
      }
      
    return (
        <View style ={styles.header} onStartShouldSetResponder={() => true}>
            <ImageBackground imageStyle={{borderRadius : 10 , opacity:0.75 }} source={{uri:arg.avater.startsWith("http://app.tech-solt.com/")?  arg.avater :'http://app.tech-solt.com/' +arg.avater}} style={{width: '100%', height: '100%',borderRadius : 10}}>
                <View  style = {{backgroundColor: 'rgba(0, 15, 54 , 0.5)' ,width: '100%', height: '100%' , alignItems: 'center',borderRadius : 10}} >
                    <Image style={styles.avatar} resizeMode={'cover'}  source={{uri:arg.avater.startsWith("http://app.tech-solt.com/")? arg.avater :'http://app.tech-solt.com/' +arg.avater}}/> 
                    < Text style={styles.nameNew}>{(arg.first_name && arg.last_name)? arg.first_name + " " + arg.last_name : "Unknown"}</Text> 
                    <Text style={styles.userInfoNew}>{(arg.worktitle_text && arg.worktitle_address  ) ? arg.worktitle_text + " at " + arg.worktitle_address : "Unknown"}</Text> 
                    <RNChipView   title={arg.address? arg.address : "Unknown"} avatarStyle={{padding:3}} height={responsiveHeight(3)} titleStyle={{fontSize:responsiveHeight(1.5),fontFamily:'EBGaramond-Italic',color:"#fff"}}
                            backgroundColor={'rgba(235, 235, 235, .5)'}  
                            avatar={<Icon
                            name='map-marker'
                            color='#fff'
                            type='font-awesome' 
                            size={responsiveHeight(2)} 
                            />} 
                    />
                    <View style={styles.divider} />   
                    <ScrollView style={styles.Chipscroller} showsHorizontalScrollIndicator={false} horizontal={true}>
                        <SelectableChips  chipStyle={styles.chip}  valueStyle={styles.chipLabel}  initialChips={arg.interestings_text? arg.interestings_text.split(','): []} alertRequired={false}/>
                    </ScrollView>
                </View>
            </ImageBackground> 
        </View> 
    )
}
export default memo(CardHeader);

const styles = StyleSheet.create({ 
    header:{
        flex: 0.7, 
        marginBottom : -15
      },
    avatar: {
        marginTop : 10,
        width: responsiveHeight(12),
        height: responsiveHeight(12),
        borderRadius: responsiveHeight(12),
        borderWidth: 1,
        borderColor:  'rgba(0,0,0,.6)',
        marginBottom:10,  
        shadowColor:'#000'
    }, 
    nameNew :{  
    marginTop : -10,
    fontSize:responsiveScreenFontSize(3),
    color:"#ffffff", 
    fontFamily:'EBGaramond-Bold'
    },
    userInfoNew:{
      fontSize:responsiveScreenFontSize(2.2),
      color:"#ffffff", 
      fontFamily:'EBGaramond-SemiBold',
      marginBottom : 10
    }, 
    divider:{
        alignSelf: 'stretch',
        borderBottomColor: 'rgba(255,255,255,0.2)',
        borderBottomWidth: 1,
        marginTop : responsiveHeight(1.5), 
        marginBottom : 2,
        marginVertical:20,
    }, 
    chip: { 
        backgroundColor: "rgba(235, 235, 235, .5)",  
        
        borderColor : '#fff',
    },
    Chipscroller:{ 
      marginBottom :responsiveHeight(2), 
      marginEnd : 'auto',
      paddingHorizontal:responsiveWidth(3)
    },
    chip: { 
      backgroundColor: "rgba(235, 235, 235, .5)",  
      height: responsiveHeight(3), 
      borderColor : '#fff', 
      marginBottom :responsiveHeight(2), 
    },
    chipLabel:{
        fontSize:responsiveScreenFontSize(1.3),
        color: "#fff", 
        fontFamily:'EBGaramond-Medium'
    },
})
