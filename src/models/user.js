import jwt from 'jsonwebtoken'
import mongoose, { mongo } from 'mongoose'
import bcrypt from 'bcrypt'
import validator from 'validator'


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true, 
        validate(value){
            if(value.length > 30 || value.length < 3){
                throw new Error('Username has to be between 3 and 30 characters')
            }
        }
    },
    password: {
        type: String, 
        required: true,
        trim: true,
        minlength: 6,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot be password')
            }
        }
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
               throw new Error('Email is invalid') 
            }
        }
    },
    reputation: {
        type: Number,
        default: 0,     
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})

// on instatiated object
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

//on class
userSchema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({ username })
    if(!user){
        throw Error('Unable to login')
    }
    const passwordMatch =  await bcrypt.compare(password, user.password)
    if(!passwordMatch){
        throw Error('Unable to login')
    }
    return user
}

userSchema.pre('save', async function (next) {
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('User', userSchema)

export default User