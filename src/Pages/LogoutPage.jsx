import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import FlexColumnDiv from '../Components/FlexColumnDiv';
import FlexColumnDiv100 from '../Components/FlexColumnDiv100';
import store from '../Store';
import { logoutUserRequest } from '../API/UserApi';
import { cleanStoreAction } from '../Store/UserReducer';

function LogoutPage() {
  useEffect(() => {
    logoutUserRequest().then(() => {
      store.dispatch(cleanStoreAction());
    });
  });

  return (
    <FlexColumnDiv100>
      <FlexColumnDiv>
        You are successfully logged out
        <Link to="/"><Button>Go to Home Page</Button></Link>
      </FlexColumnDiv>
    </FlexColumnDiv100>
  );
}

export default LogoutPage;
