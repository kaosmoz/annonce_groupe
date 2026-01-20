import express from 'express'
import { createCategory, afficheCategory } from '../controllers/category.controller.js'

const router = express.Router()

router.post('/create', createCategory)
router.get('/', afficheCategory)

export default router