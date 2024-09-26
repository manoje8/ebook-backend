import {Router} from 'express'
import Books from '../controller/ebook.controller.js'
import upload from '../middleware/multer.js'

const ebookRoutes = Router()


ebookRoutes.get("/", Books.getEbooks)
ebookRoutes.post("/upload", upload.single('ebook'), Books.uploadEbook)
ebookRoutes.delete("/delete/:id", Books.removeEbook)
ebookRoutes.put("/favorite/:id", Books.setFavorite)

export default ebookRoutes