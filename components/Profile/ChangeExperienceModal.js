import React, { memo} from 'react'; 
import { Alert ,ToastAndroid ,Platform } from 'react-native'; 
import { SinglePickerMaterialDialog } from 'react-native-material-dialog';
import {  Experiences  } from '../../constants/arrays'; 
import {UpdateProfileApi } from '../../services/api';  

const ChangeExperienceModal = ({...props}) => {  
 
     const _updateProfile =  (result) => {     
        let bodyFormData = new FormData();  
        bodyFormData.append('access_token',global.AccesToken),
        bodyFormData.append('experience_text', result.selectedItem.value );  
        UpdateProfileApi(bodyFormData).then(() => { 
            if (Platform.OS === 'android') {
                ToastAndroid.show('Experiences Has been changed!', ToastAndroid.SHORT)
            } else {
                Alert.alert('Experiences Has been changed!');
            } 
            props.ShowOrCloseExerienceModal( )
            props.setExperienceData( result.selectedItem.value )
        })
        .catch(err => {
            // 
            return;
        }); 
     }

    return (     
        <SinglePickerMaterialDialog
            title={"What Is Your Experiences"}
            visible={props.visiblity}
            items={Experiences.map((row) => ({ value: row, label: row }))} 
            onCancel={() => props.ShowOrCloseExerienceModal()}
            onOk={result => {
            if(result.selectedItem){
                _updateProfile(result) 
            }
            else{ 
                if (Platform.OS === 'android') {
                    ToastAndroid.show('Select One Value At Least', ToastAndroid.SHORT)
                } else {
                    Alert.alert('Select One Value At Least');
                } 
            }
            
            }}
            onCancel={() =>props.ShowOrCloseExerienceModal()}
        /> 
    )
} 

export default memo(ChangeExperienceModal);

 
