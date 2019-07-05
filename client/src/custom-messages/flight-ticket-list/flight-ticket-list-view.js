
import React, { useState } from 'react';
import styled from '@emotion/styled'
import {
  Input,
  Button,
} from 'antd';

import Carousel from './carousel';


const FormArea = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: stretch;
`;

const InputArea = styled.div`
  flex-grow: 1;
`;

const ButtonArea = styled.div`

`;


export default function FlightTicketListView({ m, isConfirm, isAnswer, registerFunc, answer, yesAction, noAction }) {

  const {
    title,
    contents,
  } = m.customMessage;


  const [message, setMessage] = useState('');

  function clearForm() {
    setMessage('');
  }

  // TODO ボットなどによる入力チェック
  function validation() {
    return true;
  }

  async function action() {

    await answer(message);
    const isValid = validation(message);

    if (isValid) {
      await yesAction(message);
    } else {
      await noAction(message);
    }
    clearForm();
  }
  


  return isAnswer ? (
      <div style={{
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{textAlign: 'right' }} >
          {title && <div>{title}</div>}
        </div>
        <Carousel
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'flex-end',
          }}
          registerFunc={registerFunc}
          answer={answer}
          yesAction={yesAction}
          noAction={noAction}
          contents={contents}
        />
      </div>
    ) : isConfirm ? (
      <div>
        <div style={{textAlign: 'left' }} >
          {title && <div>{title}</div>}
        </div>
        <Carousel
          registerFunc={registerFunc}
          answer={answer}
          yesAction={yesAction}
          noAction={noAction}
          contents={contents}
        />
        <FormArea>
          <InputArea>
            <Input
              type="text"
              value={message}
              placeholder="「はい」か「いいえ」を入力してください"
              onChange={e => setMessage(e.target.value)}
            />
          </InputArea>
          <ButtonArea>
            <Button
              onClick={action}
              type="primary"
              >SEND</Button>
          </ButtonArea>
        </FormArea>
      </div>
    ) : (
      <div>
        <div style={{textAlign: 'left' }} >
          {title && <div>{title}</div>}
        </div>
        <Carousel
          registerFunc={registerFunc}
          answer={answer}
          yesAction={yesAction}
          noAction={noAction}
          contents={contents}
        />
      </div>
    );
}
