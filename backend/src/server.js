import experss from "express";
import cors from 'cors'
import dotenv from 'dotenv';

import { connectDB } from "../config/db.js";

import notesRouter from "./routes/notesRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";

const app = experss()
dotenv.config();

const PORT = process.env.PORT || 5001

// Middleware
app.use(
    cors({
        // origin:'*',    
        origin:['http://localhost:5173']
    })
)
app.use(experss.json());
app.use(rateLimiter);
// app.use((req,res,next)=>{
//     console.log(`Request method is ${req.method} &  Request URL is ${req.url}`)
//     next();
// })

app.use("/api/notes", notesRouter);

connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log('Server started at port :', PORT);
    }) 
})