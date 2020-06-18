import React, { memo , useState ,useEffect } from 'react'; 
import { StyleSheet, Image, Text, Modal ,View , TouchableOpacity  ,TouchableHighlight, ImageBackground} from 'react-native'; 
import Carousel from 'react-native-snap-carousel'; 
import {Dimensions } from "react-native";  
import { Icon } from 'react-native-elements';  
import { theme } from '../../utils/theme';
import SwipeButton from 'rn-swipe-button';

const halfWidth = Dimensions.get('window').width /2 
 
const MatchesModal = (props) => { 
    
    const [visibility , setVisibility] = useState(props.visiblity) ;  
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
    useEffect(() => {  
      });

   
    const _closeModal =()=>{ 
        setVisibility(false)
    }

    const _renderItem = ({item, index}) => {
        return ( 
                    <View style={{flexDirection:'row',alignItems:'center',alignContent:'center',alignSelf:'center',position:'absolute',top:150 , overflow:'hidden',}}>
                        <View style={{overflow:'hidden'}}>
                            <Image style={styles.avatar} source={{uri:'https://images.unsplash.com/photo-1580936000458-781431ff8911?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'}}/> 
                        </View>
                        <View style={{paddingLeft:-20}}>
                            <Image style={styles.avatarSec} source={{uri:'https://images.unsplash.com/photo-1580934427136-e7a058ef8902?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'}}/> 
                        </View>
                    </View>
          
        );
    } 

    const facebookIcon = () => (
        <Icon name="fingerprint" type={'material'} color="#3b5998" containerStyle={{backgroundColor:'#000'} }size={30} />
      );

    const _goToChat = () => {  
        props.navigation.navigate('DeneSection')
        setVisibility(false)
    }
         
    return (
    <Modal
        animationType="slide" 
        visible={visibility}
        transparent={false} > 
        {/* <ImageBackground style={styles.container} > */}
            <View style={{alignContent:'center',alignItems:'center',height:'100%',width:'100%',backgroundColor:theme.colors.surface}}> 
                <TouchableHighlight style={{position:'absolute',top :20,right :20,width :40,height :40}} onPress={_closeModal}  >
                    <Icon 
                        name='close'
                        type='material'
                        color='#fff' 
                        size={40}
                        iconStyle={{fontWeight:'bold'}}
                        // containerStyle={{position:'absolute',top :20,right :20}}
                        
                    /> 
                </TouchableHighlight> 
                <View style={{top:30,alignContent:'center',alignItems:'center'}}>
                    <Text style={{top:100,fontSize:26,fontWeight:'bold',color:'#fff'}}>Your Matches</Text> 
                    <Carousel
                                // ref={_carousel}
                                data={entries}
                                renderItem={_renderItem}
                                sliderWidth={350}
                                itemWidth={240}
                            />  
                    <View style={{bottom:120,fontSize:26,fontWeight:'bold',color:'#fff'}} >
                        <SwipeButton  
                            thumbIconBackgroundColor="#FFFFFF"
                            thumbIconComponent={facebookIcon}
                            title="Swipe Right To Chat"
                            titleColor={'#fff'}
                            railBackgroundColor={'rgba(176, 220, 247,0.2)'}
                            thumbIconBorderColor={'transparent'}
                            thumbIconBackgroundColor='#000'
                            swipeSuccessThreshold={100}
                            railBackgroundColor='rgba(188, 217, 235,.2)'
                            railBorderColor={'transparent'}
                            width={300}
                            height={80}
                            titleStyles={{marginLeft : 40,paddingStart : 20,fontSize:15}}
                            iconSize={40} 
                            onSwipeSuccess={()=>_goToChat}
                            shouldResetAfterSuccess={true}
                            />
                    </View>
                   
                </View> 
                
                
                <SwipeButton
                        // thumbIconImageSource={arrowRight}
                        // onSwipeStart={() => this.showToastMessage('Swipe started!')}
                        // onSwipeFail={() => this.showToastMessage('Incomplete swipe!')}
                        // onSwipeSuccess={() =>
                        //     this.showToastMessage('Submitted successfully!')
                        // }
                        />
                
                 
            </View> 

        {/* </ImageBackground> */}

    </Modal>    
    );
}

const styles = StyleSheet.create({
    container: {
        height:'100%',
        width:'100%',
        position:'absolute', 
        alignContent:'center',
        alignItems:'center',
        backgroundColor :theme.colors.surface, 
    },
    avatar: {
      marginTop : 0,
      width: 130,
      height: 130,
      borderRadius: 65,
      borderWidth: 1, 
    // borderRightColor:'#fff',
    
      borderColor: "white",
      marginBottom:10, 
    },
    avatarSec: {
        marginStart:-20,
        marginTop : 0,
        width: 130,
        height: 130,
        borderRadius: 65, 
        paddingLeft:20,
        borderWidth: 1, 
        // borderLeftWidth:3,
        // borderRightWidth:3,
        paddingLeft:-15,
        borderColor: "#fff",
        marginBottom:10, 
      },
});

export default memo(MatchesModal);