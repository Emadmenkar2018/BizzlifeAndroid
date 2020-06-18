import React , {useEffect , useState}from 'react'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import { ListItem } from 'react-native-elements' 
import '../../utils/global.js'
import {GetSayHiApi ,GetLastConversationsApi  } from '../../services/api';
import { responsiveScreenFontSize} from "react-native-responsive-dimensions";
import EmptyComponent from './EmptyComponent'
import { useHistory } from 'react-router-native'; 

const  LastConversationsScreen = ({...props}) => { 

  const [Messages, setMessages] = useState([]) 
  let history = useHistory();

    useEffect(() => {
      const interval = setInterval(() => {
        getData()
      }, 1000);
      return () => clearInterval(interval);
    }, []);

      
    
   const getData = () => {  
      let formData = new FormData()
      formData.append('access_token',global.AccesToken),
      formData.append('limit', '0'); 
      formData.append('offset', '');  
      if( props.title ==='Last'){
        GetLastConversationsApi(formData).then((response) => {  
          setMessages ( response.data )    
        })
        .catch(err => {
          // 
          return;
        });  
      }
      else if( props.title ==='SayHi'){
        GetSayHiApi(formData).then((response) => {   
          setMessages ( response.data )   
        })
        .catch(err => {
          // 
          return;
        }); 
      } 
  };

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
  
  const GotoChat = (userid , avater, fullname)=>{
    if (userid){  
        history.push({pathname : '/Main/Chat/ChatBox',
       state:  { 
          touserid : userid,
          toavater : avater ,
          tofullname : fullname
        }
      })   
    }
  } 
    return (
      <SafeAreaView style = {{ height:'100%' , backgroundColor:'#fff' }}> 
            { Messages.length > 0  &&  
              <ScrollView style = {{ height:'100%' }}>
                { Messages.map((user, i) => (
                  <ListItem
                    key={i}
                    onPress={()=> GotoChat (user.user.id , user.user.avater ,user.user.fullname )}
                    leftAvatar={{source: {  uri: trimavater(user.user.avater ) }, size :'medium' }}
                    title={user.user.fullname}
                    titleStyle={styles.title}
                    subtitle={(user.owner ==global.user_id)? "Me : " +  user.text : user.text}
                    subtitleStyle={styles.subtitle}
                    chevron
                    bottomDivider={true}
                    containerStyle={styles.container}
                  />
                ))}
              </ScrollView>
            } 
            { Messages.length == 0  &&  
             <EmptyComponent/>
           } 
        
      </SafeAreaView>
    ) 
}

const styles = StyleSheet.create({
  title: {
    fontSize: responsiveScreenFontSize(2),
    color: '#3F3F3F',
    fontFamily:'EBGaramond-SemiBold'
  },
  subtitle: {
    fontSize: responsiveScreenFontSize(1.5),
    color: '#999',
    fontFamily:'EBGaramond-Regular'
  },
  container:{ 
    paddingHorizontal:10,
    width:'100%'
  }
})

export default LastConversationsScreen