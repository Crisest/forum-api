import User from '../models/user'

export const createUser = async (req, res) => {
    const user = new User(req.body)
    try {
        const token = await user.generateAuthToken()
        await user.save()
        res.status(201).send({user, token})
    } catch (error) {
        res.status(400).send({error})
    }
}

export const loginUser = async ({ body }, res) => {
    try {
        const user = await User.findByCredentials(body.username, body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch (error) {
        res.status(400).send(error)

    }
}

export const logoutUser = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) =>{
            return token.token !== req.token
        })
        await req.user.save()


        res.send()
    } catch (e) {
        res.status(500).send()
    }
}

export const logoutAll = async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
}

export const getUser = (req, res) => {
    res.send(req.user)
}














//reset dabase

export const deleteAllUsers = async (req, res) => {
    try {
        const users = await User.deleteMany()
        if(!users){
            return res.status(404).send()
        }
        res.send(users)
    } catch (error) {
        res.status(500).send(error)
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        if(!users){
            res.status(404).send()
        }
        res.send(users)
    } catch (error) {
        res.status(500).send()
    }
}