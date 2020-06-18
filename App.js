import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Route,Scene,Router, Switch ,Redirect} from 'react-router-native';
import LoginScreen from './src/screens/auth/LoginScreen'
import RegisterScreen from './src/screens/auth/RegisterScreen'
import ForgotPassword from './src/screens/auth/ForgotPassword'
import Main from './Main'

export default class App extends Component {
  render() {
   
    return (
      // <Provider store={store}>
        <NativeRouter>
          <Switch> 
              <Route 
                exact path="/" 
                  render={props => {
                    return <LoginScreen
                      {...props}
                    />
                  }}
                />  
              <Route 
                exact path="/Register" 
                  render={props => {
                    return <RegisterScreen
                      {...props}
                    />
                  }}
                />  
              <Route 
                exact path="/Forgot" 
                  render={props => {
                    return <ForgotPassword
                      {...props}
                    />
                  }}
                /> 
              <Route 
                exact path="/Main" 
                  render={props => {
                    return <Main
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