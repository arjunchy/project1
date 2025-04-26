import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/database.js';
import route from './routes/route.js'
import bodyParser from 'body-parser';
import cors from 'cors';


const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
app.use('/',route);


app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended: true}));

const username = "";
const password = "";
const URL =  process.env.MONGO_URL ||`mongodb+srv://${username}:${password}@cluster0.nmfl72f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
connectDB(URL);

const PORT = 8000;

app.listen(PORT , ()=>{
    console.warn("server is running in 8000");
})