
import React from 'react';
import styled from '@emotion/styled';
import {
  Button,
} from 'antd';
import {
  createProfileFormMessage,
} from '../../utils/message-converter';

const Container = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: stretch;
`;

const ButtonArea = styled.div`

`;


export default function ProfileCreate({ registerFunc }) {

  function action() {
    const messageStr = createProfileFormMessage(
      '次にお客様の情報をお伺いします。',
    );
    registerFunc(messageStr);
  }

  return (
    <Container>
      <ButtonArea>
        <Button
          onClick={action}
          type="primary"
        >
          CREATE PROFILE FORM MESSAGE
        </Button>
      </ButtonArea>
    </Container>
  );
}

