import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(value.length > 25){
                throw new Error('Title is too long, Please enter maximum 25 characters')
            }
        }
    },
    description:{
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(value.length > 500){
                throw new Error('Description is too long, Please enter maximum 500 characters')
            }
        }
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Category'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    }
})

const Post = mongoose.model('Post', postSchema)
export default Post

