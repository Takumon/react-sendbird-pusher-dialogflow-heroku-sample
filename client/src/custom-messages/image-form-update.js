
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

export default function LinkFormUpdate({
  message,
  updateFunc,
  cancelFunc,
}) {

  const [link, setLink] = useState(message.customMessage.link);
  const [description, setDescription] = useState(message.customMessage.description);
  const [alt, setAlt] = useState(message.customMessage.alt);

  function clearForm() {
    setLink('');
    setDescription('');
    setAlt('');
  }

  function action() {
    const messageStr = createImageMessage(link, description, alt);
    updateFunc(message, messageStr);
    clearForm();
    cancelFunc();
  }


  return (
    <Container>
      <InputArea>
        <Input
          type="text"
          value={link}
          onChange={e => setLink(e.target.value)}
        />
      </InputArea>
      <InputArea>
        <TextArea
          rows={4}
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </InputArea>
      <InputArea>
        <Input
          type="text"
          value={alt}
          onChange={e => setAlt(e.target.value)}
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

