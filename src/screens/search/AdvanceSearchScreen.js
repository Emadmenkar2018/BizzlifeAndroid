import React, {useState, useEffect,Component}  from 'react';
import { Text, StyleSheet , View ,ScrollView ,TextInput ,Button ,ToastAndroid, TouchableOpacity, ActivityIndicator} from 'react-native';  
import axios from 'axios'; 
import GradientButton from 'react-native-gradient-buttons';  
import '../../../core/global.js'
import { theme } from '../../../core/theme.js'; 
import {Label } from 'native-base';
import {Icon } from 'react-native-elements';  
import {fetchSearchApi} from '../../../Api/api'
import { ListItem } from 'react-native-elements'

import SearchInput, { createFilter } from 'react-native-search-filter';

const KEYS_TO_FILTERS = ['first_name' ];


export default class AdvanceSearchScreen extends Component { 
  constructor(props) {
      super(props);    
  } 
  componentDidMount() {
      this.getData(); 
  }

  state = { 
    search: '',
    list : [],
    searchTerm: '',
    showIndicator:false
  };

  getData =()=>{ 
    let bodyFormData = new FormData();  
    bodyFormData.append('access_token',global.AccesToken)  
    fetchSearchApi(bodyFormData).then((response) => {
        ToastAndroid.show('Data Has been Fetched!', ToastAndroid.SHORT);  
        this.setState({ list: response.data })   
      })
      .catch(err => {
        
        return;
      });  
  }

  updateSearch = search => {
    this.setState({ search });
  };

  searchUpdated(term) {
    this.setState({ searchTerm: term })
  }

  _showIndicator = () => {
    this.setState({ showIndicator: true })
  } 

  _gotoProfile = (userid )=>{
    if (userid){ 
      this.props.navigation.navigate('UserProfile', {
        touserid : userid, 
      })
    }
  }
  render() {   
        const { navigation } = this.props 
        const { search } = this.state; 
        const filteredNames = this.state.list.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
      return (
        <View style={{ flex: 1 ,backgroundColor:'#2d2d2d',marginTop:35,}} > 
            <View style={{ flex: 0.15,backgroundColor:'#2d2d2d'}}> 
                <View style={{ flexDirection: 'row', alignItems: 'center', height: 80 ,padding :20,marginTop : 10 }}>
                    <Icon
                    name="close" type ={'material'} size={30} color={theme.colors.surface} onPress={()=> navigation.goBack() }
                    /> 
                    <Text style={{marginStart : 10,fontSize : 18, fontWeight:'bold', color : '#fff'} }> Advanced Search</Text>
                </View>
            </View>
            <View style={{ flex: 0.05,backgroundColor:'#fff' , borderTopRightRadius:80}}> 
            </View>
            <View style={{ flex: 0.8, paddingRight : 20,paddingBottom:20,paddingLeft:20 ,backgroundColor:'#fff' }}>
            <ActivityIndicator size="large" color="#ff4d00" animating={this.state.showIndicator} /> 
            <SearchInput 
                onChangeText={(term) => { this.searchUpdated(term) }} 
                style={styles.searchInput}
                placeholder="Find User By Name" />
                <ScrollView style={{flex : 1}}>
                    {filteredNames.map((user, i) => (
                        <ListItem
                        key={i}
                        onPress={()=>this._gotoProfile (user.id )}
                        leftAvatar={{source: {  uri:user.avater }, size :'small' }}
                        title={user.first_name}
                        titleStyle={styles.title}
                        subtitle={user.worktitle_text ? user.worktitle_text : 'Unknown'}
                        subtitleStyle={styles.subtitle}
                        chevron
                        bottomDivider={true}
                        onSubmitEditing={this._showIndicator}
                        />
                    ))}
                </ScrollView>
            </View>
        </View>
        )
      }
    }
    const styles = StyleSheet.create({
        title: {
          fontSize: 16,
          color: '#3F3F3F',
        },
        subtitle: {
        fontSize: 12,
          color: '#A5A5A5',
        },
        searchInput:{
          padding: 10,
          borderColor: '#CCC',
          borderWidth: 1,
          borderRadius:20,
          backgroundColor:'#2d2d2d',
          color:'#fff',
          paddingStart:20
        }
      })