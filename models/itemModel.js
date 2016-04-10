var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var itemModel = new Schema({
  title: {
    type: String
  },
  user: {
    type: String
  }
});

//return to app.js
module.exports = mongoose.model('Item', itemModel);
