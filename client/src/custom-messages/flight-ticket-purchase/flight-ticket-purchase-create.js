
import React from 'react';
import styled from '@emotion/styled';
import {
  Button,
} from 'antd';
import {
  createFlightTicketPurchaseMessage,
} from '../../utils/message-converter';

const Container = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: stretch;
`;

const ButtonArea = styled.div`
`;


export default function FlightTicketPurchaseCreate({ registerFunc }) {

  function action() {
    const messageStr = createFlightTicketPurchaseMessage(
      '購入手続きをしてください。',
      { order:
        {
          price: '￥98,000',
          tax: '￥0',
          amount: '￥98,000',
          date: '12/30(月)',
          confirmed: false,
        }
      }
    );
    registerFunc(messageStr);
  }

  return (
    <Container>
      <ButtonArea>
        <Button
          onClick={action}
          type="primary"
        >CREATE FLIGHT TICKET PURCHASE</Button>
      </ButtonArea>
    </Container>
  );
}

