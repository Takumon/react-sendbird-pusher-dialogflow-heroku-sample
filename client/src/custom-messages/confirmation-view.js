
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



export default function ConfirmationView({ m, answer, yesAction, noAction }) {
  const {
    title,
    contents,
    text = 'デフォルト'
  } = m.customMessage;

  async function validateAndNext(value) {
    // TODO 
    if(value === 'はい') {
      await yesAction();
    } else if (value === 'いいえ') {
      await noAction();      
    }
  }


  const ActionYes = (
    <Button
      type="primary"
      onClick={async (e) => {
        const messageStr = 'はい';
        // TODO 入力チェック
        await answer(messageStr)
        await validateAndNext(messageStr);
      }}
    >はい</Button>
  );

  const ActionNo = (
    <Button
      type="dainger"
      onClick={async (e) => {
        const messageStr = 'いいえ';
        // TODO 入力チェック
        await answer(messageStr)
        await validateAndNext(messageStr);
      }}
    >いいえ</Button>
  );
  
  return (
    <Container>
      <Card title={title} >
        <Content>
          <div>{text}</div>
          <hr/>
          <table>
            <tbody>
              {contents.map(d => (
                <tr key={d.name} >
                  <th>{d.name}</th>
                  <td>{d.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Content>

        <Action>
          {ActionYes}
          {ActionNo}
        </Action>

      </Card>
    </Container>
  );
}
