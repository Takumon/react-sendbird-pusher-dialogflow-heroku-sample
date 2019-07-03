
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

export default function LinkFormCreate({ registerFunc }) {

  const [message, setMessage] = useState('');
  const [link, setLink] = useState('');

  function clearForm() {
    setMessage('');
    setLink('');
  }

  function action() {
    const messageStr = createLinkMessage(message, link);
    registerFunc(messageStr);
    clearForm();
  }

  return (
      <Container>
        <InputArea>
          <Input
            type="text"
            value={message}
            placeholder="New message"
            onChange={e => setMessage(e.target.value)}
          />
        </InputArea>
        <InputArea>
          <Input
            type="text"
            value={link}
            placeholder="New message's link"
            onChange={e => setLink(e.target.value)}
          />
        </InputArea>
        <ButtonArea>
          <Button
            onClick={action}
            type="primary"
          >SEND</Button>
        </ButtonArea>
      </Container>
  );
}

