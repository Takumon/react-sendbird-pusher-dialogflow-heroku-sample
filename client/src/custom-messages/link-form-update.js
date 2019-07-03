
import React, { useState } from 'react';
import styled from '@emotion/styled'
import {
  Input,
  Button,
} from 'antd';
import {
  createLinkMessage,
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

export default function LinkFormUpdate({
  message,
  updateFunc,
  cancelFunc,
}) {

  const [text, setText] = useState(message.customMessage.text);
  const [link, setLink] = useState(message.customMessage.link);

  function clearForm() {
    setText('');
    setLink('');
  }

  function action() {
    const messageStr = createLinkMessage(text, link);
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
          onChange={e => setText(e.target.value)}
        />
      </InputArea>
      <InputArea>
        <Input
          type="text"
          value={link}
          onChange={e => setLink(e.target.value)}
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

