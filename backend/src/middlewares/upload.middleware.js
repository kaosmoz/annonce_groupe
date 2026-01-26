import multer from 'multer' ;

// Configuration du stockage de l'image 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload/')
    } ,

    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname) ;
    }

});

// Filtrage de sécurité

const fileFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image/')) {
        cb(null , true)
    } else {
        cb(new Error (`Seuls les médias de type 'image' sont autorisés`), false)
    }
}

// Exporter le middleware multer = ready

export const upload = multer({
    storage, fileFilter,
    limits: { fileSize: 300 * 1024 * 1024 } // Limite 20 Mo par fichiers (1024 octets = 1 Mo)

})