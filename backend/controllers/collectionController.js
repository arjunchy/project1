import Collection from "../model/collection.js";
import cloudinary from "../utils/cloudinary.js";
import fs from 'fs';

export const createCollection = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ msg: "Image not found" });
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "Collection"
        });

        fs.unlinkSync(req.file.path);

        const newCollection = new Collection({
            filename: req.file.originalname,
            public_id: result.public_id,
            imgUrl: result.secure_url,
            collectionName: req.body.name
        });

        await newCollection.save();

        return res.status(200).json({ msg: "Collection Created" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Error creating collection", error: error.message });
    }
};

export const getCollection = async (req, res) => {
    try {
        const collections = await Collection.find().sort({ createdAt: -1 });
        res.status(200).json(collections);
    } catch (error) {
        res.status(500).json({ msg: 'Error fetching collections', error: error.message });
    }
};

export const deleteCollection = async (req, res) => {
    try {
        const collection = await Collection.findById(req.params.id);
        if (!collection) {
            return res.status(404).json({ msg: "Collection not found" });
        }

        await cloudinary.uploader.destroy(collection.public_id);
        await collection.deleteOne();

        res.status(200).json({ msg: "Collection deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Error deleting collection", error: error.message });
    }
};

export const updateCollection = async (req, res) => {
    try {
        const collection = await Collection.findById(req.params.id);
        if (!collection) {
            return res.status(404).json({ msg: "Collection not found" });
        }

        // Optional: destroy old image on Cloudinary if you're updating the image
        if (req.file) {
            await cloudinary.uploader.destroy(collection.public_id);

            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "Collection"
            });

            fs.unlinkSync(req.file.path);

            collection.public_id = result.public_id;
            collection.imgUrl = result.secure_url;
            collection.filename = req.file.originalname;
        }

        if (req.body.name) {
            collection.collectionName = req.body.name;
        }

        await collection.save();

        res.status(200).json({ msg: "Collection updated successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Error updating collection", error: error.message });
    }
};
