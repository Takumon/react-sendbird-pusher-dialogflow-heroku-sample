
import React, { useState } from 'react';
import styled from '@emotion/styled'
import {
  Input,
  Button,
} from 'antd';

const Container = styled.div`
  text-align: left;
`;

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

export default function ArrivalFormView({ m, answer, validAction, invalidAction }) {

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
      await validAction(message);
    } else {
      await invalidAction(message);
    }
    clearForm();
  }

  return (
    <>
      <Container>
        {m.customMessage.text}
      </Container>
      <FormArea>
        <InputArea>
          <Input
            type="text"
            value={message}
            placeholder="到着値を入力してください"
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
    </>
  );
}
