import { model, Schema, version } from "mongoose";

const ebookSchema = new Schema(
    {
        filename: {type: String, required: true},
        path: {type: String, required: true},
        uploadDate: {type: Date,default: Date.now},
        favorite: {type: Boolean, default: false}
    },
    {
        timestamps: true
    },
    {
        collection: 'ebook',
        versionKey: false
    }
)

const ebookModel = model('ebook', ebookSchema)

export default ebookModel