import express from "express";
import router from "./Routes/web.js";
import { connectdb } from "./Database/connection.js"
import { join } from "path";
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from 'cookie-parser';
dotenv.config()
const app=express();
const port=process.env.PORT
const DATABASE_URL= process.env.DATABASE_URL
app.use(cors())
app.use(cookieParser())
connectdb(DATABASE_URL)
app.set("view engine","ejs")
app.use('/static',express.static(join(process.cwd(),'Public')))
app.use(express.json());
app.use(express.urlencoded({extended:true})) //Frontend with backend
app.use("/",router)
app.listen(port,()=>{
    console.log(`Page at: http://localhost:${port}`);
})