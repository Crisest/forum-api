import mongoose from 'mongoose'

const forumSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(value.length > 25){
                throw new Error('Name of the forum is too long, Please enter maximum 25 characters')
            }
        }
    },
    owner: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    Admins: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ]
},
{
    timestamps: true
})

const Forum = mongoose.model('Forum')

export default Forum