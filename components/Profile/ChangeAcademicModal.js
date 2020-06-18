
    import React, {  memo} from 'react'; 
    import { Alert ,ToastAndroid ,Platform} from 'react-native'; 
    import { SinglePickerMaterialDialog } from 'react-native-material-dialog';
    import {  Academics  } from '../../constants/arrays'; 
    import {UpdateProfileApi } from '../../services/api';  
    
  const ChangeAcademicModal = ({...props}) => {  
     
        const _updateProfile =  (result) => {  
            let bodyFormData = new FormData();  
            bodyFormData.append('access_token',global.AccesToken),
            bodyFormData.append('academic_text', result.selectedItem.value );  
            UpdateProfileApi(bodyFormData).then(() => { 
            if (Platform.OS === 'android') {
                ToastAndroid.show('Academic Has been Changed', ToastAndroid.SHORT)
            } else {
                Alert.alert('Academic Has been Changed');
            }    
              props.ShowOrCloseAcademicModal(result.selectedItem.value)
              props.setAcademicData( result.selectedItem.value )
            })
            .catch(err => {
              // 
              return;
            });  
        } 
    
        return ( 
            
            <SinglePickerMaterialDialog
                title={"What Is Your Academic Level"}
                visible={props.visiblity}
                items={Academics.map((row) => ({ value: row, label: row }))}
                scrolled = {true} 
                onCancel={() => props.ShowOrCloseAcademicModal()} 
                selectedItem={props.selectedItem} 
                onOk={result => {
                    if (result.selectedItem){  
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
                />  
            )
        } 
    
export default memo(ChangeAcademicModal);
    
 
    