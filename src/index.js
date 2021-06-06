import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { getUsers, createUser, deleteUser, updateUser } from './queries/qindex.js';
import dotenv from 'dotenv';

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());



dotenv.config();

const db = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.fka4t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`


mongoose
.connect(db, {useNewUrlParser: true})
.then(() => console.log('connected succesfully'))
.catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'hello world',
  });
});

//create
app.post('/users', createUser);

//read
app.get('/users', getUsers);

//update
app.patch('/users/:id', updateUser);

//delete
app.delete('/users/:id', deleteUser);
app.listen(port, () => {
  console.log(`Server connected at  http://localhost:${port}`);
});

export default mongoose;