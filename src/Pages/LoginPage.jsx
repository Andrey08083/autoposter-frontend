import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Navigate } from 'react-router-dom';
import FlexColumnDiv from '../Components/FlexColumnDiv';
import FlexColumnDiv100 from '../Components/FlexColumnDiv100';
import { handleAPIRequest, handleTextChange } from '../Utils/HookChangeHandlers';
import { loginUserRequest } from '../API/UserApi';
import ErrorParagraph from '../Components/ErrorParagraph';
import { signInAction } from '../Store/UserReducer';
import store from '../Store';

function LoginPage() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState('');
  const [loginErrors, setLoginErrors] = useState(undefined);
  return (
    <FlexColumnDiv100>
      <FlexColumnDiv>
        <TextField label="Email" type="Email" value={email} onChange={handleTextChange(setEmail)} />
        <TextField label="Password" type="password" value={password} onChange={handleTextChange(setPassword)} />
        <Button
          onClick={() => {
            handleAPIRequest(loginUserRequest, { email, password })
              .then(({ data }) => {
                setLoginErrors([]);
                store.dispatch(signInAction(data));
              })
              .catch((rej) => setLoginErrors(rej));
          }}
        >
          Login
        </Button>
        {loginErrors instanceof Array && !loginErrors.length ? (
          <Navigate to="/workspace" />
        )
          : (
            loginErrors !== undefined
              ? loginErrors.map((error) => <ErrorParagraph>{error}</ErrorParagraph>)
              : ''
          )}

      </FlexColumnDiv>
    </FlexColumnDiv100>
  );
}

export default LoginPage;
