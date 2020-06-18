import React, {useState,  useRef , useEffect,Component}  from 'react';
import { Text, StyleSheet , View ,ScrollView  , Image, BackHandler, ToastAndroid} from 'react-native';  
import '../../../utils/global.js'; 
import { theme } from '../../../utils/theme.js';  
import { Button } from 'react-native-elements';  
import {
    responsiveHeight,
    responsiveWidth,
    responsiveScreenFontSize
  } from "react-native-responsive-dimensions";
import TitlesSection from '../../../components/Search/TitlesSection'
import GoalsSection from '../../../components/Search/GoalsSection'
import InterestsSection from '../../../components/Search/InterestsSection'
import LocationsSection from '../../../components/Search/LocationsSection'
import { Icon } from 'react-native-elements';
import { useHistory } from 'react-router-native'; 
import { CheckSwipeDateApi , addlikesApi,SearchProfileApi} from '../../../services/api' 

const  SearchScreen = props => {
 
    const refGoals = useRef(null); 
    const [favTitles, setFavTitles] = useState([]);
    const [favInterests, setFavInterests] = useState([]);
    const [favlocation, setFavLocation] = useState([]); 
    const [favGoals, setFavGoals] = useState([]); 
    let history = useHistory();
   

    useEffect(() =>{  
        BackHandler.addEventListener("hardwareBackPress", backButtonHandler);

        return () => {
        BackHandler.removeEventListener("hardwareBackPress", backButtonHandler);
        };
    }, [backButtonHandler]);


    const backButtonHandler = () => {
        history.goBack()
        return true;
      } 
    
    const _goAdvancedSearch = () =>{
        props.navigation.navigate('AdvanceSearchScreen')
    }

    const _fetchSearchedUsers= (titles ,goals ,interests ,Locations )=>{
        if (titles.length>0 || goals.length>0 || interests.length>0 || Locations.length>0){
          let bodyFormData = new FormData();  
          bodyFormData.append('access_token',global.AccesToken),
          bodyFormData.append('titles', titles); 
          bodyFormData.append('goals', goals);  
          bodyFormData.append('interests', interests);  
          bodyFormData.append('locations', Locations);    
          SearchProfileApi(bodyFormData).then((response) => {  
              ToastAndroid.show('Result Found!', ToastAndroid.SHORT); 
              if(response.data.length > 0){
                history.push({pathname : '/Main/Search/Result',
                state: {
                    HomeScreenPics : response.data,
                    numberofCards :  response.data.length , 
                    }
                })    
              }   
              }).catch(err => {
                ToastAndroid.show('No Result Found!', ToastAndroid.SHORT);  
                return;
              })
          }
          else {
            ToastAndroid.show('No Result Found!', ToastAndroid.SHORT);  
    
          }
        }


    const onButtonClick2 = () => {   
        let goals = favGoals ? favGoals.toString()  : ''
        let titles = favTitles? favTitles.toString() : "";
        let interests = favInterests? favInterests.toString()  : "";
        let Locations = favlocation? favlocation.toString()  : "";  
        if (interests.length >0 || goals.length >0 || titles.length >0 || Locations.length >0  ){  
            _fetchSearchedUsers(titles , goals , interests ,Locations)
        } 
        else {
            ToastAndroid.show('Enter One Value At Least' , ToastAndroid.SHORT);    
        }
    };
    // #bfbfbf'

    return (
       
        <View  style = {{width:'100%',height:'100%', backgroundColor:'#fff',paddingVertical :responsiveHeight(1) ,paddingHorizontal:responsiveHeight(3) ,   }}>
 
            <View style={{flexDirection:'row',justifyContent:'space-between' ,backgroundColor:'transparent',width:'100%',marginTop:10,zIndex:0}}>
             
                <Icon name="arrow-back" type ={'material'} containerStyle={{alignSelf:'flex-start',   }} size={responsiveScreenFontSize(4)} color={theme.colors.surface} onPress={()=>  history.goBack() }  />
               
   
                <Text style ={{alignSelf:'center', fontSize:responsiveScreenFontSize(2.5),fontFamily:'EBGaramond-SemiBold',color:theme.colors.surface,marginLeft:-10}}>Search Users</Text> 
    
                 <Image
                   resizeMode={'contain'}
                   style={styles.stretch}
                   source={null} 
                   tintColor={ '#1D253C'}
                 /> 
           </View>

            <ScrollView showsVerticalScrollIndicator={false} style = {styles.container}>  
                
                
                <TitlesSection
                    favTitles={favTitles}
                    setFavTitles={setFavTitles}
                />

                {/* <View style={styles.divider} />  */}

                <GoalsSection
                    favGoals={favGoals}
                    setFavGoals={setFavGoals}
                />

                {/* <View style={styles.divider} />  */}

                <InterestsSection
                    favInterests={favInterests}
                    setFavInterests={setFavInterests}
                />

                {/* <View style={styles.divider} />  */}

                <LocationsSection
                    favlocation={favlocation}
                    setFavLocation={setFavLocation}
                /> 
 
                <Button title = "Search Now" buttonStyle={{backgroundColor: theme.colors.surface ,width : '90%',alignSelf:'center' ,height :responsiveHeight(6) ,marginBottom:responsiveHeight(2),borderTopRightRadius:30, borderBottomLeftRadius:30,paddingBottom:10 }}   titleStyle ={{color:"#fff"}}     onPress ={ onButtonClick2 }  >Start Now</Button>
                { global.is_pro ==1 &&
                    <Button title = "Advanced Search" buttonStyle={{backgroundColor:'#bf4f22' ,width : '90%',alignSelf:'center' ,height :responsiveHeight(6) ,marginBottom:responsiveHeight(2),borderTopRightRadius:30, borderBottomLeftRadius:30,paddingBottom:10 }}   titleStyle ={{color:"#fff"}}     onPress ={ _goAdvancedSearch }  >Advanced Search</Button>
                }
 
            </ScrollView>

           
        </View>

  );
};

const styles = StyleSheet.create({
    container: { 
        paddingHorizontal:responsiveHeight(1) ,
        flex : 0.9,
        backgroundColor:'#fff',  
        marginBottom :responsiveHeight(1) , 
      },  
      divider:{
        alignSelf: 'stretch',
        borderBottomColor: 'rgba(0, 113, 183,0.2)',
        borderBottomWidth: 1,
        marginTop : 10,
        marginBottom : 2,
        marginVertical:responsiveHeight(2), 
      },
        
}) 

export default SearchScreen