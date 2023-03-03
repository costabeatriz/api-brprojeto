import mongoose from 'mongoose'
import validator from 'validator'
const { model, Schema } = mongoose

const userSchema = new Schema({
    agencyName: {
        type: String,
        required: true
    },

    city: {
        type: Number,
        required: true
    },

    picture: {
        type: String,
        required: true,

    },

    jobExchange: {
        type: String,
        required: true,
    },

    meal: {
        type: String,
        required: true
    },



    accommodationInformation: {
        type: String,
        required: true
    },
    
    kitExchange: {
        type: Schema.Types.ObjectId,
        ref: 'Agency'

    },
}, 

{timestamps: true})

export default model('Exchange', userSchema, 'Exchange')