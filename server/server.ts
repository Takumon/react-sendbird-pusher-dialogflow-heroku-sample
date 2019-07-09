import dotenv from 'dotenv';
dotenv.config();

import Pusher from 'pusher';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import path from 'path';
import processMessage from './process-message';
import MessageHandler from './message-handler';

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID || '',
  cluster: process.env.PUSHER_APP_CLUSTER || '',
  encrypted: true,
  key: process.env.PUSHER_APP_KEY || '',
  secret: process.env.PUSHER_APP_SECRET || '',
});

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'client/build')));

const messageHandler = new MessageHandler('inouetakumon@gmail.com', pusher);

// For chating between server and client
app.post('/messages', async (req, res) => {
  console.log('ほげほげほげ', req.body);
  const { message } = req.body;
  try {
    await messageHandler.registerFunc(message);
    res.send('OK');
  } catch (e) {
    console.log(e);
    res.status(500).send('Something broke!');
  }
});

app.get('/messages', async (req, res) => {
  try {
    const messages = await messageHandler.getMessages();
    res.json(messages);
  } catch (e) {
    console.log(e);
    res.status(500).send('Something broke!');
  }
});

// For chating between client and client
app.post('/chat', (req, res) => {
  const { message } = req.body;
  processMessage(message, pusher);
});

app.set('port', port);
const server = app.listen(port, () => {
  console.log(`Express running → PORT ${port} !!!!`);
});
