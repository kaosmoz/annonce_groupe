import { categoryModel } from "../models/category.model.js";
import { categorySchema } from "../validation/category.validation.js";

export const createCategory = async (req, res) => {
try {
    const {error, value} = categorySchema.validate(req.body)
    const {name} = value

    if(error) {
        return res.status(400).json({message: ' le nom de la categorie est requise'})
    }

    await categoryModel.create(name)
    res.status(201).json({message: "catégorie créée"})
} catch (error) {
    console.error('erreur createCategory:', error.message);
    res.status(500).json({message: "erreur serveur"})
    
    
}
}

export const afficheCategory = async (req, res) => {
    try {
        const categories = await categoryModel.findByTitle()
        res.status(201).json({message: 'liste des categories', data:categories})
    } catch (error) {
        console.error('erreur : ', error.message);
        res.status(500)
        .json({message: 'erreur du serveur', message: error.message})   
    }
}