import React, {useState, useEffect,Component}  from 'react';
import { Text, StyleSheet , View ,ScrollView ,ActivityIndicator ,BackHandler ,ToastAndroid,FlatList} from 'react-native';  
import axios from 'axios';  
import{ UpdateProfileApi,profileApi ,DeleteOrganizationApi} from '../../../../services/api';
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

const EditOrgScreen  = ( {...props}) => {   

 
    const [organizations, setOrganizations] = useState([])  
    const [showIndicator, setshowIndicator] = useState(false )  
    
    // let organizations = props.location.state.organizations 

    let history = useHistory(); 

    useEffect(() =>{  
        fetchOrganizations()
        BackHandler.addEventListener("hardwareBackPress", backButtonHandler);

        return () => {
        BackHandler.removeEventListener("hardwareBackPress", backButtonHandler);
        };
    }, [backButtonHandler]);


    const fetchOrganizations = () => {
        setshowIndicator(true)
        let bodyFormData = new FormData();  
        bodyFormData.append('access_token',global.AccesToken) 
        bodyFormData.append('user_id',global.user_id),
        bodyFormData.append('fetch','organizations'),
        bodyFormData.append('device_id','sdfgbsdbsdgv sdvgdvsdvsdbsbsdbsdb'); 
        profileApi(bodyFormData).then( response => {
            setOrganizations(response.data.organizations)
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
        bodyFormData.append('org_id',   organizations[index].org_id) ;    
        DeleteOrganizationApi(bodyFormData).then(() => {
            ToastAndroid.show('Organization Has been Deleted!', ToastAndroid.SHORT);
            let newDeletedlist =    organizations.filter((org, ind) => index !== ind)  
            setOrganizations(newDeletedlist)  
        })
        .catch(err => {
            
            ToastAndroid.show('Organization Can Not Be Deleted!', ToastAndroid.SHORT); 
            return;
        });   
    } 
       
   

    const _addOrg= () =>{   
        props.history.push({pathname : '/Main/Profile/Org/AddNewOrg'})    
    }
 
 
 
    const listItem = ({item, index}) => (
        <View style={{borderBottomWidth : 1, flex: 1, flexDirection: 'row', justifyContent: 'space-between',padding : 15,alignItems:'center'}}> 
            <View style={styles.educ}>
                <Text style={styles.headname}>{item.org_title}</Text>
                <Text style={styles.greylist}>{item.org_name}</Text>
                <Text style={styles.greylist}>{item.from_date} - {item.till_date}</Text>  
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
                    _updateProfile={ _addOrg}
                    showSaveBtn = {false}
                />  

                 

                <View style={{height:'100%'  ,paddingRight : 20,paddingBottom:20,paddingLeft:20 ,backgroundColor:'#fff' }}> 
                    <Label style={{color: '#000',paddingLeft: 4, opacity: 0.8,fontSize : responsiveScreenFontSize(2.5)}}>Your Previous Organizations</Label>
                    <FlatList 
                        data={ organizations}
                        renderItem={ listItem}  
                        keyExtractor={item => item.org_id.toString()}
                    />  
                      <View style={{height:responsiveHeight(0.1)}}>
                             <ActivityIndicator size="large" color="#ff4d00" animating={ showIndicator} />
                    </View>  
                   
                </View>

                <ActionButton  
                    buttonColor="rgba(231,76,60,1)"
                    onPress={()=> _addOrg()}
                />
            </View> 
        ); 
}

export default EditOrgScreen;

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