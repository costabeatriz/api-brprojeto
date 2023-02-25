import mongoose from 'mongoose'
const { model, Schema } = mongoose

const userSchema = new Schema({
    comments: {
        type: String,
        required: true
    },

    picture: {
        type: String,
        required: true,

    },
    
    yourComments: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, 

{timestamps: true})

export default model('Comments', userSchema, 'comments')