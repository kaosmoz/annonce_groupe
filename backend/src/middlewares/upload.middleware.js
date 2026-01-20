import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/upload')
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if(file.mimtype.startsWith('image/')) {
        cb(null, true)
    } else {
        cb(new Error ('seuls les médias de type image sont acceptés'), false)
    }
}

export const upload = multer({
    storage, fileFilter,
    limits: {fileSize: 20 * 1024 * 1024}
})