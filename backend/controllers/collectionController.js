import Collection from "../model/collection.js";
import cloudinary from "../utils/cloudinary.js";
import fs from 'fs'

export const createCollection = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ msg: "Image not found" });
        }

        const result = await cloudinary.uploader.upload(req.file.path,{
            folder: "Collection"
        })

        fs.unlinkSync(req.file.path);

        const newCollection = new Collection({
            filename: req.file.originalname,
            public_id: result.public_id,
            imgUrl: result.secure_url,
            collectionName: req.body.name
        })

        await newCollection.save();

        return res.status(200).json({msg: "Collection Created"})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Error creating collection", error: error.message });
    }
};


export const getCollection = async (req, res) => {
    try {
        const files = await Collection.find().sort({ createdAt: -1 });
        res.json(files);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching files' });
    }
};
