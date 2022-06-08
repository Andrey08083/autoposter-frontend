import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import FlexColumnDiv from '../Components/FlexColumnDiv';
import FlexColumnDiv100 from '../Components/FlexColumnDiv100';

function NotFoundPage() {
  return (
    <FlexColumnDiv100>
      <FlexColumnDiv>
        Page not found ¯\_(ツ)_/¯
        <Link to="/"><Button>Go to Home Page</Button></Link>
      </FlexColumnDiv>
    </FlexColumnDiv100>
  );
}

export default NotFoundPage;
