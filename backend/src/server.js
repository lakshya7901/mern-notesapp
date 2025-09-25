import express from "express";
import cors from 'cors'
import dotenv from 'dotenv';
import path from 'path'

import { connectDB } from "../config/db.js";

import notesRouter from "./routes/notesRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// Middleware
if(process.env.NODE_ENV !== 'production'){
    app.use(
        cors({
            // origin:'*',    
            origin:['http://localhost:5173']
        })
    );
}

app.use(express.json());
app.use(rateLimiter);
// app.use((req,res,next)=>{
//     console.log(`Request method is ${req.method} &  Request URL is ${req.url}`)
//     next();
// })

app.use("/api/notes", notesRouter);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'../frontend/dist')));

    app.get(/.*/, (req,res) => {
        res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
    });
}

connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log('Server started at port :', PORT);
    }) 
})