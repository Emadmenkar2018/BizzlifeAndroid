import { PricingCard } from 'react-native-elements';
import React, {useRef}  from 'react';
import {  View ,Text } from 'react-native';  
import Carousel from 'react-native-snap-carousel';
// import GradientButton from 'react-native-gradient-buttons'; 
import EditHeader from '../../../components/Profile/EditHeader.js'; 
import {
    responsiveHeight,
    responsiveWidth,
    responsiveScreenFontSize
  } from "react-native-responsive-dimensions";

const GoproScreen = ({...props}) => {  

    const _carousel = useRef(null); 
    const entries = [
        {
            name : 'Normal Package',
            title:'1 month',
            info:['109,99 TRY','Per Month'],
            color:'#0068d6'

        },
        {
            name : 'Ekonomic Package',
            title:'6 month', 
            info:['64,99 TRY','Per Month'],
            color:'#dbd804'
        },
        {
            name : 'Golden Package',
            title:'12 month', 
            info:['45,83 TRY','Per Month'],
            color:'#d65600'
        }
    ]

    const _renderItem = ({item, index}) => {
        return (
            
                    <PricingCard
                            color="#4f9deb"
                            title={item.name}
                            price={item.title}
                            info={item.info}
                            color={item.color}
                            button={{ title: 'GET STARTED', icon: 'flight-takeoff' ,buttonStyle:{backgroundColor: '#b08a00'} } }
                            titleStyle={{fontSize : responsiveScreenFontSize(3)}}
                            pricingStyle ={{fontSize : responsiveScreenFontSize(2.8)}}
                            infoStyle ={{fontSize : responsiveScreenFontSize(2.3),fontWeight:'200'}} 
                    />
          
        );
    }
    
        return(
            <View style={{ flex: 1 ,backgroundColor:'#2d2d2d'}} > 
            
                <EditHeader 
                    showSaveBtn = {false}
                    title={'Go Pro'}
                /> 

                <View style={{   paddingRight : 20,paddingBottom:20,paddingLeft:20 ,backgroundColor:'#fff' ,height:'90%',alignContent:'center',justifyContent:'center' ,alignSelf:'center',alignItems:'center'}}> 
                    
                    <Text  style={{marginStart : 10,fontSize : responsiveScreenFontSize(2.7), fontWeight:'bold', color : '#000',marginBottom :15} } >Packages </Text> 
                    
                    <Carousel
                        ref={_carousel }
                        firstItem={1}
                        data={entries}
                        renderItem={_renderItem}
                        sliderWidth={responsiveWidth(100)}
                        itemWidth={responsiveWidth(60)}
                        contentContainerCustomStyle={{alignSelf:'center',alignContent:'center',alignItems:'center' ,marginTop:-responsiveHeight(18)}}
                    /> 
                </View>
            </View> 
        ) 
}

export default GoproScreen;