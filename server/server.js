import express from 'express';
const app = express();

import connectDB from './db/connect.js';
import dotenv from 'dotenv';
dotenv.config();

import User from './models/User.js';
import cors from 'cors';

app.use(cors());
app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('welcome');
// });

const port = process.env.PORT || 5000;

function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

app.post('/register', async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      res.status(400).json({ msg: 'Email or name is missing' });
    }
    if (!isValidEmail(email)) {
      res.status(400).json({ msg: 'Email is not valid' });
    }

    const user = await User.create({ name, email });
    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

app.get('/showlist', async (req, res) => {
  try {
    const users = await User.find({});
    console.log(users);
    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
