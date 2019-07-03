
import React from 'react';
import styled from '@emotion/styled'

const Container = styled.div`
  text-align: left;
`;

export default function LinkView({ m }) {
  return (
    <Container>
      <a href={m.customMessage.link} >
        {m.customMessage.text}
      </a>
    </Container>
  );
}
