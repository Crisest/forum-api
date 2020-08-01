import express from 'express'
import auth from '../middleware/auth'
import { 
    deleteAllUsers, 
    deleteUser,
    createUser,
    getAllUsers,
    getUser,
    loginUser, 
    logoutUser,
    logoutAll,
    updateUser
} from "../controllers/user"

const router = new express.Router()

//Users
router.post('/user/login', loginUser)
router.post('/user/logout', auth, logoutUser)
router.post('/user/logout-all', auth, logoutAll)

//User Crud
router.post('/user', createUser)
router.get('/user', auth, getUser)
router.patch('/user', auth, updateUser)
router.delete('/user', auth, deleteUser)

//

//Test database
router.delete('/users', deleteAllUsers)
router.get('/users', getAllUsers)

export default router

