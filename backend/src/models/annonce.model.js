import db from '../config/db.js';

// Récupération de toutes les annonces

export const getAllAnnonces = async () => {
    try {
        const [rows] = await db.query('SELECT * FROM annonces') ;

        return rows ;
        
    } catch (error) {
        console.error('erreur lors de la récupération des annonces', error.message) ; 
        
        throw error ;
        
    }
}

// Créer une annonce

export const createAnnonce = async (data) => {
    try {
        const sql = `INSERT INTO annonces (title, price, city, image, user_id, category_id, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())`

        await db.query(sql, [data.title, data.price, data.city, data.image, data.user_id, data.category_id]) ;
        
    } catch (error) {
        console.error('erreur lors de la création des annonces', error.message) ; 
        
        throw error ; // Feature Node pour signifier une exception
        
        
    }
}

// Récupérer une seule annonce by ID

export const getAnnonceById = async (id) => {
    try {
        const [rows] = await db.query('SELECT * FROM annonces WHERE id = ?' , [id]) ;

        return rows[0] || null ; // le premier id trouvé est retourné
        
    } catch (error) {
        console.error('erreur lors de la récupération de lannonce', error.message) ; 
        
        throw error ;
        
    }
}

// Update une catégorie 

export const updateAnnonceById = async (id, data) => {
    try {
        await db.query(
            `UPDATE annonces 
            SET title = ?, price = ?, city = ?, image = ?, category_id = ? WHERE id = ?`,
            [
                data.title,
                data.price,
                data.city,
                data.image,
                data.category_id,
                id
            ]
        ) ;
        
    } catch (error) {
        console.error('erreur lors de la mise à jour de lannonce', error.message) ; 
        
        throw error ;
        
    }
}

// Supprimer une category

export const deleteAnnonceById  = async (id) => {
    try {
        const[deleted] = await db.query('DELETE FROM annonces WHERE id = ?' , [id]) ;

        return deleted.affectRows > 0 ; // > 0 mesure de sécurité 
        
    } catch (error) {
        console.error('erreur lors de la suppression de lannonce', error.message) ; 
        
        throw error ;
        
    }
}
     