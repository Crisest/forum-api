import User from '../models/user'
import { response } from 'express'

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
        res.status(500).send(e)
        console.log(e);
    }
}

export const logoutAll = async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
        console.log(error);
    }
}

export const getUser = async (req, res) => {
    res.send(req.user)
}

export const updateUser = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({_id: req.user._id}, req.body)
        if(!user){
            res.status(400).send()
        }
        res.send({ user })
    } catch (error) {
        res.status(500).send()
    }
}

export const deleteUser = async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (error) {
        res.status(500).send(error)
    }
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