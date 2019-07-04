
import React from 'react';
import styled from '@emotion/styled'
import {
  Button,
} from 'antd';
import {
  createConfirmationMessage,
} from '../utils/message-converter';

const Container = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: stretch;
`;

const ButtonArea = styled.div`

`;


export default function ConfirmationCraete({ registerFunc }) {

  function action() {
    const messageStr = createConfirmationMessage(
      // title
      'フライト予約内容',
      '以下の内容でフライトを検索しますか？',
      // contents
      [
        { name: '国内線・国際線', value: '国際線' },
        { name: 'ご予約人数', value: '1' },
        { name: '出発地域', value: '東京' },
        { name: '到着地域', value: 'サンフランシスコ' },
        { name: 'ご出発の日付', value: '2017/10/31' },
        { name: 'お帰りの日付', value: '2017/11/01' }
      ],
    );
    registerFunc(messageStr);
  }

  return (
    <Container>
      <ButtonArea>
        <Button
          onClick={action}
          type="primary"
        >CREATE CONFIRMATION MESSAGE</Button>
      </ButtonArea>
    </Container>
  );
}

