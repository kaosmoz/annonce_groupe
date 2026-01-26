import * as model from '../models/annonce.model.js' ;
import { annonceSchema } from '../validation/annonce.validation.js' ;

// Création de la catégorie

export const getAllAnnonces = async (req, res) => {
    try {
        const annonces = await model.getAllAnnonces() ;

        res.json(annonces)

    } catch (error) {
        console.error('Erreur lors de la récupération des annonces (controller)' , error.message) ;

        res.status(500).json({message:'erreur serveur lors de la récupération des annonces'}) ;
           
    }
}

export const createAnnonce = async (req, res) => {
    try {

        const image = req.files ? req.files.map(f => f.filename).join(',') : null;

        const user_id = req.user.id ;

        const {title, price, city, category_id} = req.body ;

        if(!title) {
            return res.status(400).json({message: 'Le titre de lannonce est requis'}) ;
        }

        if(!price) {
            return res.status(400).json({message: 'Veuillez rentrer un prix'}) ;
        }

        if(!city) {
            return res.status(400).json({message: 'Veuillez rentrer une ville'}) ;
        }

        // VALIDATION

        const {error} = annonceSchema.validate({title, price, city, category_id}) ;

        if (error) {
            return res.status(400).json({message: error.details[0].message}) ;
        }

        await model.createAnnonce({title, price, city, image, user_id, category_id}) ;

        res.status(201).json({message: 'Annonce créée avec succès :)'}) ;
        
    } catch (error) {
        console.error(
            'Erreur lors de la récupération des annonces dans modèle' ,
            error.message
        ) ;

        res.status(500).json({
            message:'Erreur serveur lors de la création des annonces'
        }) ;  
    }
}

// Récupération d'une annonce by Id 

export const getAnnonceById = async (req, res) => {
    try {

        const {id} = req.params ; // req.params : un objet qui contient les paramètres de route (ceux définis dans l’URL)

        const annonce = await model.getAnnonceById(id) ;

        if(!annonce) {
            return res.status(404).json({message: 'Aucune annonce trouvée :('})
        }

        res.json(annonce) ;

        
    } catch (error) {
        console.error(
            'Erreur lors de la récupération de lannonce' ,
            error.message
        );

        res.status(500).json({
            message:'Erreur serveur lors de la récupération de lannonce'
        })
        
    }
}

// Update d'une catégorie by Id 

export const updateAnnonceById = async (req, res) =>  {
    try {
        const {id} = req.params ;

        const image = req.files ? req.files.map(f => f.filename).join(',') : null;

        const existingAnnonce = await model.getAnnonceById(id) ;

        if(!existingAnnonce) {
            return res.status(404).json({message: 'Annonce introuvable'})
        }

        const updatedData = {
         title: req.body?.title ?? existingAnnonce.title,
         price: req.body?.price ?? existingAnnonce.price,
         city: req.body?.city ?? existingAnnonce.city,
         category_id: req.body?.category_id ?? existingAnnonce.category_id,
         image: image ? existingAnnonce.image : undefined 
        };

        // Validation Joi
        const { error } = annonceSchema.validate({
        title: updatedData.title,
        price: updatedData.price,
        city: updatedData.city,
        category_id: updatedData.category_id
});
if (error) {
    return res.status(400).json({ message: error.details[0].message });

}

await model.updateAnnonceById(id, updatedData) ;

res.json({message: 'Annonce mise à jour'}) ;
        
    } catch (error) {
        console.error('Erreur serveur lors de lupdate' , error.message) ;

        res.status(500).json({message: 'Erreur serveur lors de lupdate'}) ;
        
        
    }
}

// Supprimer une annonce by ID

export const deleteAnnonceById = async (req, res) => {
    try {
        const {id} = req.params ;
        const affectRows = await model.deleteAnnonceById(id) ;

        if (affectRows) {
            res.status(404).json({message: 'Aucune annonce trouvée lors de la suppression'}) ;
            
        }

        res.json({message: 'Annonce supprimée avec succès'}) ;
            

    } catch (error) {
        console.error('Erreur serveur lors de la suppression' , error.message);
        
    }
}