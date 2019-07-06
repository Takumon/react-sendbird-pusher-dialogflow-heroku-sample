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
  MessageTextView,
  MessageLinkView,
  MessageImageView,

  MessageConfirmAppStartView,
  MessageConfirmAirLineView,
  MessageDepartureFormView,
  MessageArrivalFormView,
  MessageConfirmationView,
  MessageFlightTicketListView,
  MessageFlightTicketListConfirmView,
  MessageProfileView,
  MessageFlightSeatPreConfirmView,
  MessageFlightSeatView,
  MessageFlightSeatConfirmView,
  MessageFlightTicketPurchasePreConfirmView,
  MessageFlightTicketPurchaseView,
  MessageFlightTicketPurchasePdfView,
} from '../custom-messages';
import {
  toCustom,
  CUSTOM_MESSAGE_TYPE,
  createTextMessage,
  createAnswerMessage,
  createConfirmMessage,
  createConfirmAirLineMessage,
  createDepartureFormMessage,
  createArrivalToMessage,
  createConfirmationMessage,
  createFlightTicketListMessage,
  reateFlightTicketConfirmMessage,
  createFlightTicketAnswerMessage,
  createFlightTicketConfirmMessage,
  createProfileFormMessage,
  createFlightSeatPreConfirmMessage,
  createFlightSeatFormMessage,
  createFlightSeatConfirmMessage,
  createFlightTicketPurchasePreConfirmMessage,
  createFlightTicketPurchaseMessage,
  createFlightTicketPurchasePdfMessage,
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




class FlightTicketRegisterBot {
  constructor({
    registerFunc,
  }) {

    class AppStart {
      constructor(bot) {
        console.log('セットするbot', bot);
        this.bot = bot;
        this.init();
      }

      view = MessageConfirmAppStartView;

      init() {
        registerFunc(createConfirmMessage(
          '予約を開始しますか？',
          'チャットから航空機件予約が行えます。航空機件予約を開始しますか？'
        ));
      }


      async next({ message, isValid }) {
        console.log('question next', message, isValid)
        if (isValid) {
          console.log('次の質問をここで決めるのがいいのか？？')
          this.bot.setQuestion(new ConfirmAirLine(this.bot))
        } else {
          console.log('TODO リトライする')
          console.log('TODO 終了するにしても、ボットを外す処理を実行する')
          await registerFunc(createTextMessage(
            'いいえだったので処理を終了します'
          ));
        }
      }
    };

    class ConfirmAirLine {
      constructor(bot) {
        this.bot = bot;
        this.init();
      }

      view = MessageConfirmAirLineView;

      init() {
        registerFunc(createConfirmAirLineMessage());
      }

      async next({ message, isValid }) {

        if (!isValid) {
          await registerFunc(createTextMessage(
            'いいえだったので処理を終了します'
          ))  
        }

        this.bot.setQuestion(new DepartureFrom(this.bot))
      }
    }

    class DepartureFrom {
      constructor(bot) {
        this.bot = bot;
        this.init();
      }

      view = MessageDepartureFormView;

      init() {
        registerFunc(createDepartureFormMessage());
      }

      async next({ message, isValid }) {

        if (!isValid) {
          await registerFunc(createTextMessage(
            'いいえだったので処理を終了します'
          ))  
        }

        this.bot.setQuestion(new ArrivalTo(this.bot));
      }
    }

    class ArrivalTo {
      constructor(bot) {
        this.bot = bot;
        this.init();
      }

      view = MessageArrivalFormView;

      init() {
        registerFunc(createArrivalToMessage());
      }

      async next({ message, isValid }) {

        if (!isValid) {
          await registerFunc(createTextMessage(
            'いいえだったので処理を終了します'
          ))  
        }

        this.bot.setQuestion(new Confirmation(this.bot))
      }
    }

    class Confirmation {
      constructor(bot) {
        this.bot = bot;
        this.init();
      }

      view = MessageConfirmationView;

      init() {
        // TODO 登録したデータを元にコメントを生成したい
        registerFunc(createConfirmationMessage(
          // title
          // TODO 入力値をキャッシュして、キャッシュした値を代入
          [
            { name: '国内線・国際線', value: '国際線' },
            { name: 'ご予約人数', value: '1' },
            { name: '出発地域', value: '東京' },
            { name: '到着地域', value: 'サンフランシスコ' },
            { name: 'ご出発の日付', value: '2017/10/31' },
            { name: 'お帰りの日付', value: '2017/11/01' }
          ],
          
        ));
      }

      async next({ message, isValid }) {

        if (!isValid) {
          await registerFunc(createTextMessage(
            'いいえだったので処理を終了します'
          ))  
        }

        this.bot.setQuestion(new FlightTicketList(this.bot))
      }
    }


    class FlightTicketList {
      constructor(bot) {
        this.bot = bot;
        this.init();
      }

      view = MessageFlightTicketListView;

      init() {
        // TODO 登録したデータを元にコメントを生成したい
        registerFunc(createFlightTicketListMessage(
            [
              {
                'id': '9b8810c8-18e8-4c8f-99ce-2a96915a21ab',
                'selectable': true,
                'date': '12/28(木)',
                'routes': [
                  {
                    'seats': '○',
                    'flightName': 'TL002',
                    'depart': {
                      'airport': 'HND',
                      'airportJapanese': '羽田',
                      'dateTime': '19:45'
                    },
                    'arrival': {
                      'airport': 'SFO',
                      'airportJapanese': 'サンフランシスコ',
                      'dateTime': '12:00'
                    }
                  }
                ],
                'price': '￥156,000',
                'tax': '￥17,320',
                'time': '9時間 15分',
                'milage': '5130マイル'
              },
              {
                'id': '90ddd38a-0ab1-4e44-bcbf-699fc51d7381',
                'selectable': true,
                'date': '12/28(木)',
                'routes': [
                  {
                    'seats': '△',
                    'flightName': 'TL012',
                    'depart': {
                      'airport': 'NRT',
                      'airportJapanese': '成田',
                      'dateTime': '11:50'
                    },
                    'arrival': {
                      'airport': 'DFW',
                      'airportJapanese': 'ダラス・フォートワース',
      
                      'dateTime': '08:05'
                    }
                  },
                  {
                    'seats': '7',
                    'flightName': 'TL7577',
                    'depart': {
                      'airport': 'DFW',
                      'airportJapanese': 'ダラス・フォートワース',
                      'dateTime': '11:10'
                    },
                    'arrival': {
                      'airport': 'SFO',
                      'airportJapanese': 'サンフランシスコ',
                      'dateTime': '13:14'
                    }
                  }
                ],
                'price': '￥166,500',
                'tax': '￥17,320',
                'time': '18時間 24分',
                'milage': '7904マイル'
              },
              {
                'id': '9f06f070-d434-4a20-bfec-05a71902ad4f',
                'selectable': true,
                'date': '12/28(木)',
                'routes': [
                  {
                    'seats': '7',
                    'flightName': 'TL7016',
                    'depart': {
                      'airport': 'NRT',
                      'airportJapanese': '成田',
                      'dateTime': '18:45'
                    },
                    'arrival': {
                      'airport': 'LAX',
                      'airportJapanese': 'ロサンゼルス',
                      'dateTime': '11:45'
                    }
                  },
                  {
                    'seats': '7',
                    'flightName': 'TL7556',
                    'depart': {
                      'airport': 'LAX',
                      'airportJapanese': 'ロサンゼルス',
                      'dateTime': '14:00'
                    },
                    'arrival': {
                      'airport': 'SFO',
                      'airportJapanese': 'サンフランシスコ',
                      'dateTime': '15:30'
                    }
                  }
                ],
                'price': '￥199,000',
                'tax': '￥17,320',
                'time': '13時間 45分',
                'milage': '5797マイル'
              }
            ]
        ));
      }

      async next({ message, isValid }) {

        if (!isValid) {
          await registerFunc(createTextMessage(
            'いいえだったので処理を終了します'
          ))  
        }

        this.bot.setQuestion(new FlightTicketListConfirm(this.bot))
      }
    }



    class FlightTicketListConfirm {
      constructor(bot) {
        this.bot = bot;
        this.init();
      }

      view = MessageFlightTicketListConfirmView;

      init() {
        // TODO 登録したデータを元にコメントを生成したい
        registerFunc(reateFlightTicketConfirmMessage(
          [{
            'id': '9b8810c8-18e8-4c8f-99ce-2a96915a21ab',
            'date': '12/28(木)',
            'routes': [
              {
                'seats': '○',
                'flightName': 'TL002',
                'depart': {
                  'airport': 'HND',
                  'airportJapanese': '羽田',
                  'dateTime': '19:45'
                },
                'arrival': {
                  'airport': 'SFO',
                  'airportJapanese': 'サンフランシスコ',
                  'dateTime': '12:00'
                }
              }
            ],
            'price': '￥156,000',
            'tax': '￥17,320',
            'time': '9時間 15分',
            'milage': '5130マイル',
            'selectable': false,
          }],
        ));
      }

      async next({ message, isValid }) {

        if (!isValid) {
          await registerFunc(createTextMessage(
            'いいえだったので処理を終了します'
          ))  
        }

        this.bot.setQuestion(new ProfileForm(this.bot))
      }
    }



    class ProfileForm {
      constructor(bot) {
        this.bot = bot;
        this.init();
      }

      view = MessageFlightSeatPreConfirmView;

      init() {
        // TODO 登録したデータを元にコメントを生成したい
        registerFunc(createProfileFormMessage());
      }

      async next({ message, isValid }) {

        if (!isValid) {
          await registerFunc(createTextMessage(
            'いいえだったので処理を終了します'
          ))  
        }

        this.bot.setQuestion(new FlightSeatPreConfirm(this.bot))
      }
    }

    class FlightSeatPreConfirm {
      constructor(bot) {
        this.bot = bot;
        this.init();
      }

      view = MessageFlightSeatPreConfirmView;

      init() {
        // TODO 登録したデータを元にコメントを生成したい
        registerFunc(createFlightSeatPreConfirmMessage())  
      }

      async next({ message, isValid }) {

        if (!isValid) {
          await registerFunc(createTextMessage(
            'いいえだったので処理を終了します'
          ))  
        }

        this.bot.setQuestion(new FlightSeatForm(this.bot))
      }
    }


    class FlightSeatForm {
      constructor(bot) {
        this.bot = bot;
        this.init();
      }

      view = MessageFlightSeatView;

      init() {
        // TODO 登録したデータを元にコメントを生成したい
        registerFunc(createFlightSeatFormMessage())  
      }

      async next({ message, isValid }) {

        if (!isValid) {
          await registerFunc(createTextMessage(
            'いいえだったので処理を終了します'
          ))  
        }

        this.bot.setQuestion(new FlightSeatConfirm(this.bot))
      }
    }


    class FlightSeatConfirm {
      constructor(bot) {
        this.bot = bot;
        this.init();
      }

      view = MessageFlightSeatConfirmView;

      init() {
        // TODO 登録したデータを元にコメントを生成したい
        const seat = { name: 'E4' };
        registerFunc(createFlightSeatConfirmMessage(seat))  
      }

      async next({ message, isValid }) {

        if (!isValid) {
          await registerFunc(createTextMessage(
            'いいえだったので処理を終了します'
          ))  
        }

        this.bot.setQuestion(new FlightTicketPurchasePreConfirm(this.bot))
      }
    }



    class FlightTicketPurchasePreConfirm {
      constructor(bot) {
        this.bot = bot;
        this.init();
      }

      view = MessageFlightTicketPurchasePreConfirmView;

      init() {
        registerFunc(createFlightTicketPurchasePreConfirmMessage())  
      }

      async next({ message, isValid }) {

        if (!isValid) {
          await registerFunc(createTextMessage(
            'いいえだったので処理を終了します'
          ))  
        }

        this.bot.setQuestion(new FlightTicketPurchaseForm(this.bot))
      }
    }


    class FlightTicketPurchaseForm {
      constructor(bot) {
        this.bot = bot;
        this.init();
      }

      view = MessageFlightTicketPurchaseView;

      init() {
        registerFunc(createFlightTicketPurchaseMessage(
          '購入手続きをしてください。',
          { order:
            {
              price: '￥98,000',
              tax: '￥0',
              amount: '￥98,000',
              date: '12/30(月)',
              confirmed: false,
            }
          },
        ))  
      }

      async next({ message, isValid }) {

        if (!isValid) {
          await registerFunc(createTextMessage(
            'いいえだったので処理を終了します'
          ))  
        }

        this.bot.setQuestion(new FlightTicketPurchasePdf(this.bot))
      }
    }


    class FlightTicketPurchasePdf {
      constructor(bot) {
        this.bot = bot;
        this.init();
      }

      view = MessageFlightTicketPurchasePdfView;

      async init() {
        await registerFunc(createFlightTicketPurchasePdfMessage(
          { order:
            {
              price: '￥98,000',
              tax: '￥0',
              amount: '￥98,000',
              date: '12/30(月)',
            },
          },
        ))

        await registerFunc(createTextMessage('ご予約を終了いたします。引き続き質問等があればオペレーターが対応いたします。ありがとうございました。'));
      }
    }




    this.question = new AppStart(this);
  }

  next({ message, isValid }) {
    console.log('bot next', message, isValid)
    if (!this.question) return;

    this.question.next({message, isValid });
  }

  setQuestion(q) {
    this.question = q;
  }
}




export default function Messages({ userId }) {
  if (!userId) {
    console.log('Please set userId');
    history.push('/login')
  }

  const [attachedBot, setAttachedBot] = useState(null);
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


  function detachBot() {
    setAttachedBot(null);
  }

  function attachBot() {
    setAttachedBot(new FlightTicketRegisterBot({ registerFunc }));
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
    ChannelHandler.onMessageReceived = (_, message) => {
      // ChatBot has to reaction
      addMessageInModel(message);

      console.log('execNextBotAction', message, attachedBot)
      if (!attachedBot) return;

      // 受付側
      if (attachBot && message._sender.userId !== 'inouetakumon@gmail.com') {
        attachedBot.next({ message, isValid: true });
      }
    };
    ChannelHandler.onMessageUpdated = (_, message) => updateMessageInModel(message);
    ChannelHandler.onMessageDeleted = (_, messageId) => deleteMessageInModel(messageId);
    console.log('addChannelHandler')
    sb.addChannelHandler(EVENT_HANDLER_ID, ChannelHandler);

    return () => {
      if (!sb || !channel) return;
      
      console.log('removeChannelHandler')
      sb.removeChannelHandler(EVENT_HANDLER_ID);
    }

  }, [sb, channel, attachedBot])



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
        { attachedBot ? (
          <Button onClick={detachBot} >
            Detach Bot
          </Button>
        ) : (
          <Button onClick={attachBot} >
            Attach Bot
          </Button>
        )}
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
