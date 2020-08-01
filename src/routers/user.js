import express from 'express'
import auth from '../middleware/auth'
import { createUser,
    getUser,
    loginUser, 
    logoutUser,
    logoutAll,
    deleteAllUsers, 
    getAllUsers 
} from "../controllers/user"

const router = new express.Router()

router.post('/user', createUser)
router.post('/user/login', loginUser)
router.post('/user/logout', auth, logoutUser)
router.post('/user/logout-all', auth, logoutAll)
router.get('/user', auth, getUser)

//Test database
router.delete('/users', deleteAllUsers)
router.get('/users', getAllUsers)

export default router

