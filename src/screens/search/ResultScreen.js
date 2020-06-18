 
import React, {useState, Fragment} from 'react'
import { Alert,Modal ,SafeAreaView, StyleSheet ,View  ,Platform ,ActivityIndicator ,Text,Image, Button,ToastAndroid,BackHandler} from 'react-native'
import Swiper from 'react-native-deck-swiper'
import { NewCard } from '../../../components/Main/NewCard'
import '../../../utils/global.js'
import axios from 'axios'; 
import Dialog from "react-native-dialog";
// import Button from 'react-native-button';
import { Icon } from 'react-native-elements' 
import {Dimensions } from "react-native";  
import { ScrollView, TouchableWithoutFeedback  } from 'react-native-gesture-handler'
import { theme } from '../../../utils/theme'
import { CheckSwipeDateApi , addlikesApi,SearchProfileApi} from '../../../services/api'  
import {maxSwipePerDay} from '../../../settings.js'; 
import MatchesModal from '../../../components/Main/MathcesModal'
import TimerModal from '../../../components/Main/TimerModal'
import SearchHeader from '../../../components/Search/SearchHeader'
import Footer from '../../../components/Main/Footer'
import EmptyComponent from '../../../components/Main/EmptyComponent'

// import { HomeScreenPics } from './Pics' 

const halfWidth = Dimensions.get('window').width /2 
const halfLength = Dimensions.get('window').height /2 

class ResultScreen extends React.Component {  

  user_ispro = global.is_pro    
  
    state = {
      HomeScreenPics : this.props.location.state.HomeScreenPics ?   this.props.location.state.HomeScreenPics : [],
      ProfileData : '',  
      numberofCards : this.props.location.state.numberofCards ? this.props.location.state.numberofCards : 0 ,
      dialogVisible: false,
      showTheThing :true,
      showTimer : false,
      modalVisible :false,  
      showMatches: false,
      matchedData : '',
      swiping:false,
      emptyComponent:false,
      showIndicator: false
    };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.backButtonHandler);
    this.setState({showIndicator : true})
    // this._fetchSearchedUsers() 
    if (this.user_ispro ==0){
      this.CheckRights();
    }  
  } 
 
    componentWillUnmount() {
      BackHandler.removeEventListener("hardwareBackPress", this.backButtonHandler);
    }

  backButtonHandler = () => {
      this.props.history.goBack();
      return true;
    } 

  _fetchSearchedUsers= ()=>{
    if (this.props.location.state.titles.length>0 || this.props.location.state.goals.length>0 || this.props.location.state.interests.length>0 || this.props.location.state.Locations.length>0){
      let bodyFormData = new FormData();  
      bodyFormData.append('access_token',global.AccesToken),
      bodyFormData.append('titles', this.props.location.state.titles); 
      bodyFormData.append('goals', this.props.location.state.goals);  
      bodyFormData.append('interests', this.props.location.state.interests);  
      bodyFormData.append('locations', this.props.location.state.Locations);    
      SearchProfileApi(bodyFormData).then((response) => {  
          ToastAndroid.show('Result Found!', ToastAndroid.SHORT); 
          if(response.data.length > 0){
            this.setState({
              HomeScreenPics : response.data,
              numberofCards :  response.data.length,
              showIndicator : false
            })
          }  
          else {
            this.setState({showIndicator : false,emptyComponent:true,showTheThing : false ,swiping : false }) 
          }
          }).catch(err => {
            
            this.setState({showIndicator : false,emptyComponent:true,showTheThing : false ,swiping : false }) 
            return;
          })
      }
      else {
        ToastAndroid.show('No Result Found!', ToastAndroid.SHORT); 
        this.setState({showIndicator : false,emptyComponent:true,showTheThing : false ,swiping : false }) 

      }
    }

    CheckRights =() =>{ 
      let bodyFormData = new FormData();  
      bodyFormData.append('access_token',global.AccesToken)
      CheckSwipeDateApi(bodyFormData).then((response) => { 
        if (response){  
          global.UserSwipes =  response.data[0]['COUNT(*)'] 
          
          if (global.UserSwipes  < global.totalSwipes){ 
            this.setState({showTheThing : true , showTimer : false,swiping : true})
          }
          else {  
            this.setState({showTheThing : false , showTimer : true ,swiping : false })          
          }  
  
  
          if (response.superliked[0]['COUNT(*)'] == 1){
            global.userSuperMatch = 1
          }
          else {
            global.userSuperMatch = 0
          } 
        }
      })
      .catch(err => {
        
        return;
      });  
    }


    showDialog = () => { 
      this.setState({ dialogVisible: true });
    };

    handleCancel = () => {
      this.setState({ dialogVisible: false ,showTheThing: false ,showTimer: true ,swiping : false});
    };

    handlePositive = () => { 
      this.setState({ dialogVisible: false ,showTheThing: false ,showTimer: true ,swiping : false });
      this.props.history.push('/Main/GoPro') 
    };

    
 

    swiperight= ()=>{
      try{
        if (this.swiper){
          if (this.user_ispro == 0){  
            if ( global.UserSwipes < global.totalSwipes){
              this.swiper.swipeRight() 
            }
            else{  
              ToastAndroid.show('You Cant Swipe Today', ToastAndroid.SHORT);   
            }   
          }
          else if (this.user_ispro == 1){
            this.swiper.swipeRight() 
          } 
        }
      }
      catch(err){
         throw err;
      }
    }
 
      
    swipeleft = () =>{
      try{
        if (this.swiper){
          if (this.user_ispro == 0){  
            if ( global.UserSwipes < global.totalSwipes){
              this.swiper.swipeLeft()  
            }
            else{  
              ToastAndroid.show('You Cant Swipe Today', ToastAndroid.SHORT);   
            }   
          }
          else if (this.user_ispro == 1){
            this.swiper.swipeLeft() 
          }  
        }
      }
      catch(err){
         throw err;
      }
    } 

    swipetop=() =>{ 
      try{
        if (this.swiper){
          if (this.user_ispro == 0){   
            if ( global.UserSwipes < global.totalSwipes && global.userSuperMatch < 1){
              this.swiper.swipeTop() 
            }
            else {
              ToastAndroid.show('You Cant Swipe Today', ToastAndroid.SHORT);  
            }
          }
          else if (this.user_ispro == 1){
            this.swiper.swipeTop() 
          }   
        }
      }
      catch(err){
         throw err;
      }
    }


    

   redoBtn= ()=>{   
      try{
        if (this.swiper){
          global.UserSwipes = 0  
          this.swiper.jumpToCardIndex(0)
        }
      }
      catch(err){
         throw err;
      }
    }

    _chechRight =(cardIndex) =>{  
      let bodyFormData = new FormData();
      bodyFormData.append('access_token',global.AccesToken) 
      bodyFormData.append('likes', this.state.HomeScreenPics[cardIndex].id ) 
      bodyFormData.append('dislikes','');
      bodyFormData.append('supermatches','');
      if (this.user_ispro == 1){ 
          addlikesApi(bodyFormData).then(() => { 
            ToastAndroid.show('Likes Added Successfully', ToastAndroid.SHORT);  
          }) 
          .catch(err => {
            
            return;
          }); 
      }
      else if (this.user_ispro == 0) { 
        if ( global.UserSwipes < global.totalSwipes){  
          addlikesApi(bodyFormData).then(response  => {  
            ToastAndroid.show('Likes Added Successfully', ToastAndroid.SHORT); 
            global.UserSwipes =  global.UserSwipes + 1
            if (global.UserSwipes  >= global.totalSwipes){
              this.setState({showTheThing : false , showTimer : true,swiping : false}) 
            }
          }) 
          .catch(err => { 
            return;
          }); 
        }
      } 
    }


    _chechLeft =(cardIndex) =>{ 
      let bodyFormData = new FormData();
      bodyFormData.append('access_token',global.AccesToken) 
      bodyFormData.append('likes', '') 
      bodyFormData.append('dislikes',this.state.HomeScreenPics[cardIndex].id );
      bodyFormData.append('supermatches','');
      if (this.user_ispro == 1){ 
          addlikesApi(bodyFormData).then(() => { 
            ToastAndroid.show('dislikes Added Successfully', ToastAndroid.SHORT);  
          }) 
          .catch(err => {
            
            return;
          }); 
      }
      else if (this.user_ispro == 0) { 
        if ( global.UserSwipes< global.totalSwipes){  
          addlikesApi(bodyFormData).then(response  => {  
            ToastAndroid.show('dislikes Added Successfully', ToastAndroid.SHORT); 
            global.UserSwipes=  global.UserSwipes+ 1
            if (global.UserSwipes  >= global.totalSwipes){
              this.setState({showTheThing : false , showTimer : true,swiping : false}) 
            }
          }) 
          .catch(err => { 
            return;
          }); 
        }
      } 
    } 


    _chechTop =(cardIndex) =>{
        let bodyFormData = new FormData();
        bodyFormData.append('access_token',global.AccesToken) 
        bodyFormData.append('likes', '') 
        bodyFormData.append('dislikes', '');
        bodyFormData.append('supermatches',this.state.HomeScreenPics[cardIndex].id);
        if (this.user_ispro == 1){ 
            addlikesApi(bodyFormData).then(() => { 
              ToastAndroid.show('dislikes Added Successfully', ToastAndroid.SHORT);  
            }) 
            .catch(err => {
              
              return;
            }); 
        }
        else if (this.user_ispro == 0) { 
          if (global.userSuperMatch < 1){  
            addlikesApi(bodyFormData).then(response  => { 
              ToastAndroid.show('SuperMatch Added Successfully', ToastAndroid.SHORT); 
              global.userSuperMatch = global.userSuperMatch + 1
              global.UserSwipes=  global.UserSwipes+ 1
              if (global.UserSwipes  >= global.totalSwipes){
                this.setState({showTheThing : false , showTimer : true,swiping : false}) 
              }
            }) 
            .catch(err => { 
              return; 
            }); 
          }
        } 
      }


      finishTimer =() =>{
        this.setState({showTheThing:true , showTimer : false,swiping : true })
      }

      closeTimer = () => {
        this.setState({showTheThing:false ,showTimer : false})
      }


      _gotoBack=() =>{  
          if ( this.likedIndexes || this.dislikedIndexes || this.superlikedIndexes){ 
          this.addlikesApi().then(() => {
            ToastAndroid.show('Likes Added Successfully', ToastAndroid.SHORT);
            if (global.is_pro === 0){
              global.totalSwipes = global.totalSwipes - this.swipeCount
            } 
            this.props.navigation.goBack(null) 
            this._clearingLikes()
          }) 
          .catch(err => {
            
            return;
          }); 
        }
        else {
          this.props.navigation.goBack(null) 
        } 
      }
 
      renderFinish = () => {
        this.setState({emptyComponent : true})
      }
    render() 
    {     

      return ( 
        <View style={styles.container}> 
          <TouchableWithoutFeedback style={{width:'100%',height:'100%'}} onPress={() => {}}>
              <View   onStartShouldSetResponder={() => true}  style={styles.container}    >   

                <SearchHeader 
                />
              <ActivityIndicator size="large" color="#ff4d00" animating={this.state.showIndicator} />

                  {this.state.emptyComponent && 
                    <EmptyComponent/>
                  }

                  { this.state.HomeScreenPics.length > 0  && 
                    <Swiper
                      id='omar'
                      ref={swiper => { this.swiper = swiper }}  
                      cards={this.state.HomeScreenPics}
                      renderCard={NewCard}
                      verticalSwipe = {false}
                      showSecondCard = {true} 
                      horizontalSwipe={this.state.swiping}   
                      animateCardOpacity={true}
                      onTapCardDeadZone={0}
                      infinite ={false} 
                      backgroundColor="#e6e6e6" 
                      stackSeparation={0}
                      onSwipedRight={(cardIndex)=> this._chechRight(cardIndex) } 
                      onSwipedLeft =  {(cardIndex)=> { this._chechLeft(cardIndex)  }} 
                      onSwipedTop =  {(cardIndex)=> { this._chechTop(cardIndex)}} 
                      cardStyle={ { borderRadius: 4}}
                      containerStyle = {{height : '100%'}}
                      useViewOverflow={Platform.OS === 'ios'} 
                      onSwipedAll={this.renderFinish}
                      />  
                  }
              </View>
              

          </TouchableWithoutFeedback> 

         

          { this.state.showTheThing  &&
            <Footer
              redoBtn = {this.redoBtn}
              swipeleft={this.swipeleft}
              swiperight={this.swiperight}
              swipetop={this.swipetop}
            />
          }
 
    
        <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title>Your Daily Swipe Limit is Over</Dialog.Title>
          <Dialog.Description>
            Do You Want To Go Pro
          </Dialog.Description>
          <Dialog.Button label="Cancel" onPress={this.handleCancel} />
          <Dialog.Button label="Yes" onPress={this.handlePositive} />
        </Dialog.Container>   


        <TimerModal  
          showTimer={this.state.showTimer}
          finishTimer = {this.finishTimer}
          closeTimer =  {this.closeTimer }
          {...this.props}
        />  

          <MatchesModal  visiblity={this.state.showMatches} {...this.props}/> 
      </View> 
      )
    }
  } 

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#e6e6e6', 
},
experBlog:{
  flexDirection:'row', 
  position : 'absolute', bottom : 30 , right : halfWidth - 90 , 
}, 
experBlogsec:{
  flexDirection:'row', 
  position : 'absolute', bottom : 30 , left : halfWidth - 90 , 
  transform: [
    { rotate: '180deg' }
],
}, 
containerNew: {
  flex: 1, 
  height: '100%',
  
  // marginEnd :20,
  borderRadius : 6
},
tophover:{ 
  backgroundColor: "red",
  width : 20, 
  height : 10,
  position : 'absolute', 
  top : 0,
  flexDirection: 'row',
},
avatar: {
  width: 53,
  height: 53,
  borderRadius: 30,
  borderWidth: 1,
  borderColor: "black",
  marginBottom:10,
},
avatarbtn:{ 
  alignItems: 'center', 
  backgroundColor : 'transparent',
  position : 'absolute', 
  top : 24,   
  left : 28,
  borderRadius : 20, 
  paddingLeft : 3,
  paddingRight : 3
},
// hover:{
//   backgroundColor: "transparent",
//   width : '100%',  
//   position : 'absolute',
//   flexDirection: 'row',
//   justifyContent: 'space-between', 
//   bottom : 0
// },
 hover :{
    bottom : 0 
},
btntopleft: {  
  
},
btnleft: {  
  borderRadius:40
}, 
btnright: {  
  backgroundColor: "red",
  bottom:0,
  left :20
},
srchbtn : {
  marginTop:12,
  marginStart:'40%',
  flexDirection : "row",
  alignItems: 'center', 
  // position : 'absolute', 
  backgroundColor: '#fff',
  borderWidth : 1,
  borderColor:theme.colors.surface,
  height:30,
  // top : 25,   
  // left : halfWidth - 40,
  borderRadius : 30, 
  paddingLeft : 3,
  paddingRight : 3

} ,
txt :{
  color : "#2e2e2e",
  marginEnd : 5,
  marginStart:-5,
  fontWeight:'bold'
},
triangleR: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 27,
    borderRightWidth: 27,
    borderBottomWidth: 43,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor:"#4CC756",
    transform: [
        { rotate: '90deg' }
    ],
    margin: 0,
    marginLeft: -6,
    borderWidth: 0, 
    borderColor:"transparent"
},
recatngleR:{
  marginTop : 2,
  width: 40,
  height: 40, 
  backgroundColor: '#4CC756'
}, 
triangleL: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 21,
    borderRightWidth: 21,
    borderBottomWidth: 37,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor:"#999999",
    transform: [
        { rotate: '90deg' }
    ],
    margin: 0,
    marginLeft: -6,
    borderWidth: 0, 
    borderColor:"transparent"
},
recatngleL:{
  marginTop : -1,
  width: 40,
  height: 40, 
  backgroundColor: '#999999'
}
})

export default ResultScreen