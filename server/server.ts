import dotenv from 'dotenv';
dotenv.config();

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import path from 'path';
import processMessage from './process-message';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'client/build')));

app.post('/chat', (req, res) => {
  const { message } = req.body;
  processMessage(message);
});

app.set('port', port);
const server = app.listen(port, () => {
  console.log(`Express running → PORT ${port} !!!!`);
});
