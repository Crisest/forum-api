import express from 'express'
import auth from '../middleware/auth'
import { createForum, getUserForums, getUserForumsByID } from '../controllers/forum'


const router = express.Router()


//create a forum max 5 forums per user
router.post('/forum', auth, createForum)

//get forums created me user
router.get('/user/forums', auth, getUserForums)

//get forums created by user ID
router.get('/user/:id/forums', auth, getUserForumsByID)
//update forum if you are the owner


export default router

