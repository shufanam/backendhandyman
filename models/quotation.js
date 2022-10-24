const mongoose = require('mongoose');
var User = require('../models/user')

const quoteSchema = mongoose.Schema({
    customer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    worker:{
        type: String,
        required: true
    },
    jobTitle : {
        type: String,
        required: false
    },
    revenueMethod :{
        type: String,
        required : false,
    },
    hourlyRate :{
        type: Number,
        required : false,
    },
    estimatedTotal :{
        type: Number,
        required : false,
    },
    description :{
        type: String,
        required : false,
    },
    imgUrl :{
        type: String,
        required : false,
    },
})

module.exports = quoteModel = mongoose.model('quoteModel',quoteSchema,'quotations')