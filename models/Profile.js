const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  gender: {
    type: String,
    required: true
  },
  age: {
    type: String,
    required: true
  },
  phone_no: {
    type: String
  },
  concerns: {
    type: Array
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
