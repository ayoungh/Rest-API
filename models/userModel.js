var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userModel = new Schema({
  user: {
    type: String
  },
  name: {
    type: String
  }
});

//return to app.js
module.exports = mongoose.model('User', userModel);
