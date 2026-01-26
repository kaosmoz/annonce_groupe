import express from 'express';
import { getCategories, createCategory, getCategoryById, updateCategoryById, deleteCategoryById } from '../controllers/category.controller.js'

createCategory


const router = express.Router();

router.get('/', getCategories)
router.post('/', createCategory)
router.get('/:id', getCategoryById)
router.put('/:id', updateCategoryById)
router.delete('/:id', deleteCategoryById)

export default router;