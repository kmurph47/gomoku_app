import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import connectDB from './util/connectDB';
import gameHandler from './handler/game.handler';
import authHandler from './handler/auth.handler';

dotenv.config();

// connect to database
connectDB();

const app: Express = express();
const port = process.env.PORT;
app.use(express.json());


app.use('/api/games', gameHandler)
app.use('/api/auth', authHandler)

// only listen to request when DB connection is established
mongoose.connection.once('connected', () => {
  console.log('⚡️[server]: Connected to MongoDB.');
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
})