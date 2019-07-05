import React, { useState  } from 'react';
import styled from '@emotion/styled'
import { 
  Button,
} from 'antd';
import {
  MessageConfirmAppStartView,
  MessageConfirmAirLineView,
  MessageDepartureFormView,
  MessageArrivalFormView,

  MessageTextView,
  MessageTextFormUpdate,
  MessageLinkView,
  MessageLinkFormUpdate,
  MessageImageView,
  MessageImageFormUpdate,
  MessageConfirmationView,
  MessageFlightTicketListView,
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
  createConfirmAirLineMessage,
  createDepartureFormMessage,
  createArrivalFormMessage,
  createConfirmationMessage,
  createFlightTicketListMessage,
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


const Container = styled.div`
  display: flex;
  align-items: stretch;
`;


const AvatorArea = styled.div`
  width: 36px;
  border-radius: 16px;
  border: 1px solid gray;
  overflow: hidden;
  margin-right: 1rem;
`;

const MessageArea = styled.div`
  flex-grow: 1;
  margin-right: 1rem;
`;

const ButtonArea = styled.div`
`;

export default function SendBirdMessage({
  m,
  viewerUserId,
  registerFunc,
  registerFileFunc,
  updateFunc,
  deleteFunc
}) {
  const [editable, setEditable] = useState(false);

  const postUser = m.sender.userId === viewerUserId
    ? 'Mine'
    : m.sender.userId;

  return (
      <Container>
        <AvatorArea>
          {postUser}
        </AvatorArea>
        {editable
          ? (
            <CustomMessageFormUpdate
              m={m}
              updateFunc={updateFunc}
              cancelFunc={() => {
                console.log('falseにする')
                setEditable(false);
              }}
            />
          )
          : (<>
            <MessageArea>
              <CustomMessageView
                m={m}
                registerFunc={registerFunc}
                viewerUserId={viewerUserId}
              />
            </MessageArea>
            <ButtonArea>
              <Button
                onClick={() => {
                  console.log('trueにする')
                  setEditable(true);
                }} 
              >EDITE</Button>
              <Button
                onClick={() => deleteFunc(m)}
                type="danger"
              >DELETE</Button>
            </ButtonArea>
          </>)
        }
      </Container>
  );
}


function CustomMessageFormUpdate({
  m,
  updateFunc,
  cancelFunc,
}) {
  const message = toCustom(m)

  switch(message.customMessage.type) {
    case CUSTOM_MESSAGE_TYPE.TEXT:
      return (
        <MessageTextFormUpdate
          message={message}
          updateFunc={updateFunc}
          cancelFunc={cancelFunc}
        />
      );
    case CUSTOM_MESSAGE_TYPE.LINK:
      return (
        <MessageLinkFormUpdate
          message={message}
          updateFunc={updateFunc}
          cancelFunc={cancelFunc}
        />
      );
    case CUSTOM_MESSAGE_TYPE.IMAGE:
        return (
          <MessageImageFormUpdate
            message={message}
            updateFunc={updateFunc}
            cancelFunc={cancelFunc}
          />
        );
    case CUSTOM_MESSAGE_TYPE.CHOICE:
      // 型チェック
      // TODO
      break;
    case CUSTOM_MESSAGE_TYPE.ORIGINAL:
      // 型チェック
      // TODO
      break;
    default:
      throw new Error(`Invalid message type = ${m.type}`)
  }
}
            

function CustomMessageView({
  m,
  registerFunc,
  viewerUserId,
}) {
  const message = toCustom(m)
  switch(message.customMessage.type) {
    case CUSTOM_MESSAGE_TYPE.TEXT:
      return (
        <MessageTextView
          m={message}
        />
      );

    case CUSTOM_MESSAGE_TYPE.ANSWER:
      // isAnswerではなく答えた人でレイアウトを変える
      return (
        <MessageTextView
          m={message}
          isAnswer={true}
        />
      );
  

    case CUSTOM_MESSAGE_TYPE.LINK:
      return (
        <MessageLinkView
          m={message}
        />
      );

    case CUSTOM_MESSAGE_TYPE.IMAGE:
      return (
        <MessageImageView
          m={message}
        />
      );


    case CUSTOM_MESSAGE_TYPE.CONFIRM:
      return (
        <MessageConfirmAppStartView
          m={message}
          registerFunc={registerFunc}

          answer={(value) => {
            registerFunc(createAnswerMessage(
              value,
              CUSTOM_MESSAGE_TYPE.CONFIRM
            ));
          }}

          yesAction={() => {
            registerFunc(createConfirmAirLineMessage(
              '国内線/国際線',
              '国内線と国際線のどちらですか？'
            ))
          }}

          noAction={() => {
            registerFunc(createTextMessage(
              'いいえだったので処理を終了します'
            ))
          }}
        />
      );

    case CUSTOM_MESSAGE_TYPE.CONFIRM_AIR_LINE:
      return (
        <MessageConfirmAirLineView
          m={message}
          registerFunc={registerFunc}

          answer={(value) => {
            registerFunc(createAnswerMessage(
              value,
              CUSTOM_MESSAGE_TYPE.CONFIRM_AIR_LINE
            ));
          }}

          validAction={(value) => {
            registerFunc(createDepartureFormMessage(
              '出発の地域はどこでしょうか',
            ))
          }}

          invalidAction={(value) => {
            // TODO 実装
          }}
        />
      );

  

    case CUSTOM_MESSAGE_TYPE.DEPARTURE_FORM:
      return (
        <MessageDepartureFormView
          m={message}
          registerFunc={registerFunc}

          answer={async (value) => {
            await registerFunc(createAnswerMessage(
              value,
              CUSTOM_MESSAGE_TYPE.DEPARTURE_FORM
            ));
          }}

          validAction={async (value) => {
            await registerFunc(createArrivalFormMessage(
              '到着値は地域はどこでしょうか',
            ))
          }}

          invalidAction={(value) => {
            // TODO 実装
          }}
        />
      );

    case CUSTOM_MESSAGE_TYPE.ARRIVAL_FORM:
      return (
        <MessageArrivalFormView
          m={message}
          registerFunc={registerFunc}

          answer={async (value) => {
            await registerFunc(createAnswerMessage(
              value,
              CUSTOM_MESSAGE_TYPE.ARRIVAL_FORM
            ));
          }}

          validAction={async (value) => {
            // TODO 日付の質問など
            const messageStr = createConfirmationMessage(
              // title
              'フライト予約内容',
              '以下の内容でフライトを検索しますか？',
              // TODO 入力値をキャッシュして、キャッシュした値を代入
              [
                { name: '国内線・国際線', value: '国際線' },
                { name: 'ご予約人数', value: '1' },
                { name: '出発地域', value: '東京' },
                { name: '到着地域', value: 'サンフランシスコ' },
                { name: 'ご出発の日付', value: '2017/10/31' },
                { name: 'お帰りの日付', value: '2017/11/01' }
              ],
            );
            await registerFunc(messageStr);
          }}

          invalidAction={(value) => {
            // TODO 実装
          }}
        />
      );


      case CUSTOM_MESSAGE_TYPE.CONFIRMATION:
        return (
          <MessageConfirmationView
            m={message}
            registerFunc={registerFunc}
            answer={(value) => {
              registerFunc(createAnswerMessage(
                value,
                CUSTOM_MESSAGE_TYPE.CONFIRMATION
              ));
            }}
  
            yesAction={() => {
              // TODO 入力値をキャッシュして、キャッシュした値を代入
              const messageStr = createFlightTicketListMessage(
                'ご希望のフライトを選択してください',
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
              );
              registerFunc(messageStr);
            }}
  
            noAction={() => {
              registerFunc(createTextMessage(
                'いいえだったので処理を終了します'
              ))
            }}
  
          />
        );
    


      case CUSTOM_MESSAGE_TYPE.FLIGHT_TICKET_LIST:
        return (
          <MessageFlightTicketListView
            m={message}
            registerFunc={registerFunc}
            answer={async (cards) => {
              await registerFunc(createFlightTicketAnswerMessage(
                'こちらのフライトを希望します。',
                cards,
                CUSTOM_MESSAGE_TYPE.FLIGHT_TICKET
              ));
            }}
  
            yesAction={async (cards) => {
              // TODO 入力値をキャッシュして、キャッシュした値を代入
              const messageStr = createFlightTicketConfirmMessage(
                'ご希望のフライトは以下で間違いないでしょうか。',
                cards,
              );
              await registerFunc(messageStr);
            }}
  
            noAction={async () => {
              await registerFunc(createTextMessage(
                'いいえだったので処理を終了します'
              ))
            }}
          />
        );
  
    case CUSTOM_MESSAGE_TYPE.FLIGHT_TICKET_ANSWER:
        return (
          <MessageFlightTicketListView
            m={message}
            isAnswer={true}
          />
        );

    case CUSTOM_MESSAGE_TYPE.FLIGHT_TICKET_CONFIRM:
        return (
          <MessageFlightTicketListView
            isConfirm={true}
            m={message}
            answer={async (cards) => {
              await registerFunc(createAnswerMessage(
                'はい',
                CUSTOM_MESSAGE_TYPE.FLIGHT_TICKET_CONFIRM
              ));
            }}

            yesAction={(cards) => {
              // TODO 入力値をキャッシュして、キャッシュした値を代入
              const messageStr = createProfileFormMessage(
                '次にお客様の情報をお伺いします。',
              );
              registerFunc(messageStr);
            }}
  
            noAction={async () => {
              await registerFunc(createTextMessage(
                'いいえだったので処理を終了します'
              ))
            }}

          />
        );
    
    case CUSTOM_MESSAGE_TYPE.PROFILE_FORM:
      return (
        <MessageProfileView
          m={message}
          registerFunc={registerFunc}

          yesAction={async () => {
            // TODO 入力値をキャッシュして、キャッシュした値を代入
            const messageStr = createFlightSeatPreConfirmMessage(
              '引き続き、お座席を指定しますか？',
            );
            await registerFunc(messageStr);
          }}

          noAction={async () => {
            await registerFunc(createTextMessage(
              'いいえだったので処理を終了します'
            ))
          }}
        />
      );

    case CUSTOM_MESSAGE_TYPE.FLIGHT_SEAT_PRE_CONFIRM:
      return (
        <MessageFlightSeatPreConfirmView
          m={message}
          registerFunc={registerFunc}
          answer={async (value) => {
            await registerFunc(createAnswerMessage(
              value,
              CUSTOM_MESSAGE_TYPE.FLIGHT_SEAT_PRE_CONFIRM
            ));
          }}

          yesAction={async () => {
            // TODO 入力値をキャッシュして、キャッシュした値を代入
            const messageStr = createFlightSeatFormMessage(
              '座席を選択してください。',
            );
            await registerFunc(messageStr);
          }}

          noAction={async () => {
            await registerFunc(createTextMessage(
              'いいえだったので処理を終了します'
            ))
          }}
        />


      );

    case CUSTOM_MESSAGE_TYPE.FLIGHT_SEAT_FORM:
      return (
        <MessageFlightSeatView
          m={message}
          registerFunc={registerFunc}
          answer={async (value) => {
            const messageStr = createFlightSeatFormMessage(
              undefined,
              {
                seats: [value],
              },
            );
            await registerFunc(messageStr);
          }}

          yesAction={async (seat) => {
            // TODO 入力値をキャッシュして、キャッシュした値を代入
            const messageStr = createFlightSeatConfirmMessage(
              '以下の座席でよろしいですか。',
              seat,
            );
            await registerFunc(messageStr);
          }}

          noAction={async () => {
            await registerFunc(createTextMessage(
              'いいえだったので処理を終了します'
            ))
          }}

        />
      );

    case CUSTOM_MESSAGE_TYPE.FLIGHT_SEAT_CONFIRM:
      return (
        <MessageFlightSeatConfirmView
          m={message}
          registerFunc={registerFunc}
          answer={async (value) => {
            await registerFunc(createAnswerMessage(
              value,
              CUSTOM_MESSAGE_TYPE.FLIGHT_SEAT_CONFIRM
            ));
          }}

          yesAction={async () => {
            // TODO 入力値をキャッシュして、キャッシュした値を代入
            const messageStr = createFlightTicketPurchasePreConfirmMessage(
              '引き続き購入手続きを行いますか?',
            );
            await registerFunc(messageStr);
          }}

          noAction={async () => {
            await registerFunc(createTextMessage(
              'いいえだったので処理を終了します'
            ))
          }}
        />  
      );

    case CUSTOM_MESSAGE_TYPE.FLIGHT_TICKET_PURCHASE_PRE_CONFIRM:
      return (
        <MessageFlightTicketPurchasePreConfirmView
          m={message}
          registerFunc={registerFunc}
          answer={async (value) => {
            await registerFunc(createAnswerMessage(
              value,
              CUSTOM_MESSAGE_TYPE.FLIGHT_TICKET_PURCHASE_PRE_CONFIRM
            ));
          }}

          yesAction={async () => {
            // TODO 入力値をキャッシュして、キャッシュした値を代入
            const messageStr = createFlightTicketPurchaseMessage(
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
            );
            await registerFunc(messageStr);
          }}

          noAction={async () => {
            await registerFunc(createTextMessage(
              'いいえだったので処理を終了します'
            ))
          }}
        />


      );
    
    
    case CUSTOM_MESSAGE_TYPE.FLIGHT_TICKET_PURCHASE_FORM:
      return (
        <MessageFlightTicketPurchaseView
          m={message}
          registerFunc={registerFunc}
          answer={async (value) => {
            const messageStr = createFlightTicketPurchaseMessage(
              undefined,
              { order: value },
            );
            await registerFunc(messageStr);        
          }}

          yesAction={async () => {
            // TODO 入力値をキャッシュして、キャッシュした値を代入
            const messageStr = createFlightTicketPurchasePdfMessage(
              'お支払いが完了しました。お客様のe-ticketです。',
              { order:
                {
                  price: '￥98,000',
                  tax: '￥0',
                  amount: '￥98,000',
                  date: '12/30(月)',
                }
              }
            );
            await registerFunc(messageStr);
            await registerFunc(createTextMessage('ご予約を終了いたします。引き続き質問等があればオペレーターが対応いたします。ありがとうございました。'));
          }}

          noAction={async () => {
            await registerFunc(createTextMessage(
              'いいえだったので処理を終了します'
            ))
          }}
        />
      );

    case CUSTOM_MESSAGE_TYPE.FLIGHT_TICKET_PURCHASE_PDF:
      return (
        <MessageFlightTicketPurchasePdfView
          m={message}
          registerFunc={registerFunc}
        />
      );

    case CUSTOM_MESSAGE_TYPE.CHOICE:
      // 型チェック
      // TODO
      break;
    case CUSTOM_MESSAGE_TYPE.ORIGINAL:
      // 型チェック
      // TODO
      break;
    default:
      // return (
      //   <Text m ={{
      //     type: CUSTOM_MESSAGE_TYPE.TEXT,
      //     message: JSON.stringify({
      //       content: m.message,
      //     }),
      //   }} />
      // );
      console.log(m);
      throw new Error(`Invalid message type = ${m.type}`)
  }
}
