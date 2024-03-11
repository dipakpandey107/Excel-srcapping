import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/index.js";
import excelRoutes from './routes/excelRoutes.js';

dotenv.config({
    path: './env'
})

const app = express();

connectDB();

app.use(express.json());
app.use('/', excelRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
