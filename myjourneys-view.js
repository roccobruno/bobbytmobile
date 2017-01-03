import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Alert,
} from 'react-native';

var API_ENDPOINT = 'http://10.0.2.2:9000/api/bobbit/journeys';
//var API_ENDPOINT = 'http://www.google.co.uk';

var MyJourneysView = React.createClass({


  componentDidMount() {

        fetch(API_ENDPOINT, {
            method: "GET",
            headers: {
              'Authorization': 'Bearer ' + this.props.token.idToken
            }
          })
          .then((response) => response.text())
          .then((responseText) => {

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

  }


  render: function() {

    return (
      <View style={styles.container}>

        <TouchableHighlight
          style={styles.callApiButton}
          underlayColor='#949494'
          onPress={this._addJourney}>
          <Text>Call API</Text>
        </TouchableHighlight>
      </View>
    );
  },
  _addJourney: function() {

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

module.exports = MyJourneysView;