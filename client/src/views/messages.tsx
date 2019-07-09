import React, { useState, useEffect, useCallback  } from 'react';
import styled from '@emotion/styled';
import history from '../history';
import { Layout } from 'antd';
import Pusher from 'pusher-js';
import SendBirdMessage from '../components/sendbird-message';
import { createTextMessage, toCustom } from '../utils/message-converter';
import { MessageWeatherBotCreate, MessageTextFormCreate } from '../custom-messages';

const { Header, Content, Footer } = Layout;
const PUSHER_APP_ID: string = process.env.REACT_APP_PUSHER_APP_ID || '';
const PUSHER_APP_CLUSTER: string = process.env.REACT_APP_PUSHER_APP_CLUSTER || '';
const BOT_CHANNEL: string = process.env.REACT_APP_BOT_CHANNEL || '';
const BOT_WEATHER_EVENT: string = process.env.REACT_APP_BOT_WEATHER_EVENT || '';
const BOT_MESSAGE_ADDED_EVENT: string = process.env.REACT_APP_BOT_MESSAGE_ADDED_EVENT || '';

const WEATHER_API_URL: string = 'http://localhost:5000/chat';

const MESSAGE_API_URL: string = 'http://localhost:5000/messages';
// TODO temp user id
const BOT_USER_ID: string = 'inouetakumon@gmail.com';

/****************************/
/*  Style                   */
/****************************/
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


/****************************/
/*  Conponent               */
/****************************/
export default function Messages({ userId }: { userId: string }) {
  if (!userId) {
    console.log('Please set userId');
    history.push('/login');
  }

  const [messages, setMessages] = useState<[any]>();
  const [pusherChannel, setPusherChannel] = useState<any>(null);

  /* Message Operations */
  const registerFunc = useCallback(
    async (messageText) => {
      await fetch(MESSAGE_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageText }),
      });
    },
    [],
  );


  const deleteFunc = useCallback(
    async (message) => {
      // TODO implements
      // await deleteMessage(channel, message);
      // // TODO deleteイベントが自分のブラウザでも発生してまう問題の調査
      // deleteMessageInModel(message.messageId);
    },
    [],
  );


  /* Model Operations */
  function addMessageInModel({ message }: { message: any }) {
    console.log('addMessageInModel', message);
    setMessages((msgs: any) => {
      let targetIndex: Number | null = null;

      for (const index in msgs) {
        if (msgs[index].messageId === message.messageId) {
          targetIndex = Number(index);  // index is string
          break;
        }
      }

      return targetIndex === null
        ? [ ...msgs, message ]
        : msgs;
    });
  }

  // function updateMessageInModel(updatedOne: any) {
  //   setMessages((msgs: any) => {
  //     let targetIndex: Number | null = null;
  //     for (const index in msgs) {
  //       if (msgs[index].messageId === updatedOne.messageId) {
  //         targetIndex = Number(index); // index is string
  //         break;
  //       }
  //     }

  //     return targetIndex === null
  //       ? msgs
  //       : [
  //         ...msgs.slice(0, targetIndex),
  //         updatedOne,
  //         ...msgs.slice(Number(targetIndex) + 1)
  //       ];
  //   });
  // }


  function deleteMessageInModel(deletedMessageId: string) {
    setMessages((msgs: any) => {
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
    });
  }


  /* API Operations */
  async function fetchToWeatherBotFunc(message: any) {
    await fetch(WEATHER_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
  }

  // initial Fetch from server
  async function getMessages() {
    const res: any = await fetch(MESSAGE_API_URL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json'}
    });

    // TODO format res
    const data: any = await res.json();
    console.log('MMMMMM', data);
    if (data) {
      setMessages(data);
    }
  }

  // init Pusher
  useEffect(() => {
    const pusher = new Pusher(PUSHER_APP_ID, {
      cluster: PUSHER_APP_CLUSTER,
      encrypted: true,
    });
    setPusherChannel(pusher.subscribe(BOT_CHANNEL));
  }, []);

  useEffect(() => {
    if (!pusherChannel) {
      return;
    }

    function registerFuncFromPusher({ message } : { message: any }) {
      registerFunc(createTextMessage(message))
    }

    console.log('bind pusherChannel event');
    pusherChannel.bind(BOT_WEATHER_EVENT, registerFuncFromPusher);
    pusherChannel.bind(BOT_MESSAGE_ADDED_EVENT, addMessageInModel);
    getMessages();


    return () => {
      console.log('unbind pusherChannel event')
      pusherChannel.unbind(BOT_WEATHER_EVENT, registerFuncFromPusher);
      pusherChannel.unbind(BOT_MESSAGE_ADDED_EVENT, addMessageInModel);
    };

  }, [pusherChannel, registerFunc]);


  const UserId = styled.div`
    font-size: 12px;
    color: white;
    position: absolute;
    top: 32;
    right: 0;
    padding: 12px;
    height: 32px;
  `;

  return (
    <Layout>
      <Header>
        <HeaderTitle>
          航空券予約
        </HeaderTitle>
        <UserId>
          { userId }
        </UserId>
        {/* <Link to='/login'>
          <Button>
            Logout
          </Button>
        </Link> */}
      </Header>
      <Content>
        <Container>
          <MessageArea>
            {messages && messages.map(m =>
              <SendBirdMessage
                m={m}
                key={m.messageId}
                viewerUserId={userId}
                registerFunc={registerFunc}
                registerFileFunc={() => {}}
                deleteFunc={deleteFunc}
              />
            )}
          </MessageArea>

          <MessageTextFormCreate
            registerFunc={registerFunc}
          />

          <MessageWeatherBotCreate
            registerFunc={registerFunc}
            fetchToWeatherBotFunc={fetchToWeatherBotFunc}
          />

        </Container>
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}
