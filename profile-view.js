import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
    AsyncStorage,
  TouchableHighlight,
  Alert,
} from 'react-native';

var Storage = require("./js/tokenStorage.js").Storage;

var API_ENDPOINT = 'http://10.0.2.2:9000/api/bobbit/callback';
//var API_ENDPOINT = 'http://www.google.co.uk';

var ProfileView = React.createClass({
  render: function() {

    return (
      <View style={styles.container}>
        <View style={styles.messageBox}>
          <Image
            style={styles.badge}
            source={require('./img/badge.png')}
          />
          <Image
            style={styles.avatar}
            source={{uri: this.props.profile.picture()}}
          />
          <Text style={styles.title}>Welcome {this.props.profile.firstName()} </Text>
          <Text style={styles.title}>Welcome {this.props.profile.email()} </Text>

        </View>
        <TouchableHighlight
          style={styles.callApiButton}
          underlayColor='#949494'
          onPress={this._onCallApi}>
          <Text>Call API</Text>
        </TouchableHighlight>
        <TouchableHighlight
                  style={styles.callApiButton}
                  underlayColor='#949494'
                  onPress={this._onLogout}>
                  <Text>Logout</Text>
                </TouchableHighlight>
      </View>
    );
  },
  _onLogout: function() {
       var tokenStorage = new Storage()
       tokenStorage.logout()
//       AsyncStorage.removeItem("id_token")
       this.props.navigator.push({
                   name: 'Welcome'
                 });
     },
  _onCallApi: function() {
    fetch(API_ENDPOINT, {
        method: "GET",
        headers: {
          'Authorization': 'Bearer ' + this.props.token.idToken
        }
      })
      .then((response) => response.text())
      .then((responseText) => {
        Alert.alert(
          'Request Successful',
          'We got the secured data successfully',
          [
            {text: 'OK'},
          ]
        )
      })
      .catch((error) => {
        Alert.alert(
          'Request Failed',
          'Please download the API seed so that you can call it ' +API_ENDPOINT + ' error '+error ,
          [
            {text: 'OK'},
          ]
        )
      });
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#15204C',
  },
  messageBox: {
    flex: 1,
    justifyContent: 'center',
  },
  badge: {
    alignSelf: 'center',
    height: 110,
    width: 102,
    marginBottom: 80,
  },
  avatar: {
    alignSelf: 'center',
    height: 128,
    width: 240,
  },
  title: {
    fontSize: 17,
    textAlign: 'center',
    marginTop: 20,
    color: '#FFFFFF',
  },
  callApiButton: {
    height: 50,
    alignSelf: 'stretch',
    backgroundColor: '#D9DADF',
    margin: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

module.exports = ProfileView;