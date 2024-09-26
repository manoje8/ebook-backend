import ebookModel from "../model/ebook.model.js";
import path from "path";
import { fileURLToPath } from 'url';
import fs from 'fs'

class Books
{
    static async uploadEbook(req, res, next) 
    {
        const {filename, path} = req.file
        
        try 
        {
            if (!req.file) 
            {
                return res.status(400).send({ message: 'No file uploaded' });
            }

            const newEbook = await ebookModel.create(
                {
                    filename,
                    path
                }
            )

            res.status(200).send({ message: 'File uploaded and metadata saved', file: req.file });
        } 
        catch (error) 
        {
            console.log("Error in uploading a book: ", error);
            next(error)
        }
    }

    static async getEbooks(req, res, next) 
    {
        try 
        {
            const ebooks = await ebookModel.find();

            if(ebooks.length <= 0) return res.status(200).send([])

            res.status(200).json(ebooks);
        } 
        catch (error) 
        {
            console.log("Error in getting a books: ", error);
            next(error)
        }
    }

    static async removeEbook(req, res, next)
    {
        const {id} = req.params
        try 
        {
            const ebook = await ebookModel.findById(id)
            
            if (!ebook) return res.status(404).json({ error: 'Book not found' })
            
            // Manually define __dirname for ES modules
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);


            // Construct the full file path using path.join
            const filePath = path.join(__dirname, '../../', 'uploads', ebook.filename).replace(/\\/g, "/");

            if (fs.existsSync(filePath)) 
            {
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error(`Failed to delete file`);
                    } else {
                        console.log(`File deleted successfully`);
                    }
                });
            } 
            else 
            {
                console.error(`File does not exist`);
            }

            await ebookModel.findByIdAndDelete(id);
            
            res.status(200).send({ message: 'Book deleted successfully' });

        } catch (error) 
        {
            console.log("Error in removing a books: ", error);
            next(error)
        }
    }

    static async setFavorite(req, res, next) 
    {
        const {id} = req.params
        const {favorite} = req.body
        
        console.log("server: ", favorite);
        try 
        {
            
            const ebook = await ebookModel.findById(id)
            
            if (!ebook) return res.status(404).json({ error: 'Book not found' })

            await ebookModel.findByIdAndUpdate(
                {_id: id},
                {$set:{favorite}},
                {new: true}
            )

            return res.send({message: `${ebook.filename} is liked!`})
        } 
        catch (error) 
        {
            console.log("Error in setting favorite books: ", error);
            next(error)
        }
    }
}
export default Books