import React, { useState, useEffect, useRef  } from 'react';
import styled from '@emotion/styled'
import {
  Input,
  Button,
} from 'antd';
import history from '../history'

const SingleInputForm = styled.div`
  display: flex;
  align-items: stretch;
`;

const SingleInputForm_Input = styled.div`
  flex-grow: 1;
`;

const SingleInputForm_Button = styled.div`

`;

export default function Login({ setUserId }) {
  const [userIdForm, setUserIdForm] = useState('');

  setUserId('inouetakumon@gmail.com');
  history.push('/channel');

  function login(_userId) {
    setUserId(_userId);
    history.push('/channel');
  }

  return (
    <>
      <h1>Login</h1>
      <SingleInputForm>
        <SingleInputForm_Input>
          <Input
            type="text"
            value={userIdForm}
            onChange={e => setUserIdForm(e.target.value)}
            placeholder="UserId"
          />
        </SingleInputForm_Input>
        <SingleInputForm_Button>
          <Button
            onClick={() => {
              login(userIdForm);
              setUserIdForm('');
            }}
            type="primary"
          >SEND!</Button>
        </SingleInputForm_Button>
      </SingleInputForm>
    </>
  );
}
