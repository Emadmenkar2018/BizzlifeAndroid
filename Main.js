import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Route,Scene,Router, Switch } from 'react-router-native';
import HomeScreenz from './src/screens/main/HomeScreenz'  
import ChatScreen from './src/screens/chat/ChatScreen'  
import SearchScreen from './src/screens/search/SearchScreen'  
import ResultScreen from './src/screens/search/ResultScreen' 
import ProfileScreen from './src/screens/profile/ProfileScreen'  
import EditNameScreen from './src/screens/profile/edits/EditNameScreen'   
import EditWorkScreen from './src/screens/profile/edits/EditWorkScreen'   
import EditInterestsScreen from './src/screens/profile/edits/EditInterestsScreen'    
import EditGoalsScreen from './src/screens/profile/edits/EditGoalsScreen'    
import EditBioScreen from './src/screens/profile/edits/EditBioScreen'    
import EditMeetingScreen from './src/screens/profile/edits/EditMeetingScreen'     
import EditEduScreen from './src/screens/profile/edits/EditEduScreen'     
import EditOrgScreen from './src/screens/profile/edits/EditOrgScreen'      
import AddCalenderEdu from './src/screens/profile/edits/AddCalenderEdu' 
import AddCalenderOrg from './src/screens/profile/edits/AddCalenderOrg' 
import EditSocialScreen from './src/screens/profile/edits/EditSocialScreen'  
import SettingsScreen from './src/screens/settings/SettingsScreen'  
import ChangepasswordScreen from './src/screens/settings/ChangepasswordScreen'   
import ContactUsScreen from './src/screens/settings/ContactUsScreen'    
import FaqScreen from './src/screens/settings/FaqScreen'    
import BoxChatScreen from './src/screens/chat/BoxChatScreen' 
import GoproScreen from './src/screens/premiuim/GoproScreen'  

export default class Main extends Component {
  render() {
    return (
      // <Provider store={store}>
        <NativeRouter>
          <Switch> 
            <Route 
              exact path="/" 
              render={props => {
                return <HomeScreenz
                  {...props}
                />
              }}
            />   
            <Route 
              exact path="/Main/Chat" 
              render={props => {
                return <ChatScreen
                  {...props}
                />
              }}
            />    
            <Route 
              exact path="/Main/Search" 
              render={props => {
                return <SearchScreen
                  {...props}
                />
              }}
            />   
            <Route 
              exact path="/Main/Search/Result" 
              render={props => {
                return <ResultScreen
                  {...props}
                />
              }}
            /> 
            <Route 
              exact path="/Main/Profile" 
              render={props => {
                return <ProfileScreen
                  {...props}
                />
              }}
            />   
            <Route 
              exact path="/Main/Settings" 
              render={props => {
                return <SettingsScreen
                  {...props}
                />
              }}
            />   
            <Route 
              exact path="/Main/Profile/Name" 
              render={props => {
                return <EditNameScreen
                  {...props}
                />
              }}
            />    
          <Route 
            exact path="/Main/Profile/Work" 
            render={props => {
              return <EditWorkScreen
                {...props}
              />
            }}
          />   
          <Route 
            exact path="/Main/Profile/Interests" 
            render={props => {
              return <EditInterestsScreen
                {...props}
              />
            }}
          />   
          <Route 
            exact path="/Main/Profile/Goals" 
            render={props => {
              return <EditGoalsScreen
                {...props}
              />
            }}
          />   
          <Route 
            exact path="/Main/Profile/Bio" 
            render={props => {
              return <EditBioScreen
                {...props}
              />
            }}
          />   
          <Route 
            exact path="/Main/Profile/Meeting" 
            render={props => {
              return <EditMeetingScreen
                {...props}
              />
            }} 
          />    
          <Route 
            exact path="/Main/Profile/Edu" 
            render={props => {
              return <EditEduScreen
                {...props}
              />
            }}  
          />  
          <Route 
            exact path="/Main/Profile/Edu/AddNewEdu" 
            render={props => {
              return <AddCalenderEdu
                {...props}
              />
            }} 
          />  
          <Route 
            exact path="/Main/Profile/Org" 
            render={props => {
              return <EditOrgScreen
                {...props}
              />
            }}  
          />  
           <Route 
            exact path="/Main/Profile/Social" 
            render={props => {
              return <EditSocialScreen
                {...props}
              />
            }}  
          />   
          <Route 
            exact path="/Main/Profile/Org/AddNewOrg" 
            render={props => {
              return <AddCalenderOrg
                {...props}
              />
            }} 
          />  
           <Route 
            exact path="/Main/Profile/Settings" 
            render={props => {
              return <SettingsScreen
                {...props}
              />
            }} 
          /> 
          <Route 
            exact path="/Main/Profile/Settings/Password" 
            render={props => {
              return <ChangepasswordScreen
                {...props}
              />
            }} 
          /> 
          <Route 
            exact path="/Main/Profile/Settings/ContactUs" 
            render={props => {
              return <ContactUsScreen
                {...props}
              />
            }} 
          /> 
          <Route 
            exact path="/Main/Profile/Settings/Faq" 
            render={props => {
              return <FaqScreen
                {...props}
              />
            }} 
          />  
          <Route 
              exact path="/Main/Chat/ChatBox" 
              render={props => {
                return <BoxChatScreen
                  {...props}
                />
              }}
            />     
            <Route 
              exact path="/Main/GoPro" 
              render={props => {
                return <GoproScreen
                  {...props}
                />
              }}
            /> 
          </Switch>
        </NativeRouter>
      // </Provider>  
    );
  }
}