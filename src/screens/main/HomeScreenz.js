import React from 'react'
import {   StyleSheet ,View  ,Platform , ToastAndroid ,ActivityIndicator ,BackHandler,Alert } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import { NewCard } from '../../../components/Main/NewCard'
import '../../../utils/global.js' 
import Dialog from "react-native-dialog";  
import {  TouchableWithoutFeedback  } from 'react-native-gesture-handler' 
import { CheckSwipeDateApi ,GetSayHiApi,RandomusersApi,addlikesApi} from '../../../services/api'   
import MatchesModal from '../../../components/Main/MathcesModal'
import TimerModal from '../../../components/Main/TimerModal'
import Header from '../../../components/Main/Header'
import Footer from '../../../components/Main/Footer'
import EmptyComponent from '../../../components/Main/EmptyComponent' 

class HomeScreen extends React.Component {  

      user_ispro = global.is_pro    
      increase = 0 
    state = {
      HomeScreenPics : [],
      ProfileData : '',  
      numberofCards : '',
      dialogVisible: false,
      showTheThing :true,
      showTimer : false,
      modalVisible :false,  
      showMatches: false,
      matchedData : '',
      swiping:false ,
      showIndicator: false,
      emptyComponent:false,

    };
    
    // shouldComponentUpdate(nextProps, nextState) {
    //   return this.state.HomeScreenPics[0] !== nextState.HomeScreenPics[0];
    // }

    
    componentDidMount() {
      BackHandler.addEventListener("hardwareBackPress", this.backButtonHandler);
      this.setState({showIndicator : true})
      this._fetchRandomUsers() 
      if (this.user_ispro ==0){
        this.CheckRights();
      }  
      
      // this.checkMatches();
    }

    componentWillUnmount() {
      BackHandler.removeEventListener("hardwareBackPress", this.backButtonHandler);
    }


    backButtonHandler = () => {
      this.increase ++  
      if(this.increase === 2){ 
          BackHandler.exitApp();
          this.increase = 0
      }else if(this.increase === 1) {   
          if (Platform.OS === 'android') {
            ToastAndroid.show("Press Again To Exit", ToastAndroid.SHORT)
          } else {
            Alert.alert("Press Again To Exit");
          } 
          setTimeout( () => { this.increase = 0}, 2000);
          return true; 
      }
      return true; 
    } 
  
    _fetchRandomUsers= ()=>{
      let bodyFormData = new FormData();  
      bodyFormData.append('access_token',global.AccesToken) 
      RandomusersApi(bodyFormData).then(response => {    
        if (Platform.OS === 'android') {
          ToastAndroid.show('Users  Fetched!', ToastAndroid.SHORT)
        } else {
          Alert.alert('Users  Fetched!');
        } 
        if(response.data.length > 0){
          this.setState({
            HomeScreenPics : response.data.slice(0, 5),
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
        }
      );  
    } 
 
  checkMatches=()=>{
    let bodyFormData = new FormData();  
    bodyFormData.append('access_token',global.AccesToken)
    GetSayHiApi(bodyFormData).then((response) => { 
      if (Platform.OS === 'android') {
        ToastAndroid.show('Matches  Fetched!', ToastAndroid.SHORT)
      } else {
        Alert.alert('Matches  Fetched!');
      } 
      if (response.data){   
        this.setState({showMatches : true })
      }
      else{
        this.setState({showMatches : false })
      }
    })
    .catch(err => {
      
      return;
    });  
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
      this.setState({ dialogVisible: false ,showTheThing: false ,showTimer: true,swiping : false});
    };
  
    handlePositive = () => { 
      this.setState({ dialogVisible: false ,showTheThing: false ,showTimer: true,swiping : false });
      this.props.history.push('/Main/GoPro') 
    };
      
      _chechRight =(cardIndex) =>{  
        let bodyFormData = new FormData();
        bodyFormData.append('access_token',global.AccesToken) 
        bodyFormData.append('likes', this.state.HomeScreenPics[cardIndex].id ) 
        bodyFormData.append('dislikes','');
        bodyFormData.append('supermatches','');
        if (this.user_ispro == 1){ 
            addlikesApi(bodyFormData).then(() => {  
              if (Platform.OS === 'android') {
                ToastAndroid.show('Likes Added Successfully', ToastAndroid.SHORT)
              } else {
                Alert.alert('Likes Added Successfully');
              } 
            }) 
            .catch(err => {
              
              return;
            }); 
        }
        else if (this.user_ispro == 0) { 
          if ( global.UserSwipes < global.totalSwipes){  
            addlikesApi(bodyFormData).then(response  => {   
              if (Platform.OS === 'android') {
                ToastAndroid.show('Likes Added Successfully', ToastAndroid.SHORT)
              } else {
                Alert.alert('Likes Added Successfully');
              } 
              global.UserSwipes =  global.UserSwipes + 1
              if (global.UserSwipes  >= global.totalSwipes){
                this.setState({showTheThing : false , showTimer : true ,swiping : false}) 
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
              if (Platform.OS === 'android') {
                ToastAndroid.show('dislikes Added Successfully', ToastAndroid.SHORT)
              } else {
                Alert.alert('dislikes Added Successfully');
              }  
            }) 
            .catch(err => {
              
              return;
            }); 
        }
        else if (this.user_ispro == 0) { 
          if ( global.UserSwipes< global.totalSwipes){  
            addlikesApi(bodyFormData).then(response  => {  
              if (Platform.OS === 'android') {
                ToastAndroid.show('dislikes Added Successfully', ToastAndroid.SHORT)
              } else {
                Alert.alert('dislikes Added Successfully');
              }  
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
              if (Platform.OS === 'android') {
                ToastAndroid.show('Super match Added Successfully', ToastAndroid.SHORT)
              } else {
                Alert.alert('Super match Added Successfully');
              }   
            }) 
            .catch(err => {
              
              return;
            }); 
        }
        else if (this.user_ispro == 0) { 
          if (global.userSuperMatch < 1){  
            addlikesApi(bodyFormData).then(response  => {  
              if (Platform.OS === 'android') {
                ToastAndroid.show('SuperMatch  Added Successfully', ToastAndroid.SHORT)
              } else {
                Alert.alert('SuperMatch  Added Successfully');
              }  
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


      //#region timer modal functoins
      
        finishTimer =() =>{ 
          this.setState({showTheThing:true  , showTimer : false ,swiping : true})
        }
      
        closeTimer = () => {
          this.setState({showTheThing:false ,showTimer : false})
        }

      //#endregion
  



  //#region footer functions

    redoBtn= ()=>{   
      try{
        if (this.swiper){
          global.UserSwipes = 0  
          global.userSuperMatch = 0 
          this.swiper.jumpToCardIndex(0)
        }
      }
      catch(err){
        throw err;
      }
    }

    swiperight= ()=>{ 
      try{
        if (this.swiper){
          if (this.user_ispro == 0){  
            if ( global.UserSwipes < global.totalSwipes){
              this.swiper.swipeRight() 
            }
            else{  
              if (Platform.OS === 'android') {
                ToastAndroid.show('You Cant Swipe Today', ToastAndroid.SHORT)
              } else {
                Alert.alert('You Cant Swipe Today');
              }  
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
              if (Platform.OS === 'android') {
                ToastAndroid.show('You Cant Swipe Today', ToastAndroid.SHORT)
              } else {
                Alert.alert('You Cant Swipe Today');
              }  
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

    swipetop=() =>{
      try{
        if (this.swiper){
          if (this.user_ispro == 0){   
            if ( global.UserSwipes < global.totalSwipes && global.userSuperMatch < 1){
              this.swiper.swipeTop() 
            }
            else {
              if (Platform.OS === 'android') {
                ToastAndroid.show('You Cant Swipe Today', ToastAndroid.SHORT)
              } else {
                Alert.alert('You Cant Swipe Today');
              }  
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
  //#endregion
   
  
  renderFinish = () => {
    try{
      this.setState({emptyComponent : true})
    }
    catch(err){
      throw err;
    }
  }

  render() 
  {    
    return ( 
        <View style={styles.container}> 
          <TouchableWithoutFeedback style={{width:'100%',height:'100%'}} onPress={() => {}}>
              <View   onStartShouldSetResponder={() => true}  style={styles.container}    >   

                <Header 
                />

              <ActivityIndicator size="large" color="#ff4d00" animating={this.state.showIndicator} />

                {this.state.emptyComponent && 
                    <EmptyComponent/>
                  }

                  {this.state.HomeScreenPics.length > 0 &&
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
                      stackSize={3} 
                      // stackScale={-1} 
                      backgroundColor="#e6e6e6" 
                      stackSeparation={0}
                      onSwipedRight={(cardIndex)=> this._chechRight(cardIndex) } 
                      onSwipedLeft =  {(cardIndex)=> { this._chechLeft(cardIndex)  }} 
                      onSwipedTop =  {(cardIndex)=> { this._chechTop(cardIndex)}} 
                      cardStyle={ { borderRadius: 4}}
                      containerStyle = {{height : '100%'}}
                      useViewOverflow={Platform.OS === 'ios'} 
                      onSwipedAll={this.renderFinish} 
                      useViewOverflow={false}
                      />  
                  } 
              </View>
              
          </TouchableWithoutFeedback> 

          {this.state.showTheThing &&
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
})

export default HomeScreen