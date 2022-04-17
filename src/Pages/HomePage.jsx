import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import FlexColumnDiv from '../Components/FlexColumnDiv';
import FlexColumnDiv100 from '../Components/FlexColumnDiv100';
import store from '../Store';

function HomePage() {
  const state = store.getState();

  return (
    <FlexColumnDiv100>
      <FlexColumnDiv>
        The best autoposter in world
        <Link to="/sign-in"><Button>Login</Button></Link>
        <Link to="/sign-up"><Button>Register</Button></Link>
        {!!Object.keys(state?.userStorage?.user || {}).length
          && <Link to="/workspace"><Button>Go to Workspace</Button></Link>}
      </FlexColumnDiv>
    </FlexColumnDiv100>
  );
}

export default HomePage;
