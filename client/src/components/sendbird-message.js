import React, { useState  } from 'react';
import styled from '@emotion/styled'
import { 
  Button,
} from 'antd';
import {
  MessageTextView,
  MessageTextFormUpdate,
  MessageLinkView,
  MessageLinkFormUpdate,
  MessageImageView,
  MessageImageFormUpdate,
  MessageConfirmationView,
  MessageFlightTicketListView,
  MessageProfileView,
  MessageFlightSeatView,
  MessageFlightTicketPurchaseView,
  MessageFlightTicketPurchasePdfView,
} from '../custom-messages';
import {
  toCustom,
  CUSTOM_MESSAGE_TYPE,
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

    case CUSTOM_MESSAGE_TYPE.CONFIRMATION:
      return (
        <MessageConfirmationView
          m={message}
          registerFunc={registerFunc}
        />
      );

    case CUSTOM_MESSAGE_TYPE.FLIGHT_TICKET_LIST:
      return (
        <MessageFlightTicketListView
          m={message}
          registerFunc={registerFunc}
        />
      );

    case CUSTOM_MESSAGE_TYPE.PROFILE_FORM:
      return (
        <MessageProfileView
          m={message}
          registerFunc={registerFunc}
        />
      );

    case CUSTOM_MESSAGE_TYPE.FLIGHT_SEAT_FORM:
      return (
        <MessageFlightSeatView
          m={message}
          registerFunc={registerFunc}
        />
      );

    case CUSTOM_MESSAGE_TYPE.FLIGHT_TICKET_PURCHASE_FORM:
      return (
        <MessageFlightTicketPurchaseView
          m={message}
          registerFunc={registerFunc}
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
      throw new Error(`Invalid message type = ${m.type}`)
  }
}
