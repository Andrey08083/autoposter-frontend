import React from 'react';
import FlexColumnDiv from '../Components/FlexColumnDiv';
import FlexColumnDiv100 from '../Components/FlexColumnDiv100';
import ResponsiveAppBar from '../Components/ResponsiveAppBar';

function WorkspacePage() {
  return (
    <FlexColumnDiv100>
      <ResponsiveAppBar />
      <FlexColumnDiv>
        ABOBA
      </FlexColumnDiv>
    </FlexColumnDiv100>
  );
}

export default WorkspacePage;
