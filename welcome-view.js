import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  AsyncStorage,
  TouchableHighlight,
} from 'react-native';

import Auth0Lock from 'react-native-lock';
var Storage = require("./js/tokenStorage.js").Storage;
var Profile = require("./js/profile.js").Profile;
//import credentials from './auth0-credentials';
//var options = new Map();
//options.set("scope", "openid email")

//var options = {
//  auth: {
//    params: {scope: 'openid email picture'},
//  }
//};

var options = {
  auth: {
    params: {
      state: 'foo',
      scope: 'openid email user_metadata app_metadata picture'
    },
  }
};
var tokenStorage = new Storage()
var lock = new Auth0Lock({
                           clientId: "iL5kqBlg9y2POSkCKL5EoNcYiQh2347i",
                           domain: "roccobruno.eu.auth0.com",
options
                         });

var WelcomeView = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.messageBox}>
          <Image
            style={styles.badge}
            source={require('./img/badge.png')}
          />
          <Text style={styles.title}>Auth0 Example</Text>
          <Text style={styles.subtitle}>Identity made simple for Developers</Text>
        </View>
        <TouchableHighlight
          style={styles.signInButton}
          underlayColor='#949494'
          onPress={this._onLogin}>
          <Text>Log In</Text>
        </TouchableHighlight>
      </View>
    );
  },
  _onLogin: function() {
   var that = this
//   tokenStorage.logout()
   tokenStorage.token( function(value) {
        if(value === null) {
            lock.show({
              closable: true,
            }, (err, profile, token) => {
              if (err) {
                console.log(err);
                return;
              }
//               AsyncStorage.setItem("myKey", JSON.stringify(token));
              tokenStorage.storeToken(JSON.stringify(token)).then((value) =>
              tokenStorage.storeProfile(JSON.stringify(profile))).then((vv) =>
                      that.props.navigator.push({
                        name: 'Profile',
                        passProps: {
                          profile: Profile.fromWireFormat(JSON.parse(JSON.stringify(profile))),
                          token: token,
                        }
                      }));
              })

        } else {

           tokenStorage.profile( function(prof) {
             that.props.navigator.push({
                    name: 'Profile',
                    passProps: {
                      profile: Profile.fromWireFormat(JSON.parse(prof)),
                      token: value,
                    }
                  });
                  });
        }
         });
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#15204C',
  },
  messageBox: {
    flex: 1,
    justifyContent: 'center',
  },
  badge: {
    alignSelf: 'center',
    height: 169,
    width: 151,
  },
  title: {
    fontSize: 17,
    textAlign: 'center',
    marginTop: 8,
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 17,
    textAlign: 'center',
    marginTop: 4,
    color: '#FFFFFF',
  },
  signInButton: {
    height: 50,
    alignSelf: 'stretch',
    backgroundColor: '#D9DADF',
    margin: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

module.exports = WelcomeView;