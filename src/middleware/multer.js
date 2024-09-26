import multer from "multer";
import fs from 'fs'
import path from "path";


// Set storage engine for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = 'uploads';
        fs.mkdirSync(uploadPath, {recursive: true});
        cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

// Initial Upload

const upload = multer({
    storage: storage,
    limits: {fieldSize: 10000000 }, // Limit file size to 10MB
    fileFilter: (req, file, cb) => {
        const fileTypes = /epub|pad/; // Accept only .epub or .pdf files
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype)

        if (mimetype && extname) 
        {
            return cb(null, true);
        } 
        else 
        {
            cb('Error: Only .epub and .pdf files are allowed!');
        }
    }
})

export default upload