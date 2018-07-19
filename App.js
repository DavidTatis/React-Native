import React from 'react';
import { StyleSheet, Text, AppRegistry, View, Image} from 'react-native';
import firebase from 'firebase';
import {Button} from 'react-native-elements';
import Header from './src/components/header.js' ;
import Card from './src/components/card.js';
import Login from './src/components/login.js';
import Spinner from './src/components/spinner.js';


export default class App extends React.Component {
  state={loggedIn: null};
  componentWillMount(){
    firebase.initializeApp(
      {
        apiKey: 'AIzaSyBfVQd91fgr67DC5xuT13DSEqNSajMjH1o',
        authDomain: 'beta3-68f82.firebaseapp.com',
        databaseURL: 'https://beta3-68f82.firebaseio.com',
        projectId: 'beta3-68f82',
        storageBucket: 'beta3-68f82.appspot.com',
        messagingSenderId: '494932111497'
      }
    );
    firebase.auth().onAuthStateChanged((user)=>{
      if (user) {
        this.setState({loggedIn:true});
      }else{
        this.setState({loggedIn:false});
      }
    });
  }

  renderContent(){
    switch (this.state.loggedIn) {
      case true:
       return (
      <View style={{flex:1,backgroundColor:'#600003', justifyContent: 'center', alignItems: 'center',}}>
        <Spinner size="large"/>
        <Button
          onPress={()=>firebase.auth().signOut()}
          raised
          title="Cerrar sesion."
          fontSize={12}
          color ="black"
          backgroundColor="#00ff00"
          style={{width:200}}
        />
      </View>
      );

      case false:
        return <Login />
      default:
          return <Spinner size="large"/>
    }


  }
  render() {
    return (
      <View style={{flex:1,backgroundColor:'#600003'}}>
        <Header headerText={'Inicio de sesion'} />
        {this.renderContent()}
      </View>

    );
  }
}


AppRegistry.registerComponent('beta3', () => App);
