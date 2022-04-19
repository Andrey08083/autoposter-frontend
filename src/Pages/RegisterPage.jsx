import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import FlexColumnDiv from '../Components/FlexColumnDiv';
import FlexColumnDiv100 from '../Components/FlexColumnDiv100';
import { registerUserRequest } from '../API/UserApi';
import ErrorParagraph from '../Components/ErrorParagraph';
import { handleTextChange } from '../Utils/HookChangeHandlers';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');

  const [registerErrors, setRegisterErrors] = useState(undefined);
  return (
    <FlexColumnDiv100>
      <FlexColumnDiv>
        <TextField label="Username" type="text" value={userName} onChange={handleTextChange(setUserName)} />
        <TextField label="Email" type="email" value={email} onChange={handleTextChange(setEmail)} />
        <TextField label="Password" type="password" value={password} onChange={handleTextChange(setPassword)} />
        <Button onClick={() => {
          registerUserRequest({ email, password, userName })
            .then(() => {
              setRegisterErrors([]);
            })
            .catch((error) => setRegisterErrors(error.response.data.errors));
        }}
        >
          Register
        </Button>
        {(registerErrors instanceof Array && !registerErrors.length)
          && (
            <>
              <p>Success registration, now you can login to your workspace</p>
              <Link to="/sign-in"><Button>Go to login</Button></Link>
            </>
          )}

        {(registerErrors instanceof Array
          && registerErrors.length)
          && registerErrors.map((error) => <ErrorParagraph>{error}</ErrorParagraph>)}
      </FlexColumnDiv>
    </FlexColumnDiv100>
  );
}

export default LoginPage;
