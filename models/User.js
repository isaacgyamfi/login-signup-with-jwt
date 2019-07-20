const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    title: {
        type: String,
        min: 2,
    },
    firstName: {
        type: String,
        min: 2,
        max: 255,
        required: true
    },
    lastName: {
        type: String,
        min: 2,
        max: 255,
        required: true
    },
    gender: {
        type: String,
        max: 6,
        required: true
    },
    email: {
        type: String,
        min: 6,
        max: 255,
        required: true
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    // dob: {
    //     type: Date,
    //     required: true,
    // },
    phone: {
        type: Number,
        min: 10
    },
    postalAddress: {
        type: String,
        min: 6,
        max: 255
    },
    dateSignedOn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);