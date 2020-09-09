import mongoose from 'mongoose'

const replySchema = mongoose.Schema({
    description: {
        type: String,
        trim: true,
        required: true,
        validate(value){
            if(value.length > 200){
                throw new Error('This reply is too long, chill.')
            }
        }
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Post'
    }
},
{
    timestamps: true
})


const Reply = mongoose.model('Reply', replySchema)

export default Reply