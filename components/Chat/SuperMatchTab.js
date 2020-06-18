import React ,{useState,useEffect} from 'react'
import { SafeAreaView, ScrollView, StyleSheet  } from 'react-native'
import { ListItem } from 'react-native-elements' 
import '../../utils/global.js'
import {GetSuperMatchesApi} from '../../services/api'; 
import {   responsiveScreenFontSize } from "react-native-responsive-dimensions";
import EmptyComponent from './EmptyComponent' 
import { useHistory } from 'react-router-native'; 
 
const  SuperMatchTab = ({...props}) => {  
    
    const [SuperMatch, setSuperMatch] = useState([])
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
        GetSuperMatchesApi(formData).then((response) => {  
          setSuperMatch(response.data)  
        })
        .catch(err => {
            // 
            return;
        }); 
        //   
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
        {SuperMatch.length > 0  &&  
            <ScrollView style = {{ height:'100%' , backgroundColor:'#fff' }}>
            {SuperMatch.map((user, i) => (
                <ListItem
                key={i}
                onPress={()=> GotoChat (user.id , user.avater ,user.first_name+" "+ user.last_name)}//this.GotoChat (user.id)}
                leftAvatar={{source: {  uri: trimavater(user.avater ) }, size :'medium' }}
                title={user.first_name+" "+ user.last_name}
                titleStyle={styles.title}
                subtitle={"Super Match with "+user.first_name}
                subtitleStyle={styles.subtitle}
                chevron
                bottomDivider={true}
                containerStyle={styles.container}
                />
            ))}
            </ScrollView>
        } 
        {SuperMatch.length == 0  &&  
             <EmptyComponent/>
           }
      </SafeAreaView>
    ) 
}

const styles = StyleSheet.create({
    title: {
        fontSize: responsiveScreenFontSize(2),
        color: '#3F3F3F',
      },
      subtitle: {
        fontSize: responsiveScreenFontSize(1.3),
        color: '#A5A5A5',
      },
      container:{ 
        paddingHorizontal:10,
        width:'100%'
      }
})

export default SuperMatchTab