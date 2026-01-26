import express from 'express' ;
import { getAllAnnonces, createAnnonce, getAnnonceById, updateAnnonceById, deleteAnnonceById } from '../controllers/annonce.controller.js' ;
import { authMiddleware } from '../middlewares/auth.middleware.js' ;
import { upload } from '../middlewares/upload.middleware.js'

const router = express.Router() ;

router.get('/' , getAllAnnonces) ;

router.post('/create' , upload.array('image', 5), authMiddleware, createAnnonce) ;

router.get('/:id' , getAnnonceById) ;

router.put('/:id' , upload.single('image'), authMiddleware, updateAnnonceById) ;

router.delete('/:id' , authMiddleware, deleteAnnonceById ) ;


export default router 