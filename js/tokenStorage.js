'use strict';

var React = require('react');
var ReactNative = require('react-native');

var {
Alert,
  AsyncStorage

} = ReactNative;

var STORAGE_KEY = 'id_token';
var PROFILE_KEY = 'id_profile';
var Storage = function(){
}



Storage.prototype.token = function(callback) {
 AsyncStorage.getItem(STORAGE_KEY).then((value) => callback(value)).done();
}

Storage.prototype.profile = function(callback) {
 AsyncStorage.getItem(PROFILE_KEY).then((value) => callback(value)).done();
}


Storage.prototype.store = function( token, profile)  {
   AsyncStorage.multiSet([[STORAGE_KEY, token] , [PROFILE_KEY,profile]]);
};

Storage.prototype.storeToken = function( token)  {
   return AsyncStorage.setItem(STORAGE_KEY, token);
};

Storage.prototype.storeProfile = function(profile)  {
   return AsyncStorage.setItem(PROFILE_KEY, profile);
};


Storage.prototype.logout = function() {
    let keys = [STORAGE_KEY, PROFILE_KEY];
    AsyncStorage.multiRemove(keys, (err) => {
      // keys k1 & k2 removed, if they existed
      // do most stuff after removal (if you want)
    });
};





module.exports.Storage = Storage;

