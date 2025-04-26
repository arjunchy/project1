import mongoose from 'mongoose'

const connectDB = async (URL) => {
    try{
        await mongoose.connect(URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true
          });
        console.warn("database is connected successfully")
    }catch(error){
        console.warn(error);
    }
    
}

export default connectDB;