import mongoose from 'mongoose'
import validator from 'validator'

const { model, Schema } = mongoose

const exchangeSchema = new Schema({
    agency: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    agencyName: {
        type: String,
        required: true
    },

    city: {
        type: String,
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
        type: String,
        required: true
    }
}, 

{timestamps: true})

export default model('Exchange', exchangeSchema)