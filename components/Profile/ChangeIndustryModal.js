import React, { memo} from 'react'; 
import { Alert ,ToastAndroid  ,Platform} from 'react-native'; 
import { SinglePickerMaterialDialog } from 'react-native-material-dialog';
import {  Industries  } from '../../constants/arrays'; 
import {UpdateProfileApi } from '../../services/api';  

const ChangeIndustryModal = ({...props}) => {  

 

     const _updateProfile =  (result) => {  
        let bodyFormData = new FormData();  
        bodyFormData.append('access_token',global.AccesToken),
        bodyFormData.append('industry_text', result.selectedItem.value );  
        UpdateProfileApi(bodyFormData).then(() => { 
          if (Platform.OS === 'android') {
            ToastAndroid.show('Industry Has been Changed', ToastAndroid.SHORT)
          } else {
            Alert.alert('Industry Has been Changed');
          } 
          props.ShowOrCloseIndustryModal( result.selectedItem.value )
          props.setIndustryData( result.selectedItem.value )
        })
        .catch(err => {
          // 
          return;
        }); 
      }  

    return (    
            <SinglePickerMaterialDialog
                title={"What Is Your Industry"}
                visible={props.visiblity}
                items={Industries.map((row) => ({ value: row, label: row }))}
                scrolled = {true}  
                onCancel={() => props.ShowOrCloseIndustryModal()}
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
                    }
                  } 
                />      
    )
} 

export default memo(ChangeIndustryModal);

 