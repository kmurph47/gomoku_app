import dotenv from 'dotenv'
import mongoose from 'mongoose'

import connectDB from './util/connectDB';
import app from './app';

dotenv.config()
const port = process.env.PORT

// connect to database
connectDB()

// only listen to request when DB connection is established
mongoose.connection.once('connected', () => {
  console.log('⚡️[server]: Connected to MongoDB.')
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
  })
})