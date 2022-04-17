import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import FlexColumnDiv from '../Components/FlexColumnDiv';
import FlexColumnDiv100 from '../Components/FlexColumnDiv100';
import { handleAPIRequest, handleTextChange } from '../Utils/HookChangeHandlers';
import { registerUserRequest } from '../API/UserApi';
import ErrorParagraph from '../Components/ErrorParagraph';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  // TODO: Remap on API side
  const [registerErrors, setRegisterErrors] = useState(undefined);
  return (
    <FlexColumnDiv100>
      <FlexColumnDiv>
        <TextField label="Username" type="text" value={userName} onChange={handleTextChange(setUserName)} />
        <TextField label="Email" type="email" value={email} onChange={handleTextChange(setEmail)} />
        <TextField label="Password" type="password" value={password} onChange={handleTextChange(setPassword)} />
        <Button onClick={() => {
          handleAPIRequest(registerUserRequest, { email, password, userName })
            .then(() => {
              setRegisterErrors([]);
            })
            .catch((rej) => setRegisterErrors(rej));
        }}
        >
          Register
        </Button>
        {registerErrors instanceof Array && !registerErrors.length ? (
          <p>Success registration, check your email for confirmation</p>
        )
          : (
            registerErrors !== undefined
              ? registerErrors.map((error) => <ErrorParagraph>{error}</ErrorParagraph>)
              : ''
          )}
      </FlexColumnDiv>
    </FlexColumnDiv100>
  );
}

export default LoginPage;
