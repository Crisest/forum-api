import express from 'express'
import auth from '../middleware/auth'
import { createReply, 
    getRepliesByPost, 
    getRepliesByUser, 
    getMyReplies, 
    deleteReplyByID,
    updateReplyByID 
} from '../controllers/reply'

const router = new express.Router()

router.post('/posts/:id/replies', auth, createReply)
router.get('/posts/:id/replies', auth, getRepliesByPost)
router.get('/users/:id/replies', auth, getRepliesByUser)
router.get('/users/replies', auth, getMyReplies)
router.delete('/replies/:id', auth, deleteReplyByID)
router.patch('/replies/:id', auth, updateReplyByID)


export default router