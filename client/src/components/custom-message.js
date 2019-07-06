import React from 'react';
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
  createAnswerMessage,
  createProfileAnswerMessage,
  createFlightSeatFormMessage,
  createFlightTicketAnswerMessage,
  createFlightTicketPurchaseMessage,
} from '../utils/message-converter';


export default function CustomMessage({
  m,
  registerFunc,
}) {

  const message = toCustom(m)

  const customMessages = {
    [CUSTOM_MESSAGE_TYPE.TEXT] :
      <MessageTextView m={message} />,

    [CUSTOM_MESSAGE_TYPE.ANSWER]:
      <MessageTextView m={message} isAnswer={true} />,

    [CUSTOM_MESSAGE_TYPE.LINK]:
      <MessageLinkView m={message} />,

    [CUSTOM_MESSAGE_TYPE.IMAGE]:
      <MessageImageView m={message} />,

    [CUSTOM_MESSAGE_TYPE.CONFIRM]:
      <MessageConfirmAppStartView
        m={message}
        answer={(value) => {
          registerFunc(createAnswerMessage(
            value,
            CUSTOM_MESSAGE_TYPE.CONFIRM
          ));
        }}
      />,

    [CUSTOM_MESSAGE_TYPE.CONFIRM_AIR_LINE]:
      <MessageConfirmAirLineView
        m={message}
        answer={(value) => {
          registerFunc(createAnswerMessage(
            value,
            CUSTOM_MESSAGE_TYPE.CONFIRM_AIR_LINE
          ));
        }}
      />,

    [CUSTOM_MESSAGE_TYPE.DEPARTURE_FORM]:
      <MessageDepartureFormView m={message} />,

    [CUSTOM_MESSAGE_TYPE.ARRIVAL_FORM]:
      <MessageArrivalFormView m={message} />,

    [CUSTOM_MESSAGE_TYPE.CONFIRMATION]:
      <MessageConfirmationView
        m={message}
        answer={(value) => {
          registerFunc(createAnswerMessage(
            value,
            CUSTOM_MESSAGE_TYPE.CONFIRMATION
          ));
        }}
      />,

    [CUSTOM_MESSAGE_TYPE.FLIGHT_TICKET_LIST]:
      <MessageFlightTicketListView
        m={message}
        answer={async (cards) => {
          await registerFunc(createFlightTicketAnswerMessage(
            'こちらのフライトを希望します。',
            cards,
            CUSTOM_MESSAGE_TYPE.FLIGHT_TICKET
          ));
        }}
      />,
  
    [CUSTOM_MESSAGE_TYPE.FLIGHT_TICKET_ANSWER]:
      <MessageFlightTicketListView
        m={message}
        isAnswer={true}
      />,
    
    [CUSTOM_MESSAGE_TYPE.FLIGHT_TICKET_CONFIRM]:
      <MessageFlightTicketListConfirmView
        m={message}
        answer={async (cards) => {
          await registerFunc(createAnswerMessage(
            'はい',
            CUSTOM_MESSAGE_TYPE.FLIGHT_TICKET_CONFIRM
          ));
        }}
      />,
    
    [CUSTOM_MESSAGE_TYPE.PROFILE_FORM]:
      <MessageProfileView
        m={message}
        answer={async (formData) => {
          await registerFunc(createProfileAnswerMessage(
            formData
          ));
        }}
      />,

    [CUSTOM_MESSAGE_TYPE.PROFILE_ANSWER]:
      <MessageProfileAnswerView
        m={message}
      />,

    [CUSTOM_MESSAGE_TYPE.FLIGHT_SEAT_PRE_CONFIRM]:
      <MessageFlightSeatPreConfirmView
        m={message}
        answer={async (value) => {
          await registerFunc(createAnswerMessage(
            value,
            CUSTOM_MESSAGE_TYPE.FLIGHT_SEAT_PRE_CONFIRM
          ));
        }}
      />,

    [CUSTOM_MESSAGE_TYPE.FLIGHT_SEAT_FORM]:
      <MessageFlightSeatView
        m={message}
        answer={async (value) => {
          const messageStr = createFlightSeatFormMessage(
            undefined,
            {
              seats: [value],
            },
          );
          await registerFunc(messageStr);
        }}
      />,

    [CUSTOM_MESSAGE_TYPE.FLIGHT_SEAT_CONFIRM]:
      <MessageFlightSeatConfirmView
        m={message}
        answer={async (value) => {
          await registerFunc(createAnswerMessage(
            value,
            CUSTOM_MESSAGE_TYPE.FLIGHT_SEAT_CONFIRM
          ));
        }}
      />,  

    [CUSTOM_MESSAGE_TYPE.FLIGHT_TICKET_PURCHASE_PRE_CONFIRM]:
      <MessageFlightTicketPurchasePreConfirmView
        m={message}
      />,
    
    [CUSTOM_MESSAGE_TYPE.FLIGHT_TICKET_PURCHASE_FORM]:
      <MessageFlightTicketPurchaseView
        m={message}
        answer={async (value) => {
          const messageStr = createFlightTicketPurchaseMessage(
            undefined,
            { order: value },
          );
          await registerFunc(messageStr);        
        }}
      />,

    [CUSTOM_MESSAGE_TYPE.FLIGHT_TICKET_PURCHASE_PDF]:
      <MessageFlightTicketPurchasePdfView  m={message} />,
  };



  const customMessage = customMessages[message.customMessage.type];
  if (!customMessage) {
    console.log(m);
    throw new Error(`Invalid message type = ${message.customMessage.type}`)  
  }

  return customMessage;
}
