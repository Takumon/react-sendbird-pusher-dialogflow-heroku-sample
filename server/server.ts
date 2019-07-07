import dotenv from 'dotenv';
dotenv.config();

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import path from 'path';
import processMessage from './process-message';
import processMessageInServer from './process-message-in-server';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'client/build')));

// For chating between server and client
app.post('/chat-to-server', (req, res) => {
  const { message } = req.body;
  processMessageInServer(message);
});

// For chating between client and client
app.post('/chat', (req, res) => {
  const { message } = req.body;
  processMessage(message);
});

app.set('port', port);
const server = app.listen(port, () => {
  console.log(`Express running → PORT ${port} !!!!`);
});
