
import React from 'react';
import styled from '@emotion/styled';
import {
  Button,
} from 'antd';
import {
  createFlightTicketPurchasePdfMessage,
  createTextMessage,
} from '../../utils/message-converter';


const Container = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: stretch;
`;

const ButtonArea = styled.div`
`;


export default function FlightTicketPurchasePdfCreate({ registerFunc, registerFileFunc }) {

  async function action() {
    const messageStr = createFlightTicketPurchasePdfMessage(
      'お支払いが完了しました。お客様のe-ticketです。',
      { order:
        {
          price: '￥98,000',
          tax: '￥0',
          amount: '￥98,000',
          date: '12/30(月)',
        }
      }
    );
    await registerFunc(messageStr);
    await registerFunc(createTextMessage('ご予約を終了いたします。引き続き質問等があればオペレーターが対応いたします。ありがとうございました。'));
  }

  return (
    <>
      <Container>
        <ButtonArea>
          <Button
            onClick={action}
            type="primary"
          >CREATE FLIGHT TICKET PURCHASE PDF</Button>
        </ButtonArea>
      </Container>
    </>
  );
}

