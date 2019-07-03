
import React, { useState } from 'react';
import styled from '@emotion/styled'
import {
  Input,
  Button,
} from 'antd';
import {
  createTextMessage,
} from '../utils/message-converter';

const Container = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: stretch;
`;

const InputArea = styled.div`
  flex-grow: 1;
`;

const ButtonArea = styled.div`

`;

export default function TextFormUpdate({
  message,
  updateFunc,
  cancelFunc,
}) {

  const [text, setText] = useState(message.customMessage.text);

  function clearForm() {
    setText('');
  }

  function action() {
    const messageStr = createTextMessage(text);
    updateFunc(message, messageStr);
    clearForm();
    cancelFunc();
  }

  return (
    <Container>
      <InputArea>
        <Input
          type="text"
          value={text}
          placeholder="New message"
          onChange={e => setText(e.target.value)}
        />
      </InputArea>
      <ButtonArea>
        <Button
          onClick={cancelFunc}
          type="dainger"
        >CANCEL</Button>
      </ButtonArea>
      <ButtonArea>
        <Button
          onClick={action}
          type="primary"
        >UPDATE</Button>
      </ButtonArea>
    </Container>
  );
}

