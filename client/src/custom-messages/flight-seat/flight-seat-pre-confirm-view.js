
import React from 'react';
import styled from '@emotion/styled'

const Container = styled.div`
  text-align: left;
`;


export default function FlightSeatPreConfirmView({ m }) {

  return (
    <Container>
      {m.customMessage.text}
    </Container>
  );
}
