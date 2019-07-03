
import React, { useState } from 'react';
import styled from '@emotion/styled'
import {
  Input,
  Button,
} from 'antd';
import {
  createImageMessage,
} from '../utils/message-converter';

const { TextArea } = Input;

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

  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [alt, setAlt] = useState('');

  function clearForm() {
    setLink('');
    setDescription('');
    setAlt('');
  }

  function action() {
    const messageStr = createImageMessage(link, description, alt);
    registerFunc(messageStr);
    clearForm();
  }

  return (
      <Container>
        <InputArea>
          <Input
            type="text"
            value={link}
            placeholder="New image link"
            onChange={e => setLink(e.target.value)}
          />
        </InputArea>
        <InputArea>
          <TextArea
            rows={4}
            value={description}
            placeholder="New image description"
            onChange={e => setDescription(e.target.value)}
          />
        </InputArea>
        <InputArea>
          <Input
            type="text"
            value={alt}
            placeholder="New image alt"
            onChange={e => setAlt(e.target.value)}
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

