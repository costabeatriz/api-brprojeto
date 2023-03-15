import mongoose from 'mongoose'
const { model, Schema } = mongoose

const commentsSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    comments: {
        type: String,
        required: true
    }
},

{timestamps: true})

export default model('Comments', commentsSchema)