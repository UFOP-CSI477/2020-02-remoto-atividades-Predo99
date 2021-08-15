import cors from 'cors';
import express from 'express';
import mongoose from "mongoose";
import router from './routes';
import path from 'path';

import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

const uri: string = `mongodb+srv://admin:admin@bancoprojeto.yajg1.mongodb.net/projeto?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.set("useFindAndModify", false);

mongoose
    .connect(uri, options)
    .then(() =>
        app.listen(3000, () =>
        console.log(`Server running.`)
        )
    )
    .catch(error => {
        throw error
});