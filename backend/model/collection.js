import mongoose, { mongo } from "mongoose";

const collectionSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
    },
    image:{
        type: String,
        required: true
    }
})

const collection = mongoose.model("collection",collectionSchema)

export default collection;