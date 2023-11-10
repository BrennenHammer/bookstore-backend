import express from "express";
import { PORT, mongoDBURL } from "./config.js"
import mongoose from "mongoose"
import { book } from './models/bookmodel.js'
const app = express();
ç
app.get('/', (request, response)=>{
    console.log(request);
    return response.status(234).send('Welcome to the tutorial')
});

app.post('/books', async (request, response)=>{
    try{
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }

    }
    catch (error){
        console.log(error.message);
        response.status(500).send({ message: error.message});
    }
});

mongoose
.connect(mongoDBURL)
.then(()=>{
    console.log("app connected to database");
    app.listen(PORT, () =>{
        console.log(`App is listening to port: ${PORT}`);
    
    });
})
.catch((error)=>{
    console.log(error);
})