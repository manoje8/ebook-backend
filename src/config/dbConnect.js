import mongoose from "mongoose"

class Mongo
{
    static async connect()
    {
        const MONGODB_URI = process.env.MONGODB_URI;
        if(!MONGODB_URI) throw new Error('MonogoDB URI is missing!!')

        await mongoose.connect(MONGODB_URI, {
            dbName: process.env.DATABASE_NAME,
            bufferCommands: false
        })
        .then(() => console.log('MongoDB is connected'))
        .catch((error) => console.error('Error in connection mongoDB: ', error))
    }
}

export default Mongo