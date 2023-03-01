import mongoose from 'mongoose'
import validator from 'validator'
const { model, Schema } = mongoose

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    cpf: {
        type: Number
    },

    cnpj: {
        type: Number

    },

    type: {
        type: String,
        enum: ["user","agency"]

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
    
    exchangesFavorites: [{
        type: Schema.Types.ObjectId,
        ref: 'Exchange'
    }]
}, 

{timestamps: true})

export default model('User', userSchema, 'users')