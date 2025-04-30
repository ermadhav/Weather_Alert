// server/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  phone: String,
  location: String,
});

module.exports = mongoose.model('User', UserSchema);
