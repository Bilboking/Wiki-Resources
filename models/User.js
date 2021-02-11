const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'must be 6 or more letters!']
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;