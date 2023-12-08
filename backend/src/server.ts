import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import env from './utils/validateEnv';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

mongoose
  .connect(env.MONGODB_CONNECTION_STRING!)
  .then(() => {
    console.log('Connected to MongoDB!');
    app.listen(env.PORT, () => {
      console.log(`Server listening on http://localhost:${env.PORT}`);
    });
  })
  .catch(console.error);
