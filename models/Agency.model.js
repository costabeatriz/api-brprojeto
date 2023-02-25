import mongoose from 'mongoose'
import validator from 'validator'
const { model, Schema } = mongoose

const userSchema = new Schema({
    agency: {
        type: String,
        required: true
    },

    cnpj: {
        type: Number,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: value => validator.isEmail(value)
        }
    },

    telephone: {
        type: Number,
        required: true
    },

    picture: {
        type: String,
        required: true,

    },

    passwordHash: {
        type: String,
        required: true
    },
    
    exchangesAvailable: [{
        type: Schema.Types.ObjectId,
        ref: 'Exchange'
    }]
}, 

{timestamps: true})

export default model('Agency', userSchema, 'Agencys')