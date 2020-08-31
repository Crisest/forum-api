import express from 'express'
import auth from '../middleware/auth'
import Post from '../models/post'
import { 
    createPost, 
    getPostByCategory, 
    deletePostByID, 
    updatePost,
    getPostbyUser,
    getMyPosts
} from '../controllers/post'

const router = new express.Router()

router.post('/categories/:id/posts', auth, createPost)
router.get('/categories/:id/posts', getPostByCategory)
router.get('/users/:id/posts', getPostbyUser)
router.get('/users/posts', auth, getMyPosts)
router.delete('/categories/:categoryID/posts/:id', auth, deletePostByID)
router.patch('/categories/:categoryID/posts/:id', auth, updatePost)
// all posts

router.get('/postsAll', async (req, res) => {
    try {
        const posts = await  Post.find({})
        if(!posts){
            res.status(404).send()
        }
        res.send({posts})
    } catch (error) {
        res.status(500).send()
    }
})
export default router