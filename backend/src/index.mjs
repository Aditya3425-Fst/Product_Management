import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './routes/route.mjs';
const app= express();
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb+srv://adityakumartiwari3888:H9cVwnEQkH0UCL8V@cluster0.3tjbbfe.mongodb.net/").then(()=>console.log("database connected")).catch((err)=>console.log(err));
app.use('/',router);
app.listen(8000,()=>{
    console.log("server has started on port: ",8000);
})