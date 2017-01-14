var _ = require("lodash");
var moment = require("moment");


var Profile = function(){
}

var Profile = function(id,userName,firstName,lastName,email,psw, picture){
    this._id = id;
    this._userName = userName;
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._psw = psw;
    this._picture = picture;
};

Profile.prototype.id = function(){
    return this._id;
};

Profile.prototype.userName = function(){
    return this._userName;
};

Profile.prototype.firstName = function(){
    return this._firstName;
};

Profile.prototype.lastName = function(){
    return this._lastName;
};

Profile.prototype.email = function(){
    return this._email;
};

Profile.prototype.psw = function(){
    return this._psw;
};

Profile.prototype.picture = function(){
    return this._picture;
};










Profile.fromWireFormat = function(m) {
    return new Profile(m.id,m.userName,m.name,m.lastName,m.email,m.psw, m.picture);
};


Profile.prototype.update = function(field, value) {

    if(field == 'userName') {
        this._userName = value;
    }

    if(field == 'firstName') {
        this._firstName = value;
    }
    if(field == 'lastName') {
        this._lastName = value;
    }

      if(field == 'email') {
            this._email = value;
        }

    if(field == 'psw') {
        this._psw = value;
    }

};

Profile.prototype.toWireFormat = function () {
    return {
       id : this._id,
       firstName: this._firstName,
       lastName:this._lastName,
       email:this._email,
       psw:this._psw
    };
};



module.exports.fromWireFormat = Profile.fromWireFormat;
module.exports.Profile = Profile;

