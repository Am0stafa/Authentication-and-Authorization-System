const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    refreshToken:[String],//! it is an array for multi device support
    roles:{
        User: {
            type:Number,
            default:2001
        },
        Editor:Number,
        Admin:Number,
    }

})

module.exports = mongoose.model('User',userSchema)