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
router.post('/users/login', loginUser)
router.post('/users/logout', auth, logoutUser)
router.post('/users/logoutAll', auth, logoutAll)

//User Crud
router.post('/users', createUser)
router.get('/users/me', auth, getUser)
router.patch('/users/me', auth, updateUser)
router.delete('/users/me', auth, deleteUser)

//

//Test database
router.delete('/usersAll', deleteAllUsers)
router.get('/usersAll', getAllUsers)

export default router

