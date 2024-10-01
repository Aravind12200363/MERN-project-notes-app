import express, { json } from "express";
 import cors from "cors";
 import mongoose from "mongoose";
 import  notesRouter from"./api/notes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://aravindchowdary8082:8082@cluster0.us1ya.mongodb.net/"
  )
  .then(() => {
    console.log("Database connected successfully");
  });


app.use('/api/notes', notesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
 