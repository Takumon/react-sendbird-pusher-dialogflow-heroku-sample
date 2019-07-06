
import React from 'react';
import styled from '@emotion/styled'

const Container = styled.div`
  text-align: left;
`;

export default function FlightSeatflightTicketPurchasePreConfirmView({ m }) {

  // TODO ボットなどによる入力チェック
  function validation() {
    return true;
  }

  return (
    <Container>
      {m.customMessage.text}
    </Container>
  );
}
