
import React from 'react';
import styled from '@emotion/styled'


export default function TextView({ m, isAnswer }) {

  const Container = styled.div`
    text-align: ${isAnswer ? 'right' : 'left'};
  `;

  return (
    <Container>
      {m.customMessage.text}
    </Container>
  );
}
