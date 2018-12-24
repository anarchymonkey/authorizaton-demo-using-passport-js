const mongoose = require('mongoose'),
      localMongoose = require('passport-local-mongoose');

let authSchema = new mongoose.Schema({
  username : String,
  password : String
});


// take the package and its going to add the methods of that package in the Schema
authSchema.plugin(localMongoose);

let authModel = mongoose.model('authorizaton',authSchema);

module.exports  = authModel;
