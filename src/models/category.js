import mongoose from 'mongoose'

const categorySchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(value.length > 25){
                throw new Error('Title is too long, Please enter maximum 25 characters')
            }
        }
    }, 
    description: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(value.length > 200){
                throw new Error('Title is too long, Please enter maximum 200 characters')
            }
        }
    }
}, {
    timestamps: true
})

categorySchema.virtual('posts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'category'
})

const Category = mongoose.model('Category', categorySchema)

export default Category