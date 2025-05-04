import mongoose from 'mongoose'

const collectionSchema = mongoose.Schema({
  filename: String,
  public_id: String,
  imgUrl: String,
  collectionName: String
}, { timestamps: true });


const Collection = mongoose.model("Collection", collectionSchema);
export default Collection;
