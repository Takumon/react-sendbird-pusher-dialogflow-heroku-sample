
import React, { useState } from 'react';
import styled from '@emotion/styled'
import {
  Input,
  Button,
} from 'antd';
import {
  createConfirmMessage,
} from '../../utils/message-converter';

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

export default function ConfirmAppStartCreate({ registerFunc }) {

  function action() {
    const messageStr = createConfirmMessage(
      '予約を開始しますか？',
      'チャットから航空機件予約が行えます。航空機件予約を開始しますか？'
    );
    registerFunc(messageStr);
  }

  return (
      <Container>
        <ButtonArea>
          <Button
            onClick={action}
            type="primary"
          >APP START!!</Button>
        </ButtonArea>
      </Container>
  );
}

