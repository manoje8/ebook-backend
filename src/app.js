import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import Mongo from './config/dbConnect.js'
import router from './router/routes.js'

dotenv.config()

Mongo.connect()

const PORT = process.env.PORT;

const app = express()

app.use(express.json())
app.use(morgan('dev'))

app.use(cors({
    origin:process.env.CLIENT_URI,
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}))

app.use('/', router)
app.use('/uploads', express.static('uploads'));

app.listen(PORT, () => console.log(`server running on port: ${PORT}`));