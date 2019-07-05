
import React from 'react';
import styled from '@emotion/styled';
import {
  Button,
} from 'antd';
import {
  createFlightSeatFormMessage,
} from '../../utils/message-converter';

const Container = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: stretch;
`;

const ButtonArea = styled.div`
`;


export default function FlightSeatCreate({ registerFunc }) {

  function action() {
    const messageStr = createFlightSeatFormMessage(
      '座席を選択してください。',
    );
    registerFunc(messageStr);
  }

  return (
    <Container>
      <ButtonArea>
        <Button
          onClick={action}
          type="primary"
        >CREATE FLIGHT SHEET MESSAGE</Button>
      </ButtonArea>
    </Container>
  );
}

