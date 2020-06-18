import React, {useState, useEffect,Component}  from 'react';
import { Text, StyleSheet , View ,ScrollView ,ActivityIndicator ,BackHandler ,ToastAndroid,FlatList} from 'react-native';  
import axios from 'axios';  
import{ profileApi,AddEducationApi ,DeleteEducationApi} from '../../../../services/api';
import '../../../../utils/global.js'
import { Icon } from 'react-native-elements' 
import {DeviceEventEmitter} from 'react-native'
import { theme } from '../../../../utils/theme.js'; 
import {Label } from 'native-base'; 
import ActionButton from 'react-native-action-button';
import EditHeader from '../../../../components/Profile/EditHeader'
import {
    responsiveHeight,
    responsiveWidth,
    responsiveScreenFontSize
  } from "react-native-responsive-dimensions";
  import { useHistory } from 'react-router-native';

const EditEduScreen  = ( {...props}) => {   

    const [educations, setEducations] = useState( [] )
    const [showIndicator, setshowIndicator] = useState(false )  
    
    let history = useHistory(); 

    useEffect(() =>{  
        fetchEducations()
        BackHandler.addEventListener("hardwareBackPress", backButtonHandler);

        return () => {
        BackHandler.removeEventListener("hardwareBackPress", backButtonHandler);
        };
    }, [backButtonHandler]);


    const fetchEducations = () => { 
        setshowIndicator(true)
        let bodyFormData = new FormData();  
        bodyFormData.append('access_token',global.AccesToken) 
        bodyFormData.append('user_id',global.user_id),
        bodyFormData.append('fetch','educations'),
        bodyFormData.append('device_id','sdfgbsdbsdgv sdvgdvsdvsdbsbsdbsdb'); 
        profileApi(bodyFormData).then( response => {
            setEducations(response.data.educations)
            setshowIndicator(false) 
        })
        .catch(err => { 
            setshowIndicator(false) 
            ToastAndroid.show('error Fetching Organization', ToastAndroid.SHORT);
        }) 
    }

    const backButtonHandler = () => {
        history.goBack()
        return true;
      } 
  

    const  _deleteItem= (index)=>{  
        let bodyFormData = new FormData();   
        bodyFormData.append('access_token',global.AccesToken),
        bodyFormData.append('edu_id',   educations[index].edu_id) ;    
        DeleteEducationApi(bodyFormData).then(() => {
            ToastAndroid.show('Education Has been Deleted!', ToastAndroid.SHORT);
            let newDeletedlist =    educations.filter((edu, ind) => index !== ind)  
            setEducations( newDeletedlist)
             
        })
        .catch(err => {
            ToastAndroid.show('Education Can Not Be Deleted!', ToastAndroid.SHORT); 
            return;
        });   
    }  

    const _addEdu= () =>{   
        props.history.push({pathname : '/Main/Profile/Edu/AddNewEdu' })    
    }


    const listItem = ({item, index}) => (
        <View style={{borderBottomWidth : 1, flex: 1, flexDirection: 'row', justifyContent: 'space-between',padding : 15,alignItems:'center'}}> 
            <View style={styles.educ}>
                <Text style={styles.headname}>{item.uniname}</Text>
                <Text style={styles.greylist}>{item.gano}</Text>
                <Text style={styles.greylist}>{item.from_tarih} - {item.till_tarih}</Text>  
            </View>
            <Icon
                name='trash'
                type='font-awesome'
                color='#f76002'
                containerStyle={{ marginStart : 10,marginTop : 1}} 
                onPress ={() =>  _deleteItem(index)}
            />  
        </View>
      );   
        return (
            <View style={{ flex: 1 ,backgroundColor:'#2d2d2d' }} > 

                <EditHeader
                    _updateProfile={ ()=>props.history.goBack()}
                    showSaveBtn = {false}
                />  

                <View style={{height:'100%'  ,paddingRight : 20,paddingBottom:20,paddingLeft:20 ,backgroundColor:'#fff' }}> 
                    <Label style={{color: '#000',paddingLeft: 4, opacity: 0.8,fontSize : responsiveScreenFontSize(2.5)}}>Your Previous Schools</Label>
                    <FlatList 
                        data={  educations}
                        renderItem={ listItem}  
                        keyExtractor={item => item.edu_id.toString()}
                    />

                    <View style={{height:responsiveHeight(0.1)}}>
                        <ActivityIndicator size="large" color="#ff4d00" animating={ showIndicator} />
                    </View>  
                   
                </View>

                <ActionButton  
                    buttonColor="rgba(231,76,60,1)"
                    onPress={()=> _addEdu()}
                />
            </View> 
        ); 
}

export default EditEduScreen;

const styles = StyleSheet.create({
    scroller:{
        padding:15
    },
    headname :{
        color : "#5a6775",
        fontWeight : 'bold'
    },
    contain :{
        flex : 1, 
    },
    greylist :{
        color : "#5a6775",
        fontSize : 12,
        marginBottom : 3
    },
    info :{
        flex : 0.9
    },
    educ :{ 
       margin : 5,
       flex : 0.9
    },
    btn : {
        position : 'absolute',
        bottom:50
    }
})