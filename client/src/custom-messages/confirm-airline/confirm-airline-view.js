
import React from 'react';
import styled from '@emotion/styled'
import { Card, Button } from 'antd';


const Container = styled.div`
  text-align: left;
  border: 0.1px solid #222;
  border-radius: 4px;
`;

const Content = styled.div`
  padding: 10px;

  table {
    width: 100%;
  }
  th {
    font-weight: normal;
  }
  td {
    text-align: right;
  }    
`;

const Action = styled.div`
  display: flex;

  Button {
    flex-grow: 1;
    margin: 12px;
  }
`;



export default function ConfirmAirLineView({ m, registerFunc, answer,  validAction, invalidAction }) {
  const {
    title,
    text,
  } = m.customMessage;


  const ActionYes = (
    <Button
      type="primary"
      onClick={async e => {
        const messageStr = '国際線';
        // TODO 入力チェック
        await answer(messageStr)
        await validAction(messageStr);
      }}
    >国際線</Button>
  );

  const ActionNo = (
    <Button
      type="dainger"
      onClick={e => console.log('TODO 実装')}
    >国内線</Button>
  );
  
  return (
    <Container>
      <Card title={title} >
        <Content>
          {text}
        </Content>

        <Action>
          {ActionYes}
          {ActionNo}
        </Action>

      </Card>
    </Container>
  );
}
