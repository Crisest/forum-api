import express from 'express'
import auth from '../middleware/auth'
import isAdmin from '../middleware/isAdmin'
import { createCategory,
         getCategories, 
         getCategory, 
         deleteCategory} from '../controllers/category'

const router = new express.Router()

router.post('/categories', auth, isAdmin, createCategory)
router.get('/categories', auth, getCategories)
router.get('/categories/:id', auth, getCategory)
router.delete('/categories/:id', auth, deleteCategory )



export default router