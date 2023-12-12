import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app';
import env from './utils/validateEnv';
import groupConsole from './utils/groupConsole';

const port = env.PORT;

mongoose.connect(env.MONGODB_CONNECTION_STRING).then(() => {
  groupConsole('Connected to MongoDB');
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});
