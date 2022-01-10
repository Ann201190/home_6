const mongoose = require('mongoose')
const Schema = mongoose.Schema

const phoneSchema = new Schema({
    typePhone: {
        type: String,
        required: true,
    },
    vendor: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0.00
    },
    count: {
        type: Number,
        required: true,
        default: 0
    },
    img: {
        type: String,
        default: ''
    },
    vendorEmail: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        default: ''
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('phones', phoneSchema)


