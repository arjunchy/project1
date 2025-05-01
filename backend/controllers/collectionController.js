import collection from "../model/collection.js";

export const createCollection = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ msg: "Image file is required." });
        }

        const newCollection = new collection({
            name: req.body.name,
            image: req.file.filename,
        });

        await newCollection.save();

        return res.status(201).json({ msg: "Collection created successfully", collection: newCollection });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Error creating collection", error: error.message });
    }
};
