import React, { useState, useEffect, useCallback  } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled'
import history from '../history'
import {
  Layout,
  Button,
} from 'antd';
import SendBird from 'sendbird'
import Pusher from 'pusher-js';
import SendBirdMessage from '../components/sendbird-message';
import {
  connect,
  deleteMessage,
  enterChannel,
  getMessage,
  openChannel,
  updateMessage,
  sendMessage,
  sendFileMessage,
} from '../utils/sendbird';

import {
  createTextMessage,
} from '../utils/message-converter';

import {
  MessageWeatherBotCreate,
  MessageConfirmAppStartCreate,
} from '../custom-messages';

const { Header, Content, Footer } = Layout;

const APP_ID = process.env.REACT_APP_APP_ID;
const CHANNEL_ID = process.env.REACT_APP_CHANNEL_ID;
const PUSHER_APP_ID = process.env.REACT_APP_PUSHER_APP_ID;
const PUSHER_APP_CLUSTER = process.env.REACT_APP_PUSHER_APP_CLUSTER;
const BOT_CHANNEL = process.env.REACT_APP_BOT_CHANNEL;
const BOT_WEATHER_EVENT = process.env.REACT_APP_BOT_WEATHER_EVENT;
const EVENT_HANDLER_ID = uuid4();


const Container = styled.div`
  padding: 12px;
`;

const HeaderTitle = styled.div`
  color: white;
  font-size: 36px;
  float: left;
`;
const MessageArea = styled.div`
`;

export default function Messages({ userId }) {
  if (!userId) {
    console.log('Please set userId');
    history.push('/login')
  }

  const [messages, setMessages] = useState([]);
  const [sb, setSb] = useState(null);
  const [channel, setChannel] = useState(null);
  const [pusherChannel, setPusherChannel] = useState(null);


  const registerFunc = useCallback(
    async (messageText) => {
      const registeredMessage = await sendMessage(channel, messageText);
      addMessageInModel(registeredMessage);  
    },
    [ channel] ,
  );


  async function registerFileFunc(file) {
    const registeredMessage = await sendFileMessage(channel, file);
    addMessageInModel(registeredMessage);
  }


  async function updateFunc(message, messageText) {
    const updatedMessage = await updateMessage(channel, message, messageText);
    updateMessageInModel(updatedMessage);
  }

  async function deleteFunc(message) {
    await deleteMessage(channel, message);
    // TODO deleteイベントが自分のブラウザでも発生してまう問題の調査
    deleteMessageInModel(message.messageId);
  }

  // Model Operations
  function addMessageInModel(newOne) {
    console.log('addMessageInModel', newOne)
    setMessages(msgs => {
      let targetIndex = null;

      for (const index in msgs) {
        if (msgs[index].messageId === newOne.messageId) {
          targetIndex = Number(index);  // index is string
          break;
        }
      }

      return targetIndex === null
        ? [
          ...msgs,
          newOne,
        ]
        : msgs;
    });
  }

  function updateMessageInModel(updatedOne) {
    setMessages(msgs => {
      let targetIndex;
      for (const index in msgs) {
        if (msgs[index].messageId === updatedOne.messageId) {
          targetIndex = Number(index); // index is string
          break;
        }
      }

      return targetIndex === null
        ? msgs
        : [
          ...msgs.slice(0, targetIndex),
          updatedOne,
          ...msgs.slice(targetIndex + 1)
        ];
    });
  }

  function deleteMessageInModel(deletedMessageId) {
    setMessages(msgs => {
      let targetIndex = null;

      for (const index in msgs) {
        if (msgs[index].messageId === deletedMessageId) {
          targetIndex = Number(index);  // index is string
          break;
        }
      }

      return targetIndex === null
        ? msgs
        : [
          ...msgs.slice(0, targetIndex),
          ...msgs.slice(targetIndex + 1)
        ];
    })
  }

  function fetchToWeatherBotFunc(message) {
    fetch('http://localhost:5000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
  }



  useEffect(() => {
    let unmounted = false;

    (async () => {
      // init＿ SendBird
      const sb = new SendBird({appId: APP_ID});
      // const user = await connect(sb, userId);
      await connect(sb, userId);
      const openedChannel = await openChannel(sb, CHANNEL_ID);
      await enterChannel(openedChannel);
      setSb(sb);
      setChannel(openedChannel);

      const currentQuery = openedChannel.createPreviousMessageListQuery();
      const messages = await getMessage(currentQuery);

      if(!unmounted && messages) {
        setMessages(messages);
      }
    })();

    // clean up
    return () => {
      unmounted = true;
    }
  }, [userId]);



  useEffect(() => {
    if (!sb || !channel) return;

    const ChannelHandler = new sb.ChannelHandler();
  
    // Add event handlers for sync in other browser
    ChannelHandler.onMessageReceived = (_, message) => addMessageInModel(message);
    ChannelHandler.onMessageUpdated = (_, message) => updateMessageInModel(message);
    ChannelHandler.onMessageDeleted = (_, messageId) => deleteMessageInModel(messageId);
    console.log('addChannelHandler')
    sb.addChannelHandler(EVENT_HANDLER_ID, ChannelHandler);

    return () => {
      if (!sb || !channel) return;
      
      console.log('removeChannelHandler')
      sb.removeChannelHandler(EVENT_HANDLER_ID);
    }

  }, [sb, channel])



  // init Pusher
  useEffect(() => {
    const pusher = new Pusher(PUSHER_APP_ID, {
      cluster: PUSHER_APP_CLUSTER,
      encrypted: true,
    });
    setPusherChannel(pusher.subscribe(BOT_CHANNEL));
  }, [])

  useEffect(() => {
    if (!pusherChannel && !channel) return;

    function registerFuncFromPusher({ message }) {
      registerFunc(createTextMessage(message))
    }

    console.log('bind pusherChannel event')

    pusherChannel.bind(BOT_WEATHER_EVENT, registerFuncFromPusher);

    return () => {
      console.log('unbind pusherChannel event')
      pusherChannel.unbind(BOT_WEATHER_EVENT, registerFuncFromPusher);
    };

  }, [pusherChannel, channel, registerFunc])
  


  
  return (
    <Layout>
      <Header>
        <HeaderTitle>
          航空券予約
        </HeaderTitle>
        {/* <Link to='/login'>
          <Button>
            Logout
          </Button>
        </Link> */}
      </Header>
      <Content>
        <Container>
          <MessageArea>
            {messages.map(m =>
              <SendBirdMessage
                m={m}
                key={m.messageId}
                viewerUserId={userId}
                registerFunc={registerFunc}
                registerFileFunc={registerFileFunc}
                updateFunc={updateFunc}
                deleteFunc={deleteFunc}
              />
            )}
          </MessageArea>
          <MessageConfirmAppStartCreate
            registerFunc={registerFunc}
            registerFileFunc={registerFileFunc}
          />

          <MessageWeatherBotCreate
            registerFunc={registerFunc}
            registerFileFunc={registerFileFunc}
            fetchToWeatherBotFunc={fetchToWeatherBotFunc}
          />
    
        </Container>
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}


function uuid4() {
  let d = new Date().getTime();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = ((d + Math.random() * 16) % 16) | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}
