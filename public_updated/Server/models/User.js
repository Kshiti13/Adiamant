// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    isSubscribed: Boolean,
    noOfDownloadedEbooks:Number,
    remainingToken:Number,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
