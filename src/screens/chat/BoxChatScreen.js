import React  , {Component} from 'react' 
import {  View,KeyboardAvoidingView  ,ImageBackground, StyleSheet ,BackHandler} from 'react-native'; 
import {GetChatConversationApi ,SendMessageApi} from '../../../services/api'; 
import {  Icon } from 'react-native-elements';   
import { GiftedChat ,Bubble,Time,InputToolbar ,Day} from 'react-native-gifted-chat'
import ChatBoxHeader from '../../../components/Chat/ChatBoxHeader' 

export default class BoxChatScreen extends  Component {
  _isMounted = false;
  constructor(props) {
    super(props);     
  }  

  state = {
    messages: [],
    isLoading: true,
    
    touserid : this.props.location.state.touserid ,
    toavater :  this.props.location.state.toavater ,
    tofullname :  this.props.location.state.tofullname ,
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.backButtonHandler);
    this._isMounted = true;
    this.fetchConversation() 
    this.timer = setInterval(()=> {
      if(this._isMounted  && this.state.isLoading){
        this.fetchConversation()  
      }
    }, 5000)  
  }

   componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backButtonHandler);
      this._isMounted = false;
      this.setState({isLoading : false})
      clearInterval(this._interval);
  }

  backButtonHandler = () => {
    this.props.history.goBack();
    return true;
  } 
 
  
  fetchConversation = ()=>{ 
    let formData = new FormData()
    formData.append('access_token',global.AccesToken),
    formData.append('limit', '30'); 
    formData.append('to_userid', this.state.touserid);   
    GetChatConversationApi(formData).then((response) => { 
      this.setState({ messages : response.data})  
    })
    .catch(err => {
      return;
    }); 
  }

  onSend(messages = []) { 
    let formData = new FormData()
    formData.append('access_token',global.AccesToken)
    formData.append('to_userid', this.state.touserid);  
    formData.append('message', messages[0].text);   
      SendMessageApi(formData).then(response =>{   
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, messages),
        }) 
      )} 
      )
      .catch(err => { 
        return;
      }); 
    }
     
  

  renderArea=(props) =>{
    return (<InputToolbar {...props} containerStyle={{  backgroundColor : '#000',borderTopColor:'#000',borderTopWidth:1 ,justifyContent:'center' }} />)
  } 

  renderZaman(props) { 
    return (
      <Time
        {...props}
        textStyle={{
          right: {
            color: "#efefef"
          },
          left: {
            color: "#efefef"
          }
        }}
      />
    );
  }


 renderBubble(props) {
    return (<Bubble {...props} 
          wrapperStyle={{
            right: { backgroundColor: '#144185' , paddingTop :10, paddingBottom : 20},
            left: { backgroundColor: '#e3dfe8',paddingTop:10, paddingBottom : 20},
          }}

        />
    );
  }

  _pressingme =() =>{
    this.props.history.goBack()
  }
  
  renderSend = props => {  
    return   (
      <View style={{ alignSelf:'center',marginBottom:4 ,alignItems:'center'    }}>
        <Icon name = 'send' type= 'material' color='#F16731' onPress={() => {
          props.onSend({text: props.text}) 
          this.chat.setState({text: ''})
        }} /> 
      </View> 
      ) 
  }
  

  render() {
    return ( 

          <KeyboardAvoidingView style={{ flex: 1,zIndex:-1, borderTopRightRadius:80}}  behavior={'scroll'} keyboardVerticalOffset={10} enabled={true}   > 
          
              <ImageBackground 
                style ={styles.fitimage}
                source={require('../../../assets/msgCover.jpg')}> 

                  <ChatBoxHeader
                              toavater={this.state.toavater}
                              tofullname={this.state.tofullname}
                          />


                  <GiftedChat
                    alwaysShowSend={true} 
                    ref={chat => { this.chat = chat }}  
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)} 
                    user={{_id: parseInt(global.user_id, 10)}} 
                    scrollToBottom={true} 
                    textInputProps = {{placeholder:"Type An Answer" ,borderTopColor:'#a8a8a8',borderTopWidth:.5}}
                    textInputStyle={{textAlignVertical :'center'}}
                    renderTime={this.renderZaman}
                    renderBubble={this.renderBubble} 
                    renderSend={this.renderSend}
                    renderAvatar={this.renderAvatar}  
                    // renderArea={this.renderArea}
                  />   
              
              </ImageBackground> 

            </KeyboardAvoidingView>  
                 
    )
  }
} 

const styles = StyleSheet.create({
    btnSend: { 
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 2,  
      borderRadius: 50,
      paddingTop : 15
    },
    logo:{
        borderRadius:25, 
        height:50,
        width:50,
        marginStart : 15,
        borderWidth:1,
        borderColor:'#fff'
    },
    fitimage : {
      width : '100%',
      height : '100%', 
      zIndex:-1,
      // borderTopRightRadius:80
      
    }, 
  });


  class SendTextButton extends  Component {
    render(){
      return (
        <View style={{ alignSelf:'center',marginHorizontal:4  }}>
          <Icon name = 'send' type= 'material' color='#F16731'/>
       
          {/* <Image onPress={() => props.onSend({text: props.text})}  style={{height:20,width : 200}} source={require('../../../assets/logo.png')   } />  */}
        </View> 
        )
    } 
  }