import React from 'react';
import styled from '@emotion/styled'
import { Button, Menu, Dropdown, Icon } from 'antd';
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
  MessageProfileAnswerView,
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
  createArrivalToMessage,
  createConfirmationMessage,
  createFlightTicketListMessage,
  createFlightTicketAnswerMessage,
  createFlightTicketConfirmMessage,
  createProfileFormMessage,
  createProfileAnswerMessage,
  createFlightSeatPreConfirmMessage,
  createFlightSeatFormMessage,
  createFlightSeatConfirmMessage,
  createFlightTicketPurchasePreConfirmMessage,
  createFlightTicketPurchaseMessage,
  createFlightTicketPurchasePdfMessage,
} from '../utils/message-converter';
import BotAvatorIcon from '../images/bot.png';
import MineAvatorIcon from '../images/mine.png';

const Container = styled.div`
  display: flex;
  align-items: stretch;
  margin-bottom: 36px;
`;

const MessageArea = styled.div`
  position: relative;
  flex-grow: 1;
  margin-right: 1rem;
  display: flex;
  flex-direction: column;
`;

const Avator = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  border: 1px solid gray;
  overflow: hidden;
  margin-right: 1rem;
`;


export default function SendBirdMessage({
  m,
  viewerUserId,
  registerFunc,
  registerFileFunc,
  deleteFunc
}) {

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Button
            onClick={() => deleteFunc(m)}
            type="danger"
        >DELETE</Button>
      </Menu.Item>
    </Menu>
  );

  const dropdown = (
    <div style={{
      position: 'absolute',
      top: '6px',
      right: '-24px',
    }} >
      <Dropdown overlay={menu} placement="bottomRight" >
        <a target="_blank" rel="noopener noreferrer" href="#">
          <Icon type="more" />
        </a>
      </Dropdown>
    </div>
  );

  return (
    <Container>
      <Avator
        alt="avator"
        src={m.sender.userId === 'inouetakumon@gmail.com' ? BotAvatorIcon : MineAvatorIcon }
      />
      <MessageArea>
        <CustomMessageView
          m={m}
          registerFunc={registerFunc}
          viewerUserId={viewerUserId}
        />
        {dropdown}
      </MessageArea>
    </Container>
  );
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
          answer={(value) => {
            registerFunc(createAnswerMessage(
              value,
              CUSTOM_MESSAGE_TYPE.CONFIRM
            ));
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
        />
      );

  

    case CUSTOM_MESSAGE_TYPE.DEPARTURE_FORM:
      return (
        <MessageDepartureFormView
          m={message}
          registerFunc={registerFunc}
        />
      );

    case CUSTOM_MESSAGE_TYPE.ARRIVAL_FORM:
      return (
        <MessageArrivalFormView
          m={message}
          registerFunc={registerFunc}
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
        <MessageFlightTicketListConfirmView
          m={message}
          answer={async (cards) => {
            await registerFunc(createAnswerMessage(
              'はい',
              CUSTOM_MESSAGE_TYPE.FLIGHT_TICKET_CONFIRM
            ));
          }}
        />
      );
    
    case CUSTOM_MESSAGE_TYPE.PROFILE_FORM:
      return (
        <MessageProfileView
          m={message}
          registerFunc={registerFunc}
          answer={async (formData) => {
            await registerFunc(createProfileAnswerMessage(
              formData
            ));
          }}
        />
      );

    case CUSTOM_MESSAGE_TYPE.PROFILE_ANSWER:
        return (
          <MessageProfileAnswerView
            m={message}
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
        />  
      );

    case CUSTOM_MESSAGE_TYPE.FLIGHT_TICKET_PURCHASE_PRE_CONFIRM:
      return (
        <MessageFlightTicketPurchasePreConfirmView
          m={message}
          registerFunc={registerFunc}
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
            await registerFunc(
              );
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

    default:
      console.log(m);
      throw new Error(`Invalid message type = ${m.type}`)
  }
}
